import { Metadata } from "next";
import { MagazineReader } from "@/components/magazine/MagazineReader";

export const metadata: Metadata = {
  title: "THE CREATIVE EDITION — Digital Design Magazine | Abhay Chaudhary",
  description: "An immersive, realistic digital design magazine showcasing graphic design, advertising concepts, cinematic poster art, and streetwear apparel graphics by Abhay Chaudhary.",
};

export default function MagazinePage() {
  return <MagazineReader />;
}
