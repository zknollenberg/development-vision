const DATA = window.CELINA_DEMO_DATA;

const PUBLIC_GIS_LAYERS = {
  futureLandUse: {
    label: "Future land use",
    description: "Official 2040 land-use framework",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/FutureLandusePlan2021/FeatureServer",
    layerId: 0,
    geometryType: "polygon",
    color: "#2f6fec",
    fillColor: "#2f6fec",
    fillOpacity: 0.08,
    sourceUrl: "https://www.celina-tx.gov/1292/Long-Range-Plans"
  },
  subdivisions: {
    label: "Master-planned communities",
    description: "Official development-agreement polygons",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/SubdivisionsbyDA/FeatureServer",
    layerId: 0,
    geometryType: "polygon",
    color: "#18794e",
    fillColor: "#18794e",
    fillOpacity: 0.07,
    sourceUrl: "https://www.celina-tx.gov/"
  },
  cip: {
    label: "Capital projects",
    description: "Official city infrastructure pipeline",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/Infrastructure_Projects/FeatureServer",
    layerId: 0,
    geometryType: "polygon",
    color: "#eb8b1f",
    fillColor: "#eb8b1f",
    fillOpacity: 0.08,
    sourceUrl: "https://www.celina-tx.gov/"
  }
};

const DEFAULT_STATE = {
  goal: DATA.investorGoals[0].id,
  budgetMax: 700000,
  minProfit: 10000,
  holdMonths: 9,
  rehabAppetite: "light",
  quickFilter: "all",
  search: "",
  selectedPropertyId: null,
  layerState: {
    catalysts: true,
    deals: true,
    futureLandUse: false,
    subdivisions: true,
    cip: false
  },
  panelState: {
    strategyOpen: false,
    resultsOpen: false
  }
};

let state = structuredClone(DEFAULT_STATE);
let map;
let dealLayerGroup;
let catalystLayerGroup;
let publicLayers = {};
let publicLayerLoadState = {};
let dealMarkers = {};
let catalystMarkers = {};

const streetTile = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19
  }
);

const satelliteTile = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri",
    maxZoom: 19
  }
);

const labelTile = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
  { maxZoom: 19 }
);

function initMap() {
  map = L.map("map", {
    center: [33.301, -96.791],
    zoom: 12,
    zoomControl: false,
    layers: [streetTile]
  });

  L.control.zoom({ position: "bottomright" }).addTo(map);

  const baseLayers = {
    Street: streetTile,
    Satellite: satelliteTile
  };

  L.control.layers(baseLayers, null, { position: "bottomright" }).addTo(map);

  map.on("baselayerchange", (event) => {
    if (event.name === "Satellite" && !map.hasLayer(labelTile)) {
      labelTile.addTo(map);
    }
    if (event.name !== "Satellite" && map.hasLayer(labelTile)) {
      map.removeLayer(labelTile);
    }
  });

  dealLayerGroup = L.layerGroup().addTo(map);
  catalystLayerGroup = L.layerGroup().addTo(map);
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function compactMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

function percent(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

function distanceMiles(lat1, lng1, lat2, lng2) {
  const toRad = (degrees) => (degrees * Math.PI) / 180;
  const earthRadiusMiles = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusMiles * c;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getGoalConfig() {
  return DATA.investorGoals.find((goal) => goal.id === state.goal) || DATA.investorGoals[0];
}

function matchesQuickFilter(filterId, property) {
  switch (filterId) {
    case "under-450":
      return property.listPrice <= 450000;
    case "deep-cuts":
      return property.listDiscountPct >= 7;
    case "near-dnt":
      return property.catalystStats.nearest.category === "medical"
        || property.catalystStats.distances.some((item) => item.id === "dnt-extension" && item.miles <= 3);
    case "green-meadows":
      return property.neighborhood.includes("Green Meadows");
    case "all":
    default:
      return true;
  }
}

function computeCatalystStats(property) {
  const distances = DATA.catalysts.map((catalyst) => ({
    ...catalyst,
    miles: distanceMiles(property.lat, property.lng, catalyst.lat, catalyst.lng)
  }));

  distances.sort((a, b) => a.miles - b.miles);

  const withinThree = distances.filter((item) => item.miles <= 3);
  const weightedPresence = distances.reduce((sum, item) => {
    const distanceWeight = clamp(4.5 - item.miles, 0, 4.5);
    return sum + (distanceWeight * item.impactWeight);
  }, 0);

  return {
    nearest: distances[0],
    withinThree,
    weightedPresence,
    distances
  };
}

function estimateScenario(property, scoreMeta) {
  const negotiationPct = clamp(
    (property.daysOnMarket / DATA.marketContext.redfin.medianDaysOnMarket * 0.02)
      + (property.listDiscountPct / 300),
    0.008,
    0.045
  );

  const offerPrice = property.listPrice * (1 - negotiationPct);
  const rehabPerSqft = {
    light: 4,
    medium: 8,
    heavy: 16
  };

  const rehabBudget = property.squareFeet * rehabPerSqft[property.rehabLevel];
  const holdCost = offerPrice * 0.045 * (state.holdMonths / 12);
  const catalystLift = clamp(scoreMeta.growthComponent / 1000, 0.005, 0.04);
  const rehabLift = {
    light: 0.045,
    medium: 0.075,
    heavy: 0.11
  }[property.rehabLevel];

  const baseExit = Math.max(property.redfinEstimate, property.listPrice);
  const conservativeExit = baseExit * (1 + rehabLift * 0.9 + catalystLift + 0.015);
  const stretchExit = baseExit * (1 + rehabLift * 1.3 + catalystLift * 1.5 + 0.035);
  const saleCostsConservative = conservativeExit * 0.06;
  const saleCostsStretch = stretchExit * 0.065;
  const totalBasis = offerPrice + rehabBudget + holdCost;
  const lowProfit = Math.round(conservativeExit - saleCostsConservative - totalBasis);
  const highProfit = Math.round(stretchExit - saleCostsStretch - totalBasis);

  return {
    offerPrice: Math.round(offerPrice),
    rehabBudget: Math.round(rehabBudget),
    holdCost: Math.round(holdCost),
    lowProfit,
    highProfit
  };
}

function scoreProperty(rawProperty) {
  const property = {
    ...rawProperty,
    listDiscountPct: rawProperty.originalListPrice > 0
      ? ((rawProperty.originalListPrice - rawProperty.listPrice) / rawProperty.originalListPrice) * 100
      : 0,
    estimateGapPct: rawProperty.listPrice > 0
      ? ((rawProperty.redfinEstimate - rawProperty.listPrice) / rawProperty.listPrice) * 100
      : 0
  };

  const goal = getGoalConfig();
  const catalystStats = computeCatalystStats(property);
  const pricePerSqftComponent = clamp(
    ((DATA.marketContext.realtor.medianListPricePerSqft - property.pricePerSqft) / DATA.marketContext.realtor.medianListPricePerSqft) * 42,
    -10,
    16
  );
  const priceCutComponent = clamp(property.listDiscountPct * 1.2, 0, 18);
  const estimateGapComponent = clamp(property.estimateGapPct * 2.2, -14, 12);
  const domComponent = clamp(
    ((property.daysOnMarket / DATA.marketContext.redfin.medianDaysOnMarket) - 1) * 11,
    -6,
    10
  );
  const growthComponent = clamp(catalystStats.weightedPresence, 0, 22);

  let strategyComponent = 0;
  if (goal.id === "fast-flip") {
    strategyComponent += property.rehabLevel === "light" ? 7 : property.rehabLevel === "medium" ? 2 : -5;
    strategyComponent += property.listPrice <= state.budgetMax ? 4 : -10;
    strategyComponent += property.noMudPid ? 5 : 0;
    strategyComponent += property.listPrice >= 900000 ? -8 : 0;
  }

  if (goal.id === "entry-equity") {
    strategyComponent += property.listPrice <= 500000 ? 9 : property.listPrice <= 650000 ? 4 : -6;
    strategyComponent += property.pricePerSqft <= 205 ? 5 : 0;
    strategyComponent += property.redfinEstimate >= property.listPrice ? 3 : -2;
  }

  if (goal.id === "growth-corridor") {
    strategyComponent += catalystStats.nearest.miles <= 2.2 ? 9 : catalystStats.nearest.miles <= 3.4 ? 5 : 0;
    strategyComponent += catalystStats.withinThree.length >= 3 ? 6 : 2;
    strategyComponent += property.listPrice >= 900000 ? 3 : 0;
  }

  strategyComponent += goal.weighting.fastExecution * (property.rehabLevel === "light" ? 2 : 0);
  strategyComponent += goal.weighting.negotiability * clamp(property.daysOnMarket / 45, 0, 6);
  strategyComponent += goal.weighting.growthProximity * clamp(catalystStats.withinThree.length, 0, 6);
  strategyComponent += goal.weighting.discountToMarket * clamp(property.listDiscountPct / 2.5, 0, 6);

  const scoreMeta = {
    pricePerSqftComponent,
    priceCutComponent,
    estimateGapComponent,
    domComponent,
    growthComponent,
    strategyComponent
  };

  const scenario = estimateScenario(property, scoreMeta);
  const profitMidpoint = (scenario.lowProfit + scenario.highProfit) / 2;
  const profitComponent = clamp(profitMidpoint / 7000, -12, 18);

  let score = 48
    + pricePerSqftComponent
    + priceCutComponent
    + estimateGapComponent
    + domComponent
    + growthComponent
    + strategyComponent
    + profitComponent;

  if (property.listPrice > state.budgetMax) {
    score -= 18;
  }

  if (profitMidpoint < state.minProfit) {
    score -= 12;
  }

  if (state.rehabAppetite === "light" && property.rehabLevel !== "light") {
    score -= property.rehabLevel === "medium" ? 10 : 18;
  }

  if (state.rehabAppetite === "medium" && property.rehabLevel === "heavy") {
    score -= 8;
  }

  score = Math.round(clamp(score, 12, 96));

  const drivers = buildDrivers(property, catalystStats, scenario);
  return {
    ...property,
    catalystStats,
    scenario,
    score,
    drivers,
    scoreMeta
  };
}

function buildDrivers(property, catalystStats, scenario) {
  const listCut = property.listDiscountPct;
  const drivers = [];

  if (property.pricePerSqft <= DATA.marketContext.realtor.medianListPricePerSqft - 15) {
    drivers.push({
      label: `${money(property.pricePerSqft)}/sf vs ${money(DATA.marketContext.realtor.medianListPricePerSqft)}/sf zip median`,
      tone: "positive"
    });
  }

  if (listCut >= 6) {
    drivers.push({
      label: `${percent(listCut)} off original list`,
      tone: "positive"
    });
  }

  if (property.estimateGapPct > 0) {
    drivers.push({
      label: `Redfin model sits ${percent(property.estimateGapPct)} above ask`,
      tone: "positive"
    });
  } else if (property.estimateGapPct < -2) {
    drivers.push({
      label: `Model value sits below ask`,
      tone: "negative"
    });
  }

  if (property.daysOnMarket >= DATA.marketContext.redfin.medianDaysOnMarket) {
    drivers.push({
      label: `${property.daysOnMarket} DOM vs ${DATA.marketContext.redfin.medianDaysOnMarket}-day city median`,
      tone: "warning"
    });
  }

  if (catalystStats.nearest.miles <= 2.2) {
    drivers.push({
      label: `${catalystStats.nearest.name} is ${catalystStats.nearest.miles.toFixed(1)} mi away`,
      tone: "positive"
    });
  }

  if (scenario.highProfit < 0) {
    drivers.push({
      label: `Modeled flip stays negative after carrying costs`,
      tone: "negative"
    });
  } else if (scenario.lowProfit >= state.minProfit) {
    drivers.push({
      label: `Modeled profit clears your floor`,
      tone: "positive"
    });
  }

  if (drivers.length < 3) {
    drivers.push({
      label: property.noMudPid ? "No MUD/PID helps short-hold carrying" : `${property.neighborhood} benefits from buyer traffic`,
      tone: property.noMudPid ? "positive" : "warning"
    });
  }

  return drivers.slice(0, 4);
}

function filterProperty(property) {
  if (property.listPrice > state.budgetMax) {
    return false;
  }

  const profitMidpoint = (property.scenario.lowProfit + property.scenario.highProfit) / 2;
  if (profitMidpoint < state.minProfit) {
    return false;
  }

  if (state.rehabAppetite === "light" && property.rehabLevel !== "light") {
    return false;
  }

  if (state.rehabAppetite === "medium" && property.rehabLevel === "heavy") {
    return false;
  }

  const searchTerm = state.search.trim().toLowerCase();
  if (searchTerm) {
    const haystack = [
      property.address,
      property.neighborhood,
      property.summary,
      property.tags.join(" "),
      ...property.catalystStats.distances.map((item) => item.name)
    ].join(" ").toLowerCase();

    if (!haystack.includes(searchTerm)) {
      return false;
    }
  }

  return matchesQuickFilter(state.quickFilter, property);
}

function getRankedProperties() {
  return DATA.properties
    .map(scoreProperty)
    .filter(filterProperty)
    .sort((a, b) => b.score - a.score || a.listPrice - b.listPrice);
}

function getScoreClass(score) {
  if (score >= 76) return "score-high";
  if (score >= 60) return "score-mid";
  return "score-low";
}

function renderTopbar() {
  const stats = [
    {
      value: DATA.marketContext.city.population2025.toLocaleString(),
      label: "City pop, Jan 1 2025"
    },
    {
      value: compactMoney(DATA.marketContext.redfin.medianSalePrice),
      label: "Redfin median sale, Feb 2026"
    },
    {
      value: `${DATA.marketContext.redfin.priceDropsPct.toFixed(1)}%`,
      label: "Listings with price drops"
    },
    {
      value: `${DATA.marketContext.redfin.migrationStayPct}%`,
      label: "Searchers staying in-metro"
    }
  ];

  document.getElementById("topbar-stats").innerHTML = stats.map((item) => `
    <div class="stat-pill">
      <strong>${item.value}</strong>
      <span>${item.label}</span>
    </div>
  `).join("");

  document.getElementById("snapshot-label").textContent = `Nightly snapshot: ${DATA.meta.lastRefreshLabel}`;
}

function renderControls() {
  const goalSelect = document.getElementById("goal-select");
  goalSelect.innerHTML = DATA.investorGoals.map((goal) => `
    <option value="${goal.id}" ${goal.id === state.goal ? "selected" : ""}>${goal.label}</option>
  `).join("");

  document.getElementById("budget-range").value = state.budgetMax;
  document.getElementById("budget-value").textContent = money(state.budgetMax);

  document.getElementById("margin-range").value = state.minProfit;
  document.getElementById("margin-value").textContent = money(state.minProfit);

  document.getElementById("hold-range").value = state.holdMonths;
  document.getElementById("hold-value").textContent = `${state.holdMonths} months`;

  document.getElementById("rehab-segment").innerHTML = DATA.rehabModes.map((mode) => `
    <button type="button" class="${mode.id === state.rehabAppetite ? "active" : ""}" data-rehab="${mode.id}">
      ${mode.label}
    </button>
  `).join("");

  document.getElementById("quick-filters").innerHTML = DATA.quickFilters.map((filter) => `
    <button type="button" class="quick-filter ${filter.id === state.quickFilter ? "active" : ""}" data-filter="${filter.id}">
      ${filter.label}
    </button>
  `).join("");

  const layerControls = [
    {
      id: "deals",
      label: "Deal markers",
      description: "Curated shortlist of public-web listings"
    },
    {
      id: "catalysts",
      label: "Growth catalysts",
      description: "Hospital, tollway, parks, civic and retail anchors"
    },
    ...Object.entries(PUBLIC_GIS_LAYERS).map(([id, config]) => ({
      id,
      label: config.label,
      description: config.description
    }))
  ];

  document.getElementById("layer-controls").innerHTML = layerControls.map((control) => {
    const loading = publicLayerLoadState[control.id];
    return `
      <button type="button" class="layer-toggle ${state.layerState[control.id] ? "active" : ""}" data-layer="${control.id}">
        <strong>${control.label}</strong>
        ${loading ? "Loading official layer..." : control.description}
      </button>
    `;
  }).join("");

  document.getElementById("macro-sources").innerHTML = DATA.sources.map((source) => `
    <a class="source-link" href="${source.url}" target="_blank" rel="noopener">
      <strong>${source.label}</strong>
      ${source.note}
    </a>
  `).join("");
}

function renderMarketCards(rankedProperties) {
  const best = rankedProperties[0];
  const avgScore = rankedProperties.length
    ? Math.round(rankedProperties.reduce((sum, property) => sum + property.score, 0) / rankedProperties.length)
    : 0;
  const topProfit = rankedProperties.length
    ? Math.max(...rankedProperties.map((property) => property.scenario.highProfit))
    : 0;

  const cards = [
    {
      value: compactMoney(DATA.marketContext.redfin.medianSalePrice),
      label: "City median sale"
    },
    {
      value: `${DATA.marketContext.redfin.medianDaysOnMarket} days`,
      label: "Median time on market"
    },
    {
      value: best ? best.score : "--",
      label: "Top current scout score"
    },
    {
      value: rankedProperties.length ? compactMoney(topProfit) : "--",
      label: "Best modeled upside"
    }
  ];

  document.getElementById("market-grid").innerHTML = cards.map((card) => `
    <div class="market-card">
      <strong>${card.value}</strong>
      <span>${card.label}</span>
    </div>
  `).join("");

  document.getElementById("results-count").textContent = `${rankedProperties.length} matches`;
  document.getElementById("results-subtitle").textContent = rankedProperties.length
    ? `Average scout score ${avgScore}`
    : "Widen the budget or reduce the profit floor";
}

function renderResults(rankedProperties) {
  renderMarketCards(rankedProperties);

  const list = document.getElementById("results-list");
  if (!rankedProperties.length) {
    list.innerHTML = `<p class="empty-state">No listings clear the current filters. Try a wider budget, lower profit floor, or a more flexible rehab appetite.</p>`;
    return;
  }

  list.innerHTML = rankedProperties.map((property, index) => `
    <button type="button" class="property-card ${property.id === state.selectedPropertyId ? "active" : ""}" data-property="${property.id}">
      <div class="property-topline">
        <div>
          <div class="eyebrow">Rank #${index + 1} • ${property.neighborhood}</div>
          <div class="property-price">${money(property.listPrice)}</div>
        </div>
        <div class="score-badge ${getScoreClass(property.score)}">
          <strong>${property.score}</strong>
        </div>
      </div>
      <div class="property-address">${property.address}</div>
      <div class="property-subtitle">${property.summary}</div>
      <div class="property-meta">
        <span>${property.beds} bd • ${property.baths} ba • ${property.squareFeet.toLocaleString()} sf</span>
        <span>${money(property.pricePerSqft)}/sf</span>
        <span>${property.daysOnMarket} DOM</span>
      </div>
      <div class="property-tags">
        <span class="tag-pill">${property.rehabLevel} rehab</span>
        <span class="tag-pill">${property.catalystStats.nearest.name}</span>
        <span class="tag-pill">${property.catalystStats.nearest.miles.toFixed(1)} mi</span>
      </div>
      <div class="driver-row">
        ${property.drivers.slice(0, 3).map((driver) => `<span class="driver-pill ${driver.tone}">${driver.label}</span>`).join("")}
      </div>
    </button>
  `).join("");
}

function renderDetail(property) {
  const body = document.getElementById("detail-body");
  const kicker = document.getElementById("detail-kicker");
  const title = document.getElementById("detail-title");
  const drawer = document.getElementById("detail-drawer");

  if (!property) {
    kicker.textContent = "Selected property";
    title.textContent = "Choose a listing";
    body.innerHTML = `<p class="empty-state">Pick a property from the shortlist to inspect the score drivers, catalyst proximity, and modeled flip scenario.</p>`;
    drawer.classList.remove("open");
    return;
  }

  kicker.textContent = `${property.neighborhood} • ${property.tags[0]}`;
  title.textContent = property.address;

  const sources = [
    {
      label: "Listing",
      url: property.sourceUrl
    },
    ...property.supportingSourceUrls.map((source) => ({
      label: source.label,
      url: source.url
    }))
  ];

  body.innerHTML = `
    <div class="detail-price">${money(property.listPrice)}</div>
    <div class="detail-copy">${property.summary}</div>

    <div class="detail-section">
      <div class="detail-metrics">
        <div class="metric-block">
          <strong>${property.score}</strong>
          <span>Scout score</span>
        </div>
        <div class="metric-block">
          <strong>${money(property.pricePerSqft)}/sf</strong>
          <span>List price per square foot</span>
        </div>
        <div class="metric-block">
          <strong>${property.daysOnMarket}</strong>
          <span>Days on market</span>
        </div>
        <div class="metric-block">
          <strong>${property.catalystStats.nearest.miles.toFixed(1)} mi</strong>
          <span>Nearest catalyst: ${property.catalystStats.nearest.name}</span>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <h3>Modeled flip scenario</h3>
      <div class="scenario-grid">
        <div class="scenario-card">
          <strong>${money(property.scenario.offerPrice)}</strong>
          <span>Likely negotiated buy price</span>
        </div>
        <div class="scenario-card">
          <strong>${money(property.scenario.rehabBudget)}</strong>
          <span>Estimated rehab budget</span>
        </div>
        <div class="scenario-card">
          <strong>${money(property.scenario.lowProfit)}</strong>
          <span>Conservative net profit</span>
        </div>
        <div class="scenario-card">
          <strong>${money(property.scenario.highProfit)}</strong>
          <span>Stretch net profit</span>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <h3>Why it ranks here</h3>
      <div class="detail-drivers">
        ${property.drivers.map((driver) => `<span class="driver-pill ${driver.tone}">${driver.label}</span>`).join("")}
      </div>
    </div>

    <div class="detail-section">
      <h3>Key risks</h3>
      <div class="detail-risks">
        ${property.risks.map((risk) => `<div class="risk-item">${risk}</div>`).join("")}
      </div>
    </div>

    <div class="detail-section">
      <h3>Nearby catalysts</h3>
      <div class="nearby-catalysts">
        ${property.catalystStats.distances.slice(0, 4).map((item) => `
          <div class="catalyst-item">
            <strong>${item.name}</strong>
            <span>${item.miles.toFixed(1)} mi • ${item.targetDateLabel}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="detail-section">
      <h3>Sources</h3>
      <div class="detail-sources">
        ${sources.map((source) => `
          <a class="source-link-inline" href="${source.url}" target="_blank" rel="noopener">${source.label}</a>
        `).join("")}
      </div>
    </div>
  `;

  drawer.classList.add("open");
}

function createDealMarker(property) {
  const icon = L.divIcon({
    className: "",
    html: `<div class="deal-marker ${property.score >= 76 ? "high" : property.score >= 60 ? "mid" : "low"}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const marker = L.marker([property.lat, property.lng], { icon });
  marker.bindPopup(`
    <div class="map-popup">
      <strong>${property.address}</strong>
      ${money(property.listPrice)} • ${property.daysOnMarket} DOM<br>
      Scout score ${property.score} • ${property.neighborhood}
    </div>
  `);
  marker.on("click", () => {
    state.selectedPropertyId = property.id;
    rerender();
  });
  return marker;
}

function createCatalystMarker(catalyst) {
  const icon = L.divIcon({
    className: "",
    html: `<div class="catalyst-marker ${catalyst.category}"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  const marker = L.marker([catalyst.lat, catalyst.lng], { icon });
  marker.bindPopup(`
    <div class="map-popup">
      <strong>${catalyst.name}</strong>
      ${catalyst.summary}<br>
      ${catalyst.targetDateLabel}
    </div>
  `);
  return marker;
}

function syncMapLayers(rankedProperties) {
  dealLayerGroup.clearLayers();
  catalystLayerGroup.clearLayers();

  if (state.layerState.deals) {
    rankedProperties.forEach((property) => {
      const marker = createDealMarker(property);
      dealMarkers[property.id] = marker;
      marker.addTo(dealLayerGroup);
    });
  }

  if (state.layerState.catalysts) {
    DATA.catalysts.forEach((catalyst) => {
      const marker = createCatalystMarker(catalyst);
      catalystMarkers[catalyst.id] = marker;
      marker.addTo(catalystLayerGroup);
      L.circle([catalyst.lat, catalyst.lng], {
        radius: catalyst.influenceMiles * 1609.34,
        color: catalyst.color,
        weight: 1,
        fillColor: catalyst.color,
        fillOpacity: 0.05
      }).addTo(catalystLayerGroup);
    });
  }

  Object.entries(PUBLIC_GIS_LAYERS).forEach(([id]) => {
    if (state.layerState[id]) {
      ensurePublicLayerVisible(id);
    } else {
      hidePublicLayer(id);
    }
  });
}

function getPublicLayerQueryUrl(config) {
  return `${config.serviceUrl}/${config.layerId}/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&f=geojson`;
}

function getPublicLayerStyle(config, feature) {
  const style = {
    color: config.color,
    fillColor: config.fillColor || config.color,
    fillOpacity: config.fillOpacity,
    weight: 1.4,
    opacity: 0.8
  };

  if (config === PUBLIC_GIS_LAYERS.futureLandUse) {
    const text = String(feature?.properties?.Character || feature?.properties?.Characte_1 || "").toLowerCase();
    if (text.includes("regional") || text.includes("employment")) {
      style.color = "#eb8b1f";
      style.fillColor = "#eb8b1f";
    } else if (text.includes("mixed")) {
      style.color = "#6b46c1";
      style.fillColor = "#6b46c1";
    } else if (text.includes("commercial")) {
      style.color = "#d97706";
      style.fillColor = "#d97706";
    } else if (text.includes("residential") || text.includes("neighborhood")) {
      style.color = "#18794e";
      style.fillColor = "#18794e";
    }
  }

  return style;
}

function createPublicMapLayer(config, geojson) {
  return L.geoJSON(geojson, {
    style: (feature) => getPublicLayerStyle(config, feature),
    onEachFeature: (feature, layer) => {
      const name = feature?.properties?.Name
        || feature?.properties?.Character
        || feature?.properties?.projName
        || config.label;

      layer.bindPopup(`
        <div class="map-popup">
          <strong>${name}</strong>
          Official Celina GIS layer<br>
          <a href="${config.sourceUrl}" target="_blank" rel="noopener">Source</a>
        </div>
      `);
    }
  });
}

async function ensurePublicLayerVisible(layerId) {
  const config = PUBLIC_GIS_LAYERS[layerId];
  if (!config) return;

  if (publicLayers[layerId]) {
    if (!map.hasLayer(publicLayers[layerId])) {
      publicLayers[layerId].addTo(map);
    }
    return;
  }

  publicLayerLoadState[layerId] = true;
  renderControls();

  try {
    const response = await fetch(getPublicLayerQueryUrl(config));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const geojson = await response.json();
    const layer = createPublicMapLayer(config, geojson);
    publicLayers[layerId] = layer;
    layer.addTo(map);
  } catch (error) {
    console.error(`Could not load ${layerId}`, error);
    state.layerState[layerId] = false;
  } finally {
    publicLayerLoadState[layerId] = false;
    renderControls();
  }
}

function hidePublicLayer(layerId) {
  if (publicLayers[layerId] && map.hasLayer(publicLayers[layerId])) {
    map.removeLayer(publicLayers[layerId]);
  }
}

function selectFirstPropertyIfNeeded(rankedProperties) {
  if (!rankedProperties.length) {
    state.selectedPropertyId = null;
    return;
  }

  const selectedStillVisible = rankedProperties.some((property) => property.id === state.selectedPropertyId);
  if (!selectedStillVisible) {
    state.selectedPropertyId = rankedProperties[0].id;
  }
}

function rerender() {
  renderTopbar();
  renderControls();

  const rankedProperties = getRankedProperties();
  selectFirstPropertyIfNeeded(rankedProperties);

  renderResults(rankedProperties);
  syncMapLayers(rankedProperties);

  const selectedProperty = rankedProperties.find((property) => property.id === state.selectedPropertyId) || null;
  renderDetail(selectedProperty);
  syncPanelsForViewport();
}

function syncPanelsForViewport() {
  const mobile = window.innerWidth <= 980;
  const strategyPanel = document.getElementById("strategy-panel");
  const resultsPanel = document.getElementById("results-panel");

  strategyPanel.classList.toggle("open", !mobile || state.panelState.strategyOpen);
  resultsPanel.classList.toggle("open", !mobile || state.panelState.resultsOpen);

  if (!mobile) {
    state.panelState.strategyOpen = false;
    state.panelState.resultsOpen = false;
  }
}

function focusOnSelectedProperty() {
  const rankedProperties = getRankedProperties();
  const selectedProperty = rankedProperties.find((property) => property.id === state.selectedPropertyId);
  if (!selectedProperty) return;
  map.setView([selectedProperty.lat, selectedProperty.lng], 13, { animate: true });
  if (dealMarkers[selectedProperty.id]) {
    dealMarkers[selectedProperty.id].openPopup();
  }
}

function attachEvents() {
  document.getElementById("goal-select").addEventListener("change", (event) => {
    state.goal = event.target.value;
    rerender();
  });

  document.getElementById("budget-range").addEventListener("input", (event) => {
    state.budgetMax = Number(event.target.value);
    document.getElementById("budget-value").textContent = money(state.budgetMax);
    rerender();
  });

  document.getElementById("margin-range").addEventListener("input", (event) => {
    state.minProfit = Number(event.target.value);
    document.getElementById("margin-value").textContent = money(state.minProfit);
    rerender();
  });

  document.getElementById("hold-range").addEventListener("input", (event) => {
    state.holdMonths = Number(event.target.value);
    document.getElementById("hold-value").textContent = `${state.holdMonths} months`;
    rerender();
  });

  document.getElementById("rehab-segment").addEventListener("click", (event) => {
    const button = event.target.closest("[data-rehab]");
    if (!button) return;
    state.rehabAppetite = button.dataset.rehab;
    rerender();
  });

  document.getElementById("quick-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    state.quickFilter = button.dataset.filter;
    rerender();
  });

  document.getElementById("layer-controls").addEventListener("click", (event) => {
    const button = event.target.closest("[data-layer]");
    if (!button) return;
    const layerId = button.dataset.layer;
    state.layerState[layerId] = !state.layerState[layerId];
    rerender();
  });

  document.getElementById("results-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-property]");
    if (!button) return;
    state.selectedPropertyId = button.dataset.property;
    rerender();
    focusOnSelectedProperty();
  });

  document.getElementById("detail-close").addEventListener("click", () => {
    state.selectedPropertyId = null;
    renderDetail(null);
  });

  document.getElementById("search-input").addEventListener("input", (event) => {
    state.search = event.target.value;
    rerender();
  });

  document.getElementById("search-clear").addEventListener("click", () => {
    state.search = "";
    document.getElementById("search-input").value = "";
    rerender();
  });

  document.getElementById("mobile-strategy-toggle").addEventListener("click", () => {
    state.panelState.strategyOpen = !state.panelState.strategyOpen;
    state.panelState.resultsOpen = false;
    syncPanelsForViewport();
  });

  document.getElementById("mobile-results-toggle").addEventListener("click", () => {
    state.panelState.resultsOpen = !state.panelState.resultsOpen;
    state.panelState.strategyOpen = false;
    syncPanelsForViewport();
  });

  document.getElementById("strategy-close").addEventListener("click", () => {
    state.panelState.strategyOpen = false;
    syncPanelsForViewport();
  });

  document.getElementById("results-close").addEventListener("click", () => {
    state.panelState.resultsOpen = false;
    syncPanelsForViewport();
  });

  window.addEventListener("resize", syncPanelsForViewport);
}

function init() {
  initMap();
  attachEvents();
  rerender();
  focusOnSelectedProperty();
}

init();
