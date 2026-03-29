window.CELINA_DEMO_DATA = {
  meta: {
    generatedAt: "2026-03-29T00:00:00-05:00",
    lastRefreshLabel: "Mar 29, 2026",
    coverageNote: "Public-web Celina shortlist demo"
  },
  marketContext: {
    city: {
      population2025: 64726,
      population2024Census: 51661,
      growthSince2020Pct: 206
    },
    redfin: {
      medianSalePrice: 477500,
      medianSalePricePerSqft: 172,
      medianDaysOnMarket: 139,
      saleToListPct: 96.3,
      priceDropsPct: 45.6,
      migrationStayPct: 69,
      inboundLeaders: ["Los Angeles", "Seattle", "Washington, DC"]
    },
    realtor: {
      medianListPrice: 569312,
      medianListPricePerSqft: 218,
      medianDaysOnMarket: 88,
      medianRent: 1997,
      activeListings: 1894
    }
  },
  investorGoals: [
    {
      id: "fast-flip",
      label: "Fast flip (recommended)",
      weighting: {
        fastExecution: 1.2,
        negotiability: 1.1,
        growthProximity: 0.6,
        discountToMarket: 1.3
      }
    },
    {
      id: "entry-equity",
      label: "Entry equity",
      weighting: {
        fastExecution: 0.8,
        negotiability: 1,
        growthProximity: 0.5,
        discountToMarket: 1.4
      }
    },
    {
      id: "growth-corridor",
      label: "Growth corridor bet",
      weighting: {
        fastExecution: 0.4,
        negotiability: 0.8,
        growthProximity: 1.4,
        discountToMarket: 0.8
      }
    }
  ],
  rehabModes: [
    { id: "light", label: "Light" },
    { id: "medium", label: "Medium" },
    { id: "heavy", label: "Heavy" }
  ],
  quickFilters: [
    {
      id: "all",
      label: "All deals"
    },
    {
      id: "under-450",
      label: "Under $450k"
    },
    {
      id: "deep-cuts",
      label: "Deep cuts"
    },
    {
      id: "near-dnt",
      label: "Near DNT / hospital"
    },
    {
      id: "green-meadows",
      label: "Green Meadows pocket"
    }
  ],
  catalysts: [
    {
      id: "downtown-square",
      name: "Downtown square",
      category: "civic",
      lat: 33.3049,
      lng: -96.7834,
      color: "#2f6fec",
      impactWeight: 3,
      influenceMiles: 2,
      targetDateLabel: "Active today",
      summary: "Historic core with Main Street traffic, city services, and event-driven footfall."
    },
    {
      id: "shawnee-trail",
      name: "Shawnee Trail retail node",
      category: "retail",
      lat: 33.321,
      lng: -96.784,
      color: "#eb8b1f",
      impactWeight: 4,
      influenceMiles: 2.4,
      targetDateLabel: "Retail wave underway",
      summary: "Major north Preston growth node expected to pull retail gravity and daily traffic."
    },
    {
      id: "methodist-celina",
      name: "Methodist Celina Medical Center",
      category: "medical",
      lat: 33.2873,
      lng: -96.8205,
      color: "#d14f43",
      impactWeight: 5,
      influenceMiles: 3.1,
      targetDateLabel: "Opened Mar 17, 2025",
      summary: "Celina's first full-service hospital adds jobs, healthcare access, and corridor credibility."
    },
    {
      id: "dnt-extension",
      name: "Dallas North Tollway extension",
      category: "transport",
      lat: 33.2935,
      lng: -96.819,
      color: "#6d7280",
      impactWeight: 5,
      influenceMiles: 4.2,
      targetDateLabel: "Targeted by end of 2027",
      summary: "NTTA extension from US 380 to FM 428 should materially improve west Celina access."
    },
    {
      id: "heb-legacy-hills",
      name: "H-E-B / Legacy Hills site",
      category: "retail",
      lat: 33.2918,
      lng: -96.8168,
      color: "#eb8b1f",
      impactWeight: 4,
      influenceMiles: 3.2,
      targetDateLabel: "Land purchased Apr 2024",
      summary: "H-E-B acquired 21 acres at DNT and Fred Smith Parkway inside Legacy Hills."
    },
    {
      id: "wilson-creek-park",
      name: "Wilson Creek Park",
      category: "park",
      lat: 33.3118,
      lng: -96.753,
      color: "#18794e",
      impactWeight: 3,
      influenceMiles: 2.8,
      targetDateLabel: "Phase 1 projected fall 2026",
      summary: "Official 100-acre flagship park project with fields, trails, and recreation amenities."
    }
  ],
  properties: [
    {
      id: "p-16600-garden",
      address: "16600 Garden Dr, Celina, TX 75009",
      neighborhood: "Green Meadows",
      lat: 33.287436,
      lng: -96.848372,
      listPrice: 389000,
      originalListPrice: 389000,
      redfinEstimate: 389307,
      pricePerSqft: 216,
      squareFeet: 1803,
      lotSqft: 6098,
      beds: 3,
      baths: 2,
      yearBuilt: 2021,
      daysOnMarket: 80,
      rehabLevel: "light",
      noMudPid: false,
      summary: "Entry-price Green Meadows option with modern finish-out and direct DNT access for a lower basis play.",
      tags: ["Entry basis", "Near DNT", "Amenity subdivision"],
      sourceUrl: "https://www.redfin.com/TX/Celina/16600-Garden-Dr-75009/home/176693080",
      supportingSourceUrls: [
        {
          label: "Green Meadows / Wilson Creek",
          url: "https://www.celina-tx.gov/1514/Wilson-Creek-Park"
        }
      ],
      risks: [
        "Model spread is narrow, so profit depends on buying discipline and very light renovation scope.",
        "Green Meadows inventory is broad enough that resale competition can cap upside if finish quality is only average."
      ]
    },
    {
      id: "p-16913-clover",
      address: "16913 Clover Dr, Celina, TX 75009",
      neighborhood: "Green Meadows",
      lat: 33.287734,
      lng: -96.844514,
      listPrice: 608000,
      originalListPrice: 608000,
      redfinEstimate: 601238,
      pricePerSqft: 191,
      squareFeet: 3177,
      lotSqft: 8320,
      beds: 5,
      baths: 3,
      yearBuilt: 2022,
      daysOnMarket: 2,
      rehabLevel: "light",
      noMudPid: true,
      summary: "Large Green Meadows floor plan at a reasonable price per square foot, but too fresh to assume easy negotiation yet.",
      tags: ["Large plan", "Fresh listing", "CISD"],
      sourceUrl: "https://www.redfin.com/TX/Celina/16913-Clover-Dr-75009/home/176691025",
      supportingSourceUrls: [
        {
          label: "Redfin market context",
          url: "https://www.redfin.com/city/30799/TX/Celina/housing-market"
        }
      ],
      risks: [
        "Very low DOM means there may not be enough seller fatigue yet for a true distressed entry.",
        "Because the list is close to model value, the flip case leans more on micro-execution than obvious mispricing."
      ]
    },
    {
      id: "p-2904-open-range",
      address: "2904 Open Range Dr, Celina, TX 75009",
      neighborhood: "Buffalo Ridge",
      lat: 33.358286,
      lng: -96.760108,
      listPrice: 460000,
      originalListPrice: 495000,
      redfinEstimate: 454816,
      pricePerSqft: 183,
      squareFeet: 2514,
      lotSqft: 6444,
      beds: 4,
      baths: 3,
      yearBuilt: 2021,
      daysOnMarket: 81,
      rehabLevel: "light",
      noMudPid: true,
      summary: "North Celina value play with a meaningful list cut, no PID/MUD, and room for cosmetic packaging.",
      tags: ["No PID/MUD", "North growth", "Price reduced"],
      sourceUrl: "https://www.redfin.com/TX/Celina/2904-Open-Range-Dr-75009/home/169614770",
      supportingSourceUrls: [
        {
          label: "Celina quickfacts",
          url: "https://www.census.gov/quickfacts/fact/table/celinacitytexas/SEX255223"
        }
      ],
      risks: [
        "This pocket sits farther from the strongest west-corridor catalysts, so upside depends more on basis than on nearby project delivery.",
        "Model value currently trails ask slightly, which limits room for overpaying on entry."
      ]
    },
    {
      id: "p-3018-seattle-slew",
      address: "3018 Seattle Slew Dr, Celina, TX 75009",
      neighborhood: "Mustang Lakes",
      lat: 33.280738,
      lng: -96.735839,
      listPrice: 495000,
      originalListPrice: 569000,
      redfinEstimate: 498885,
      pricePerSqft: 207,
      squareFeet: 2393,
      lotSqft: 6011,
      beds: 3,
      baths: 2,
      yearBuilt: 2016,
      daysOnMarket: 123,
      rehabLevel: "medium",
      noMudPid: false,
      summary: "One of the cleaner negotiation setups in the demo: 13% off the original ask inside a slower Mustang Lakes micro-market.",
      tags: ["Long DOM", "Price cut", "Established pocket"],
      sourceUrl: "https://www.redfin.com/TX/Celina/3018-Seattle-Slew-Dr-75009/home/109065906",
      supportingSourceUrls: [
        {
          label: "Mustang Lakes market insight",
          url: "https://www.redfin.com/TX/Celina/3018-Seattle-Slew-Dr-75009/home/109065906"
        }
      ],
      risks: [
        "Mustang Lakes is still a buyer's market, so the same softness helping you buy can slow exit speed.",
        "The home is not a pure cosmetic slam-dunk; the best case assumes better merchandising and some targeted improvement spend."
      ]
    },
    {
      id: "p-704-corner-post",
      address: "704 Corner Post Path, Celina, TX 75009",
      neighborhood: "Light Farms",
      lat: 33.271999,
      lng: -96.793306,
      listPrice: 659000,
      originalListPrice: 720000,
      redfinEstimate: 645497,
      pricePerSqft: 207,
      squareFeet: 3187,
      lotSqft: 5881,
      beds: 4,
      baths: 3,
      yearBuilt: 2020,
      daysOnMarket: 115,
      rehabLevel: "light",
      noMudPid: false,
      summary: "Amenity-heavy Light Farms listing with an 8.5% cut from original ask and real seller-seasoning.",
      tags: ["Greenbelt lot", "Negotiable", "Amenity resale"],
      sourceUrl: "https://www.redfin.com/TX/Celina/704-Corner-Post-Path-75009/home/144137895",
      supportingSourceUrls: [
        {
          label: "Redfin listing history",
          url: "https://www.redfin.com/TX/Celina/704-Corner-Post-Path-75009/home/144137895"
        }
      ],
      risks: [
        "Estimate still sits below ask, so a disciplined buy price matters more than usual.",
        "HOA-heavy resale communities can force you to compete on finish quality and timing instead of scarcity."
      ]
    },
    {
      id: "p-3308-zenyatta",
      address: "3308 Zenyatta Ct, Celina, TX 75009",
      neighborhood: "Mustang Lakes",
      lat: 33.273736,
      lng: -96.732105,
      listPrice: 1039500,
      originalListPrice: 1150000,
      redfinEstimate: 1030883,
      pricePerSqft: 240,
      squareFeet: 4335,
      lotSqft: 10454,
      beds: 5,
      baths: 4.5,
      yearBuilt: 2021,
      daysOnMarket: 14,
      rehabLevel: "light",
      noMudPid: false,
      summary: "Premium-end repricing play for a developer or well-capitalized investor, but luxury liquidity is thinner and slower.",
      tags: ["Luxury", "Mustang Lakes", "Large cut from 2025"],
      sourceUrl: "https://www.redfin.com/TX/Celina/3308-Zenyatta-Ct-75009/home/173553948",
      supportingSourceUrls: [
        {
          label: "Mustang Lakes market context",
          url: "https://www.redfin.com/TX/Celina/3308-Zenyatta-Ct-75009/home/173553948"
        }
      ],
      risks: [
        "Luxury buyer depth is limited, so holding costs can rise fast if the exit misses the first buyer wave.",
        "At this basis, even a small execution miss can erase margin."
      ]
    },
    {
      id: "p-516-alabama",
      address: "516 S Alabama St, Celina, TX 75009",
      neighborhood: "Old Celina / Downtown",
      lat: 33.2996,
      lng: -96.7848,
      listPrice: 474900,
      originalListPrice: 499900,
      redfinEstimate: 455546,
      pricePerSqft: 257,
      squareFeet: 1847,
      lotSqft: 9583,
      beds: 3,
      baths: 2,
      yearBuilt: 1984,
      daysOnMarket: 411,
      rehabLevel: "light",
      noMudPid: true,
      summary: "Downtown-adjacent turnkey house with Airbnb history and a big lot, but it still prices rich versus broader zip-level market benchmarks.",
      tags: ["Downtown", "Short-term-rental history", "Oversized lot"],
      sourceUrl: "https://www.redfin.com/TX/Celina/516-S-Alabama-St-75009/home/31994290",
      supportingSourceUrls: [
        {
          label: "Downtown Celina",
          url: "https://www.celina-tx.gov/908/Main-Street"
        }
      ],
      risks: [
        "The listing has huge DOM but still sits above model value and above zip-level active-listing ppsf norms.",
        "This looks more like a use-case property than a clean flip spread."
      ]
    }
  ],
  sources: [
    {
      label: "City of Celina",
      url: "https://www.celina-tx.gov/",
      note: "Official population stat of 64,726 as of January 1, 2025, plus public GIS and CIP links."
    },
    {
      label: "U.S. Census QuickFacts",
      url: "https://www.census.gov/quickfacts/fact/table/celinacitytexas/SEX255223",
      note: "July 1, 2024 population estimate of 51,661 and 206.0% growth since the 2020 base."
    },
    {
      label: "Redfin Celina housing market",
      url: "https://www.redfin.com/city/30799/TX/Celina/housing-market",
      note: "February 2026 sale pricing, days on market, price-drop rate, and migration-search trends."
    },
    {
      label: "Realtor 75009 overview",
      url: "https://www.realtor.com/realestateandhomes-search/75009/overview",
      note: "January 2026 list pricing, active listings, and rent benchmark."
    },
    {
      label: "Methodist Celina",
      url: "https://www.methodisthealthsystem.org/press-releases/2025/march/first-hospital-in-celina-opens-its-doors-to-pati/",
      note: "Official confirmation that Celina's first hospital opened March 17, 2025."
    },
    {
      label: "NTTA DNT extension",
      url: "https://www.ntta.org/ntta-board-approves-dallas-north-tollway-extension-contracts",
      note: "Official target to open the US 380 to FM 428 extension by the end of 2027."
    },
    {
      label: "Celina EDC / H-E-B",
      url: "https://celinaedc.com/about/in-the-news/h-e-b-purchases-land-in-celina-texas",
      note: "Official EDC note on H-E-B's 21-acre Legacy Hills acquisition in April 2024."
    }
  ]
};
