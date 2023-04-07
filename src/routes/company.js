import puppeteer from "puppeteer";
import { corporateInformationParser } from '../utils/corporate-information-parser.js';

export async function company(req, res) {
    try {
      let result = null;
      const url = req.query.url;
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded" });
  
      await page.waitForNavigation({ waitUntil: "networkidle0" });
  
      const data = await page.$("div.vcard[itemscope]");
  
      if (data != null) {
        result = await corporateInformationParser(data);
      } else {
        await browser.close();
        res.status(404).json({ message: "Not matches found", code: "001" });
      }
      await browser.close();
      res.json({ result });
    } catch (err) {
      console.error(err);
  
      if (err instanceof puppeteer.TimeoutError) {
        res.status(503).json({
          message: "Try within 30 minutes, this is due to high demand :)",
          code: "002",
        });
      }
  
      res.status(500).json({ message: "Internal server error", code: "000" });
    }
  }