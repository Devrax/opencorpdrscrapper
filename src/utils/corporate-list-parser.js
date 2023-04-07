/**
 * Parses a corporate list from an HTML ul element.
 * @param {puppeteer.ElementHandle<Element>} ulElement - The ul element containing the list of companies.
 * @returns {Promise<Object[]>} - Returns a promise that resolves to an array of objects representing the companies in the list.
*/
export async function corporateListParser(ulElement) {
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