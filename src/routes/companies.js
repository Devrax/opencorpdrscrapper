import puppeteer from "puppeteer";
import { corporateListParser } from "../utils/corporate-list-parser.js";

export async function companies(req, res) {
    try {
      let result = null;
      const url = req.query.url;
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded" });
  
      await page.waitForNavigation({ waitUntil: "networkidle0" });
  
      const data = await page.$("#companies");
  
      if (data != null) {
        result = await corporateListParser(data);
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