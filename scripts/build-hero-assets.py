import os
import sys
import subprocess
import numpy as np
import cv2
import imageio_ffmpeg

def get_ffmpeg():
    try:
        res = subprocess.run(['ffmpeg', '-version'], capture_output=True)
        if res.returncode == 0:
            return 'ffmpeg'
    except Exception:
        pass
    return imageio_ffmpeg.get_ffmpeg_exe()

def main():
    ffmpeg = get_ffmpeg()
    print(f"Using FFmpeg: {ffmpeg}")

    os.makedirs("public/hero", exist_ok=True)
    os.makedirs("public", exist_ok=True)

    input_file = "gemini_generated_video_6057f35b.mp4"
    if not os.path.exists(input_file):
        if os.path.exists("intro.mp4"):
            input_file = "intro.mp4"
        elif os.path.exists("intro.mov"):
            input_file = "intro.mov"
        else:
            print(f"Error: {input_file} not found!")
            sys.exit(1)

    print(f"Processing input file: {input_file}")

    # 1. Read video frames
    cap = cv2.VideoCapture(input_file)
    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps <= 0:
        fps = 24.0
    
    raw_frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        raw_frames.append(frame)
    cap.release()
    total_frames = len(raw_frames)
    print(f"Loaded {total_frames} frames at {fps} FPS")

    # Crop & Resize parameters
    # Input is 1280x720. Crop person centered: X=352..928 (576 wide), Y=0..720 (720 high)
    # Target size: 768x960
    target_w, target_h = 768, 960
    
    processed_frames = []
    for f in raw_frames:
        # Crop
        h, w, _ = f.shape
        crop_x = int((w - 576) / 2)
        crop_f = f[0:h, crop_x:crop_x+576]
        # Whiten background slightly using colorlevels / brightness
        # colorlevels=rimax=0.98:gimax=0.98:bimax=0.98
        # In opencv: scale values up slightly, clamp to 255
        f_float = crop_f.astype(np.float32) / 249.9  # 0.98 of 255 is ~249.9
        f_clamped = np.clip(f_float * 255.0, 0, 255).astype(np.uint8)
        
        # Resize to 768x960
        f_resized = cv2.resize(f_clamped, (target_w, target_h), interpolation=cv2.INTER_AREA)
        processed_frames.append(f_resized)

    # 2. Cross-fade seamless loop (0.5s = ~12 frames)
    fade_frames = int(round(fps * 0.5))
    loop_frames_count = total_frames - fade_frames
    
    looped_frames = []
    for i in range(loop_frames_count):
        if i < fade_frames:
            # Blend frame i with tail frame (loop_frames_count + i)
            tail_idx = loop_frames_count + i
            alpha = i / float(fade_frames)
            blended = (processed_frames[i].astype(np.float32) * alpha + 
                       processed_frames[tail_idx].astype(np.float32) * (1.0 - alpha)).astype(np.uint8)
            looped_frames.append(blended)
        else:
            looped_frames.append(processed_frames[i])

    print(f"Created looped video with {len(looped_frames)} frames (~{len(looped_frames)/fps:.2f}s)")

    # Write temporary processed raw video
    temp_raw_video = "scratch/processed_loop.mp4"
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(temp_raw_video, fourcc, fps, (target_w, target_h))
    for f in looped_frames:
        out.write(f)
    out.release()

    # 3. Extract & Loop Audio sample-accurately in numpy
    temp_raw_audio = "scratch/raw_audio.f32le"
    sr = 48000
    subprocess.run([
        ffmpeg, "-y", "-i", input_file,
        "-f", "f32le", "-ac", "2", "-ar", str(sr), temp_raw_audio
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    audio_bytes = open(temp_raw_audio, "rb").read()
    audio_data = np.frombuffer(audio_bytes, dtype=np.float32).reshape(-1, 2)
    
    total_audio_samples = audio_data.shape[0]
    fade_samples = int(round(sr * 0.5))
    loop_audio_samples = int(round(sr * (loop_frames_count / fps)))

    if total_audio_samples >= loop_audio_samples + fade_samples:
        main_audio = audio_data[:loop_audio_samples].copy()
        tail_audio = audio_data[loop_audio_samples:loop_audio_samples + fade_samples]
        
        alpha_audio = np.linspace(0, 1, fade_samples)[:, None]
        main_audio[:fade_samples] = (main_audio[:fade_samples] * alpha_audio + 
                                     tail_audio * (1.0 - alpha_audio)).astype(np.float32)
    else:
        main_audio = audio_data[:loop_audio_samples].copy()

    temp_looped_audio = "scratch/looped_audio.wav"
    # Export to wav float32
    from pydub import AudioSegment
    # write f32le raw to temp and encode
    temp_looped_pcm = "scratch/looped_audio.f32le"
    main_audio.tofile(temp_looped_pcm)

    subprocess.run([
        ffmpeg, "-y", "-f", "f32le", "-ar", str(sr), "-ac", "2",
        "-i", temp_looped_pcm, temp_looped_audio
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # 4. Export hero.mp4 and hero.webm
    out_mp4 = "public/hero/hero.mp4"
    out_webm = "public/hero/hero.webm"

    print("Exporting public/hero/hero.mp4...")
    subprocess.run([
        ffmpeg, "-y",
        "-i", temp_raw_video,
        "-i", temp_looped_audio,
        "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        out_mp4
    ], check=True)

    print("Exporting public/hero/hero.webm...")
    subprocess.run([
        ffmpeg, "-y",
        "-i", temp_raw_video,
        "-i", temp_looped_audio,
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        out_webm
    ], check=True)

    # 5. Export portrait-bust.webp (480x600) and og.jpg (1200x630)
    best_frame = raw_frames[min(24, len(raw_frames)-1)]
    h, w, _ = best_frame.shape
    # Crop head to shirt for bust photo (e.g. upper 70% of person)
    # X centered around 640, width ~ 400. Y from 0 to ~ 500
    bust_crop = best_frame[0:500, 440:840]
    bust_resized = cv2.resize(bust_crop, (480, 600), interpolation=cv2.INTER_AREA)
    cv2.imwrite("public/portrait-bust.webp", bust_resized)
    print("Exported public/portrait-bust.webp")

    # OG Image 1200x630
    og_canvas = np.ones((630, 1200, 3), dtype=np.uint8) * 244 # warm off-white #f4f2ee
    # Place bust on left/center
    bust_og = cv2.resize(bust_resized, (424, 530))
    og_canvas[50:580, 80:504] = bust_og
    # Text placeholder / backdrop styling
    cv2.putText(og_canvas, "ABHAY CHAUDHARY", (540, 260), cv2.FONT_HERSHEY_SIMPLEX, 1.4, (13, 13, 13), 3, cv2.LINE_AA)
    cv2.putText(og_canvas, "Full Stack & Game Developer", (540, 320), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (119, 117, 111), 2, cv2.LINE_AA)
    cv2.putText(og_canvas, "Personal Portfolio", (540, 380), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (169, 166, 160), 2, cv2.LINE_AA)
    cv2.imwrite("public/og.jpg", og_canvas)
    print("Exported public/og.jpg")

    print("Hero asset pipeline finished successfully!")

if __name__ == "__main__":
    main()
