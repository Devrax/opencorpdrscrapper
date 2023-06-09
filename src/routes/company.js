import puppeteer, { TimeoutError } from "puppeteer";
import { corporateInformationParser } from '../utils/corporate-information-parser.js';
import { consultRNC } from "../DB/supabase.js";

/**
 * Retrieves information about a company from a given URL using Puppeteer and a corporate information parser.
 * @async
 * @function company
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON object with the result of the company information parser.
 * @throws {Error} - If there is an internal server error or a timeout due to high demand.
 * @example
 * const url = encodedURIComponent("https://opencorporates.com/companies/do/455268");
 * company({ query: { url } }, res);
*/
export async function company(req, res) {
    try {
      let result = null;
      const url = req.query.url;
      const browser = await puppeteer.launch({
        args: ['--no-sandbox']
      });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded" });
  
      await page.waitForNavigation({ waitUntil: "networkidle0" });
  
      const data = await page.$("div.vcard[itemscope]");
  
      if (data != null) {
        const company = await corporateInformationParser(data);
        const DGIIDatabase = await consultRNC(company.companyName) ?? {};

        result = {...DGIIDatabase, ...company};
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