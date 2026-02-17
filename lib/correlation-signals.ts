import type { CorrelationSignalDef } from '@/types/correlations'

export const CORRELATION_SIGNALS: Record<string, CorrelationSignalDef> = {
  DXY_EQUITIES: {
    name: 'Dollar vs Equities',
    pair: ['DXY', 'SPX'],
    importance: 'critical',
    description: 'Nearly everything priced in USD moves inversely to the dollar.',
    bullish_when: 'Dollar weakening while equities rise. Goldilocks.',
    bearish_when: 'Dollar spiking. Tightens global financial conditions.',
    beginner_explanation: 'Think of the dollar as gravity. When it gets stronger, it pulls everything else down. Stocks, gold, oil, crypto \u2014 they all get cheaper in dollar terms. A weak dollar lifts all boats.',
    historical_events: [
      { date: '2022-09-28', description: 'DXY hit 114. Global equity selloff. S&P at year lows.' },
      { date: '2023-11-03', description: 'DXY peaked and reversed. S&P began 5-month rally.' },
    ],
  },
  YIELDS_EQUITIES: {
    name: '10Y Yields vs Equities',
    pair: ['TNX', 'SPX'],
    importance: 'critical',
    description: 'Lower yields generally = higher equities. But WHY yields drop matters. Flight to safety = bad. Cooling inflation = good.',
    bullish_when: 'Yields falling because inflation is cooling. Fed pivot expectations.',
    bearish_when: 'Yields crashing because recession fears are spiking.',
    beginner_explanation: 'Bond yields are the price of money. When yields drop, borrowing gets cheaper, so companies can grow more \u2014 stocks go up. But if yields drop because everyone is panicking and buying bonds for safety, that\'s actually scary.',
    historical_events: [
      { date: '2023-10-19', description: '10Y hit 5%. Equities bottomed within days.' },
      { date: '2024-09-18', description: 'Fed cut 50bps. Yields dropped. S&P hit new highs.' },
    ],
  },
  GOLD_EQUITIES: {
    name: 'Gold vs Equities',
    pair: ['GOLD', 'SPX'],
    importance: 'critical',
    description: 'Sharp gold spike = fear. Gold and stocks up together = liquidity rally. Speed of gold move matters more than direction.',
    bullish_when: 'Gold drifting higher alongside equities. Both rising = plenty of liquidity.',
    bearish_when: 'Gold spiking while equities drop. Classic risk-off.',
    beginner_explanation: 'Gold is the original safe haven. When big money gets scared, they buy gold. If gold is shooting up and stocks are falling, that means smart money is worried. If both are going up, it usually means there\'s so much money in the system that everything floats.',
    historical_events: [
      { date: '2020-03-09', description: 'Gold spiked as COVID panic hit. SPX dropped 34% from highs.' },
      { date: '2024-03-08', description: 'Gold and SPX both at all-time highs. Liquidity-driven rally.' },
    ],
  },
  COPPER_GOLD_RATIO: {
    name: 'Copper/Gold Ratio',
    pair: ['COPPER', 'GOLD'],
    importance: 'critical',
    description: 'Copper = growth expectations. Gold = fear. Ratio rising = economy strengthening. Ratio falling = slowdown. Leads GDP by months.',
    bullish_when: 'Copper outperforming gold. Industry needs copper for building, manufacturing, electrification.',
    bearish_when: 'Gold outperforming copper. Growth expectations fading, safety demand rising.',
    beginner_explanation: 'Copper goes into buildings, wires, factories \u2014 things you need when the economy is growing. Gold is what you buy when you\'re worried. When copper is winning, the economy is expanding. When gold is winning, something\'s wrong.',
    historical_events: [
      { date: '2021-05-10', description: 'Copper/Gold ratio peaked. Signaled growth slowdown that hit in Q3.' },
      { date: '2023-10-27', description: 'Ratio bottomed. Economy proved more resilient than expected.' },
    ],
  },
  SMH_MARKET: {
    name: 'Semiconductors Leading',
    pair: ['SMH', 'SPX'],
    importance: 'critical',
    description: 'Semis sit at the intersection of AI capex, consumer demand, and global supply chains. When semis roll, everything follows.',
    bullish_when: 'SMH making new highs and outperforming SPX. Tech capex is healthy.',
    bearish_when: 'SMH breaking down while SPX holds. The foundation is cracking.',
    beginner_explanation: 'Semiconductors (computer chips) go into everything: phones, cars, data centers, appliances. When chip companies are doing well, it means demand across the entire economy is strong. Semis tend to turn down before the rest of the market.',
    historical_events: [
      { date: '2024-07-11', description: 'SMH peaked. SPX followed lower within 2 weeks.' },
      { date: '2023-01-06', description: 'SMH bottomed and led the 2023 rally by months.' },
    ],
  },
  DJI_MAGS_RATIO: {
    name: 'Dow/Mega-Cap Tech Ratio',
    pair: ['DJI', 'MAGS'],
    importance: 'important',
    description: 'If DJI outperforms MAGS, the market\'s foundation is cracking even if index numbers look fine.',
    bullish_when: 'MAGS outperforming or keeping pace with DJI. Tech leadership = healthy bull market.',
    bearish_when: 'DJI ripping while MAGS stalls. Defensive rotation into safe names.',
    beginner_explanation: 'The biggest companies in the stock market are all tech: Apple, Microsoft, Nvidia. If old-school companies start outperforming tech, it means the growth story is fading and money is moving to "boring but safe" stocks. That\'s usually a warning sign.',
    historical_events: [
      { date: '2022-01-04', description: 'MAGS peaked. DJI/MAGS ratio began rising. Start of the 2022 bear market.' },
    ],
  },
  SMALL_CAPS: {
    name: 'Small Cap Participation',
    pair: ['RUT', 'SPX'],
    importance: 'important',
    description: 'Small caps leading = broad genuine growth. Small caps lagging = narrow, fragile rally.',
    bullish_when: 'Russell outperforming S&P. Broad-based growth.',
    bearish_when: 'Russell lagging badly. Only mega-caps holding up the index.',
    beginner_explanation: 'Big companies can do well even when the economy is struggling. Small companies depend on the actual economy. If small companies are doing well, it means Main Street is healthy, not just Wall Street.',
    historical_events: [
      { date: '2024-07-16', description: 'Russell surged 12% in 2 weeks. "Great Rotation" into small caps.' },
      { date: '2021-11-08', description: 'Russell peaked months before SPX. Warned of the 2022 bear market.' },
    ],
  },
  CREDIT_SPREADS: {
    name: 'Credit Market Stress',
    pair: ['HYG', 'LQD'],
    importance: 'critical',
    description: 'Credit markets smell trouble before equity markets. Widening spreads = institutions getting nervous before retail notices.',
    bullish_when: 'HYG keeping pace with LQD. Spread stable or narrowing.',
    bearish_when: 'HYG dropping while LQD holds. Money fleeing junk bonds. Often the first domino.',
    beginner_explanation: 'Junk bonds (HYG) are loans to risky companies. Safe bonds (LQD) are loans to solid companies. When investors dump junk bonds, it means they\'re worried about companies going bankrupt. This warning usually shows up weeks before the stock market drops.',
    historical_events: [
      { date: '2020-02-20', description: 'HYG/LQD spread widened. Equities crashed 2 weeks later.' },
      { date: '2022-06-16', description: 'Credit spreads peaked. Marked the bottom for equities.' },
    ],
  },
  YEN_CARRY: {
    name: 'Yen Carry Trade',
    pair: ['USDJPY', 'SPX'],
    importance: 'important',
    description: 'Sharp yen strength (USDJPY dropping) = carry trade unwind = global equity selloff.',
    bullish_when: 'USDJPY stable or slowly rising. Carry trade intact.',
    bearish_when: 'USDJPY plunging (yen spiking). Carry trade unwinding. Forced selling globally.',
    beginner_explanation: 'Big investors borrow money in Japan (where interest rates are near zero) and invest it globally. When the yen suddenly gets stronger, they\'re forced to sell investments to pay back loans. It\'s like a global margin call.',
    historical_events: [
      { date: '2024-08-05', description: 'Yen surged 12% in 3 weeks. Global equities dropped 6-8%. VIX spiked to 65.' },
      { date: '2024-08-06', description: 'BOJ signaled no more hikes. Yen stabilized. Markets recovered.' },
    ],
  },
  ENERGY_ROTATION: {
    name: 'Energy Sector Strength',
    pair: ['XLE', 'SPX'],
    importance: 'informational',
    description: 'Energy ripping while everything else stalls = money rotating into real assets.',
    bullish_when: 'XLE rising alongside SPX. General economic strength.',
    bearish_when: 'XLE making new highs while SPX stalls. Inflation fears. Rotation to real assets.',
    beginner_explanation: 'When oil companies start outperforming while tech lags, it often means investors are worried about inflation. They\'re moving money into "real stuff" and away from growth stories. It looks like strength, but it\'s actually defensive.',
    historical_events: [
      { date: '2022-06-08', description: 'XLE at highs while SPX in bear market. Classic inflation rotation.' },
    ],
  },
  VIX_STRUCTURE: {
    name: 'VIX / Equity Regime',
    pair: ['VIX', 'SPX'],
    importance: 'important',
    description: 'When VIX/SPX correlation breaks from its normal inverse, something structural is shifting.',
    bullish_when: 'VIX declining as SPX rises. Normal inverse relationship.',
    bearish_when: 'VIX rising alongside SPX. Hedging demand despite rising prices = smart money worried.',
    beginner_explanation: 'VIX is the "fear gauge." Normally it goes down when stocks go up. If VIX starts going UP while stocks also go up, it means professional traders are buying protection even though prices look good. That\'s a red flag.',
    historical_events: [
      { date: '2024-08-05', description: 'VIX spiked to 65. Highest since COVID. Yen carry trade unwind.' },
      { date: '2023-10-27', description: 'VIX peaked at 23. Marked the SPX bottom for the year.' },
    ],
  },
  BTC_NASDAQ: {
    name: 'Bitcoin / Nasdaq Correlation',
    pair: ['BTC', 'NDX'],
    importance: 'informational',
    description: 'BTC increasingly trades as a leveraged tech proxy. When this correlation breaks, it signals a regime change.',
    bullish_when: 'BTC and Nasdaq rising together. Risk appetite strong.',
    bearish_when: 'BTC diverging from Nasdaq significantly. Signals a potential regime shift.',
    beginner_explanation: 'Bitcoin used to move independently of stocks. Now it often moves with tech stocks. When they move in the same direction, the market is behaving "normally." When they diverge, something interesting is happening.',
    historical_events: [
      { date: '2022-11-09', description: 'FTX collapse broke BTC lower while Nasdaq held.' },
      { date: '2024-01-11', description: 'Bitcoin ETF approved. BTC/Nasdaq correlation tightened further.' },
    ],
  },
}

export function findSignalForPair(
  tickerA: string,
  tickerB: string,
): { key: string; signal: CorrelationSignalDef } | null {
  for (const [key, signal] of Object.entries(CORRELATION_SIGNALS)) {
    if (
      (signal.pair[0] === tickerA && signal.pair[1] === tickerB) ||
      (signal.pair[0] === tickerB && signal.pair[1] === tickerA)
    ) {
      return { key, signal }
    }
  }
  return null
}
