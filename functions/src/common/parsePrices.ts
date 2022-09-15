import { Page } from 'puppeteer';
import { xPathSelectors } from './constants';
import updateStoresCollection from './updateStoreCollection';

const parsePrices = async (page: Page) => {
  await page.waitForXPath(xPathSelectors.pricesButton);
  const pricePageAnchor = await page.$x(xPathSelectors.pricesButton);
  await Promise.all([
    await pricePageAnchor[0].click(),
    await page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  let loadMoreButton = await page.$x(xPathSelectors.loadMoreButton);

  while (loadMoreButton[0]) {
    await loadMoreButton[0].evaluate((b: any) => b.click());
    loadMoreButton = await page.$x(xPathSelectors.loadMoreButton);
  }

  const storePrices = await page.evaluate(async () => {
    const prices: number[] = [];
    const priceDivs = document.querySelectorAll('.where-buy-price');
    priceDivs.forEach((div) => {
      if (div.children[0].textContent)
        prices.push(+div.children[0].textContent.replace(/\D/g, ''));
    });
    return prices;
  });

  const storeNames = await page.evaluate(async () => {
    const stores: string[] = [];
    const storeDivs = document.querySelectorAll('.hide-blacked');
    storeDivs.forEach((div) => {
      Array.from(div.children).forEach((child) => {
        if (child.classList.contains('it-marketplace')) {
          const marketPlace = child.children[0].textContent;
          const vendorSpan = Array.from(child.children).find((element) =>
            element.classList.contains('seller'),
          );
          const vendor = vendorSpan?.textContent;
          stores.push(`(${marketPlace}) ${vendor}`);
        }
        if (child.className === 'it-shop') {
          child.textContent && stores.push(child.textContent);
        }
      });
    });
    return stores;
  });

  const storeImageUrls = await page.evaluate(async () => {
    const urls: string[] = [];
    const imageDivs = document.querySelectorAll('.where-buy-logo');
    imageDivs.forEach((div) =>
      urls.push(
        'https://ek.ua' + div.children[0].children[0].getAttribute('src'),
      ),
    );
    return urls;
  });

  const itemUrls = await page.evaluate(async () => {
    const urls: string[] = [];
    const itemDivs = document.querySelectorAll('.it-shop');
    itemDivs.forEach((div) => {
      const link = div.getAttribute('onmouseover');
      link && urls.push(link.split('"')[1]);
    });
    return urls;
  });

  const stores = storeNames.map((storeName, index) => ({
    name: storeName,
    imageUrl: storeImageUrls[index],
  }));

  const storeIds = await updateStoresCollection(stores);

  const offers = storeNames.map((_, index) => ({
    storeId: storeIds[index],
    price: storePrices[index],
    link: itemUrls[index],
  }));

  return {
    offers,
    range: {
      minPrice: Math.min(...storePrices),
      maxPrice: Math.max(...storePrices),
    },
  };
};

export default parsePrices;
