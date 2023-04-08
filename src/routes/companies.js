import puppeteer, {TimeoutError} from "puppeteer";
import { corporateListParser } from "../utils/corporate-list-parser.js";

/**
 * 
 * Async function that handles HTTP GET request to scrape a corporate list from a given URL.
 * @function companies
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @throws {Error} Will throw an error if any error occurs while scraping the data.
 * @returns {Promise<void>} - A Promise that resolves when the data is successfully scraped and sent as a JSON response.
*/
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
        return res.status(404).json({ message: "Not matches found", code: "001" });
      }
      await browser.close();
      return res.json({ result });
    } catch (err) {
      console.error(err);
  
      if (err instanceof TimeoutError) {
        return res.status(503).json({
          message: "Try within 30 minutes, this is due to high demand :)",
          code: "002",
        });
      }
  
      return res.status(500).json({ message: "Internal server error", code: "000" });
    }
  }