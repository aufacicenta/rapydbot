import puppeteer, { ElementHandle } from "puppeteer";

export class Controller {
  async getFullPageScreenshots(): Promise<void> {
    const browser = await puppeteer.launch();

    try {
      const page = await browser.newPage();

      const base = "https://www.antiguafinehomes.com";

      await page.goto(`${base}/es/casas-en-venta/antigua-area-en-venta/pagina-3`);

      await page.setViewport({ width: 1080, height: 1024 });

      const anchors = await page.$$("a[title='Detalles del Inmueble']");

      const capture = async (anchor: ElementHandle<Element>) => {
        const tab = await browser.newPage();

        const handle = await anchor.getProperty("href");
        const url = await handle.jsonValue();

        await tab.goto(url as string, { timeout: 60_000 });

        await tab.screenshot({
          path: `${__dirname}/screenshots/${tab.url().split("/").pop()}.png`,
          fullPage: true,
        });
      };

      const promises = anchors.map((anchor) => capture(anchor));

      await Promise.all(promises);

      console.log("Done");

      browser.close();
    } catch (error) {
      browser.close();

      throw error;
    }
  }
}
