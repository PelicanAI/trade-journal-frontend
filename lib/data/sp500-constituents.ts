/**
 * S&P 500 Constituent Data
 *
 * This file contains sector mappings for the S&P 500 constituents.
 * Prices are fetched dynamically from Polygon.io API.
 *
 * Data source: S&P Dow Jones Indices (approximate market cap weights as of 2024)
 * Sector classifications follow GICS (Global Industry Classification Standard)
 */

export interface SP500Constituent {
  ticker: string
  name: string
  sector: string
  // Market cap weight will be calculated dynamically from price * shares outstanding
  // or approximated from latest known data
}

/**
 * S&P 500 sectors following GICS classification
 */
export const SP500_SECTORS = [
  'Information Technology',
  'Financials',
  'Health Care',
  'Consumer Discretionary',
  'Communication Services',
  'Industrials',
  'Consumer Staples',
  'Energy',
  'Utilities',
  'Real Estate',
  'Materials',
] as const

export type SP500Sector = typeof SP500_SECTORS[number]

/**
 * Sector color mapping for heatmap visualization
 * Uses oklch color space from globals.css
 */
export const SECTOR_COLORS: Record<SP500Sector, string> = {
  'Information Technology': 'oklch(0.60 0.25 280)', // Purple
  'Financials': 'oklch(0.55 0.20 220)', // Blue
  'Health Care': 'oklch(0.65 0.20 140)', // Teal
  'Consumer Discretionary': 'oklch(0.70 0.22 60)', // Yellow
  'Communication Services': 'oklch(0.60 0.22 320)', // Pink
  'Industrials': 'oklch(0.50 0.18 40)', // Orange
  'Consumer Staples': 'oklch(0.55 0.18 100)', // Green
  'Energy': 'oklch(0.45 0.20 20)', // Red-orange
  'Utilities': 'oklch(0.65 0.15 180)', // Cyan
  'Real Estate': 'oklch(0.55 0.18 160)', // Teal-green
  'Materials': 'oklch(0.50 0.20 80)', // Lime
}

/**
 * Top S&P 500 constituents by market cap (approx. 200 largest)
 * This covers ~85% of the index's total market cap
 *
 * For full 503 ticker list, use external data source or API
 */
export const SP500_CONSTITUENTS: SP500Constituent[] = [
  // Information Technology (largest sector ~28% of S&P 500)
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Information Technology' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Information Technology' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Information Technology' },
  { ticker: 'AVGO', name: 'Broadcom Inc.', sector: 'Information Technology' },
  { ticker: 'ORCL', name: 'Oracle Corp.', sector: 'Information Technology' },
  { ticker: 'CSCO', name: 'Cisco Systems Inc.', sector: 'Information Technology' },
  { ticker: 'ACN', name: 'Accenture PLC', sector: 'Information Technology' },
  { ticker: 'CRM', name: 'Salesforce Inc.', sector: 'Information Technology' },
  { ticker: 'AMD', name: 'Advanced Micro Devices', sector: 'Information Technology' },
  { ticker: 'ADBE', name: 'Adobe Inc.', sector: 'Information Technology' },
  { ticker: 'TXN', name: 'Texas Instruments Inc.', sector: 'Information Technology' },
  { ticker: 'QCOM', name: 'Qualcomm Inc.', sector: 'Information Technology' },
  { ticker: 'INTC', name: 'Intel Corp.', sector: 'Information Technology' },
  { ticker: 'INTU', name: 'Intuit Inc.', sector: 'Information Technology' },
  { ticker: 'IBM', name: 'IBM Corp.', sector: 'Information Technology' },
  { ticker: 'NOW', name: 'ServiceNow Inc.', sector: 'Information Technology' },
  { ticker: 'AMAT', name: 'Applied Materials Inc.', sector: 'Information Technology' },
  { ticker: 'PANW', name: 'Palo Alto Networks', sector: 'Information Technology' },
  { ticker: 'PLTR', name: 'Palantir Technologies', sector: 'Information Technology' },
  { ticker: 'MU', name: 'Micron Technology', sector: 'Information Technology' },
  { ticker: 'LRCX', name: 'Lam Research Corp.', sector: 'Information Technology' },
  { ticker: 'KLAC', name: 'KLA Corp.', sector: 'Information Technology' },
  { ticker: 'SNPS', name: 'Synopsys Inc.', sector: 'Information Technology' },
  { ticker: 'CDNS', name: 'Cadence Design Systems', sector: 'Information Technology' },
  { ticker: 'ADSK', name: 'Autodesk Inc.', sector: 'Information Technology' },
  { ticker: 'APH', name: 'Amphenol Corp.', sector: 'Information Technology' },
  { ticker: 'MCHP', name: 'Microchip Technology', sector: 'Information Technology' },
  { ticker: 'FTNT', name: 'Fortinet Inc.', sector: 'Information Technology' },
  { ticker: 'TEAM', name: 'Atlassian Corp.', sector: 'Information Technology' },

  // Communication Services (~9%)
  { ticker: 'META', name: 'Meta Platforms Inc.', sector: 'Communication Services' },
  { ticker: 'GOOGL', name: 'Alphabet Inc. Class A', sector: 'Communication Services' },
  { ticker: 'GOOG', name: 'Alphabet Inc. Class C', sector: 'Communication Services' },
  { ticker: 'NFLX', name: 'Netflix Inc.', sector: 'Communication Services' },
  { ticker: 'DIS', name: 'Walt Disney Co.', sector: 'Communication Services' },
  { ticker: 'CMCSA', name: 'Comcast Corp.', sector: 'Communication Services' },
  { ticker: 'T', name: 'AT&T Inc.', sector: 'Communication Services' },
  { ticker: 'VZ', name: 'Verizon Communications', sector: 'Communication Services' },
  { ticker: 'TMUS', name: 'T-Mobile US Inc.', sector: 'Communication Services' },
  { ticker: 'EA', name: 'Electronic Arts Inc.', sector: 'Communication Services' },
  { ticker: 'TTWO', name: 'Take-Two Interactive', sector: 'Communication Services' },

  // Consumer Discretionary (~10%)
  { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Discretionary' },
  { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer Discretionary' },
  { ticker: 'HD', name: 'Home Depot Inc.', sector: 'Consumer Discretionary' },
  { ticker: 'MCD', name: 'McDonald\'s Corp.', sector: 'Consumer Discretionary' },
  { ticker: 'NKE', name: 'Nike Inc.', sector: 'Consumer Discretionary' },
  { ticker: 'LOW', name: 'Lowe\'s Companies Inc.', sector: 'Consumer Discretionary' },
  { ticker: 'SBUX', name: 'Starbucks Corp.', sector: 'Consumer Discretionary' },
  { ticker: 'TJX', name: 'TJX Companies Inc.', sector: 'Consumer Discretionary' },
  { ticker: 'BKNG', name: 'Booking Holdings Inc.', sector: 'Consumer Discretionary' },
  { ticker: 'CMG', name: 'Chipotle Mexican Grill', sector: 'Consumer Discretionary' },
  { ticker: 'ABNB', name: 'Airbnb Inc.', sector: 'Consumer Discretionary' },
  { ticker: 'MAR', name: 'Marriott International', sector: 'Consumer Discretionary' },
  { ticker: 'GM', name: 'General Motors Co.', sector: 'Consumer Discretionary' },
  { ticker: 'F', name: 'Ford Motor Co.', sector: 'Consumer Discretionary' },
  { ticker: 'TGT', name: 'Target Corp.', sector: 'Consumer Discretionary' },
  { ticker: 'LULU', name: 'Lululemon Athletica', sector: 'Consumer Discretionary' },

  // Financials (~13%)
  { ticker: 'BRK.B', name: 'Berkshire Hathaway Inc.', sector: 'Financials' },
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financials' },
  { ticker: 'V', name: 'Visa Inc.', sector: 'Financials' },
  { ticker: 'MA', name: 'Mastercard Inc.', sector: 'Financials' },
  { ticker: 'BAC', name: 'Bank of America Corp.', sector: 'Financials' },
  { ticker: 'WFC', name: 'Wells Fargo & Co.', sector: 'Financials' },
  { ticker: 'GS', name: 'Goldman Sachs Group', sector: 'Financials' },
  { ticker: 'MS', name: 'Morgan Stanley', sector: 'Financials' },
  { ticker: 'AXP', name: 'American Express Co.', sector: 'Financials' },
  { ticker: 'BLK', name: 'BlackRock Inc.', sector: 'Financials' },
  { ticker: 'SCHW', name: 'Charles Schwab Corp.', sector: 'Financials' },
  { ticker: 'C', name: 'Citigroup Inc.', sector: 'Financials' },
  { ticker: 'SPGI', name: 'S&P Global Inc.', sector: 'Financials' },
  { ticker: 'CB', name: 'Chubb Ltd.', sector: 'Financials' },
  { ticker: 'PGR', name: 'Progressive Corp.', sector: 'Financials' },
  { ticker: 'MMC', name: 'Marsh & McLennan Cos.', sector: 'Financials' },
  { ticker: 'USB', name: 'U.S. Bancorp', sector: 'Financials' },
  { ticker: 'PNC', name: 'PNC Financial Services', sector: 'Financials' },
  { ticker: 'TFC', name: 'Truist Financial Corp.', sector: 'Financials' },
  { ticker: 'AIG', name: 'American International Group', sector: 'Financials' },

  // Health Care (~13%)
  { ticker: 'LLY', name: 'Eli Lilly and Co.', sector: 'Health Care' },
  { ticker: 'UNH', name: 'UnitedHealth Group Inc.', sector: 'Health Care' },
  { ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'Health Care' },
  { ticker: 'ABBV', name: 'AbbVie Inc.', sector: 'Health Care' },
  { ticker: 'MRK', name: 'Merck & Co. Inc.', sector: 'Health Care' },
  { ticker: 'TMO', name: 'Thermo Fisher Scientific', sector: 'Health Care' },
  { ticker: 'ABT', name: 'Abbott Laboratories', sector: 'Health Care' },
  { ticker: 'DHR', name: 'Danaher Corp.', sector: 'Health Care' },
  { ticker: 'PFE', name: 'Pfizer Inc.', sector: 'Health Care' },
  { ticker: 'CVS', name: 'CVS Health Corp.', sector: 'Health Care' },
  { ticker: 'AMGN', name: 'Amgen Inc.', sector: 'Health Care' },
  { ticker: 'BMY', name: 'Bristol-Myers Squibb', sector: 'Health Care' },
  { ticker: 'GILD', name: 'Gilead Sciences Inc.', sector: 'Health Care' },
  { ticker: 'MDT', name: 'Medtronic PLC', sector: 'Health Care' },
  { ticker: 'CI', name: 'Cigna Group', sector: 'Health Care' },
  { ticker: 'REGN', name: 'Regeneron Pharmaceuticals', sector: 'Health Care' },
  { ticker: 'ISRG', name: 'Intuitive Surgical Inc.', sector: 'Health Care' },
  { ticker: 'VRTX', name: 'Vertex Pharmaceuticals', sector: 'Health Care' },
  { ticker: 'ELV', name: 'Elevance Health Inc.', sector: 'Health Care' },
  { ticker: 'HUM', name: 'Humana Inc.', sector: 'Health Care' },

  // Industrials (~8%)
  { ticker: 'CAT', name: 'Caterpillar Inc.', sector: 'Industrials' },
  { ticker: 'GE', name: 'General Electric Co.', sector: 'Industrials' },
  { ticker: 'RTX', name: 'RTX Corp.', sector: 'Industrials' },
  { ticker: 'BA', name: 'Boeing Co.', sector: 'Industrials' },
  { ticker: 'HON', name: 'Honeywell International', sector: 'Industrials' },
  { ticker: 'UNP', name: 'Union Pacific Corp.', sector: 'Industrials' },
  { ticker: 'LMT', name: 'Lockheed Martin Corp.', sector: 'Industrials' },
  { ticker: 'UPS', name: 'United Parcel Service', sector: 'Industrials' },
  { ticker: 'DE', name: 'Deere & Co.', sector: 'Industrials' },
  { ticker: 'ADP', name: 'Automatic Data Processing', sector: 'Industrials' },
  { ticker: 'GEV', name: 'GE Vernova Inc.', sector: 'Industrials' },
  { ticker: 'WM', name: 'Waste Management Inc.', sector: 'Industrials' },
  { ticker: 'EMR', name: 'Emerson Electric Co.', sector: 'Industrials' },
  { ticker: 'FDX', name: 'FedEx Corp.', sector: 'Industrials' },
  { ticker: 'CSX', name: 'CSX Corp.', sector: 'Industrials' },

  // Consumer Staples (~6%)
  { ticker: 'WMT', name: 'Walmart Inc.', sector: 'Consumer Staples' },
  { ticker: 'PG', name: 'Procter & Gamble Co.', sector: 'Consumer Staples' },
  { ticker: 'COST', name: 'Costco Wholesale Corp.', sector: 'Consumer Staples' },
  { ticker: 'KO', name: 'Coca-Cola Co.', sector: 'Consumer Staples' },
  { ticker: 'PEP', name: 'PepsiCo Inc.', sector: 'Consumer Staples' },
  { ticker: 'PM', name: 'Philip Morris International', sector: 'Consumer Staples' },
  { ticker: 'MO', name: 'Altria Group Inc.', sector: 'Consumer Staples' },
  { ticker: 'CL', name: 'Colgate-Palmolive Co.', sector: 'Consumer Staples' },
  { ticker: 'MDLZ', name: 'Mondelez International', sector: 'Consumer Staples' },
  { ticker: 'KMB', name: 'Kimberly-Clark Corp.', sector: 'Consumer Staples' },

  // Energy (~4%)
  { ticker: 'XOM', name: 'Exxon Mobil Corp.', sector: 'Energy' },
  { ticker: 'CVX', name: 'Chevron Corp.', sector: 'Energy' },
  { ticker: 'COP', name: 'ConocoPhillips', sector: 'Energy' },
  { ticker: 'SLB', name: 'Schlumberger NV', sector: 'Energy' },
  { ticker: 'EOG', name: 'EOG Resources Inc.', sector: 'Energy' },
  { ticker: 'MPC', name: 'Marathon Petroleum Corp.', sector: 'Energy' },
  { ticker: 'PSX', name: 'Phillips 66', sector: 'Energy' },
  { ticker: 'VLO', name: 'Valero Energy Corp.', sector: 'Energy' },
  { ticker: 'OXY', name: 'Occidental Petroleum', sector: 'Energy' },
  { ticker: 'HES', name: 'Hess Corp.', sector: 'Energy' },

  // Utilities (~2%)
  { ticker: 'NEE', name: 'NextEra Energy Inc.', sector: 'Utilities' },
  { ticker: 'SO', name: 'Southern Co.', sector: 'Utilities' },
  { ticker: 'DUK', name: 'Duke Energy Corp.', sector: 'Utilities' },
  { ticker: 'CEG', name: 'Constellation Energy Corp.', sector: 'Utilities' },
  { ticker: 'AEP', name: 'American Electric Power', sector: 'Utilities' },
  { ticker: 'SRE', name: 'Sempra', sector: 'Utilities' },
  { ticker: 'D', name: 'Dominion Energy Inc.', sector: 'Utilities' },
  { ticker: 'EXC', name: 'Exelon Corp.', sector: 'Utilities' },

  // Real Estate (~2%)
  { ticker: 'PLD', name: 'Prologis Inc.', sector: 'Real Estate' },
  { ticker: 'AMT', name: 'American Tower Corp.', sector: 'Real Estate' },
  { ticker: 'EQIX', name: 'Equinix Inc.', sector: 'Real Estate' },
  { ticker: 'CCI', name: 'Crown Castle Inc.', sector: 'Real Estate' },
  { ticker: 'PSA', name: 'Public Storage', sector: 'Real Estate' },
  { ticker: 'WELL', name: 'Welltower Inc.', sector: 'Real Estate' },
  { ticker: 'DLR', name: 'Digital Realty Trust', sector: 'Real Estate' },
  { ticker: 'O', name: 'Realty Income Corp.', sector: 'Real Estate' },

  // Materials (~2%)
  { ticker: 'LIN', name: 'Linde PLC', sector: 'Materials' },
  { ticker: 'APD', name: 'Air Products and Chemicals', sector: 'Materials' },
  { ticker: 'SHW', name: 'Sherwin-Williams Co.', sector: 'Materials' },
  { ticker: 'FCX', name: 'Freeport-McMoRan Inc.', sector: 'Materials' },
  { ticker: 'NEM', name: 'Newmont Corp.', sector: 'Materials' },
  { ticker: 'ECL', name: 'Ecolab Inc.', sector: 'Materials' },
  { ticker: 'DOW', name: 'Dow Inc.', sector: 'Materials' },
  { ticker: 'DD', name: 'DuPont de Nemours Inc.', sector: 'Materials' },
]

/**
 * Get all unique sectors
 */
export function getSectors(): SP500Sector[] {
  return SP500_SECTORS.slice()
}

/**
 * Get constituents by sector
 */
export function getConstituentsBySector(sector: SP500Sector): SP500Constituent[] {
  return SP500_CONSTITUENTS.filter((c) => c.sector === sector)
}

/**
 * Get all tickers (for batch fetching)
 */
export function getAllTickers(): string[] {
  return SP500_CONSTITUENTS.map((c) => c.ticker)
}

/**
 * Get constituent by ticker
 */
export function getConstituent(ticker: string): SP500Constituent | undefined {
  return SP500_CONSTITUENTS.find((c) => c.ticker === ticker)
}
