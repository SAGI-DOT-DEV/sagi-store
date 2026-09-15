import { JournalArticle } from '../types';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'architectural-form-garri',
    volume: 'VOL IV',
    issue: 'ISSUE 01',
    title: 'The Architectural Form of Ibeju Garri',
    subtitle: 'Thermal Expansion, Swelling Index & Hydration Kinetics in Fire-Roasted Cassava',
    category: 'Technique',
    author: 'Chef Adebayo Adeleke & Dr. Kemi Oshodi',
    readTime: '12 min study',
    date: 'Autumn Harvest 2025',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNWuEfLcDlUmvzzkdNbS-F8xV0A8Ew4j9Rkiize-jmHUFsOubX2p3url6_pJ_9s_zidgDll4jOeqHUwkTIlKBRCUGJY2Ukjt_P8SBt423oK8iRvs3zt-Yy3HfIp54NovPhI2vIV6dXWvM6p0NCzfAw_qxycFUxZADKmowiINHeSAmMZLuCyZIvZxuBm_OjbWbdnpl79o7XwjbzCLH0u2QDn4CZNgeGf_Y2PB8Fddi4Wziyqm76QYLyqg',
    abstract: 'An exhaustive gastronomic inquiry into how iron-trough roasting parameters influence the gelatinization ceiling and water retention ratio of artisan cassava flakes. Examining the structural transformation of starch granules under sustained dry heat.',
    featured: true,
    fullTechnique: {
      scientificBasis: 'Cassava starch undergoes irreversible gelatinization between 65°C and 73°C. During the traditional garification roasting step in thick cast iron pans, rapid surface moisture evaporation creates microscopic porosity while preserving crystalline starch cores. This precise structure allows the grain to expand up to 450% by volume in cold liquids without turning into an unstructured slurry.',
      temperature: '185°C Pan Surface / 94°C Core Starch Matrix',
      hydrationRatio: '1 Part Garri : 3.8 Parts Boiling Spring Water (Eba) or 1 : 4.5 Iced Water (Soak)',
      restingTime: '90 Seconds covered hydration before turning',
      steps: [
        {
          stepNumber: 1,
          title: 'Hydration Shock Calibration',
          description: 'Measure pristine boiled water at 98°C. Pour into a seasoned earthenware or copper bowl in a single steady stream without agitation.',
          tip: 'Do not pour water over the garri; instead, cascade the dry garri evenly over the steaming water surface to prevent dry clumping.'
        },
        {
          stepNumber: 2,
          title: 'Gravity Precipitation & Surface Swell',
          description: 'Allow the grains to sink naturally and absorb the liquid column over 45 seconds. Do not insert a spatula during this initial phase.',
          tip: 'Observe the formation of tiny steam vents across the upper crust.'
        },
        {
          stepNumber: 3,
          title: 'Centripetal Folding & Shearing',
          description: 'Using a carved wooden omorogun (turning spatula), fold from the outer rim toward the center in broad, continuous strokes for 60 seconds until a cohesive, translucent dome emerges.',
          tip: 'Moderate shear force aligns the amylopectin strands, producing a silky sheen with zero stickiness.'
        },
        {
          stepNumber: 4,
          title: 'Steam Tempering',
          description: 'Form into a smooth spherical mass, seal with a warm linen cloth, and rest for 2 minutes before plating.',
          tip: 'This rests the thermal gradient and locks in elastic tension.'
        }
      ],
      equipmentNeeded: ['Hand-carved Iroko Omorogun', 'Heavy Glazed Earthenware Basin', 'Precision Water Kettle', 'Digital Infrared Thermometer'],
      pairings: ['Wild-caught seafood okra broth', 'Caramelized shallot and smoked mackerel stew', 'Bitterleaf soup infused with dry aged bushmeat stock']
    }
  },
  {
    id: 'study-in-elasticity-pounded-yam',
    volume: 'VOL IV',
    issue: 'ISSUE 02',
    title: 'A Study in Elasticity: Pounded Yam',
    subtitle: 'Viscoelastic Starch Matrix, Cell Wall Rupture & Mechanical Pounding Dynamics',
    category: 'Tubers',
    author: 'Oluwaseun Balogun',
    readTime: '15 min study',
    date: 'Winter Release 2025',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-4YmBNcztq0PUORO3yuqXTReh8XZPeWzJr-AmtOSzBMHtnKntVhraNnfqSrQnYdz0iXw5Us1ieA6GEVSyAwfpH-baBsaOOx8yUYHrO5PTKUHgef8XWFFLuui0pxgDdO6Itf7irJCllSVavg5eeOTcvA8KfwdtAMn4zU5znugrxMDpkSdI7qMGm9Mcstnf-y1F8NW6KITl5145qngF6Zl6hFu8P0FPqsupqbX05jUwQPgXOdKPNyGm_w',
    abstract: 'Investigating the non-Newtonian fluid dynamics of Dioscorea rotundata during mortar impact. How controlled rhythmic shearing ruptures plant cell walls to release intact amylose networks without excessive cellular damage.',
    featured: true,
    fullTechnique: {
      scientificBasis: 'Pounding yam is a precise mechanical degradation process. High-velocity wooden pestle strokes break open parenchymal plant cells, releasing starch polymers into a continuous elastic matrix. If tubers are under-steamed or hammered with excessive friction, starches over-rupture and become gummy. If properly tempered, the result is pillowy, stretchable silk.',
      temperature: '100°C Steaming Core / 62°C Post-Pound Service',
      hydrationRatio: 'Inherent 68% tuber water content + 5% hot water steam injection',
      restingTime: 'Serve immediately at peak elastic stretch',
      steps: [
        {
          stepNumber: 1,
          title: 'Tuber Curation & Steam Penetration',
          description: 'Select white yams aged at least 60 days in dark aerated silos to allow moisture equilibrium. Steam thick rounds until a pairing knife meets zero resistance.',
          tip: 'Never boil in excess water; steam elevates internal starch without waterlogging.'
        },
        {
          stepNumber: 2,
          title: 'Initial Crushing Stroke',
          description: 'Transfer hot yam cubes directly into a warm wooden mortar. Strike with vertical downward force to fragment structural fibers into a coarse meal.',
          tip: 'Work quickly while internal heat remains above 85°C.'
        },
        {
          stepNumber: 3,
          title: 'The Rhythmic Elliptical Swirl',
          description: 'Shift from vertical pounding to an angled rolling motion against the mortar walls, stretching the starch filaments into tensile ribbons.',
          tip: 'Add 2 tablespoons of steaming yam broth to lubricate the wall friction.'
        },
        {
          stepNumber: 4,
          title: 'Aeration & Plating',
          description: 'Fold the glossy mass upon itself three times and sculpt into a seamless sphere with dampened hands.',
          tip: 'Surface should bounce gently when pressed.'
        }
      ],
      equipmentNeeded: ['Seasoned Solid Teak Mortar & Pestle', 'Perforated Bamboo Steamer', 'Carved Calabash Mold'],
      pairings: ['Egusi soup enriched with toasted pumpkin seeds', 'Ofe Nsala (White Soup) with fresh Utazi herb ribbons']
    }
  },
  {
    id: 'palm-oil-fractionation',
    volume: 'VOL III',
    issue: 'ISSUE 04',
    title: 'The Chemistry of Bleached Palm Oil & Carotene Pyrolysis',
    subtitle: 'Thermal Degumming, Free Fatty Acid Equilibria & Flavor Extraction',
    category: 'Oils',
    author: 'Culinary Laboratory Team',
    readTime: '9 min study',
    date: 'Harvest Cycle 2025',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN1uGWFs9TriY3Z_klRAHrUmYQrGeavTcA34rXZn76ZiJybkbwNM5cXMD2sxCkbKslIwK8Yq2uDzFLCo0kE7p8H11GFgqv6OhQKoPpLNFCaFmom0aDI2j1bDPAQfzLbDvpTSKq2FTmdQw-kFe0YnSQ_srmcbO5yGjeF8E8o3470jf6tK0bojUwiQi7cQq5vG9QUlYAjs0__FzNuSsYAjdwq1d28IT0C6p22I8LY5OzFEf4hLjvaE1e0w',
    abstract: 'A rigorous analysis of traditional low-oxygen bleaching techniques for palm oil. How heat transforms deep ruby carotenoids into golden, nutty, and savory aroma compounds without producing harmful acrolein fumes.',
    featured: false,
    fullTechnique: {
      scientificBasis: 'Beta-carotene in unrefined palm oil degrades at 210°C into aromatic volatile ketones and ionones. By using a sealed heavy pot, oxidation is regulated and the oil develops deep roasted nut notes characteristic of authentic Ayamase sauce.',
      temperature: '205°C - 215°C Under tight lid seal',
      hydrationRatio: 'Anhydrous lipid medium',
      restingTime: '15 Minutes cool-down before opening lid',
      steps: [
        {
          stepNumber: 1,
          title: 'Aneroid Pot Setup',
          description: 'Pour cold-pressed palm oil into a heavy cast-iron Dutch oven with a tightly fitted heavy lid.',
          tip: 'Ensure the pot is completely dry; trace moisture causes volatile splatters.'
        },
        {
          stepNumber: 2,
          title: 'Slow Thermal Transition',
          description: 'Heat on medium-low flame for 12-14 minutes until the oil transforms from dark crimson to a clear amber-honey hue.',
          tip: 'Do not remove the lid during active heating to retain volatile flavor precursors.'
        },
        {
          stepNumber: 3,
          title: 'Aromatic Quenching',
          description: 'Kill heat source and rest until room temperature before carefully introducing chopped red onions and locust beans.',
          tip: 'The sizzling reaction releases deep nutty pyrazines.'
        }
      ],
      equipmentNeeded: ['Enameled Cast Iron Dutch Oven', 'Laser Pyrometer', 'Fine Wire Skimmer'],
      pairings: ['Ayamase / Designer Rice Sauce', 'Obe Ata Dindin', 'Crisped Smoked Fish stew']
    }
  },
  {
    id: 'ofada-aging-fermentation',
    volume: 'VOL II',
    issue: 'ISSUE 08',
    title: 'Hydration Thermodynamics in Aged Ofada Rice',
    subtitle: 'Microbial Parboiling, Bran Retention & Gelatinization Behavior',
    category: 'Grains',
    author: 'Dr. Chinedu Eze & Master Miller Folake',
    readTime: '11 min study',
    date: 'Monsoon Cycle 2025',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASswgm3t3vPQ8GmZIZpoPTUE-M5D6B5dQ1iyhmDU3hcwkAFn_Jgx-bGCOyVuNsErEOJTpPK2_-DGCIQ-eOwAtYB-Qn0phUXDhtX3QYUs9CsGO-lvWiZqFrS5ptYrJ8SiArD1jwMTDwJAVPUwE2MxNXkHm2AGk3wkbRZ2lKpZvKsntN9Lpc95CoEXAQQ6jfT5lkygYXHUtyI8s7GF_D9TCbNqW-2DJI4iuUV7u5-vRqlpRCaQgS36Yohw',
    abstract: 'Deconstructing the unique soaking and steam-pressure dynamics required for unpolished West African heirloom rice to achieve distinct, non-sticky, separate grains with maximum aroma retention.',
    featured: false
  },
  {
    id: 'ewa-agoyin-slow-reduction',
    volume: 'VOL III',
    issue: 'ISSUE 02',
    title: 'The Science of Caramelized Pepper Reductions (Agoyin)',
    subtitle: 'Maillard Browning, Capsaicin Volatilization & Sugar Concentration in Honey Beans',
    category: 'Legumes',
    author: 'Chef Ifeoma Nwosu',
    readTime: '10 min study',
    date: 'Mid-Season 2025',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoq7iSwG5LBIHNixqsN7S9RWoOJ0iWhaVETXX5V79tw3unJCjQCyb8xMyzbLqOEsUkgv_tLddHAuzVYGvyf3hSuidc5duywHHJvXuP55YWOQEgYwgfK7Y7XmEZysyqN-Cn8Jkw05JHUvUUDX-ejWfi_hMpJFS-0dJI68s7s9MBLm74I685fOzIaHfsdciK_9W-qAoR0wqccx2BTZIBDWrm5AL-fa1cw8VlICTQ-ydAYQuCcCSvB3lpXQ',
    abstract: 'An investigation into the 3-hour slow reduction of sun-dried chilis in hot palm oil, unlocking dark cocoa-colored Umami crusts paired with velvety honey cowpeas.',
    featured: false
  },
  {
    id: 'locust-bean-enzymes',
    volume: 'VOL I',
    issue: 'ISSUE 03',
    title: 'Microbial Ecology of Bacillus Subtilis in Iru Fermentation',
    subtitle: 'Calabash Aeration Curves, Enzymatic Cleavage & Glutamic Acid Release',
    category: 'Fermentation',
    author: 'Heritage Fermenters Collective',
    readTime: '14 min study',
    date: 'Spring Equinox 2025',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn2N1sW7zQmekiM9uTuW6eGy8OMpHG-5cMZgWCFPNs0Bjqbo0CqqsrFrVYP0PegnQelwTfcqG2vijNBNZ4pVuWOaTmo738KQ9MzgH3GWMuTrLvd6kotZQT6clmMGNJl4RtAGayxvFCKUV5H8Bt5RdsDh1K1Z5HIgYjdw8XLWpbURqbK1GeWykCWrgV1LoYj5uTuAmx5693w_yJFDqzSAtoSp_iSqGyeebascywa0_xD2cCwUF7YGlJng',
    abstract: 'How traditional plantain-leaf wrapping sustains precise 42°C internal incubation temperatures, allowing natural bacterial strains to convert seed proteins into pure gastronomic richness.',
    featured: false
  }
];
