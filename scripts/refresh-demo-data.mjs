import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";

const OUTPUT_PATH = new URL("../celina-demo-data.js", import.meta.url);

const PROPERTY_SOURCES = [
  {
    id: "p-16600-garden",
    url: "https://www.redfin.com/TX/Celina/16600-Garden-Dr-75009/home/176693080"
  },
  {
    id: "p-16913-clover",
    url: "https://www.redfin.com/TX/Celina/16913-Clover-Dr-75009/home/176691025"
  },
  {
    id: "p-2904-open-range",
    url: "https://www.redfin.com/TX/Celina/2904-Open-Range-Dr-75009/home/169614770"
  },
  {
    id: "p-3018-seattle-slew",
    url: "https://www.redfin.com/TX/Celina/3018-Seattle-Slew-Dr-75009/home/109065906"
  },
  {
    id: "p-704-corner-post",
    url: "https://www.redfin.com/TX/Celina/704-Corner-Post-Path-75009/home/144137895"
  },
  {
    id: "p-3308-zenyatta",
    url: "https://www.redfin.com/TX/Celina/3308-Zenyatta-Ct-75009/home/173553948"
  },
  {
    id: "p-516-alabama",
    url: "https://www.redfin.com/TX/Celina/516-S-Alabama-St-75009/home/31994290"
  }
];

const MARKET_SOURCES = {
  city: "https://www.celina-tx.gov/",
  census: "https://www.census.gov/quickfacts/fact/table/celinacitytexas/SEX255223",
  redfinMarket: "https://www.redfin.com/city/30799/TX/Celina/housing-market",
  realtorZip: "https://www.realtor.com/realestateandhomes-search/75009/overview"
};

async function loadCurrentData() {
  const source = await readFile(OUTPUT_PATH, "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  return sandbox.window.CELINA_DEMO_DATA;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{2,}/g, "\n");
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; CelinaDealScoutBot/1.0)"
    }
  });

  if (!response.ok) {
    throw new Error(`Fetch failed for ${url}: HTTP ${response.status}`);
  }

  return stripHtml(await response.text());
}

function parseCurrency(text) {
  return Number(text.replace(/[$,]/g, ""));
}

function matchNumber(content, pattern, fallback = null) {
  const match = content.match(pattern);
  if (!match) return fallback;
  return Number(match[1].replace(/,/g, ""));
}

function matchCurrency(content, pattern, fallback = null) {
  const match = content.match(pattern);
  if (!match) return fallback;
  return parseCurrency(match[1]);
}

async function parseProperty(source) {
  const content = await fetchText(source.url);

  return {
    id: source.id,
    listPrice: matchCurrency(content, /For sale\s*\$([0-9,]+)/i),
    pricePerSqft: matchCurrency(content, /\$([0-9,]+)\s*Price\/Sq\.Ft\./i),
    squareFeet: matchNumber(content, /([0-9,]+)\s*sq ft/i),
    daysOnMarket: matchNumber(content, /Days On Market:\s*([0-9,]+)/i),
    originalListPrice: matchNumber(content, /Original List Price:\s*([0-9.]+)/i),
    redfinEstimate: matchCurrency(content, /Redfin Estimate for[\s\S]*?\$([0-9,]+)/i),
    lat: matchNumber(content, /Latitude:\s*([0-9.\-]+)/i),
    lng: matchNumber(content, /Longitude:\s*([0-9.\-]+)/i)
  };
}

async function parseMarketContext() {
  const [cityText, censusText, redfinText, realtorText] = await Promise.all([
    fetchText(MARKET_SOURCES.city),
    fetchText(MARKET_SOURCES.census),
    fetchText(MARKET_SOURCES.redfinMarket),
    fetchText(MARKET_SOURCES.realtorZip)
  ]);

  return {
    city: {
      population2025: matchNumber(cityText, /Population\s*\(As of January 1, 2025\)\s*([0-9,]+)/i, 64726),
      population2024Census: matchNumber(censusText, /Population estimates, July 1, 2024.*?([0-9,]+)/i, 51661),
      growthSince2020Pct: matchNumber(censusText, /Population, percent change.*?([0-9.]+)/i, 206)
    },
    redfin: {
      medianSalePrice: matchCurrency(redfinText, /Median sale price.*?\$([0-9,]+)/i, 477500),
      medianSalePricePerSqft: matchCurrency(redfinText, /median sale price per square foot in Celina is \$([0-9,]+)/i, 172),
      medianDaysOnMarket: matchNumber(redfinText, /sell after ([0-9,]+) days on the market/i, 139),
      saleToListPct: matchNumber(redfinText, /Sale-to-List Price\s*([0-9.]+)/i, 96.3),
      priceDropsPct: matchNumber(redfinText, /Homes with Price Drops\s*([0-9.]+)/i, 45.6),
      migrationStayPct: matchNumber(redfinText, /([0-9]+)% of Celina homebuyers searched to stay within the metropolitan area/i, 69),
      inboundLeaders: [
        (redfinText.match(/1\s*\|\s*([A-Za-z ,.-]+)\s*\|/i)?.[1] || "Los Angeles").trim(),
        (redfinText.match(/2\s*\|\s*([A-Za-z ,.-]+)\s*\|/i)?.[1] || "Seattle").trim(),
        (redfinText.match(/3\s*\|\s*([A-Za-z ,.-]+)\s*\|/i)?.[1] || "Washington, DC").trim()
      ]
    },
    realtor: {
      medianListPrice: matchCurrency(realtorText, /Median home \$\s*([0-9,]+)/i, 569312),
      medianListPricePerSqft: matchCurrency(realtorText, /\$ per sq ft\s*\$([0-9,]+)/i, 218),
      activeListings: matchNumber(realtorText, /Active listings\s*([0-9,]+)/i, 1894),
      medianDaysOnMarket: matchNumber(realtorText, /Median days on market\s*([0-9,]+)/i, 88),
      medianRent: matchCurrency(realtorText, /Median rent\s*\$([0-9,]+)/i, 1997)
    }
  };
}

async function main() {
  const generatedAt = new Date();
  const currentData = await loadCurrentData();
  const [marketContext, propertySnapshots] = await Promise.all([
    parseMarketContext(),
    Promise.all(PROPERTY_SOURCES.map(parseProperty))
  ]);

  const snapshotMap = new Map(propertySnapshots.map((item) => [item.id, item]));
  const nextData = {
    ...currentData,
    meta: {
      ...currentData.meta,
      generatedAt: generatedAt.toISOString(),
      lastRefreshLabel: generatedAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    },
    marketContext,
    properties: currentData.properties.map((property) => {
      const snapshot = snapshotMap.get(property.id);
      if (!snapshot) return property;
      return {
        ...property,
        listPrice: snapshot.listPrice ?? property.listPrice,
        originalListPrice: snapshot.originalListPrice ?? property.originalListPrice,
        redfinEstimate: snapshot.redfinEstimate ?? property.redfinEstimate,
        pricePerSqft: snapshot.pricePerSqft ?? property.pricePerSqft,
        squareFeet: snapshot.squareFeet ?? property.squareFeet,
        daysOnMarket: snapshot.daysOnMarket ?? property.daysOnMarket,
        lat: snapshot.lat ?? property.lat,
        lng: snapshot.lng ?? property.lng
      };
    })
  };

  const contents = `window.CELINA_DEMO_DATA = ${JSON.stringify(nextData, null, 2)};\n`;
  await writeFile(OUTPUT_PATH, contents, "utf8");
  console.log(`Wrote refreshed snapshot to ${OUTPUT_PATH.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
