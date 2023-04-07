/**
 * @param {puppeteer.ElementHandle<Element>} divElement
 */
export async function corporateInformationParser(divElement) {

    const companyName = await divElement?.$eval('h1[itemprop="name"]', el => el.textContent.trim());
    const ddList = await divElement?.$$('#attributes > .attributes.dl-horizontal dd');
  
    const items = await Promise.all(ddList.map(async dd => {
      const key = await dd?.getProperty('className').then((prop) => prop.jsonValue());
      let value = await dd?.evaluate(a => a.textContent);
  
      if(key.includes('registered_address') || key.includes('officers')) {
  
        const ul = await dd.$('ul');
  
        const liList = await ul.$$('li');
  
        const liListItems = await Promise.all(liList.map(async li => await li.evaluate(a => a.textContent)));
  
        return [key, liListItems.join(' - ')]
      }
  
      return [key, value];
    }))
  
  
    return {
      companyName,
      dataset: items
    }
  }
  