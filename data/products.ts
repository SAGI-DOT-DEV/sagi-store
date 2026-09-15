import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'ijebu-gold-garri',
    name: 'Ijebu Gold Garri',
    subtitle: 'Granular Fermented Cassava Grain',
    category: 'Cassava',
    price: 12500,
    priceFormatted: 'CAD 12,500.00',
    badge: 'Single Estate Ferment',
    tagline: 'Aged 12-Month Cassava Flakes',
    origin: 'Ijebu Ode, Ogun State',
    estate: 'Adesanya Heritage Groves',
    aging: '12 Months Fermentation',
    moistureContent: '8.4%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB7TNL-gUMMgl1r1a9CmYcVy5enVeptbPjikZGbq5nGQLBRTOoUdg2AOMW5xyLAqFqa_tIgFIAExQT4skVLZ6IDdAxNbVAGYqumfm2z13PIAnzAoMhFOZxx_3CWALlD2bSh_vQn-9gPE415wN8kVfcE-eKYUIFlEg6MtpL0JQBV6sSKO1a8VEFLnEZuCj62EAs8eBGZFUPsG2OMhPH0rlq88ELmqeR_VyDCZ0Ld5SVac-xYF2Y3azwKQ',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBB7TNL-gUMMgl1r1a9CmYcVy5enVeptbPjikZGbq5nGQLBRTOoUdg2AOMW5xyLAqFqa_tIgFIAExQT4skVLZ6IDdAxNbVAGYqumfm2z13PIAnzAoMhFOZxx_3CWALlD2bSh_vQn-9gPE415wN8kVfcE-eKYUIFlEg6MtpL0JQBV6sSKO1a8VEFLnEZuCj62EAs8eBGZFUPsG2OMhPH0rlq88ELmqeR_VyDCZ0Ld5SVac-xYF2Y3azwKQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNWuEfLcDlUmvzzkdNbS-F8xV0A8Ew4j9Rkiize-jmHUFsOubX2p3url6_pJ_9s_zidgDll4jOeqHUwkTIlKBRCUGJY2Ukjt_P8SBt423oK8iRvs3zt-Yy3HfIp54NovPhI2vIV6dXWvM6p0NCzfAw_qxycFUxZADKmowiINHeSAmMZLuCyZIvZxuBm_OjbWbdnpl79o7XwjbzCLH0u2QDn4CZNgeGf_Y2PB8Fddi4Wziyqm76QYLyqg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5Rbqh2tn0DKoLiWI_OoQpaZBtUMpQA1aQdCXjiVwoE5IBTCpGsgskdGtlX74rfFXnqxrCi9wcLKxLjfNGaC4bXH5YkDlB9LuPrweoVfAGse0ixuxYiZ6IX8PPo_RhBgPD0mT4YsZFhy9XdAWUSyS_g9FXTHmaEpodJY1oxCrmh7OEgfHvZoueLeukva3skvDMIIgg5GSblDtgmfhE6P4JkgqMLkxMj69tDxkJODswgcyFJRfztJFPBg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4eEtOXZb-bFpSmGa88MxkBD97NYMdS5WBrcUK9dYtXOeCXOhQzVPvbjmXiF4MergXAiGFFq8vAheKmcjf_Locdd8eHGX4awU9qPl3nFQ_uq1lOeiJPb5IgDaGZLTaNg7RPQx9vHvKJN95fK1JoDr2fMyXIjmKbNZ8h4qC1ryqHsULbD6dvGuuKb1AQmOCTefzNSi5mkH3TawkoAceK7Qc709YyMUIDC1bfy_lgF3DYRbTt-2NDZFPjg'
    ],
    description: 'Harvested from single-origin mature tubers, peeled by master artisans, and naturally fermented over an extended micro-climate cycle before being toasted in heavy iron pans. Yields a signature sharp tartness and crisp crunch.',
    provenanceStory: 'Cultivated in the rich loamy soils of Ijebu, this garri undergoes an artisan three-day fermentation period that develops its distinctive crisp acidity. Fire-roasted over seasoned hardwood in cast-iron troughs to ensure an unmatched crispness that holds its integrity in iced water or hot eba.',
    tastingNotes: ['Bright Lactic Acidity', 'Crisp Toasted Starch', 'Subtle Mineral Finish', 'Clean Citrus Undertone'],
    culinaryUses: ['Eba with vegetable soups', 'Chilled cereal soak with roasted peanuts & chilled evaporated milk', 'Crisp savory crust for baked seafood'],
    specifications: [
      { label: 'Harvest Year', value: '2025/2026 Batch 04' },
      { label: 'Fermentation Duration', value: '72 - 96 Hours' },
      { label: 'Roast Profile', value: 'Medium-High Iron Crisp' },
      { label: 'Grain Size', value: '0.8mm - 1.2mm Uniform Granule' }
    ],
    availableSizes: [
      { weight: '1 KG Jar', priceMultiplier: 1, inStock: true },
      { weight: '2.5 KG Reserve Box', priceMultiplier: 2.3, inStock: true },
      { weight: '5 KG Linen Sack', priceMultiplier: 4.2, inStock: true }
    ],
    featured: true
  },
  {
    id: 'aged-ofada-rice',
    name: 'Aged Ofada Rice',
    subtitle: 'Unpolished Heirloom Oryza Glaberrima',
    category: 'Grains',
    price: 18000,
    priceFormatted: 'CAD 18,000.00',
    badge: 'Artisanal Batch',
    tagline: 'Distinctive Fermented Aroma',
    origin: 'Ofada Valley, Ogun State',
    estate: 'Obafemi Lowland Cooperatives',
    aging: 'Controlled Microbial Fermentation',
    moistureContent: '10.2%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9TvPIbpo_Er_fw8mTcbWTOZrH6OTbwEWbsAMIfPPj6vysSNiE0k7eFkDZoESlePdY8LXuiDy3f9Cc1cI15Z1qqGwOcPNtnGPUuwgHnEl3H4ICQKoMX_SmezBswKxxesac0RD7ZgdaGRZzJ4olFWbusDCK4aktpLW1ckeA12325kKuB59zC3kYz4DtP03gzKD0zLUmqdd6ax5G17681JI5ezNNvsuUPKEgexjW4TLlZn1_Sk2L8qHiCA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9TvPIbpo_Er_fw8mTcbWTOZrH6OTbwEWbsAMIfPPj6vysSNiE0k7eFkDZoESlePdY8LXuiDy3f9Cc1cI15Z1qqGwOcPNtnGPUuwgHnEl3H4ICQKoMX_SmezBswKxxesac0RD7ZgdaGRZzJ4olFWbusDCK4aktpLW1ckeA12325kKuB59zC3kYz4DtP03gzKD0zLUmqdd6ax5G17681JI5ezNNvsuUPKEgexjW4TLlZn1_Sk2L8qHiCA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD0PU5h0NvxsHj9VB5ziaJATj_Zeq_opKokSnDbLREIK4OFZP9VdsRzdgJp_ZXr-SVz_nTYt4ZQuh2BI62hx7lRjF6d9J_03CNf0_jrxzUdElXmnQ9wd-clJVsuDCFAWpJZdHI0W-TEZ6nY5LZU5ZhBeoq_nL37ZsEHCuecGwb01LxX6qgmdYQqOBidNvNRgLARCMDw2LOarV2hHi7Ff5oeGQvo1DCyANhPLxZHfDXOxjlQmDz8FJUnlA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8O_pBMU33jAS6pRa_BUvQlKZ64OH9EG4AdOrof4a3Ya_Jlm5iRXmFVRj8uaUUnv9oMAqc1C_w_N-LeYMs4L2VY4jJ7hJuDFfs2c2bYXoBNK_ieIfH3po_bhAAXK2d5rksTmQV9xZCIcz5m178tERDh8AGbSo5pLBHYHeBuM5r3U8ayS9mwiPr6fjPWNhoTyJfmRg5ZXsThFurfHERF2skq5g_m7X-ecDfYNCOPXnjtylnT1hcsVD0mA'
    ],
    description: 'An ancient short-grain rice retaining its nutrient-rich red bran layer. Short fermentation during parboiling imparts its legendary earthy, barnyard aroma that transforms upon gentle steaming into deep umami savoriness.',
    provenanceStory: 'Grown on traditional alluvial floodplains and harvested with sickle, this authentic Ofada grain is sun-parboiled and partially de-hulled. Retaining its red aleurone stripe, it brings intense depth when paired with bleached palm oil Ayamase stew.',
    tastingNotes: ['Nutty & Earthy Bouquet', 'Rich Malt Undercurrent', 'Firm Toothsome Bite', 'Savory Umami Finish'],
    culinaryUses: ['Classic Ayamase / Designer Stew accompaniment', 'Smoked fish grain pilaf', 'Crisped bottom rice bowl (Itadakimasu style)'],
    specifications: [
      { label: 'Species', value: 'Oryza glaberrima / sativa hybrid' },
      { label: 'Dehulling', value: 'Semi-polished red striations' },
      { label: 'Parboil Style', value: 'Traditional pot-steamed' },
      { label: 'Purity', value: '100% Stone-free optic sorted' }
    ],
    availableSizes: [
      { weight: '1 KG Jar', priceMultiplier: 1, inStock: true },
      { weight: '2.5 KG Reserve Box', priceMultiplier: 2.3, inStock: true },
      { weight: '5 KG Linen Sack', priceMultiplier: 4.2, inStock: true }
    ],
    featured: true
  },
  {
    id: 'artisanal-yam-flour',
    name: 'Artisanal Yam Flour (Elubo)',
    subtitle: 'Sun-Dried Micro-Milled Tuber Flour',
    category: 'Tubers',
    price: 14000,
    priceFormatted: 'CAD 14,000.00',
    badge: 'Heritage Selection',
    tagline: 'Pure Dioscorea Alata Flour',
    origin: 'Oyo Highlands, Oyo State',
    estate: 'Saki Cooperative Estate',
    aging: 'Natural Slow Solar Dehydration',
    moistureContent: '7.8%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrJdcJULzkCqwkEMy1nc7-Ijp2OfO_UEruEia1XwRFYNe7iJ4_bEx3ubVPAfTbr0b4x_HLwnkFR_4m02vzu4MXU_icUnPkjD6icgiw1nfQtpY-ZskRosLHcGpD4cUq0svNVeKCxWiqdJ_BizxR9Exy7FN-XT35vNb4eS9Rjkm3WldiTqoeJ71crBib2JcwrKn9yG9-IphArjUgL98BbEJiId2Jhu-5-hHFqJBPRhErlNZxtuxPkQboAQ',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrJdcJULzkCqwkEMy1nc7-Ijp2OfO_UEruEia1XwRFYNe7iJ4_bEx3ubVPAfTbr0b4x_HLwnkFR_4m02vzu4MXU_icUnPkjD6icgiw1nfQtpY-ZskRosLHcGpD4cUq0svNVeKCxWiqdJ_BizxR9Exy7FN-XT35vNb4eS9Rjkm3WldiTqoeJ71crBib2JcwrKn9yG9-IphArjUgL98BbEJiId2Jhu-5-hHFqJBPRhErlNZxtuxPkQboAQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3hEQH_hkN3q4KCCBDiP-s73Qq5OtkSrK3b9m-QLkm53-4HTYB125PIWtmdUFns9PcNOMd3reQB1F6v0pG0UYEdViPFP5aEi51IhjMSKPRj5dpehx5rSvSCbVyz_vFxeD6Tm2TRvanlUr24xLArrUqsRjVuzQKhUja3TYjYO1RKuBO4ur-aPbL8c633QUTw9mPeBHbG5JqQhfS3X0TeYMezgdFlNtEA52Wd_ECURf_6HUDoeLv-VWeCg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAN1uGWFs9TriY3Z_klRAHrUmYQrGeavTcA34rXZn76ZiJybkbwNM5cXMD2sxCkbKslIwK8Yq2uDzFLCo0kE7p8H11GFgqv6OhQKoPpLNFCaFmom0aDI2j1bDPAQfzLbDvpTSKq2FTmdQw-kFe0YnSQ_srmcbO5yGjeF8E8o3470jf6tK0bojUwiQi7cQq5vG9QUlYAjs0__FzNuSsYAjdwq1d28IT0C6p22I8LY5OzFEf4hLjvaE1e0w'
    ],
    description: 'Select white yams parboiled in spring water and dried naturally on woven wicker mats under the African sun before stone milling into a velvety chocolate-toned flour for smooth Amala.',
    provenanceStory: 'Crafted in the traditional yam heartlands of Oyo, the tubers are sliced, steeped in scalding geothermal spring water, and dried until dark and caramel-dense. Produces an Amala with peerless elasticity and a rich, cocoa-like profile.',
    tastingNotes: ['Subtle Molasses', 'Roasted Hazelnut', 'Warm Earth', 'Velvety Smooth Texture'],
    culinaryUses: ['Classic Amala with Gbegiri & Ewedu', 'Heritage porridge with smoked chili oil', 'Artisanal gluten-free dough enrichment'],
    specifications: [
      { label: 'Tuber Variety', value: 'Aged Dioscorea rotundata / alata' },
      { label: 'Grind Profile', value: 'Double stone-milled silk grade' },
      { label: 'Processing Method', value: 'Solar curing over wicker beds' },
      { label: 'Elasticity Index', value: 'High viscous stretch' }
    ],
    availableSizes: [
      { weight: '1 KG Jar', priceMultiplier: 1, inStock: true },
      { weight: '2.5 KG Reserve Box', priceMultiplier: 2.3, inStock: true },
      { weight: '5 KG Linen Sack', priceMultiplier: 4.2, inStock: true }
    ],
    featured: true
  },
  {
    id: 'select-honey-beans',
    name: 'Select Honey Beans (Ewa Oloyin)',
    subtitle: 'Naturally Sweet Brown Cowpeas',
    category: 'Legumes',
    price: 11000,
    priceFormatted: 'CAD 11,000.00',
    badge: 'Single Origin',
    tagline: 'High-Sugar Heirloom Cowpeas',
    origin: 'Bida Basin, Niger State',
    estate: 'Niger Lowland River Farms',
    moistureContent: '9.1%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqka9uBeZmWixzP5pMi1dtzl1Iat8iK-ZYY3iajUVtvG3dKJpBIKkhPJeZUlRWpR9qPrO7W5nLpWFuKwkHTF5JjgOSwKwpcpZ1S6ruA2VUonVPqIxeRx6K9gQ0EeUV8X6Z713BXKRFGVQCyrmDw-WMmms-HMMSbsawL5JnXlhGPI6oJRh9Vr65jSaZIjs95ifkX0OKvykl05BV-2l_TENu5cFRAQrKNauSdd7zL-LLbAFo3gCtTgvcrg',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqka9uBeZmWixzP5pMi1dtzl1Iat8iK-ZYY3iajUVtvG3dKJpBIKkhPJeZUlRWpR9qPrO7W5nLpWFuKwkHTF5JjgOSwKwpcpZ1S6ruA2VUonVPqIxeRx6K9gQ0EeUV8X6Z713BXKRFGVQCyrmDw-WMmms-HMMSbsawL5JnXlhGPI6oJRh9Vr65jSaZIjs95ifkX0OKvykl05BV-2l_TENu5cFRAQrKNauSdd7zL-LLbAFo3gCtTgvcrg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpwPkathfdSrlHCvRqD0HxVCgmxRmiXg9Mc0rIIQFdAXcf3EWtYi_2xY-YBMxnmJdYF_EnFt9HLp9G2-IFfJG7XDoMKlJMGGFzTye_thKid8gynyYy31B8PyXU5K67mIVViDdS0YQuUr5A6ifL28m8bh2P0YnR5cE7_qyD9b62rFfrP3c1HzdlA_bj6kzmsHC2rp73Q30RlQCGaVwUkmHPfMiR-7m1AEAYAjYY93Vw3z3aUG9oAOHXkw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAoq7iSwG5LBIHNixqsN7S9RWoOJ0iWhaVETXX5V79tw3unJCjQCyb8xMyzbLqOEsUkgv_tLddHAuzVYGvyf3hSuidc5duywHHJvXuP55YWOQEgYwgfK7Y7XmEZysyqN-Cn8Jkw05JHUvUUDX-ejWfi_hMpJFS-0dJI68s7s9MBLm74I685fOzIaHfsdciK_9W-qAoR0wqccx2BTZIBDWrm5AL-fa1cw8VlICTQ-ydAYQuCcCSvB3lpXQ'
    ],
    description: 'Renowned for its naturally sweet, honey-scented broth when slow-simmered. Hand-sorted three times to guarantee zero weevils, debris, or compromised kernels.',
    provenanceStory: 'Cultivated along the fertile floodplains of the Niger River, these brown cowpeas possess elevated natural fructose concentrations. Cooking them slowly unlocks a rich caramel bean broth without needing additional sweeteners.',
    tastingNotes: ['Natural Honey Sweetness', 'Creamy Chestnut Mouthfeel', 'Malty Savory Broth'],
    culinaryUses: ['Ewa Agoyin with caramelized pepper relish', 'Silky Gbegiri soup', 'Whipped bean fritters (Akara)'],
    specifications: [
      { label: 'Species', value: 'Vigna unguiculata (Oloyin Grade A)' },
      { label: 'Sorting Standard', value: 'Triple optical and hand sorted' },
      { label: 'Cooking Duration', value: '45 mins (standard boil)' },
      { label: 'Protein Content', value: '24.5g / 100g' }
    ],
    availableSizes: [
      { weight: '1 KG Jar', priceMultiplier: 1, inStock: true },
      { weight: '2.5 KG Reserve Box', priceMultiplier: 2.3, inStock: true },
      { weight: '5 KG Linen Sack', priceMultiplier: 4.2, inStock: true }
    ],
    featured: true
  },
  {
    id: 'cold-pressed-palm-oil',
    name: 'Cold-Pressed Palm Oil',
    subtitle: 'Virgin Extraction Single-Grove Oil',
    category: 'Oils',
    price: 16500,
    priceFormatted: 'CAD 16,500.00',
    badge: 'First Cold Press',
    tagline: 'High Carotene Wild Harvest',
    origin: 'Okomu Forest, Edo State',
    estate: 'Edo Wild Palm Reserves',
    moistureContent: '0.1%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2zvwzFNZ34i6cSbVxI-RRT8mLHyyQqjBKw6GoEtprXEU6F6gm_qM0Epu0CBFOIOucGhI_jncEESfo6Dt5y8iySzP-IE7WskMY_6ueEZeqK5ESvERPG1npMzLAeMpc5pBOFGcJ7gAcpbSI1G--L8pbpvyNFG3xcKhIQxTYGvrOwWSe8oGNoWmdOjcppB4kAVAet4QJT_kSIepJtZ_40tEUonQKeKiFdPakWU0D-t88usZpF8Dp4rJZw',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2zvwzFNZ34i6cSbVxI-RRT8mLHyyQqjBKw6GoEtprXEU6F6gm_qM0Epu0CBFOIOucGhI_jncEESfo6Dt5y8iySzP-IE7WskMY_6ueEZeqK5ESvERPG1npMzLAeMpc5pBOFGcJ7gAcpbSI1G--L8pbpvyNFG3xcKhIQxTYGvrOwWSe8oGNoWmdOjcppB4kAVAet4QJT_kSIepJtZ_40tEUonQKeKiFdPakWU0D-t88usZpF8Dp4rJZw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBghZ8Fh4BqHw12JlYSmTEgC-v5T_9OJQ5cVwS8_dA_409GZw3wFFKRE8_4yojh4SgoiFz13r1r-gCskY52odwcrBBZN_5I2MZjJ4ZhmxZOlx_MdYXgr7Q-r9Us6WUbZi3puzVHIaIaKnP0MCFjoDLPdwgdxcpwEYUF6gW7DdRIfcE-B3mZ4U7aSVI2R0wcPZFvvld6sH1Ug1ZTwy6zN9NTKRABT8WnUwDPiyEbRznYE9nMDw34xOpFPg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAN1uGWFs9TriY3Z_klRAHrUmYQrGeavTcA34rXZn76ZiJybkbwNM5cXMD2sxCkbKslIwK8Yq2uDzFLCo0kE7p8H11GFgqv6OhQKoPpLNFCaFmom0aDI2j1bDPAQfzLbDvpTSKq2FTmdQw-kFe0YnSQ_srmcbO5yGjeF8E8o3470jf6tK0bojUwiQi7cQq5vG9QUlYAjs0__FzNuSsYAjdwq1d28IT0C6p22I8LY5OzFEf4hLjvaE1e0w'
    ],
    description: 'Extracted from freshly cut, wild-harvested palm fruit clusters without synthetic bleaching, high-heat oxidation, or chemical deodorization. Rich in beta-carotene and tocotrienols.',
    provenanceStory: 'Harvested from century-old wild palms in the Edo rainforest belt. Fruit is processed within 12 hours of harvesting using cold hydraulic pressing, preserving the brilliant ruby luster and clean floral-nutty bouquet.',
    tastingNotes: ['Ruby Floral Top-Notes', 'Rich Butter & Nut Finish', 'Deep Red Carotene Saturation'],
    culinaryUses: ['Authentic Ofe Owerri & Banga broth base', 'Finishing drizzle for roasted plantain', 'Bleached palm oil reduction for Designer Sauce'],
    specifications: [
      { label: 'Extraction', value: 'First cold hydraulic press' },
      { label: 'Free Fatty Acids (FFA)', value: '< 1.8% (Ultra Grade)' },
      { label: 'Carotenoid Content', value: '800 ppm Natural Beta-Carotene' },
      { label: 'Packaging', value: 'UV-blocking amber apothecary bottle' }
    ],
    availableSizes: [
      { weight: '750ml Glass Cruet', priceMultiplier: 1, inStock: true },
      { weight: '1.5L Double Cruet', priceMultiplier: 1.9, inStock: true },
      { weight: '3L Pantry Gallon', priceMultiplier: 3.6, inStock: true }
    ],
    featured: true
  },
  {
    id: 'white-garri-crisp',
    name: 'Artisan White Garri',
    subtitle: 'Fine Grain Sun-Cured Cassava',
    category: 'Cassava',
    price: 9500,
    priceFormatted: 'CAD 9,500.00',
    badge: 'Purity Tested',
    tagline: 'Delicate Texture & High Swell',
    origin: 'Ikenne, Ogun State',
    estate: 'Remo Highland Mills',
    moistureContent: '8.0%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB37vmUZ4wddIOPYQ5tiwGR2nmy95C866aNsc_yDqzMT5q78LZAYuWq85QHCo-kmVz3c1rqCaFA_GKcZoqye4GhYmdOvSUYjz1Ma-V8sNFhCru17jO_WE3PBX2aZGuEtUPg38XS-5jeBrAbgF1g7j9JaiwYSvw-qZnyYcUAUeod8ngjrewXPZ-Bneu-ZT8BbuRXqtXYpZQcYyc1x0-CalD11-0xPQTaMzh72BSAPJDhNVaSP8qqJRCDsw',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB37vmUZ4wddIOPYQ5tiwGR2nmy95C866aNsc_yDqzMT5q78LZAYuWq85QHCo-kmVz3c1rqCaFA_GKcZoqye4GhYmdOvSUYjz1Ma-V8sNFhCru17jO_WE3PBX2aZGuEtUPg38XS-5jeBrAbgF1g7j9JaiwYSvw-qZnyYcUAUeod8ngjrewXPZ-Bneu-ZT8BbuRXqtXYpZQcYyc1x0-CalD11-0xPQTaMzh72BSAPJDhNVaSP8qqJRCDsw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBFaaK464a4OgZleir9OE0vm1i2DSppTnnOWu5AJtj_Gp8vinE6jnhv1jUzo_NnzQ3l7y10g9F0uMrHt0rLbSOZLawmAeAhYrAiztUiJadJzwtndUYsQg_7nOoHt9FlEK6XNwHtJXrQaH8UYnYXp7nRVjUfOojp_gfN9EyPZAnd6pvGpDCMQadGhdP3AvebaIt9M9mae-Xf0knfxuvNBwd-phw_jsnqG8TXnJ4lmjUDgpGj4XCikvMt4g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTkdo9bLjUBcSBgnp_lefMZK_WqrAHLC4VdzmQJBIVGzXU7iftrxBiFOg0Hf9eoZI8JTfteVizzh9raOeepBkMzmkdgfe2-2YFXaFBb_RuS35nAM2iEhTlpuxpHeAc2ATYCI9YHUvk7W1ZumMI6dGA5wbMiNDDiUdSYA6ZPx-ch7wPjS9Ioiiu2cR_Kp6RpWKuEiC12E_HxL2RO2PXbc2aBKgM3is5qRw1tV2dTrNCBEQIzeS3y-t7m42wyzZoaPrbpSE'
    ],
    description: 'Pristine white cassava grains with mild, gentle tang and extraordinary water absorption. Ideal for discerning palates preferring subtle acidity.',
    provenanceStory: 'Cultivated in sandy-clay loams, grated on stainless micro-screens, and gently hydraulic-pressed. Dried slowly to preserve a brilliant snowy tone.',
    tastingNotes: ['Clean Neutral Tang', 'Crisp Grain Structure', 'Gentle Floral Starch'],
    culinaryUses: ['Daily drinking soak with coconut slices', 'Soft pliable Eba', 'Gluten-free cassava breading'],
    specifications: [
      { label: 'Color Index', value: '98% Brilliant White' },
      { label: 'Water Swell Ratio', value: '1 : 4.5 Expansion' },
      { label: 'Acidity', value: 'Mild Lactic pH 4.8' }
    ],
    availableSizes: [
      { weight: '1 KG Jar', priceMultiplier: 1, inStock: true },
      { weight: '2.5 KG Reserve Box', priceMultiplier: 2.3, inStock: true },
      { weight: '5 KG Linen Sack', priceMultiplier: 4.2, inStock: true }
    ],
    featured: false
  },
  {
    id: 'golden-stoneless-rice',
    name: 'Abakaliki Golden Rice',
    subtitle: 'Double-Dehulled Highland Rice',
    category: 'Grains',
    price: 19500,
    priceFormatted: 'CAD 19,500.00',
    badge: 'Reserve Grade',
    tagline: 'Optically Sorted Zero-Debris',
    origin: 'Abakaliki Valleys, Ebonyi State',
    estate: 'Ebonyi River Granaries',
    moistureContent: '11.0%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC60Z8xwSP6NGWsMS4qM_zVHUfQFXCsrGOCxi6SnxAh_FMchFy0K42ysjzupqsBFOMrJYa9KoV8N_4iOzWwsN4iQD-GSNqOXNVY3XJYMLC4Eje605lLZWKNBAqJACQVRxIygZWqoXhEORJPo40BRU0el9dUunCs5JneqXhKa__2KKKwk774_lZ1SWK1tbMSFDtw52FkvimchEZl5MZ3I7MxgQYVAwRv_YNuOuBbayrjNdOu55IcnTw7iw',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC60Z8xwSP6NGWsMS4qM_zVHUfQFXCsrGOCxi6SnxAh_FMchFy0K42ysjzupqsBFOMrJYa9KoV8N_4iOzWwsN4iQD-GSNqOXNVY3XJYMLC4Eje605lLZWKNBAqJACQVRxIygZWqoXhEORJPo40BRU0el9dUunCs5JneqXhKa__2KKKwk774_lZ1SWK1tbMSFDtw52FkvimchEZl5MZ3I7MxgQYVAwRv_YNuOuBbayrjNdOu55IcnTw7iw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD0PU5h0NvxsHj9VB5ziaJATj_Zeq_opKokSnDbLREIK4OFZP9VdsRzdgJp_ZXr-SVz_nTYt4ZQuh2BI62hx7lRjF6d9J_03CNf0_jrxzUdElXmnQ9wd-clJVsuDCFAWpJZdHI0W-TEZ6nY5LZU5ZhBeoq_nL37ZsEHCuecGwb01LxX6qgmdYQqOBidNvNRgLARCMDw2LOarV2hHi7Ff5oeGQvo1DCyANhPLxZHfDXOxjlQmDz8FJUnlA'
    ],
    description: 'Long-grain heritage rice from the southeastern plains of Ebonyi. Gently parboiled to lock in essential thiamine and vitamin B complexes, holding separate fluffy grains when cooked.',
    provenanceStory: 'Grown with fresh spring runoff from the Ebonyi river, this rice is steamed under high steam pressure and milled with Japanese diamond-head rollers, eliminating any foreign matter.',
    tastingNotes: ['Light Popcorn Aroma', 'Tender Separate Grains', 'Subtle Sweet Grain Body'],
    culinaryUses: ['Smoky Party Jollof', 'Coconut Fried Rice with prawns', 'Spiced native palm oil rice'],
    specifications: [
      { label: 'Grain Length', value: '6.8mm Extra Long' },
      { label: 'Broken Grain %', value: '< 1.5% Grade AAA' },
      { label: 'Stone Content', value: '0.00% Guaranteed Laser Sorted' }
    ],
    availableSizes: [
      { weight: '1 KG Jar', priceMultiplier: 1, inStock: true },
      { weight: '2.5 KG Reserve Box', priceMultiplier: 2.3, inStock: true },
      { weight: '5 KG Linen Sack', priceMultiplier: 4.2, inStock: true }
    ],
    featured: false
  },
  {
    id: 'fermented-locust-bean',
    name: 'Calabash-Aged Iru Woro',
    subtitle: 'Whole Fermented African Locust Beans',
    category: 'Specialty',
    price: 8500,
    priceFormatted: 'CAD 8,500.00',
    badge: 'Fermentation Master',
    tagline: 'Deep Umami Savory Essence',
    origin: 'Kwara Highlands, Kwara State',
    estate: 'Ilorin Artisan Guild',
    moistureContent: '14.5%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn2N1sW7zQmekiM9uTuW6eGy8OMpHG-5cMZgWCFPNs0Bjqbo0CqqsrFrVYP0PegnQelwTfcqG2vijNBNZ4pVuWOaTmo738KQ9MzgH3GWMuTrLvd6kotZQT6clmMGNJl4RtAGayxvFCKUV5H8Bt5RdsDh1K1Z5HIgYjdw8XLWpbURqbK1GeWykCWrgV1LoYj5uTuAmx5693w_yJFDqzSAtoSp_iSqGyeebascywa0_xD2cCwUF7YGlJng',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCn2N1sW7zQmekiM9uTuW6eGy8OMpHG-5cMZgWCFPNs0Bjqbo0CqqsrFrVYP0PegnQelwTfcqG2vijNBNZ4pVuWOaTmo738KQ9MzgH3GWMuTrLvd6kotZQT6clmMGNJl4RtAGayxvFCKUV5H8Bt5RdsDh1K1Z5HIgYjdw8XLWpbURqbK1GeWykCWrgV1LoYj5uTuAmx5693w_yJFDqzSAtoSp_iSqGyeebascywa0_xD2cCwUF7YGlJng',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAoq7iSwG5LBIHNixqsN7S9RWoOJ0iWhaVETXX5V79tw3unJCjQCyb8xMyzbLqOEsUkgv_tLddHAuzVYGvyf3hSuidc5duywHHJvXuP55YWOQEgYwgfK7Y7XmEZysyqN-Cn8Jkw05JHUvUUDX-ejWfi_hMpJFS-0dJI68s7s9MBLm74I685fOzIaHfsdciK_9W-qAoR0wqccx2BTZIBDWrm5AL-fa1cw8VlICTQ-ydAYQuCcCSvB3lpXQ'
    ],
    description: 'Whole Parkia biglobosa seeds boiled, de-hulled, and fermented in wrapped plantain leaves and calabashes. The definitive savory engine of West African haute cuisine.',
    provenanceStory: 'Fermented by fifth-generation matriarchs using native Bacillus subtilis cultures. The resulting bean holds a complex savory profile reminiscent of aged black garlic and dark miso.',
    tastingNotes: ['Pungent Black Garlic', 'Rich Savory Glutamates', 'Earthy Truffle Undertone'],
    culinaryUses: ['Efo Riro & Egusi flavor enhancement', 'Finishing butter for pan-seared meats', 'Vegetable broth deepenings'],
    specifications: [
      { label: 'Fermentation Style', value: 'Wrapped leaf anaerobic curing' },
      { label: 'Salt Level', value: 'Zero added salt (Pure raw ferment)' },
      { label: 'Shelf Life', value: '18 Months in cool dry storage' }
    ],
    availableSizes: [
      { weight: '250g Glass Pot', priceMultiplier: 1, inStock: true },
      { weight: '500g Glass Pot', priceMultiplier: 1.8, inStock: true },
      { weight: '1 KG Reserve Tin', priceMultiplier: 3.2, inStock: true }
    ],
    featured: false
  }
];
