const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

/**
 * @param {puppeteer.ElementHandle<Element>} ulElement
 */
async function parseList(ulElement) {
  const liElements = await ulElement.$$("li");

  const items = await Promise.all(
    liElements.map(async (liElement) => {
      const classNames = await liElement
        .getProperty("className")
        .then((prop) => prop.jsonValue());

      const companyName = await liElement.$eval(
        "a.company_search_result",
        (a) => a.innerText.trim()
      );
      const companyHref = await liElement.$eval(
        "a.company_search_result",
        (a) => a.href
      );
      const address = await liElement.$(".address");
      const googleLocation = await address?.$eval("a", (a) => a.href);
      const location = await address?.evaluate((a) => a.textContent);

      return {
        type: "company",
        status: classNames.replace("search-result company", "").trim(),
        location,
        googleLocation,
        companyName,
        companyHref,
      };
    })
  );

  return items;
}

app.get("/scrape", async (req, res) => {
  try {
    let result = null;
    const url = req.query.url;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForNavigation({ waitUntil: "networkidle0" });

    const data = await page.$("#companies");

    if (data != null) {
      result = await parseList(data);
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
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000/");
});
