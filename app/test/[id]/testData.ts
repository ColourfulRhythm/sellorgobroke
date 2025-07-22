// Type definitions copied from page.tsx for standalone use
export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface Test {
  id: string
  title: string
  passingScore: number
  questions: Question[]
}

export const tests: Test[] = [
  {
    id: '1',
    title: 'Real Estate Agent Competency Quiz',
    passingScore: 70,
    questions: [
      // Section 1: Real Estate Sales Fundamentals
      {
        id: '1',
        text: 'What is the first step in any successful real estate sales process?',
        options: [
          'Offer a discount',
          'Conduct a property tour',
          'Understand the buyer\'s needs',
          'Post on social media'
        ],
        correctAnswer: 2,
        explanation: 'Understanding the buyer\'s needs is the foundation of any successful sales process. This allows you to match the right property to their requirements.'
      },
      {
        id: '2',
        text: 'Which of the following is the most effective way to handle buyer objections?',
        options: [
          'Avoid answering directly',
          'Get emotional',
          'Ask questions to understand the real concern',
          'Offer to reduce your commission'
        ],
        correctAnswer: 2,
        explanation: 'Asking questions helps identify the underlying concern and allows you to address the real issue rather than just the surface objection.'
      },
      {
        id: '3',
        text: 'Why is it important to pre-qualify a buyer before a site visit?',
        options: [
          'To reduce transportation costs',
          'To ensure they\'re financially ready',
          'To know their family background',
          'To make a social media post'
        ],
        correctAnswer: 1,
        explanation: 'Pre-qualifying ensures the buyer has the financial capacity to purchase, saving time and resources for both parties.'
      },
      {
        id: '4',
        text: 'What is a good closing technique in real estate sales?',
        options: [
          '"Let me know if you\'re ever interested."',
          '"Would you prefer to pay all at once or split it in two installments?"',
          '"It\'s going fast, so I suggest you pay now."',
          '"I\'ll keep you updated."'
        ],
        correctAnswer: 1,
        explanation: 'This is an assumptive closing technique that presents payment options, moving the conversation toward commitment.'
      },
      // Section 2: Land Evaluation & Value Drivers
      {
        id: '5',
        text: 'Which of these factors most significantly drives up land value?',
        options: [
          'Streetlights',
          'Proximity to a major road or expressway',
          'The color of the perimeter fence',
          'Billboard advertising'
        ],
        correctAnswer: 1,
        explanation: 'Accessibility through major roads significantly increases land value due to improved connectivity and development potential.'
      },
      {
        id: '6',
        text: 'Which development will likely boost land value the most?',
        options: [
          'Launch of a new estate in the area',
          'Construction of a public university nearby',
          'Community party',
          'Billboard showing "Coming Soon"'
        ],
        correctAnswer: 1,
        explanation: 'Educational institutions create long-term value by attracting families, businesses, and infrastructure development.'
      },
      {
        id: '7',
        text: 'Why do real estate developers invest in trees, walkways, and parks?',
        options: [
          'For aesthetics only',
          'To make drone footage look better',
          'To enhance value and attract a quality market',
          'Because the government demands it'
        ],
        correctAnswer: 2,
        explanation: 'These amenities enhance the overall value proposition and attract buyers willing to pay premium prices.'
      },
      {
        id: '8',
        text: 'Which of the following has little or no impact on land value?',
        options: [
          'Accessibility',
          'Government infrastructure plans',
          'Historical rent growth in the area',
          'Social media influencer living nearby'
        ],
        correctAnswer: 3,
        explanation: 'While social media presence can create temporary hype, it doesn\'t fundamentally impact long-term land value.'
      },
      // Section 3: Real Estate Terms & Documentation
      {
        id: '9',
        text: 'What does "C of O" stand for?',
        options: [
          'Certificate of Ownership',
          'Certificate of Occupancy',
          'Clearance of Ownership',
          'Contract of Order'
        ],
        correctAnswer: 1,
        explanation: 'Certificate of Occupancy is a legal document that certifies a building\'s compliance with applicable building codes and other laws.'
      },
      {
        id: '10',
        text: 'What is the purpose of a "Survey Plan"?',
        options: [
          'To design the building',
          'To assess interior decoration',
          'To define exact land boundaries',
          'To get a discount on land'
        ],
        correctAnswer: 2,
        explanation: 'A survey plan provides the exact measurements and boundaries of a piece of land, which is crucial for legal ownership.'
      },
      {
        id: '11',
        text: 'Which document proves government-recognized ownership of land?',
        options: [
          'Deed of Assignment',
          'Allocation Letter',
          'Certificate of Occupancy',
          'Land Use Permit'
        ],
        correctAnswer: 2,
        explanation: 'Certificate of Occupancy is the primary document that proves government-recognized ownership and compliance.'
      },
      {
        id: '12',
        text: 'What does "Power of Attorney" allow in real estate?',
        options: [
          'Build without permit',
          'Sell someone else\'s land legally',
          'Occupy government land',
          'Own land without documents'
        ],
        correctAnswer: 1,
        explanation: 'Power of Attorney grants legal authority to act on behalf of another person in real estate transactions.'
      },
      // Section 4: Ethics, Compliance & Group Ownership
      {
        id: '13',
        text: 'In a group land ownership structure, who owns the land?',
        options: [
          'The company',
          'The government',
          'The collective group members',
          'The most senior investor'
        ],
        correctAnswer: 2,
        explanation: 'In group ownership, the land is collectively owned by all group members, not by a single entity or individual.'
      },
      {
        id: '14',
        text: 'What happens when 80% of group members agree to sell the land?',
        options: [
          'The land is resold, and proceeds shared',
          'Individual units are sold separately',
          'The decision is overruled',
          'The land must be subdivided'
        ],
        correctAnswer: 0,
        explanation: 'When a supermajority (80%) agrees to sell, the land is sold and proceeds are distributed among all members.'
      },
      {
        id: '15',
        text: 'Why is transparency in real estate transactions important?',
        options: [
          'To impress the client',
          'To attract foreign investors',
          'To build trust and avoid legal issues',
          'Because it looks good in marketing'
        ],
        correctAnswer: 2,
        explanation: 'Transparency builds trust with clients and helps avoid legal complications that can arise from hidden information.'
      },
      {
        id: '16',
        text: 'What should you do if a buyer doesn\'t understand a term in the agreement?',
        options: [
          'Tell them to "just trust you"',
          'Ask them to skip it',
          'Explain it clearly or refer them to a lawyer',
          'Sign it for them'
        ],
        correctAnswer: 2,
        explanation: 'It\'s your ethical duty to ensure clients understand what they\'re signing, or refer them to legal professionals.'
      },
      // Section 5: Strategic Thinking & Wealth Creation
      {
        id: '17',
        text: 'What makes land banking a powerful tool?',
        options: [
          'It\'s the fastest way to earn money',
          'It guarantees social status',
          'It allows you to hold appreciating assets without pressure',
          'It creates hype online'
        ],
        correctAnswer: 2,
        explanation: 'Land banking allows investors to hold appreciating assets without the pressure of immediate development or sales.'
      },
      {
        id: '18',
        text: 'Which of the following is a smart way to use real estate as leverage?',
        options: [
          'Lease part of your land to a farmer',
          'Keep it idle until price rises',
          'Use it for family gatherings only',
          'Wait for 10 years without any use'
        ],
        correctAnswer: 0,
        explanation: 'Generating income through leasing while waiting for appreciation is a smart leverage strategy.'
      },
      {
        id: '19',
        text: 'Why should agents understand long-term estate vision (like 2 Seasons)?',
        options: [
          'To market with more depth and purpose',
          'To increase their commission',
          'To get site allocation faster',
          'To copy it and start their own'
        ],
        correctAnswer: 0,
        explanation: 'Understanding long-term vision helps agents communicate value more effectively and build client confidence.'
      },
      {
        id: '20',
        text: 'What\'s the ultimate value real estate provides when done right?',
        options: [
          'A flashy lifestyle',
          'Access to wealthy clients',
          'Sustainable income and financial resilience',
          'A way to show off'
        ],
        correctAnswer: 2,
        explanation: 'Real estate, when properly managed, provides sustainable income and long-term financial security.'
      },
      // Section 6: Location Intelligence & Technical Insight
      {
        id: '21',
        text: 'What does "right of way" refer to in property development?',
        options: [
          'A permit to sell land',
          'The buyer\'s legal access to the title',
          'Reserved land for government infrastructure like roads',
          'A shortcut for residents'
        ],
        correctAnswer: 2,
        explanation: 'Right of way refers to land reserved by the government for infrastructure development like roads and utilities.'
      },
      {
        id: '22',
        text: 'When choosing land for residential development, what is a red flag?',
        options: [
          '100% dry land',
          'Nearby planned government road',
          'Multiple claimants on the same land',
          'Ongoing community development'
        ],
        correctAnswer: 2,
        explanation: 'Multiple claimants indicate potential legal disputes that can delay or prevent development.'
      },
      {
        id: '23',
        text: 'Which of the following locations is most likely to appreciate quickly?',
        options: [
          'A remote village with no development plan',
          'A corridor between two growing cities with road infrastructure',
          'An estate surrounded by completed houses',
          'A farm in an isolated forest'
        ],
        correctAnswer: 1,
        explanation: 'Corridors between growing cities with infrastructure typically experience rapid appreciation due to development pressure.'
      },
      {
        id: '24',
        text: 'What role does a "Master Plan" play in land evaluation?',
        options: [
          'It helps with interior design',
          'It guides zoning, infrastructure, and growth patterns',
          'It is for marketing use only',
          'It\'s used for farming layouts'
        ],
        correctAnswer: 1,
        explanation: 'Master plans provide crucial information about future development patterns and zoning regulations.'
      },
      {
        id: '25',
        text: 'In real estate, what does "peri-urban" mean?',
        options: [
          'Urban areas near water',
          'Areas on the edge of cities experiencing rapid growth',
          'Isolated rural land',
          'Commercial districts'
        ],
        correctAnswer: 1,
        explanation: 'Peri-urban areas are transitional zones between urban and rural areas, often experiencing rapid development.'
      },
      {
        id: '26',
        text: 'Which of these statements is TRUE about infrastructure-led appreciation?',
        options: [
          'New roads reduce land value due to traffic',
          'Bridges and highways typically cause rural land to decline',
          'Infrastructure projects often lead to faster land appreciation',
          'It only applies to commercial land'
        ],
        correctAnswer: 2,
        explanation: 'Infrastructure development typically increases land value by improving accessibility and development potential.'
      },
      {
        id: '27',
        text: 'What is a "setback" in real estate development?',
        options: [
          'The delay in payment by a buyer',
          'The required distance between a building and the property boundary',
          'A temporary construction stop',
          'A reduction in land value due to location'
        ],
        correctAnswer: 1,
        explanation: 'Setbacks are minimum distances required between buildings and property boundaries for safety and zoning compliance.'
      },
      {
        id: '28',
        text: 'What is the impact of being too close to a high-tension line?',
        options: [
          'Increases land value',
          'No significant impact',
          'Can restrict construction and reduce buyer interest',
          'Attracts wealthy buyers'
        ],
        correctAnswer: 2,
        explanation: 'High-tension lines can create safety concerns and building restrictions, reducing land value and buyer interest.'
      },
      {
        id: '29',
        text: 'Which term describes converting rural land into urban use?',
        options: [
          'Zoning',
          'Land flipping',
          'Urban sprawl',
          'Land use conversion'
        ],
        correctAnswer: 3,
        explanation: 'Land use conversion refers to the process of changing land from rural/agricultural use to urban/development use.'
      },
      {
        id: '30',
        text: 'What factor should agents study before recommending land for investment?',
        options: [
          'Local community gossip',
          'Number of billboard signs',
          'Government zoning and land use plans',
          'Popularity on Instagram'
        ],
        correctAnswer: 2,
        explanation: 'Government zoning and land use plans provide crucial information about future development potential and restrictions.'
      }
    ]
  },
  {
    id: '2',
    title: 'Real Estate Math & Feasibility Test',
    passingScore: 7, // 7/10 = 70% for pass, adjust as needed
    questions: [
      {
        id: '1',
        text: 'If a 500sqm plot is sold for ₦2,500,000, what is the price per sqm?',
        options: [
          '₦3,500',
          '₦4,000',
          '₦5,000',
          '₦5,500'
        ],
        correctAnswer: 2,
        explanation: '₦2,500,000 ÷ 500sqm = ₦5,000/sqm.'
      },
      {
        id: '2',
        text: 'You lease a plot for ₦400,000 and make ₦650,000 from produce in 1 season. What is your ROI? ROI = (Profit ÷ Cost) x 100',
        options: [
          '25%',
          '62.5%',
          '45%',
          '90%'
        ],
        correctAnswer: 1,
        explanation: 'Profit = ₦650,000 - ₦400,000 = ₦250,000. ROI = (₦250,000 ÷ ₦400,000) x 100 = 62.5%.'
      },
      {
        id: '3',
        text: 'A client wants to buy 3 plots of 300sqm each. The price per sqm is ₦6,000. What\'s the total cost?',
        options: [
          '₦4,800,000',
          '₦5,400,000',
          '₦5,000,000',
          '₦6,000,000'
        ],
        correctAnswer: 1,
        explanation: '3 x 300sqm = 900sqm. 900 x ₦6,000 = ₦5,400,000.'
      },
      {
        id: '4',
        text: 'A developer spends ₦12 million on infrastructure and ₦18 million on land acquisition. If they plan to sell 30 plots, what\'s the minimum amount per plot to break even?',
        options: [
          '₦800,000',
          '₦1,000,000',
          '₦1,200,000',
          '₦1,300,000'
        ],
        correctAnswer: 2,
        explanation: '₦12m + ₦18m = ₦30m. ₦30m ÷ 30 = ₦1,200,000.'
      },
      {
        id: '5',
        text: 'You\'re helping a client compare two estates: one is ₦4,000/sqm but far from the road; the other is ₦6,000/sqm but along a major express. What should you advise based on feasibility logic?',
        options: [
          'Go for the cheaper one',
          'Choose the one with more billboard ads',
          'Consider long-term value based on accessibility and demand',
          'Choose based on size alone'
        ],
        correctAnswer: 2,
        explanation: 'Accessibility and demand drive long-term value, not just price.'
      },
      {
        id: '6',
        text: 'You sell a 400sqm plot at ₦2,000,000. Your company gives you 5% commission. What\'s your commission?',
        options: [
          '₦50,000',
          '₦80,000',
          '₦100,000',
          '₦70,000'
        ],
        correctAnswer: 1,
        explanation: '5% of ₦2,000,000 = ₦100,000. 0.05 x 2,000,000 = ₦100,000.'
      },
      {
        id: '7',
        text: 'A 600sqm plot is resold at ₦6 million after being bought at ₦3.8 million. What\'s the capital gain?',
        options: [
          '₦2.2 million',
          '₦1.8 million',
          '₦3.2 million',
          '₦6 million'
        ],
        correctAnswer: 0,
        explanation: '₦6m - ₦3.8m = ₦2.2m.'
      },
      {
        id: '8',
        text: 'A client buys 3 units in a group investment at ₦35,000/unit. After 10 months, the land appreciates by 60%. What is the value of their units now? (₦35,000 x 3 = ₦105,000 → ₦105,000 + 60% = ₦168,000)',
        options: [
          '₦105,000',
          '₦150,000',
          '₦168,000',
          '₦200,000'
        ],
        correctAnswer: 2,
        explanation: '₦105,000 x 1.6 = ₦168,000.'
      },
      {
        id: '9',
        text: 'You\'re planning to build 5 mini flats at ₦4 million each. If rental income per flat is ₦800,000/year, what\'s the payback period?',
        options: [
          '4 years',
          '5 years',
          '6 years',
          '8 years'
        ],
        correctAnswer: 1,
        explanation: '₦4m x 5 = ₦20m. ₦800k x 5 = ₦4m/year. ₦20m ÷ ₦4m = 5 years.'
      },
      {
        id: '10',
        text: 'If each square meter in a gated estate costs ₦5,000 and a client wants to fence their 500sqm plot with ₦1,500/block (7 blocks per meter), what\'s the estimated block cost for the perimeter? Perimeter ≈ 90m (assume 500sqm = ~20m x 25m plot) Blocks needed = 90 x 7 = 630 blocks 630 x ₦1,500 = ₦945,000',
        options: [
          '₦945,000',
          '₦1,050,000',
          '₦800,000',
          '₦720,000'
        ],
        correctAnswer: 0,
        explanation: '630 blocks x ₦1,500 = ₦945,000.'
      }
    ]
  },
  {
    id: '3',
    title: 'Environmental & Lifestyle Awareness Test',
    passingScore: 35, // e.g. 70% of 50
    questions: [
      // SECTION A: ENVIRONMENTAL AWARENESS & TREES (1–10)
      {
        id: '1',
        text: 'Why are trees essential in urban and rural communities?',
        options: [
          'For aesthetics only',
          'To block sunlight',
          'To improve air quality, prevent erosion, and provide shade',
          'To grow fruits only'
        ],
        correctAnswer: 2,
        explanation: 'Trees filter pollutants, cool the environment, support biodiversity, and prevent erosion.'
      },
      {
        id: '2',
        text: 'What is deforestation?',
        options: [
          'Planting too many trees',
          'Cutting down forests without replanting',
          'Replacing trees with flowers',
          'Using land only for recreation'
        ],
        correctAnswer: 1,
        explanation: 'Deforestation disrupts ecosystems and contributes to climate change.'
      },
      {
        id: '3',
        text: 'Which of these trees is common and useful in Southwest Nigeria?',
        options: [
          'Maple',
          'Oak',
          'Mango',
          'Pine'
        ],
        correctAnswer: 2,
        explanation: 'Mango trees provide shade, fruit, and timber in tropical climates like Nigeria.'
      },
      {
        id: '4',
        text: 'What do trees absorb from the air?',
        options: [
          'Nitrogen',
          'Carbon dioxide',
          'Oxygen',
          'Hydrogen'
        ],
        correctAnswer: 1,
        explanation: 'Trees absorb carbon dioxide and release oxygen, helping regulate the climate.'
      },
      {
        id: '5',
        text: 'Which part of the tree helps to hold the soil in place?',
        options: [
          'Bark',
          'Leaves',
          'Roots',
          'Trunk'
        ],
        correctAnswer: 2,
        explanation: 'Roots anchor soil, preventing erosion.'
      },
      {
        id: '6',
        text: 'What is afforestation?',
        options: [
          'Cutting trees for timber',
          'Planting trees where there were none before',
          'Replacing forests with buildings',
          'Harvesting fruits from trees'
        ],
        correctAnswer: 1,
        explanation: 'Afforestation is the establishment of a forest or stand of trees in an area where there was no previous tree cover.'
      },
      {
        id: '7',
        text: 'What is one way to encourage tree planting in urban areas?',
        options: [
          'Burn old trees',
          'Use only artificial plants',
          'Introduce green zoning laws and community planting days',
          'Ban gardening tools'
        ],
        correctAnswer: 2,
        explanation: 'Urban greening policies and community involvement help promote planting.'
      },
      {
        id: '8',
        text: 'Which type of tree grows fast and is commonly used for reforestation in Nigeria?',
        options: [
          'Baobab',
          'Eucalyptus',
          'Mahogany',
          'Cherry'
        ],
        correctAnswer: 1,
        explanation: 'Eucalyptus grows fast and is commonly used in afforestation efforts.'
      },
      {
        id: '9',
        text: 'What role do trees play in the water cycle?',
        options: [
          'None',
          'They prevent rainfall',
          'They help store and release water through transpiration',
          'They attract lightning'
        ],
        correctAnswer: 2,
        explanation: 'Trees contribute to the water cycle via transpiration and rainfall regulation.'
      },
      {
        id: '10',
        text: 'Which government agency in Nigeria is responsible for forest and environmental conservation?',
        options: [
          'NAFDAC',
          'NESREA',
          'NTA',
          'NNPC'
        ],
        correctAnswer: 1,
        explanation: 'NESREA (National Environmental Standards and Regulations Enforcement Agency) regulates environmental protection.'
      },
      // SECTION B: HEALTHY LIVING & FOOD (11–20)
      {
        id: '11',
        text: 'What is a major benefit of eating locally grown food?',
        options: [
          "It's expensive",
          "It's faster to cook",
          "It supports local farmers and is often fresher",
          "It's more colorful"
        ],
        correctAnswer: 2,
        explanation: 'Locally grown food supports the local economy and retains more nutrients.'
      },
      {
        id: '12',
        text: 'Which food is high in fiber and commonly grown in Ogun State?',
        options: [
          'Yam',
          'Cassava',
          'White bread',
          'Ice cream'
        ],
        correctAnswer: 1,
        explanation: 'Cassava is rich in fiber and a dietary staple in Ogun.'
      },
      {
        id: '13',
        text: 'What is one health benefit of eating leafy greens?',
        options: [
          'Increased sugar levels',
          'Rich source of vitamins and iron',
          'Adds weight fast',
          'Makes food colorful only'
        ],
        correctAnswer: 1,
        explanation: 'Leafy greens are high in vitamins A, C, K, and iron.'
      },
      {
        id: '14',
        text: 'Which of the following is NOT a healthy lifestyle habit?',
        options: [
          'Eating fruits and vegetables',
          'Daily physical exercise',
          'Smoking tobacco',
          'Drinking water regularly'
        ],
        correctAnswer: 2,
        explanation: 'Smoking has negative health effects.'
      },
      {
        id: '15',
        text: 'Why is drinking water important for the body?',
        options: [
          'Keeps your skin cold',
          'Makes you full',
          'Helps digestion and body function',
          'Replaces food'
        ],
        correctAnswer: 2,
        explanation: 'Water aids digestion, regulates body temperature, and supports organs.'
      },
      {
        id: '16',
        text: 'What is a common vegetable grown in Ibadan?',
        options: [
          'Spinach (Efo)',
          'Lettuce',
          'Tomatoes',
          'Celery'
        ],
        correctAnswer: 0,
        explanation: 'Efo (spinach) is widely grown and consumed in Ibadan.'
      },
      {
        id: '17',
        text: 'Why should palm oil be used in moderation?',
        options: [
          'It is tasteless',
          'It is expensive',
          'It contains saturated fats',
          'It causes stomach pain'
        ],
        correctAnswer: 2,
        explanation: 'Excessive intake of saturated fats can affect heart health.'
      },
      {
        id: '18',
        text: 'What does a balanced diet contain?',
        options: [
          'Only carbohydrates',
          'All food groups in right proportions',
          'Mostly sugar',
          'Snacks and drinks'
        ],
        correctAnswer: 1,
        explanation: 'A balanced diet includes carbs, proteins, fats, vitamins, and minerals.'
      },
      {
        id: '19',
        text: 'How does exercise contribute to a healthy lifestyle?',
        options: [
          'Increases sleepiness',
          'Weakens muscles',
          'Improves fitness and reduces stress',
          'Makes you tired all day'
        ],
        correctAnswer: 2,
        explanation: 'Regular physical activity improves health and reduces disease risk.'
      },
      {
        id: '20',
        text: 'What is the benefit of reducing processed food intake?',
        options: [
          'You feel more hungry',
          'Reduces risk of obesity and chronic diseases',
          'Slows digestion',
          'Removes taste from meals'
        ],
        correctAnswer: 1,
        explanation: 'Less processed food improves digestion and nutrient intake.'
      },
      // ... Continue with SECTION C, D, E ...
    ]
  }
]; 