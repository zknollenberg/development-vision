const YEAR_META = {
  2026: { phase: "Foundation Year", pop: "~54,000", schools: 7, desc: "Walmart, Home Depot, and key civic anchors open. Celina's buildout begins in earnest." },
  2027: { phase: "Connectivity Unlocked", pop: "~68,000", schools: 7, desc: "Dallas North Tollway Phase 4A opens. H-E-B arrives. Shawnee Trail residential launches." },
  2028: { phase: "Education Expansion", pop: "~85,000", schools: 10, desc: "Three new elementary schools open, supporting major residential growth nodes." },
  2029: { phase: "Full Stride", pop: "~102,000", schools: 10, desc: "Celina crosses six figures in population. Outer Loop segments complete." },
  2030: { phase: "Critical Mass", pop: "~125,000", schools: 11, desc: "Second high school opens. Shawnee Trail reaches full buildout. Celina reaches city scale." },
  2031: { phase: "Regional Anchor", pop: "~145,000", schools: 12, desc: "Celina becomes a regional economic hub. National retailers and employers expand." },
  2032: { phase: "Urban Maturation", pop: "~165,000", schools: 13, desc: "SH 289 reconstruction is complete. DNT extends further north. More school capacity comes online." },
  2033: { phase: "Third HS Era", pop: "~185,000", schools: 14, desc: "A third high school enters planning and district scale grows significantly." },
  2034: { phase: "Metropolitan Edge", pop: "~210,000", schools: 15, desc: "Population crosses 200,000 and healthcare, retail, and civic districts deepen." },
  2035: { phase: "Vision 2035", pop: "~240,000", schools: 17, desc: "Mid-plan milestone. Major infrastructure and civic amenities are in place." },
  2036: { phase: "Near Buildout", pop: "~265,000", schools: 18, desc: "Residential communities approach planned capacity while commerce corridors mature." },
  2037: { phase: "City Realized", pop: "~290,000", schools: 19, desc: "Planned communities near full occupancy. Celina operates as a full North Texas city." },
  2038: { phase: "Legacy Phase", pop: "~315,000", schools: 20, desc: "The 2020s infrastructure wave pays off in quality of life and access." },
  2039: { phase: "Approaching Vision", pop: "~345,000", schools: 21, desc: "Most Celina 2040 plan pillars are in place or complete." },
  2040: { phase: "Celina 2040 Realized", pop: "~378,000", schools: 22, desc: "The long-range vision is largely realized, with Celina functioning as a major regional city." }
};

const CATS = {
  retail: { label: "Retail & Commercial", color: "#D97706", icon: "storefront" },
  healthcare: { label: "Healthcare", color: "#DC2626", icon: "local_hospital" },
  education: { label: "Education", color: "#2563EB", icon: "school" },
  parks: { label: "Parks & Recreation", color: "#16A34A", icon: "park" },
  residential: { label: "Residential", color: "#DB2777", icon: "home" },
  transportation: { label: "Transportation", color: "#6B7280", icon: "directions_car" },
  government: { label: "Government & Civic", color: "#0F766E", icon: "account_balance" },
  entertainment: { label: "Entertainment", color: "#7C3AED", icon: "celebration" },
  mixed: { label: "Mixed-Use", color: "#B45309", icon: "location_city" }
};

const AUDIENCES = {
  buyers: {
    description: "Help a buyer understand what will exist around a home by move-in, not just what exists today.",
    headline: "Buy with a clearer picture of the next 3-5 years.",
    subcopy: "Instead of guessing whether a corridor will stay rural or turn into a major node, buyers can scrub the timeline and see projected schools, retail, healthcare, and roads."
  },
  realtors: {
    description: "Turn scattered public development data into a polished story you can show during listing presentations and buyer tours.",
    headline: "Give clients a neighborhood growth narrative, not just comps.",
    subcopy: "A realtor-facing version can explain future convenience, school access, and corridor momentum in a way that builds confidence and differentiates your service."
  },
  cities: {
    description: "Show residents, investors, and small businesses how capital plans and private development fit together across time.",
    headline: "Translate planning documents into something residents can actually feel.",
    subcopy: "A city-facing version can make long-range plans legible, support public engagement, and help leaders communicate why infrastructure timing matters."
  }
};

const PUBLIC_GIS_PORTAL_URL = "https://celina-public-gis-celinatx.hub.arcgis.com/apps/e92122e2d7424c9bbfa15e2a941d633a/explore";
const PUBLIC_GIS_DOWNLOAD_URL = "https://www.celina-tx.gov/1412/GIS-Data-Download";

const PUBLIC_GIS_LAYERS = {
  cityLimits: {
    label: "City Limits",
    description: "Municipal boundary",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/City_Limits_Open_Data/FeatureServer",
    layerId: 28,
    geometryType: "polygon",
    defaultVisible: true,
    color: "#c8952a",
    fillColor: "#c8952a",
    fillOpacity: 0.02,
    weight: 3,
    sourceUrl: PUBLIC_GIS_PORTAL_URL,
    popupFields: [
      { key: "OrdinanceN", label: "Ordinance" },
      { key: "OrdinanceD", label: "Date" },
      { key: "sqmiles", label: "Sq Miles" },
      { key: "AcreageGro", label: "Acreage" }
    ]
  },
  etj: {
    label: "ETJ",
    description: "Extraterritorial jurisdiction",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/ETJ_Celina/FeatureServer",
    layerId: 0,
    geometryType: "polygon",
    defaultVisible: false,
    color: "#6b7280",
    fillColor: "#94a3b8",
    fillOpacity: 0.03,
    weight: 2,
    dashArray: "8 6",
    sourceUrl: PUBLIC_GIS_PORTAL_URL,
    popupFields: [
      { key: "Name", label: "Name" },
      { key: "Acres", label: "Acres" },
      { key: "Ordinance", label: "Ordinance" },
      { key: "Resolution", label: "Resolution" }
    ]
  },
  futureLandUse: {
    label: "Future Land Use",
    description: "2040 planning framework",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/FutureLandusePlan2021/FeatureServer",
    layerId: 0,
    geometryType: "polygon",
    defaultVisible: false,
    color: "#0f766e",
    fillColor: "#0f766e",
    fillOpacity: 0.12,
    weight: 1.5,
    sourceUrl: PUBLIC_GIS_DOWNLOAD_URL,
    popupFields: [
      { key: "Character", label: "Character" },
      { key: "Characte_1", label: "Category" },
      { key: "Acreage", label: "Acreage" }
    ]
  },
  subdivisions: {
    label: "Master-Planned Communities",
    description: "Subdivisions by development agreement",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/SubdivisionsbyDA/FeatureServer",
    layerId: 0,
    geometryType: "polygon",
    defaultVisible: false,
    color: "#db2777",
    fillColor: "#db2777",
    fillOpacity: 0.08,
    weight: 1.5,
    sourceUrl: PUBLIC_GIS_PORTAL_URL,
    popupFields: [
      { key: "Name", label: "Community" },
      { key: "Developer", label: "Developer" },
      { key: "Acres", label: "Acres" },
      { key: "Date", label: "Date" }
    ]
  },
  parks: {
    label: "Parks",
    description: "Local parks polygon layer",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/Parks_Local/FeatureServer",
    layerId: 2,
    geometryType: "polygon",
    defaultVisible: false,
    color: "#16a34a",
    fillColor: "#16a34a",
    fillOpacity: 0.16,
    weight: 1.5,
    sourceUrl: PUBLIC_GIS_PORTAL_URL,
    popupFields: [
      { key: "NAME", label: "Park" },
      { key: "Status", label: "Status" },
      { key: "Acres", label: "Acres" }
    ]
  },
  trails: {
    label: "Trails",
    description: "Master plan trail network",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/CelinaMasterplanTrails/FeatureServer",
    layerId: 0,
    geometryType: "polyline",
    defaultVisible: false,
    color: "#059669",
    weight: 3,
    dashArray: "10 6",
    sourceUrl: PUBLIC_GIS_PORTAL_URL,
    popupFields: [
      { key: "RefName", label: "Trail" },
      { key: "Trail_Type", label: "Type" },
      { key: "Entity", label: "Entity" }
    ]
  },
  cip: {
    label: "Capital Projects",
    description: "CIP projects and phases",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/Infrastructure_Projects/FeatureServer",
    layerId: 0,
    geometryType: "polygon",
    defaultVisible: false,
    color: "#ea580c",
    fillColor: "#fb923c",
    fillOpacity: 0.12,
    weight: 2,
    sourceUrl: PUBLIC_GIS_PORTAL_URL,
    popupFields: [
      { key: "projName", label: "Project" },
      { key: "projType", label: "Type" },
      { key: "projPhase", label: "Phase" },
      { key: "constructComp", label: "Construction Complete" }
    ]
  },
  schools: {
    label: "Schools",
    description: "Existing CISD schools",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/CISD_Schools_Open_Data/FeatureServer",
    layerId: 0,
    geometryType: "point",
    defaultVisible: false,
    color: "#2563eb",
    sourceUrl: PUBLIC_GIS_PORTAL_URL,
    popupFields: [
      { key: "POLLPLACE", label: "School" },
      { key: "ADDRESS", label: "Address" },
      { key: "Type", label: "Type" },
      { key: "Status", label: "Status" }
    ]
  },
  cityFacilities: {
    label: "City Facilities",
    description: "Government facilities",
    serviceUrl: "https://services1.arcgis.com/x4nhme9V33KOzAfr/arcgis/rest/services/City_Facilities_Open_Data/FeatureServer",
    layerId: 0,
    geometryType: "point",
    defaultVisible: false,
    color: "#0f766e",
    sourceUrl: PUBLIC_GIS_PORTAL_URL,
    popupFields: [
      { key: "Type", label: "Facility" },
      { key: "Department", label: "Department" },
      { key: "Address", label: "Address" },
      { key: "Status", label: "Status" }
    ]
  }
};

const SECTORS = [
  {
    id: "downtown",
    name: "Historic Downtown Core",
    tagline: "Main Street | City Hall | Entertainment | Civic Center",
    category: "government",
    polygon: [[33.301, -96.788], [33.309, -96.788], [33.309, -96.778], [33.301, -96.778]],
    stats: [
      { icon: "store", label: "Main Street", value: "Historic Dist." },
      { icon: "account_balance", label: "City Hall", value: "142 N Ohio St" },
      { icon: "event", label: "Avg Events/yr", value: "25+" }
    ],
    developments: [
      {
        name: "Celina City Hall",
        address: "142 N Ohio St, Celina TX 75009",
        openYear: 1900,
        status: "existing",
        desc: "Current seat of Celina city government. To be supplemented by the new Government Center.",
        sources: [{ label: "City of Celina", url: "https://www.celina-tx.gov" }],
        lat: 33.3049,
        lng: -96.783
      },
      {
        name: "Historic Downtown Square",
        address: "N Ohio St & W Walnut St, Celina TX",
        openYear: 1874,
        status: "existing",
        desc: "Celina's historic core, designated a Main Street City since 1997, with shops, restaurants, and recurring community events.",
        sources: [
          { label: "City of Celina - Main Street", url: "https://www.celina-tx.gov/908/Main-Street" },
          { label: "Downtown Celina", url: "https://www.celina-tx.gov/m/newsflash/home/detail/808" }
        ],
        lat: 33.305,
        lng: -96.7835
      },
      {
        name: "Silos in Celina",
        address: "Downtown Celina, TX",
        openYear: 2023,
        status: "existing",
        desc: "A downtown dining and event venue that has become a visible anchor of Celina's revitalization.",
        sources: [{ label: "Silos in Celina", url: "https://silosincelina.com/" }],
        lat: 33.3048,
        lng: -96.7828
      },
      {
        name: "Valley Vines Tasting Room",
        address: "Downtown Celina, TX",
        openYear: 2022,
        status: "existing",
        desc: "An established wine bar and live music destination supporting downtown activity.",
        sources: [{ label: "Visit Celina", url: "https://www.visitcelina.org" }],
        lat: 33.3052,
        lng: -96.7833
      },
      {
        name: "Celina Government Center",
        address: "Walnut St & Arizona Dr, Celina TX",
        openYear: 2026,
        status: "open",
        constructionStart: 2024,
        desc: "A 100,000-square-foot, $70 million municipal complex centralizing city services as Celina scales.",
        cost: "$70M",
        sources: [{ label: "Community Impact", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/government/2024/05/29/celina-government-center-to-benefit-residents-staff/" }],
        lat: 33.304,
        lng: -96.782
      },
      {
        name: "Off the Rails Ice House",
        address: "South of Sunset Blvd & west of Coit Rd, Celina TX",
        openYear: 2026,
        status: "open",
        constructionStart: 2025,
        desc: "A new restaurant and entertainment venue that kicks off Celina's broader Entertainment District vision.",
        sources: [
          { label: "Celina Record", url: "https://starlocalmedia.com/celinarecord/news/off-the-rails-ice-house-steams-ahead-with-celina-plans/article_afc86382-4548-11ef-b0ad-738fdceee71a.html" },
          { label: "Hughes Commercial", url: "https://hughescommercialtexas.com/celina-entertainment-district/" }
        ],
        lat: 33.3088,
        lng: -96.7565
      },
      {
        name: "Entertainment District - Future Phases",
        address: "14-acre district, Celina TX",
        openYear: 2029,
        status: "planned",
        constructionStart: 2027,
        desc: "Future phases are expected to add more dining, live music, and entertainment activity around the district.",
        sources: [{ label: "Celina EDC", url: "https://celinaedc.com" }],
        lat: 33.3092,
        lng: -96.757
      }
    ],
    sources: [
      { label: "City of Celina", url: "https://www.celina-tx.gov" },
      { label: "Celina EDC", url: "https://celinaedc.com" },
      { label: "Celina Chamber", url: "https://celinachamber.org" }
    ]
  },
  {
    id: "shawnee-trail",
    name: "Shawnee Trail District",
    tagline: "Walmart | Home Depot | Academy Sports | $1B Mixed-Use",
    category: "retail",
    polygon: [[33.311, -96.797], [33.334, -96.797], [33.334, -96.773], [33.311, -96.773]],
    stats: [
      { icon: "storefront", label: "Project Scale", value: "$1 Billion" },
      { icon: "straighten", label: "Acreage", value: "190 acres" },
      { icon: "apartment", label: "Apartments", value: "600 units" }
    ],
    developments: [
      {
        name: "Walmart Supercenter",
        address: "1771 Preston Rd, Celina TX 75009",
        openYear: 2026,
        status: "open",
        constructionStart: 2024,
        desc: "Celina's first Walmart Supercenter acts as a major retail anchor for the district.",
        sources: [
          { label: "Community Impact", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/business/2026/03/04/walmart-sets-opening-date-for-new-celina-location/" },
          { label: "Celina EDC", url: "https://celinaedc.com/about/in-the-news/celinas-first-walmart-to-be-part-of-bigger-vision-for-fast-growing-city" }
        ],
        lat: 33.321,
        lng: -96.784
      },
      {
        name: "Home Depot",
        address: "Shawnee Trail area, Celina TX",
        openYear: 2026,
        status: "open",
        constructionStart: 2025,
        desc: "A major home improvement anchor joining the corridor's early retail wave.",
        sources: [{ label: "Green Meadows TX", url: "https://greenmeadowstx.com/new-businesses-coming-to-celina-in-2025/" }],
        lat: 33.3225,
        lng: -96.786
      },
      {
        name: "Academy Sports + Outdoors",
        address: "Shawnee Trail / Preston Rd area, Celina TX",
        openYear: 2026,
        status: "open",
        constructionStart: 2025,
        desc: "A national sporting goods retailer arriving as Celina's retail gravity increases.",
        sources: [{ label: "Celina City Texas", url: "https://celinacitytexas.com/new-coming-soon-8-exciting-businesses-opening-in-celina-texas/" }],
        lat: 33.32,
        lng: -96.782
      },
      {
        name: "Shawnee Trail Phase 1",
        address: "NW corner of Preston Rd & Outer Loop, Celina TX",
        openYear: 2027,
        status: "building",
        constructionStart: 2025,
        desc: "Phase 1 includes apartments, office, entertainment, and green space in the broader mixed-use district.",
        cost: "$1B (full project)",
        sources: [
          { label: "REBusiness Online", url: "https://rebusinessonline.com/trademark-to-develop-150-acre-mixed-use-project-in-celina-texas/" },
          { label: "Connect CRE", url: "https://www.connectcre.com/stories/celinas-1b-shawnee-trail-project-underway/" }
        ],
        lat: 33.3215,
        lng: -96.7845
      },
      {
        name: "Shawnee Trail Full Buildout",
        address: "NW corner of Preston Rd & Outer Loop, Celina TX",
        openYear: 2030,
        status: "planned",
        constructionStart: 2028,
        desc: "Later phases add more retail, dining, residential, and public space to complete the district.",
        sources: [{ label: "Celina EDC", url: "https://celinaedc.com/about/in-the-news/celinas-first-walmart-to-be-part-of-bigger-vision-for-fast-growing-city" }],
        lat: 33.3205,
        lng: -96.7845
      }
    ],
    sources: [
      { label: "Community Impact", url: "https://communityimpact.com" },
      { label: "Celina EDC", url: "https://celinaedc.com" }
    ]
  },
  {
    id: "crossing",
    name: "The Crossing at Moore Farm",
    tagline: "Costco | Blaze Pizza | Lowe's | Mixed Retail",
    category: "retail",
    polygon: [[33.306, -96.793], [33.318, -96.793], [33.318, -96.775], [33.306, -96.775]],
    stats: [
      { icon: "storefront", label: "Anchor", value: "Costco" },
      { icon: "straighten", label: "Acreage", value: "77 acres" },
      { icon: "calendar_month", label: "Opening", value: "Late 2026" }
    ],
    developments: [
      {
        name: "Costco Wholesale",
        address: "SW corner of Ownsby Pkwy & Preston Rd, Celina TX 75009",
        openYear: 2026,
        status: "building",
        constructionStart: 2026,
        desc: "A 158,000-square-foot Costco planned as the retail anchor of this mixed-use development.",
        sources: [
          { label: "Community Impact", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/business/2025/08/20/celina-costco-could-see-late-2026-opening-date/" },
          { label: "Celina EDC", url: "https://celinaedc.com/about/in-the-news/costco-is-coming-to-celina" }
        ],
        lat: 33.3155,
        lng: -96.7834
      },
      {
        name: "Lowe's Home Improvement",
        address: "The Crossing at Moore Farm, Celina TX",
        openYear: 2026,
        status: "planned",
        constructionStart: 2025,
        desc: "A Lowe's location is expected to open alongside other major retail in this node.",
        sources: [{ label: "Celina EDC", url: "https://celinaedc.com/about/in-the-news/retail-follows-rooftops-celina-is-a-commercial-and-residential-boomtown" }],
        lat: 33.3148,
        lng: -96.782
      },
      {
        name: "Blaze Pizza",
        address: "The Crossing at Moore Farm, Celina TX",
        openYear: 2026,
        status: "planned",
        constructionStart: 2026,
        desc: "One of the first dining concepts expected to join the development.",
        sources: [{ label: "Celina City Texas", url: "https://celinacitytexas.com/new-coming-soon-8-exciting-businesses-opening-in-celina-texas/" }],
        lat: 33.315,
        lng: -96.7845
      }
    ],
    sources: [
      { label: "Community Impact", url: "https://communityimpact.com" },
      { label: "Celina EDC", url: "https://celinaedc.com" }
    ]
  },
  {
    id: "heb-frontier",
    name: "Frontier Pkwy Corridor",
    tagline: "H-E-B | Future Commercial Growth | North Preston",
    category: "retail",
    polygon: [[33.326, -96.793], [33.34, -96.793], [33.34, -96.773], [33.326, -96.773]],
    stats: [
      { icon: "storefront", label: "Anchor", value: "H-E-B" },
      { icon: "straighten", label: "Site", value: "21 acres" },
      { icon: "calendar_month", label: "Opening", value: "Early 2027" }
    ],
    developments: [
      {
        name: "H-E-B Grocery Store",
        address: "Frontier Pkwy & Preston Rd, Celina TX 75009",
        openYear: 2027,
        status: "building",
        constructionStart: 2026,
        desc: "A major grocery anchor expanding northward into Celina as the corridor matures.",
        sources: [
          { label: "NBC DFW", url: "https://www.nbcdfw.com/news/business/h-e-b-buys-celina-site-on-preston-road/3198712/" },
          { label: "Celina EDC", url: "https://celinaedc.com/about/in-the-news/h-e-b-purchases-land-in-celina-texas" }
        ],
        lat: 33.3295,
        lng: -96.784
      },
      {
        name: "Future Commercial Parcels",
        address: "Frontier Pkwy corridor, Celina TX",
        openYear: 2028,
        status: "planned",
        desc: "Additional parcels along the corridor are positioned for future retail and mixed-use growth.",
        sources: [{ label: "Celina Long-Range Plans", url: "https://www.celina-tx.gov/1292/Long-Range-Plans" }],
        lat: 33.331,
        lng: -96.7835
      }
    ],
    sources: [
      { label: "NBC DFW", url: "https://www.nbcdfw.com/news/business/h-e-b-buys-celina-site-on-preston-road/3198712/" },
      { label: "Celina Long-Range Plans", url: "https://www.celina-tx.gov/1292/Long-Range-Plans" }
    ]
  },
  {
    id: "medical-dnt",
    name: "Medical & DNT Corridor",
    tagline: "Methodist Medical Center | DNT Extension",
    category: "healthcare",
    polygon: [[33.278, -96.832], [33.3, -96.832], [33.3, -96.808], [33.278, -96.808]],
    stats: [
      { icon: "local_hospital", label: "Hospital", value: "$237M" },
      { icon: "directions_car", label: "DNT Phase", value: "4A | 2027" },
      { icon: "straighten", label: "Site", value: "46 acres" }
    ],
    developments: [
      {
        name: "Methodist Celina Medical Center",
        address: "1500 S Dallas Pkwy, Celina TX 75009",
        openYear: 2025,
        status: "existing",
        constructionStart: 2022,
        desc: "Celina's first full-service hospital, filling a major regional healthcare gap.",
        cost: "$237M",
        sources: [
          { label: "Methodist Health System", url: "https://www.methodisthealthsystem.org/locations/methodist-celina-medical-center/" },
          { label: "Community Impact", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/health-care/2025/01/23/methodist-celina-medical-center-to-open-this-spring/" }
        ],
        lat: 33.2873,
        lng: -96.8205
      },
      {
        name: "Dallas North Tollway - Phase 4A",
        address: "US 380 to FM 428 through Prosper & Celina",
        openYear: 2027,
        status: "building",
        constructionStart: 2024,
        desc: "A major tollway extension that significantly improves connectivity to western Celina.",
        cost: "$460M",
        sources: [
          { label: "NTTA", url: "https://www.ntta.org/ntta-board-approves-dallas-north-tollway-extension-contracts" },
          { label: "Axios Dallas", url: "https://www.axios.com/local/dallas/2024/01/04/tollway-construction-ntta-prosper-celina-collin-county" }
        ],
        lat: 33.284,
        lng: -96.818
      },
      {
        name: "Methodist Office Expansion",
        address: "Near 1500 S Dallas Pkwy, Celina TX",
        openYear: 2027,
        status: "planned",
        desc: "Adjacent physician and specialist office growth is expected around the main medical campus.",
        sources: [{ label: "LoopNet", url: "https://www.loopnet.com/Listing/1530-S-Dallas-Pky-Celina-TX/30671557/" }],
        lat: 33.2862,
        lng: -96.8215
      }
    ],
    sources: [
      { label: "Methodist Health System", url: "https://www.methodisthealthsystem.org/locations/methodist-celina-medical-center/" },
      { label: "NTTA", url: "https://www.ntta.org" }
    ]
  },
  {
    id: "education-south",
    name: "Celina ISD - Existing Campuses",
    tagline: "Existing Schools | CHS Expansion | Middle School #2",
    category: "education",
    polygon: [[33.292, -96.79], [33.326, -96.79], [33.326, -96.773], [33.292, -96.773]],
    stats: [
      { icon: "school", label: "Current Schools", value: "7 campuses" },
      { icon: "people", label: "Enrollment", value: "~12,000+" },
      { icon: "trending_up", label: "Bond Approved", value: "$2.3B (2025)" }
    ],
    developments: [
      {
        name: "Celina High School",
        address: "3455 N Preston Rd, Celina TX 75009",
        openYear: 2000,
        status: "existing",
        desc: "The district's original high school, with a major expansion to support growth.",
        sources: [{ label: "Celina ISD", url: "https://www.celinaisd.com/who-we-are/our-schools" }],
        lat: 33.322,
        lng: -96.784
      },
      {
        name: "CHS Expansion (Phase 2)",
        address: "3455 N Preston Rd, Celina TX 75009",
        openYear: 2026,
        status: "open",
        constructionStart: 2024,
        desc: "A major high school expansion adding career, arts, science, and student experience spaces.",
        sources: [{ label: "Celina ISD Construction", url: "https://www.celinaisd.com/our-departments/construction" }],
        lat: 33.3222,
        lng: -96.7842
      },
      {
        name: "Celina Middle School #2",
        address: "1305 Old Glendenning, Celina TX",
        openYear: 2026,
        status: "open",
        constructionStart: 2024,
        desc: "A second middle school campus built to keep pace with enrollment growth.",
        sources: [{ label: "Community Impact", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/education/2025/12/16/celina-isd-officials-recommend-new-grade-level-configurations-in-2026-27-2027-28-school-years/" }],
        lat: 33.3105,
        lng: -96.781
      },
      {
        name: "Marcy B. Lykins Elementary",
        address: "550 S Utah St, Celina TX 75009",
        openYear: 2000,
        status: "existing",
        desc: "An existing south Celina elementary campus.",
        sources: [{ label: "Celina ISD", url: "https://www.celinaisd.com/who-we-are/our-schools" }],
        lat: 33.299,
        lng: -96.785
      },
      {
        name: "Bobby Ray & Afton Martin Elementary",
        address: "2509 N Louisiana Dr, Celina TX 75009",
        openYear: 2018,
        status: "existing",
        desc: "An existing elementary campus serving central-west communities.",
        sources: [{ label: "Celina ISD", url: "https://www.celinaisd.com/who-we-are/our-schools" }],
        lat: 33.3085,
        lng: -96.795
      },
      {
        name: "Cambridge Crossing Elementary",
        address: "Cambridge Crossing community, Celina TX",
        openYear: 2024,
        status: "existing",
        desc: "A school located inside Cambridge Crossing, reinforcing the walkable community model.",
        sources: [{ label: "Cambridge Crossing", url: "https://cambridgecrossingcelina.com/schools/" }],
        lat: 33.3055,
        lng: -96.7755
      },
      {
        name: "Vasquez Elementary",
        address: "East Celina (Celina ISD)",
        openYear: 2025,
        status: "existing",
        constructionStart: 2024,
        desc: "The district's fifth elementary campus, opened to help relieve crowding in east Celina.",
        sources: [
          { label: "Celina ISD Construction", url: "https://www.celinaisd.com/our-departments/construction" },
          { label: "Community Impact", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/education/2025/03/25/celina-isd-adjusts-elementary-attendance-zones-for-new-school/" }
        ],
        lat: 33.3175,
        lng: -96.76
      },
      {
        name: "Early Childhood School",
        address: "507 E Malone St, Celina TX 75009",
        openYear: 2005,
        status: "existing",
        desc: "Early education and pre-K campus serving younger learners.",
        sources: [{ label: "Celina ISD", url: "https://www.celinaisd.com/who-we-are/our-schools" }],
        lat: 33.3025,
        lng: -96.778
      },
      {
        name: "High School #2",
        address: "Location to be announced",
        openYear: 2030,
        status: "planned",
        desc: "A second high school funded through the district bond program and expected around 2030.",
        sources: [{ label: "Community Impact", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/education/2025/04/01/celina-isd-looks-to-build-10-new-schools-with-bond-program-as-district-faces-fast-growth/" }],
        lat: 33.31,
        lng: -96.79
      }
    ],
    sources: [
      { label: "Celina ISD", url: "https://www.celinaisd.com" },
      { label: "Community Impact", url: "https://communityimpact.com" }
    ]
  },
  {
    id: "ramble",
    name: "Ramble Community",
    tagline: "Hillwood | 4,000 Homes | Ramble Elementary",
    category: "residential",
    polygon: [[33.33, -96.783], [33.358, -96.783], [33.358, -96.748], [33.33, -96.748]],
    stats: [
      { icon: "home", label: "Homes Planned", value: "4,000" },
      { icon: "straighten", label: "Acreage", value: "1,380 acres" },
      { icon: "directions_walk", label: "Trail Network", value: "7 miles" }
    ],
    developments: [
      {
        name: "Ramble by Hillwood - Phase 1",
        address: "Preston Rd to Custer Rd, north of downtown Celina",
        openYear: 2026,
        status: "building",
        constructionStart: 2024,
        desc: "A large master-planned community bringing trail-linked homes, amenities, and prominent builders.",
        sources: [
          { label: "Hillwood Communities", url: "https://www.hillwoodcommunities.com/lifestyle-communities/ramble/" },
          { label: "The Real Deal", url: "https://therealdeal.com/texas/dallas/2024/01/31/perots-hillwood-communities-acquires-1380-acres-in-celina/" }
        ],
        lat: 33.339,
        lng: -96.766
      },
      {
        name: "Ramble Elementary",
        address: "Ramble community, north Celina TX",
        openYear: 2028,
        status: "planned",
        constructionStart: 2026,
        desc: "A new elementary school planned within the community to support neighborhood growth.",
        cost: "$51.39M",
        sources: [{ label: "Community Impact", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/education/2026/03/02/celina-isd-names-3-new-elementary-schools/" }],
        lat: 33.344,
        lng: -96.768
      },
      {
        name: "Ramble Full Buildout",
        address: "Ramble community, Celina TX",
        openYear: 2032,
        status: "planned",
        constructionStart: 2027,
        desc: "Later phases expand Ramble toward full buildout with housing, parks, and supporting uses.",
        sources: [{ label: "Hillwood Communities", url: "https://www.hillwoodcommunities.com/lifestyle-communities/ramble/" }],
        lat: 33.345,
        lng: -96.765
      }
    ],
    sources: [
      { label: "Hillwood Communities", url: "https://www.hillwoodcommunities.com/lifestyle-communities/ramble/" },
      { label: "Celina ISD", url: "https://www.celinaisd.com" }
    ]
  },
  {
    id: "green-meadows",
    name: "Green Meadows & East Celina",
    tagline: "Grumbles Elementary | Wilson Creek Park | Established Communities",
    category: "residential",
    polygon: [[33.294, -96.762], [33.316, -96.762], [33.316, -96.734], [33.294, -96.734]],
    stats: [
      { icon: "home", label: "Community", value: "Established" },
      { icon: "school", label: "Schools", value: "2 campuses" },
      { icon: "park", label: "Open Space", value: "Growing" }
    ],
    developments: [
      {
        name: "Green Meadows Community",
        address: "East Celina TX",
        openYear: 2020,
        status: "existing",
        desc: "An established east Celina residential community with neighborhood amenities.",
        sources: [{ label: "Green Meadows", url: "https://greenmeadowstx.com" }],
        lat: 33.305,
        lng: -96.7485
      },
      {
        name: "Ophelia Grumbles Elementary",
        address: "Green Meadows community, east Celina TX",
        openYear: 2028,
        status: "planned",
        constructionStart: 2026,
        desc: "A new elementary school funded through the district bond program.",
        cost: "$50.75M",
        sources: [
          { label: "Community Impact", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/education/2026/03/02/celina-isd-names-3-new-elementary-schools/" },
          { label: "Green Meadows", url: "https://greenmeadowstx.com/education/" }
        ],
        lat: 33.306,
        lng: -96.749
      },
      {
        name: "Wilson Creek Park",
        address: "Roseland Pkwy & Sunset Blvd, Celina TX",
        openYear: 2026,
        status: "building",
        constructionStart: 2025,
        desc: "A 100-acre flagship city park with sports fields, courts, splash features, and destination amenities.",
        cost: "$50M",
        sources: [
          { label: "City of Celina", url: "https://www.celina-tx.gov/1514/Wilson-Creek-Park" },
          { label: "Mustang Lakes", url: "https://mustanglakes.com/wilson-creek-park-new-celina-park/" }
        ],
        lat: 33.3118,
        lng: -96.753
      },
      {
        name: "Collin County Outer Loop - Segment 3C",
        address: "Eastern Celina corridor",
        openYear: 2025,
        status: "existing",
        constructionStart: 2023,
        desc: "A key Outer Loop segment that improves east side connectivity and preserves right-of-way for future transit.",
        cost: "$62.7M",
        sources: [{ label: "Local Profile", url: "https://www.localprofile.com/news/collin-county-outer-loop-celina-mckinney-11468827" }],
        lat: 33.3215,
        lng: -96.725
      }
    ],
    sources: [
      { label: "City of Celina", url: "https://www.celina-tx.gov/1514/Wilson-Creek-Park" },
      { label: "Collin County Outer Loop", url: "https://www.collincountytx.gov/Services/Engineering/transportation/outer-loop" }
    ]
  },
  {
    id: "uptown",
    name: "Uptown District",
    tagline: "Alma Jo Scott Elem | Future DNT Connections | NW Growth",
    category: "mixed",
    polygon: [[33.319, -96.812], [33.34, -96.812], [33.34, -96.791], [33.319, -96.791]],
    stats: [
      { icon: "school", label: "New School", value: "Opens 2028" },
      { icon: "directions_car", label: "DNT", value: "Phase 4A" },
      { icon: "home", label: "Zoning", value: "Residential" }
    ],
    developments: [
      {
        name: "Alma Jo Scott Elementary",
        address: "Uptown neighborhood, Celina TX",
        openYear: 2028,
        status: "building",
        constructionStart: 2026,
        desc: "A new elementary school planned in the Uptown growth corridor, backed by the district bond program.",
        cost: "$52.07M",
        sources: [
          { label: "Community Impact", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/education/2026/03/02/celina-isd-names-3-new-elementary-schools/" },
          { label: "Community Impact - GMP", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/education/2025/11/24/celina-isd-officials-set-maximum-price-for-3-new-schools/" }
        ],
        lat: 33.3265,
        lng: -96.7975
      },
      {
        name: "Uptown Neighborhood Development",
        address: "NW Celina - between Preston Rd & future DNT",
        openYear: 2027,
        status: "planned",
        constructionStart: 2026,
        desc: "A future neighborhood identified in Celina's long-range plan with residential and walkable mixed-use intent.",
        sources: [{ label: "Celina 2040", url: "https://www.celina-tx.gov/1292/Long-Range-Plans" }],
        lat: 33.328,
        lng: -96.801
      },
      {
        name: "Coit Road Widening - Phase 1",
        address: "Coit Rd from Vest Lane to Choate Pkwy, Celina TX",
        openYear: 2026,
        status: "building",
        constructionStart: 2025,
        desc: "A road widening project that supports future capacity in this growth area.",
        cost: "$11.5M",
        sources: [{ label: "Community Impact - CIP", url: "https://communityimpact.com/dallas-fort-worth/prosper-celina/government/2024/11/15/check-out-celinas-full-5-year-plan-for-city-capital-improvement-projects/" }],
        lat: 33.3165,
        lng: -96.759
      }
    ],
    sources: [
      { label: "Celina Long-Range Plans", url: "https://www.celina-tx.gov/1292/Long-Range-Plans" },
      { label: "Celina ISD", url: "https://www.celinaisd.com" }
    ]
  }
];

let currentYear = 2026;
let activeFilter = "all";
let activeSectorId = null;
let activeAudience = "buyers";
let sectorLayers = {};
let markerLayers = {};
let publicLayerState = Object.fromEntries(Object.entries(PUBLIC_GIS_LAYERS).map(([key, config]) => [key, !!config.defaultVisible]));
let publicLayerLoadState = {};
let publicMapLayers = {};
let prevYear = 2026;
let focusDev = null;
let toastTimer;

const satTile = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  { attribution: "Tiles © Esri", maxZoom: 19 }
);
const labelTile = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
  { maxZoom: 19 }
);
const streetTile = L.tileLayer(
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  { attribution: "© OpenStreetMap © CARTO", maxZoom: 19, subdomains: "abcd" }
);

const map = L.map("map", {
  center: [33.31, -96.784],
  zoom: 13,
  layers: [satTile, labelTile],
  zoomControl: false
});

L.control.zoom({ position: "bottomright" }).addTo(map);

function setMapStyle(style) {
  if (style === "satellite") {
    map.removeLayer(streetTile);
    if (!map.hasLayer(satTile)) map.addLayer(satTile);
    if (!map.hasLayer(labelTile)) map.addLayer(labelTile);
    document.getElementById("btn-sat").classList.add("bg-surface-container-high", "text-primary");
    document.getElementById("btn-sat").classList.remove("text-outline");
    document.getElementById("btn-street").classList.remove("bg-surface-container-high", "text-primary");
    document.getElementById("btn-street").classList.add("text-outline");
  } else {
    map.removeLayer(satTile);
    map.removeLayer(labelTile);
    if (!map.hasLayer(streetTile)) map.addLayer(streetTile);
    document.getElementById("btn-street").classList.add("bg-surface-container-high", "text-primary");
    document.getElementById("btn-street").classList.remove("text-outline");
    document.getElementById("btn-sat").classList.remove("bg-surface-container-high", "text-primary");
    document.getElementById("btn-sat").classList.add("text-outline");
  }
}

function getStatus(dev, year) {
  if (dev.status === "existing" || dev.openYear <= year) return "open";
  if (dev.constructionStart && dev.constructionStart <= year) return "building";
  return "planned";
}

function isNewThisYear(dev, year) {
  return dev.openYear === year;
}

function isBaselineYear(year) {
  return year < 2025;
}

function sectorActivityLevel(sector, year) {
  let score = 0;
  sector.developments.forEach((dev) => {
    if (getStatus(dev, year) === "open" && !isBaselineYear(dev.openYear)) score += 1;
    if (getStatus(dev, year) === "building") score += 0.5;
  });
  return score;
}

function countNewThisYear(year) {
  let total = 0;
  SECTORS.forEach((sector) => {
    sector.developments.forEach((dev) => {
      if (isNewThisYear(dev, year)) total += 1;
    });
  });
  return total;
}

function countByCategory(year) {
  const counts = {};
  SECTORS.forEach((sector) => {
    const openCount = sector.developments.filter((dev) => getStatus(dev, year) === "open" && !isBaselineYear(dev.openYear)).length;
    counts[sector.category] = (counts[sector.category] || 0) + openCount;
  });
  return counts;
}

function getTopCategorySummary(year) {
  const counts = countByCategory(year);
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (!top || top[1] === 0) {
    return "Planning momentum is still ahead of visible openings.";
  }
  return `${CATS[top[0]].label} leads visible delivery with ${top[1]} tracked openings by ${year}.`;
}

function getNewProjects(year) {
  const items = [];
  SECTORS.forEach((sector) => {
    sector.developments.forEach((dev) => {
      if (isNewThisYear(dev, year)) {
        items.push({ sector, dev });
      }
    });
  });
  return items;
}

function buildSectors() {
  SECTORS.forEach((sector) => {
    const cat = CATS[sector.category];
    const poly = L.rectangle(sector.polygon, {
      color: cat.color,
      weight: 1.5,
      opacity: 0.6,
      fillColor: cat.color,
      fillOpacity: 0.12,
      className: "sector-path"
    });

    poly.on("click", (event) => {
      L.DomEvent.stopPropagation(event);
      openDrawer(sector.id);
    });

    poly.on("mouseover", () => {
      if (activeSectorId !== sector.id) poly.setStyle({ fillOpacity: 0.25, weight: 2.5 });
    });

    poly.on("mouseout", () => {
      if (activeSectorId !== sector.id) poly.setStyle({ fillOpacity: 0.12, weight: 1.5 });
    });

    poly.addTo(map);
    sectorLayers[sector.id] = poly;
  });
}

function refreshSectorColors() {
  SECTORS.forEach((sector) => {
    const cat = CATS[sector.category];
    const activity = sectorActivityLevel(sector, currentYear);
    const filterMatch = activeFilter === "all" || activeFilter === sector.category;
    const fillOpacity = !filterMatch ? 0.04 : activeSectorId === sector.id ? 0.35 : activity > 1 ? 0.22 : activity > 0 ? 0.15 : 0.08;
    const weight = activeSectorId === sector.id ? 3 : 1.5;
    sectorLayers[sector.id].setStyle({
      fillOpacity,
      weight,
      opacity: filterMatch ? 0.7 : 0.24,
      color: cat.color,
      fillColor: cat.color
    });
  });
}

function buildMarkers() {
  Object.values(markerLayers).forEach((marker) => {
    if (map.hasLayer(marker)) map.removeLayer(marker);
  });
  markerLayers = {};

  SECTORS.forEach((sector) => {
    sector.developments.forEach((dev) => {
      if (!dev.lat) return;
      if (activeFilter !== "all" && activeFilter !== sector.category) return;

      const status = getStatus(dev, currentYear);
      const cat = CATS[sector.category];
      const isNew = isNewThisYear(dev, currentYear);
      const marker = L.marker([dev.lat, dev.lng], {
        icon: L.divIcon({
          className: "",
          html: `<div class="ci-marker ${status}" style="background:${cat.color}">
              <span class="material-symbols-outlined fill-icon" style="font-size:15px;color:white">${cat.icon}</span>
              ${isNew ? '<div style="position:absolute;top:-4px;right:-4px;width:10px;height:10px;background:#22C55E;border-radius:50%;border:2px solid white;"></div>' : ""}
            </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      });

      marker.on("click", (event) => {
        L.DomEvent.stopPropagation(event);
        openDrawer(sector.id, dev.name);
      });

      const statusLabel = status === "open"
        ? (isNew ? `New in ${currentYear}` : "Open")
        : status === "building"
          ? "Under Construction"
          : `Planned ~${dev.openYear}`;

      marker.bindTooltip(
        `<div style="font-family:Inter,sans-serif;font-size:11px;font-weight:600;color:#091426;background:white;border:none;border-radius:6px;padding:6px 10px;box-shadow:0 2px 12px rgba(0,0,0,0.12)">
          ${dev.name}<br>
          <span style="color:${status === "open" ? "#16A34A" : status === "building" ? "#D97706" : "#9CA3AF"};font-weight:700">${statusLabel}</span>
        </div>`,
        { direction: "top", offset: [0, -16], opacity: 1, className: "leaflet-tooltip-custom" }
      );

      marker.addTo(map);
      markerLayers[`${sector.id}:${dev.name}`] = marker;
    });
  });
}

function makeFilterPill(key, label, active) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all glass w-full ${active ? "text-on-surface bg-surface-container-high" : "text-on-surface-variant"}`;
  button.style.cssText = `border: 1px solid rgba(9,20,38,${active ? "0.1" : "0.05"});`;
  if (key !== "all") {
    const dot = document.createElement("span");
    dot.className = "w-2 h-2 rounded-full flex-shrink-0";
    dot.style.background = CATS[key].color;
    button.appendChild(dot);
  }
  button.appendChild(document.createTextNode(label));
  button.addEventListener("click", () => {
    activeFilter = key;
    buildFilters();
    buildMarkers();
    refreshSectorColors();
  });
  return button;
}

function buildFilters() {
  const bar = document.getElementById("filter-bar");
  bar.innerHTML = "";
  bar.appendChild(makeFilterPill("all", "All Sectors", activeFilter === "all"));
  Object.entries(CATS).forEach(([key, cat]) => {
    bar.appendChild(makeFilterPill(key, cat.label, activeFilter === key));
  });
}

function makePublicLayerPill(key, config) {
  const button = document.createElement("button");
  const active = !!publicLayerState[key];
  const loading = !!publicLayerLoadState[key];
  button.type = "button";
  button.className = `public-layer-pill ${active ? "is-active" : ""} ${loading ? "is-loading" : ""}`;

  const indicator = document.createElement("span");
  indicator.className = "public-layer-check";
  indicator.style.background = active ? config.color : "rgba(117,119,125,0.18)";
  indicator.innerHTML = active ? '<span class="material-symbols-outlined" style="font-size:12px">check</span>' : "";

  const meta = document.createElement("span");
  meta.className = "public-layer-meta";
  meta.innerHTML = `<strong>${config.label}</strong><span>${loading ? "Loading layer..." : config.description}</span>`;

  button.appendChild(indicator);
  button.appendChild(meta);
  button.addEventListener("click", () => togglePublicLayer(key));
  return button;
}

function buildPublicLayerControls() {
  const container = document.getElementById("public-layer-controls");
  container.innerHTML = "";
  Object.entries(PUBLIC_GIS_LAYERS).forEach(([key, config]) => {
    container.appendChild(makePublicLayerPill(key, config));
  });
}

function buildQuickJump() {
  const list = document.getElementById("quick-jump-list");
  list.innerHTML = "";
  SECTORS.slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((sector) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quick-jump-pill";
      button.innerHTML = `<span class="w-2 h-2 rounded-full" style="background:${CATS[sector.category].color}"></span>${sector.name}`;
      button.addEventListener("click", () => {
        openDrawer(sector.id);
        map.fitBounds(sector.polygon, { padding: [40, 40] });
      });
      list.appendChild(button);
    });
}

function getPublicLayerQueryUrl(config) {
  return `${config.serviceUrl}/${config.layerId}/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&f=geojson`;
}

function getFutureLandUseColor(value) {
  const text = (value || "").toLowerCase();
  if (text.includes("regional") || text.includes("employment")) return "#b45309";
  if (text.includes("mixed")) return "#7c3aed";
  if (text.includes("commercial")) return "#ea580c";
  if (text.includes("industrial")) return "#475569";
  if (text.includes("neighborhood") || text.includes("residential")) return "#db2777";
  if (text.includes("civic") || text.includes("government")) return "#0f766e";
  if (text.includes("open") || text.includes("park")) return "#16a34a";
  return "#0f766e";
}

function getPublicLayerStyle(config, feature) {
  if (config.geometryType === "polygon") {
    if (config === PUBLIC_GIS_LAYERS.futureLandUse) {
      const fill = getFutureLandUseColor(feature?.properties?.Character || feature?.properties?.Characte_1);
      return {
        color: fill,
        fillColor: fill,
        fillOpacity: 0.14,
        weight: 1.25,
        opacity: 0.7
      };
    }
    return {
      color: config.color,
      fillColor: config.fillColor || config.color,
      fillOpacity: config.fillOpacity ?? 0.12,
      weight: config.weight ?? 2,
      opacity: 0.8,
      dashArray: config.dashArray || null
    };
  }

  return {
    color: config.color,
    weight: config.weight ?? 3,
    opacity: 0.9,
    dashArray: config.dashArray || null
  };
}

function formatPublicLayerValue(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isInteger(value) ? value.toLocaleString() : value.toFixed(2);
  return String(value);
}

function getPublicLayerPopupContent(config, properties = {}) {
  const rows = (config.popupFields || [])
    .map((field) => {
      const value = formatPublicLayerValue(properties[field.key]);
      return value ? `<div style="margin-top:6px"><div style="font-size:10px;color:#75777d;text-transform:uppercase;letter-spacing:.08em">${field.label}</div><div style="font-size:12px;color:#0b1c30;font-weight:600">${value}</div></div>` : "";
    })
    .filter(Boolean)
    .join("");

  return `
    <div style="min-width:180px;font-family:Inter,sans-serif">
      <div style="font-size:10px;color:${config.color};text-transform:uppercase;letter-spacing:.12em;font-weight:700">${config.label}</div>
      ${rows || '<div style="font-size:12px;color:#0b1c30;font-weight:600;margin-top:6px">Public GIS feature</div>'}
      <a href="${config.sourceUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:4px;margin-top:10px;font-size:11px;font-weight:700;color:#006a61;text-decoration:none">Source portal</a>
    </div>
  `;
}

function createPublicMapLayer(config, geojson) {
  return L.geoJSON(geojson, {
    style: (feature) => getPublicLayerStyle(config, feature),
    pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
      radius: 6,
      color: "#ffffff",
      weight: 1.5,
      fillColor: config.color,
      fillOpacity: 0.95
    }),
    onEachFeature: (feature, layer) => {
      layer.bindPopup(getPublicLayerPopupContent(config, feature.properties));
    }
  });
}

async function ensurePublicLayerVisible(key) {
  const config = PUBLIC_GIS_LAYERS[key];
  if (!config) return;

  if (publicMapLayers[key]) {
    if (!map.hasLayer(publicMapLayers[key])) publicMapLayers[key].addTo(map);
    return;
  }

  publicLayerLoadState[key] = true;
  buildPublicLayerControls();

  try {
    const response = await fetch(getPublicLayerQueryUrl(config));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const geojson = await response.json();
    const layer = createPublicMapLayer(config, geojson);
    publicMapLayers[key] = layer;
    layer.addTo(map);
  } catch (error) {
    publicLayerState[key] = false;
    showToast(`Couldn't load ${config.label}`);
    console.error(`Failed to load ${config.label}`, error);
  } finally {
    publicLayerLoadState[key] = false;
    buildPublicLayerControls();
  }
}

function hidePublicLayer(key) {
  const layer = publicMapLayers[key];
  if (layer && map.hasLayer(layer)) map.removeLayer(layer);
}

function togglePublicLayer(key) {
  publicLayerState[key] = !publicLayerState[key];
  buildPublicLayerControls();
  if (publicLayerState[key]) {
    ensurePublicLayerVisible(key);
  } else {
    hidePublicLayer(key);
  }
}

function renderAudiencePanel() {
  const config = AUDIENCES[activeAudience];
  document.getElementById("audience-description").textContent = config.description;
  document.getElementById("audience-headline").textContent = config.headline;
  document.getElementById("audience-subcopy").textContent = config.subcopy;

  document.querySelectorAll("[data-audience]").forEach((button) => {
    button.classList.toggle("active", button.dataset.audience === activeAudience);
  });
}

function renderInsightStory() {
  const meta = YEAR_META[currentYear];
  const openings = getNewProjects(currentYear);
  const storyTitle = openings.length === 0 ? "No major tracked openings" : `${openings.length} notable opening${openings.length === 1 ? "" : "s"}`;
  let storyBody = openings.length === 0
    ? getTopCategorySummary(currentYear)
    : openings
        .slice(0, 2)
        .map((item) => `${item.dev.name} in ${item.sector.name}`)
        .join(" and ");

  if (openings.length > 2) {
    storyBody += ` plus ${openings.length - 2} more project${openings.length - 2 === 1 ? "" : "s"}.`;
  } else if (openings.length > 0) {
    storyBody += ".";
  }

  document.getElementById("insight-phase").textContent = meta.phase;
  document.getElementById("insight-phase-desc").textContent = meta.desc;
  document.getElementById("insight-story-title").textContent = storyTitle;
  document.getElementById("insight-story-body").textContent = storyBody;
}

function updateSliderTrack() {
  const slider = document.getElementById("yearSlider");
  const pct = ((currentYear - 2026) / (2040 - 2026)) * 100;
  slider.style.background = `linear-gradient(to right, #006a61 0%, #006a61 ${pct}%, #dce9ff ${pct}%, #dce9ff 100%)`;
}

function updateYear() {
  const meta = YEAR_META[currentYear];
  const newCount = countNewThisYear(currentYear);

  document.getElementById("year-display").textContent = currentYear;
  document.getElementById("header-year-badge").textContent = `Viewing: ${currentYear}`;
  document.getElementById("phase-label").textContent = meta.phase;
  document.getElementById("hdr-pop").textContent = meta.pop;
  document.getElementById("hdr-schools").textContent = meta.schools;
  document.getElementById("hdr-new").textContent = newCount;
  document.getElementById("delta-count").textContent = newCount > 0 ? `${newCount} projects` : "-";

  updateSliderTrack();
  refreshSectorColors();
  buildMarkers();
  renderInsightStory();

  if (currentYear !== prevYear) {
    const gains = getNewProjects(currentYear).map((item) => item.dev.name);
    if (gains.length > 0) {
      showToast(gains.length === 1 ? `${gains[0]} opens in ${currentYear}` : `${gains.length} projects open in ${currentYear}`);
    }
  }

  if (activeSectorId) {
    const sector = SECTORS.find((item) => item.id === activeSectorId);
    if (sector) renderDrawerContent(sector);
  }
}

function openDrawer(sectorId, devName) {
  activeSectorId = sectorId;
  focusDev = devName || null;
  const sector = SECTORS.find((item) => item.id === sectorId);
  if (!sector) return;

  renderDrawerContent(sector);
  document.getElementById("drawer").classList.add("open");
  refreshSectorColors();

  const yearPanel = document.getElementById("year-panel");
  if (window.innerWidth > 640) {
    yearPanel.style.left = "calc(50% - 210px)";
    yearPanel.style.transform = "none";
  }
}

function closeDrawer() {
  document.getElementById("drawer").classList.remove("open");
  activeSectorId = null;
  focusDev = null;
  refreshSectorColors();

  const yearPanel = document.getElementById("year-panel");
  yearPanel.style.left = "50%";
  yearPanel.style.transform = "translateX(-50%)";
}

function renderDrawerContent(sector) {
  const cat = CATS[sector.category];
  document.getElementById("drawer-cat-dot").style.background = cat.color;
  document.getElementById("drawer-cat-label").textContent = cat.label;
  document.getElementById("drawer-title").textContent = sector.name;
  document.getElementById("drawer-tagline").textContent = sector.tagline;

  const newDevs = sector.developments.filter((dev) => isNewThisYear(dev, currentYear));
  const banner = document.getElementById("drawer-delta-banner");
  if (newDevs.length > 0) {
    banner.classList.remove("hidden");
    document.getElementById("drawer-delta-text").textContent = newDevs.length === 1
      ? `${newDevs[0].name} opens in ${currentYear}`
      : `${newDevs.length} new developments open in ${currentYear}`;
  } else {
    banner.classList.add("hidden");
  }

  const statsEl = document.getElementById("drawer-stats");
  statsEl.innerHTML = "";
  sector.stats.forEach((stat) => {
    const div = document.createElement("div");
    div.className = "bg-surface-container-lowest rounded-xl p-3";
    div.style.border = "1px solid rgba(9,20,38,0.06)";
    div.innerHTML = `
      <span class="material-symbols-outlined fill-icon text-secondary mb-1" style="font-size:18px">${stat.icon}</span>
      <div class="text-[10px] text-outline font-medium uppercase tracking-wider mb-0.5">${stat.label}</div>
      <div class="font-headline font-bold text-primary text-sm leading-tight">${stat.value}</div>
    `;
    statsEl.appendChild(div);
  });

  const devsEl = document.getElementById("drawer-devs");
  devsEl.innerHTML = "";

  const sorted = [...sector.developments].sort((a, b) => {
    if (a.status === "existing" && b.status !== "existing") return -1;
    if (b.status === "existing" && a.status !== "existing") return 1;
    return a.openYear - b.openYear;
  });

  const byGroup = { existing: [], open: [], building: [], planned: [] };
  sorted.forEach((dev) => {
    if (dev.status === "existing") {
      byGroup.existing.push(dev);
    } else {
      byGroup[getStatus(dev, currentYear)].push(dev);
    }
  });

  const groupLabels = {
    existing: "Established",
    open: `Open by ${currentYear}`,
    building: "Under Construction",
    planned: `Planned for ${currentYear + 1}+`
  };
  const groupColors = {
    existing: "#6B7280",
    open: "#16A34A",
    building: "#D97706",
    planned: "#9CA3AF"
  };

  Object.entries(byGroup).forEach(([group, devs]) => {
    if (devs.length === 0) return;

    const groupHeader = document.createElement("div");
    groupHeader.className = "flex items-center gap-2 mb-2 mt-4 first:mt-0";
    groupHeader.innerHTML = `
      <span class="w-2 h-2 rounded-full flex-shrink-0" style="background:${groupColors[group]}"></span>
      <span class="text-[10px] font-bold uppercase tracking-[0.15em]" style="color:${groupColors[group]}">${groupLabels[group]}</span>
    `;
    devsEl.appendChild(groupHeader);

    devs.forEach((dev) => {
      const isNew = isNewThisYear(dev, currentYear);
      const isFocused = focusDev && focusDev === dev.name;
      const costHtml = dev.cost && dev.cost !== "N/A" ? `<div class="text-[10px] text-outline mt-1">Cost: ${dev.cost}</div>` : "";
      const badgeHtml = isNew
        ? `<span class="new-badge inline-flex items-center gap-1 text-[10px] font-bold text-on-secondary-container bg-secondary-container/60 rounded-full px-2 py-0.5 ml-2">New in ${currentYear}</span>`
        : "";
      const sourceLinks = (dev.sources || []).map((source) => `
        <a href="${source.url}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-[10px] text-secondary hover:underline font-medium">
          <span class="material-symbols-outlined" style="font-size:12px">open_in_new</span>${source.label}
        </a>
      `).join(" ");

      const card = document.createElement("div");
      card.className = `rounded-xl p-4 mb-2 transition-all ${isFocused ? "year-flash" : ""}`;
      card.style.cssText = `background:#fff;border:1px solid rgba(9,20,38,${isNew ? "0.1" : "0.05"});${isNew ? "box-shadow:0 0 0 2px rgba(0,106,97,0.15);" : ""}`;
      card.innerHTML = `
        <div class="flex items-start justify-between gap-2 mb-1">
          <span class="font-headline font-bold text-primary text-sm leading-tight">${dev.name}${badgeHtml}</span>
        </div>
        <div class="text-[10px] text-outline mb-1.5">${dev.address}</div>
        <p class="text-xs text-on-surface-variant leading-relaxed mb-2">${dev.desc}</p>
        ${costHtml}
        ${sourceLinks ? `<div class="mt-2 flex flex-wrap gap-2">${sourceLinks}</div>` : ""}
      `;
      devsEl.appendChild(card);
    });
  });

  const srcList = document.getElementById("drawer-sources-list");
  srcList.innerHTML = "";
  sector.sources.forEach((source) => {
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.className = "flex items-center gap-2 text-xs text-on-surface-variant hover:text-primary transition-colors rounded-lg px-3 py-2";
    link.style.background = "#fff";
    link.style.border = "1px solid rgba(9,20,38,0.06)";
    link.innerHTML = `<span class="material-symbols-outlined text-secondary" style="font-size:14px">link</span>${source.label}`;
    srcList.appendChild(link);
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function focusSector(sectorId, devName = null) {
  const sector = SECTORS.find((item) => item.id === sectorId);
  if (!sector) return;
  openDrawer(sectorId, devName);
  map.fitBounds(sector.polygon, { padding: [60, 60] });
}

function runSearch(query) {
  const term = query.trim().toLowerCase();
  document.getElementById("search-clear").style.visibility = term ? "visible" : "hidden";
  if (!term) return;

  const sectorMatch = SECTORS.find((sector) =>
    sector.name.toLowerCase().includes(term) ||
    sector.tagline.toLowerCase().includes(term)
  );

  if (sectorMatch) {
    focusSector(sectorMatch.id);
    showToast(`Jumped to ${sectorMatch.name}`);
    return;
  }

  for (const sector of SECTORS) {
    const devMatch = sector.developments.find((dev) =>
      dev.name.toLowerCase().includes(term) ||
      dev.address.toLowerCase().includes(term)
    );
    if (devMatch) {
      focusSector(sector.id, devMatch.name);
      showToast(`Jumped to ${devMatch.name}`);
      return;
    }
  }

  showToast("No matching sector or project found");
}

function setupEventListeners() {
  document.getElementById("btn-sat").addEventListener("click", () => setMapStyle("satellite"));
  document.getElementById("btn-street").addEventListener("click", () => setMapStyle("street"));
  document.getElementById("drawer-close").addEventListener("click", closeDrawer);

  document.getElementById("yearSlider").addEventListener("input", (event) => {
    prevYear = currentYear;
    currentYear = parseInt(event.target.value, 10);
    updateYear();
  });

  document.querySelectorAll("[data-audience]").forEach((button) => {
    button.addEventListener("click", () => {
      activeAudience = button.dataset.audience;
      renderAudiencePanel();
    });
  });

  document.getElementById("toggle-insight-panel").addEventListener("click", () => {
    document.getElementById("insight-panel").classList.add("collapsed");
  });

  document.getElementById("mobile-panel-open").addEventListener("click", () => {
    document.getElementById("insight-panel").classList.remove("collapsed");
  });

  const searchInput = document.getElementById("sector-search-input");
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      runSearch(searchInput.value);
    }
  });

  document.getElementById("search-clear").addEventListener("click", () => {
    searchInput.value = "";
    document.getElementById("search-clear").style.visibility = "hidden";
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 880) {
      document.getElementById("insight-panel").classList.remove("collapsed");
    }
    if (!activeSectorId) {
      const yearPanel = document.getElementById("year-panel");
      if (window.innerWidth <= 640) {
        yearPanel.style.left = "12px";
        yearPanel.style.transform = "none";
      } else {
        yearPanel.style.left = "50%";
        yearPanel.style.transform = "translateX(-50%)";
      }
    }
  });

  map.on("click", () => {
    if (activeSectorId) closeDrawer();
  });
}

function addTooltipOverrides() {
  const style = document.createElement("style");
  style.textContent = `
    .leaflet-tooltip-custom { padding: 0; background: transparent; border: none; box-shadow: none; }
    .leaflet-tooltip-custom::before { display: none; }
  `;
  document.head.appendChild(style);
}

function init() {
  buildSectors();
  buildFilters();
  buildPublicLayerControls();
  buildQuickJump();
  renderAudiencePanel();
  addTooltipOverrides();
  setupEventListeners();
  updateYear();
  document.getElementById("search-clear").style.visibility = "hidden";
  Object.entries(publicLayerState).forEach(([key, active]) => {
    if (active) ensurePublicLayerVisible(key);
  });
}

init();
