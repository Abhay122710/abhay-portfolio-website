import asyncio
from playwright.async_api import async_playwright

async def run_verification():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        # 1. Desktop 1440x900
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        print("Navigating to http://localhost:3000 (Desktop 1440x900)...")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        
        await page.wait_for_timeout(1000)
        
        # Check horizontal overflow
        scroll_width, inner_width = await page.evaluate(
            "() => [document.documentElement.scrollWidth, window.innerWidth]"
        )
        print(f"Desktop 1440x900 -> scrollWidth: {scroll_width}, innerWidth: {inner_width}")
        assert scroll_width == inner_width, f"Horizontal overflow detected! {scroll_width} != {inner_width}"
        
        await page.screenshot(path="scratch/desktop-1440.png", full_page=True)
        print("Saved desktop-1440.png")

        # 2. Mobile 390x844
        page_mobile = await browser.new_page(viewport={"width": 390, "height": 844})
        print("Navigating to http://localhost:3000 (Mobile 390x844)...")
        await page_mobile.goto("http://localhost:3000", wait_until="networkidle")
        await page_mobile.wait_for_timeout(1000)
        
        m_scroll_width, m_inner_width = await page_mobile.evaluate(
            "() => [document.documentElement.scrollWidth, window.innerWidth]"
        )
        print(f"Mobile 390x844 -> scrollWidth: {m_scroll_width}, innerWidth: {m_inner_width}")
        assert m_scroll_width == m_inner_width, f"Mobile horizontal overflow detected! {m_scroll_width} != {m_inner_width}"
        
        await page_mobile.screenshot(path="scratch/mobile-390.png", full_page=True)
        print("Saved mobile-390.png")

        await browser.close()
        print("Verification completed successfully with zero horizontal overflow!")

if __name__ == "__main__":
    asyncio.run(run_verification())
