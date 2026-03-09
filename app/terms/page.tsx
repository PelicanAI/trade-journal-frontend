import type { Metadata } from 'next';
import Link from 'next/link';
import '../legal-styles.css';

export const metadata: Metadata = {
  title: 'Terms of Service | Pelican AI',
  description: 'Terms and Conditions of Service for Pelican Trading, LLC — governing your access to and use of the Pelican platform and services.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <nav className="legal-nav">
        <Link href="/" className="back-link">← Back to Home</Link>
      </nav>
      <main id="main-content" className="legal-content">
        <h1>Terms and Conditions of Service</h1>
        <p className="legal-meta">
          <strong>PELICAN TRADING, LLC</strong><br />
          An Illinois Limited Liability Company<br />
          <br />
          Effective Date: 2/28/2026<br />
          Last Updated: 2/28/2026
        </p>

        <nav className="toc" style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Table of Contents</h2>
          <ol style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', lineHeight: '1.8' }}>
            <li><a href="#section-1">Acceptance of Terms</a></li>
            <li><a href="#section-2">Nature of Services and Critical Disclaimers</a></li>
            <li><a href="#section-3">AI-Generated Content Disclaimers</a></li>
            <li><a href="#section-4">Market Data and Information Disclaimers</a></li>
            <li><a href="#section-5">User Trading Data and Position Tracking</a></li>
            <li><a href="#section-6">Risk Disclosures</a></li>
            <li><a href="#section-7">Prohibited Uses</a></li>
            <li><a href="#section-8">Intellectual Property</a></li>
            <li><a href="#section-9">Limitation of Liability</a></li>
            <li><a href="#section-10">Indemnification</a></li>
            <li><a href="#section-11">Disclaimers of Warranties</a></li>
            <li><a href="#section-12">Data and Privacy</a></li>
            <li><a href="#section-13">Dispute Resolution</a></li>
            <li><a href="#section-14">API and Technical Terms</a></li>
            <li><a href="#section-15">Compliance and Regulatory Matters</a></li>
            <li><a href="#section-16">Beta Features and Experimental Services</a></li>
            <li><a href="#section-17">Termination</a></li>
            <li><a href="#section-18">Enterprise and Institutional Terms</a></li>
            <li><a href="#section-19">Miscellaneous</a></li>
            <li><a href="#section-20">Specific Risk Warnings</a></li>
            <li><a href="#section-21">Regulatory Disclosures</a></li>
            <li><a href="#section-22">Future Services Disclaimer</a></li>
            <li><a href="#section-23">Communications</a></li>
            <li><a href="#section-24">Acknowledgments</a></li>
          </ol>
        </nav>

        <section id="section-1">
          <h2>1. ACCEPTANCE OF TERMS</h2>
          <p>
            <strong>1.1 Binding Agreement.</strong> These Terms and Conditions of Service (the &quot;Terms,&quot; &quot;Agreement,&quot; or &quot;TOS&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Pelican Trading, LLC, an Illinois limited liability company (&quot;Pelican,&quot; &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), governing your access to and use of the Pelican platform, services, websites, applications, APIs, tools, and all related software and documentation (collectively, the &quot;Services&quot;).
          </p>
          <p>
            <strong>1.2 Acceptance Required.</strong> By accessing, browsing, or using the Services in any manner, including but not limited to visiting or browsing the website, registering an account, or accessing any content, information, or materials, you agree to be bound by these Terms. If you do not agree to all provisions of these Terms, you are not authorized to access or use the Services and must immediately cease all use.
          </p>
          <p>
            <strong>1.3 Capacity to Contract.</strong> You represent and warrant that you: (i) are at least eighteen (18) years of age; (ii) have the legal capacity to enter into binding contracts; (iii) are not prohibited by applicable law from using the Services; and (iv) will comply with all applicable laws and regulations in your use of the Services.
          </p>
          <p>
            <strong>1.4 Modifications.</strong> We reserve the right to modify these Terms at any time in our sole discretion. Material changes will be notified via email or prominent notice on the Services. Continued use after such modifications constitutes acceptance of the updated Terms. It is your responsibility to review the Terms periodically.
          </p>
        </section>

        <section id="section-2">
          <h2>2. NATURE OF SERVICES AND CRITICAL DISCLAIMERS</h2>
          <p>
            <strong>2.1 NATURE OF SERVICES.</strong> THE SERVICES ARE PROVIDED FOR INFORMATIONAL, EDUCATIONAL, AND PERSONAL ORGANIZATIONAL PURPOSES ONLY. The Services include: (a) AI-generated educational market analysis and research content; (b) self-directed trade journaling and record-keeping tools; (c) portfolio organization and visualization features; (d) quantitative data displays and calculations; and (e) strategy education resources. NONE OF THESE CATEGORIES, INDIVIDUALLY OR IN COMBINATION, CONSTITUTE INVESTMENT ADVICE, FINANCIAL ADVICE, PORTFOLIO MANAGEMENT, TRADING ADVICE, TAX ADVICE, LEGAL ADVICE, OR ANY OTHER FORM OF PROFESSIONAL ADVICE. PELICAN IS NOT A BROKER-DEALER, INVESTMENT ADVISOR, FINANCIAL ADVISOR, COMMODITY TRADING ADVISOR, FINANCIAL PLANNER, FIDUCIARY, OR TAX ADVISOR.
          </p>
          <p>
            <strong>2.2 No Recommendations.</strong> Nothing provided through the Services should be construed as a recommendation to buy, sell, hold, or otherwise transact in any security, derivative, commodity, cryptocurrency, or financial instrument. All content is general in nature and does not take into account your individual circumstances, financial situation, objectives, or risk tolerance.
          </p>
          <p>
            <strong>2.3 No Fiduciary Relationship.</strong> NO FIDUCIARY, ADVISORY, CUSTODIAL, MONITORING, OR SIMILAR RELATIONSHIP IS CREATED BETWEEN YOU AND PELICAN BY YOUR USE OF ANY FEATURE OF THE SERVICES. We do not owe you any fiduciary duties, which means we do not act in your best interests and are not required to disclose any conflicts of interest.
          </p>
          <p>
            <strong>2.4 Independent Verification Required.</strong> You acknowledge and agree that you must independently verify all information, data, calculations, analysis, and content provided through the Services before making any decisions. Do not rely solely on the Services for any purpose.
          </p>
          <p>
            <strong>2.5 Contextual Analysis Is Not Personalized Advice.</strong> The Services generate analysis that references, incorporates, and is contextualized by trading data you have voluntarily provided, including position details, entry prices, stop losses, targets, and portfolio composition (&quot;Contextual Analysis&quot;). You acknowledge that the generation of Contextual Analysis is a mechanical, algorithmic process and DOES NOT CONSTITUTE PERSONALIZED INVESTMENT ADVICE, PORTFOLIO MANAGEMENT, SUITABILITY ANALYSIS, OR A TAILORED RECOMMENDATION.
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) Contextual Analysis does not consider your complete financial situation, including total net worth, income, liabilities, tax status, investment objectives, time horizon, or liquidity needs beyond what you have voluntarily input;<br />
            (b) Contextual Analysis does not and cannot assess suitability or appropriateness of any position, strategy, or transaction for your individual circumstances;<br />
            (c) Contextual Analysis cannot account for your emotional state, cognitive biases, risk capacity, or behavioral tendencies that affect trading performance;<br />
            (d) Contextual Analysis does not integrate with your brokerage systems and cannot verify your actual account balances, margin requirements, buying power, or executed fills;<br />
            (e) Contextual Analysis is generated algorithmically without review, approval, or supervision by any licensed financial professional;<br />
            (f) The appearance of personalization, including references to your specific positions, tickers, entry prices, and P&L figures, reflects data you provided and does not create a professional advisory relationship; and<br />
            (g) Contextual Analysis should not be relied upon as a substitute for consultation with a licensed financial advisor who can evaluate your complete circumstances.
          </p>
          <p>
            YOUR PROVISION OF TRADING DATA ENABLES CONTEXTUAL EDUCATIONAL CONTENT AND DATA ORGANIZATION TOOLS, NOT AN ADVISORY RELATIONSHIP. THE SOPHISTICATION OF AI-GENERATED CONTEXTUAL ANALYSIS DOES NOT ELEVATE EDUCATIONAL CONTENT INTO PROFESSIONAL ADVICE.
          </p>
          <p>
            <strong>2.6 Regulatory Non-Advice Firewall.</strong> THE SERVICES DO NOT PROVIDE REGULATORY INTERPRETATION, COMPLIANCE GUIDANCE, TAX STRATEGY, OR LEGAL ANALYSIS. Pelican does not and cannot: interpret or apply securities laws, commodities regulations, or tax codes; provide guidance on regulatory compliance or reporting obligations; generate advice that would be regulated under the Investment Advisers Act of 1940; provide recommendations covered by the Commodity Exchange Act; offer opinions on the legality or regulatory status of any trading activity; or assess your compliance with pattern day trader rules, margin requirements, or position limits.
          </p>
          <p>
            Any outputs that appear analytical, statistical, or data-driven are educational demonstrations only and DO NOT CONSTITUTE ACTIONABLE FINANCIAL RECOMMENDATIONS. The sophisticated appearance of AI-generated analysis does not transform educational content into professional advice.
          </p>
          <p>
            <strong>2.7 Model Outputs Are Not Market Predictions.</strong> ALL OUTPUTS, CALCULATIONS, AND ANALYSIS ARE RETROSPECTIVE OR HYPOTHETICAL AND SHOULD NEVER BE INTERPRETED AS PREDICTIONS, FORECASTS, OR ASSURANCES OF FUTURE MARKET BEHAVIOR. The Services do not predict future price movements, cannot forecast market outcomes, do not guarantee probability of success, provide no assurance of profitability, and offer no certainty about market behavior. All modeling is inherently probabilistic, subject to fundamental uncertainty, and based on incomplete information.
          </p>
          <p>
            <strong>2.8 Feature-Specific Disclaimers.</strong> Certain features of the Services generate analysis that may appear evaluative, diagnostic, or prescriptive. The following disclaimers apply to specific features:
          </p>
          <p>
            <strong>2.8.1 Trade Grading Feature</strong>
          </p>
          <p>
            The AI Trade Grading feature provides retrospective algorithmic analysis of closed trades you have voluntarily logged. You acknowledge and agree that:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) Letter grades and dimensional assessments (including but not limited to entry timing, exit execution, risk management, thesis quality, and plan adherence) are generated by AI systems subject to all limitations in Section 3, including the potential for errors, inconsistencies, and biases;<br />
            (b) Grades evaluate your self-reported reasoning and documented process against general trading principles, NOT against any standard of professional competence, optimal execution, or industry benchmarks;<br />
            (c) The &apos;process over outcome&apos; evaluation methodology means that grades do not correlate with profitability. A FAVORABLE GRADE ON A LOSING TRADE DOES NOT VALIDATE YOUR APPROACH. AN UNFAVORABLE GRADE ON A WINNING TRADE DOES NOT INVALIDATE YOUR APPROACH;<br />
            (d) Grades are educational self-reflection tools for journaling purposes, not professional performance evaluations, not feedback from a licensed advisor, and not validation or criticism of your trading methodology;<br />
            (e) You should not modify your trading approach, increase position sizes, or alter risk parameters based solely on AI-generated grades;<br />
            (f) Pelican does not guarantee consistency of grading across trades, timeframes, or model versions; and<br />
            (g) The Trade Grading feature consumes credits upon initiation and credits are non-refundable regardless of grade quality, accuracy, or usefulness.
          </p>
          <p>
            <strong>2.8.2 Position Analysis Features</strong>
          </p>
          <p>
            Features that analyze positions you have logged, including but not limited to features labeled &quot;Monitor,&quot; &quot;Scan,&quot; &quot;Review,&quot; or &quot;Check In,&quot; generate educational information about positions you have voluntarily recorded. You acknowledge and agree that:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) These features do not provide professional monitoring services, do not generate alerts requiring action, and do not constitute ongoing advisory oversight of your portfolio;<br />
            (b) The use of terms like &apos;monitor,&apos; &apos;scan,&apos; &apos;health,&apos; &apos;review,&apos; or similar describes the informational function of the feature, not a professional monitoring or advisory relationship;<br />
            (c) Position health indicators, status labels, and similar assessments are algorithmic outputs based on your self-reported parameters (such as whether you set a stop loss) and DO NOT constitute professional assessment of position quality or viability;<br />
            (d) Any AI-generated commentary about your positions is educational context, not a recommendation to hold, sell, adjust, or add to any position; and<br />
            (e) Pelican has no duty to proactively alert you to adverse price movements, approaching stop losses, margin calls, or any other condition affecting your positions, even if the data to do so is available within the Services.
          </p>
          <p>
            <strong>2.8.3 Pre-Trade Analysis Features</strong>
          </p>
          <p>
            Features that assist with trade planning, including but not limited to features labeled &quot;Pre-Trade Check,&quot; &quot;Pre-Trade Research,&quot; &quot;Analyze,&quot; or similar, provide educational information gathering tools. You acknowledge and agree that:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) These features do not evaluate whether a trade is suitable for you, do not constitute buy, sell, or hold recommendations, and do not assess whether you should enter a position;<br />
            (b) The term &apos;check&apos; or &apos;analysis&apos; refers to educational information gathering, not professional trade validation or approval;<br />
            (c) Use of these features before placing a trade does not shift any responsibility for that trade to Pelican; and<br />
            (d) You are solely responsible for all trade entry decisions regardless of any information provided by these features.
          </p>
          <p>
            <strong>2.8.4 Risk Analysis Features</strong>
          </p>
          <p>
            Features that display risk metrics, including but not limited to Risk Budget, Portfolio R:R ratio, Total at Risk, Potential Reward, Exposure Breakdown, Net Exposure, and risk validation tools, provide educational calculations based on User Trading Data. You acknowledge and agree that:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) Risk calculations are derived from your self-reported data and market data subject to all limitations in Section 4;<br />
            (b) These features do not constitute professional risk management services, risk advisory services, or portfolio risk assessment by a qualified professional;<br />
            (c) Risk metrics may be inaccurate, incomplete, or misleading due to limitations in input data, calculation methodology, or market data quality;<br />
            (d) The display of risk metrics does not mean Pelican is managing, monitoring, or overseeing your risk exposure; and<br />
            (e) Features that invite you to &apos;validate&apos; or &apos;analyze&apos; your risk with Pelican provide educational commentary, not professional validation or approval of your risk management approach.
          </p>
          <p>
            <strong>2.8.5 Morning Brief Feature</strong>
          </p>
          <p>
            The Daily Brief feature generates market summaries that may reference your positions, watchlist, upcoming earnings relevant to your holdings, and macro events. You acknowledge and agree that:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) The Morning Brief is an automated summary generated by AI systems, not a research report prepared by a licensed analyst or registered investment advisor;<br />
            (b) Position references are based on self-reported User Trading Data and may not reflect your current actual holdings;<br />
            (c) The Morning Brief does not constitute a recommendation to take any action on any position, including positions referenced in the brief;<br />
            (d) The Morning Brief is generated once per day and is not updated to reflect intraday developments; and<br />
            (e) The Morning Brief consumes credits upon generation and credits are non-refundable.
          </p>
          <p>
            <strong>2.8.6 Comparison Features</strong>
          </p>
          <p>
            Features that compare securities, strategies, or other instruments provide educational side-by-side analysis. Comparisons do not indicate preference for one instrument over another and do not constitute recommendations to buy, sell, or trade any instrument referenced in the comparison.
          </p>
          <p>
            <strong>2.9 Strategy Library and Playbook Content.</strong>
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) <strong>Educational Descriptions Only.</strong> The Strategy Library presents descriptions of common trading strategy frameworks (&quot;Strategy Content&quot;) for educational purposes. Strategy Content describes general concepts and does not constitute a recommendation to employ any specific strategy with real capital.<br />
            (b) <strong>&apos;Curated&apos; Means Editorially Selected.</strong> The label &apos;curated&apos; indicates editorial selection for educational clarity and completeness of description. It does NOT mean professionally vetted for profitability, backtested and verified, suitable for any particular user, recommended by a licensed professional, or endorsed for live trading.<br />
            (c) <strong>Difficulty Levels Are Not Suitability Assessments.</strong> Categorization as &apos;Beginner,&apos; &apos;Intermediate,&apos; or &apos;Advanced&apos; reflects the conceptual complexity of the strategy description, NOT an assessment of who should trade it. A strategy labeled &apos;Beginner&apos; may result in significant losses. Difficulty levels do not account for your experience, capital, risk tolerance, or market conditions.<br />
            (d) <strong>Playbook Tools.</strong> The Playbook feature provides organizational tools for documenting your own trading rules. Pelican does not evaluate, validate, or approve user-created playbooks. A playbook created using the Services does not constitute a professional trading plan reviewed by a licensed advisor.<br />
            (e) <strong>No Strategy Guarantee.</strong> No strategy described in the Services is guaranteed to be profitable in any market condition. Most trading strategies experience significant drawdown periods. Historical examples are illustrative and do not predict future performance.<br />
            (f) <strong>Independent Evaluation Required.</strong> Before implementing any strategy concept with real capital, you must independently evaluate its appropriateness for your circumstances and consult with a licensed financial professional.
          </p>
          <p>
            <strong>2.10 Quantitative Signals, Correlation Data, and Regime Analysis.</strong>
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) <strong>Retrospective Observations.</strong> The Services may identify statistical relationships, correlation changes, regime classifications, z-scores, and other quantitative patterns (&quot;Quantitative Signals&quot;). These are retrospective mathematical observations derived from historical data. THEY ARE NOT PREDICTIVE SIGNALS, TRADING ALERTS, OR ACTIONABLE RECOMMENDATIONS.<br />
            (b) <strong>Terminology Disclaimer.</strong> Labels such as &apos;signal,&apos; &apos;alert,&apos; &apos;weakening,&apos; &apos;flipping,&apos; &apos;regime change,&apos; and similar terms describe observed mathematical state changes in their statistical sense. They do not imply urgency to take trading action, professional recommendation to adjust positions, prediction of future behavior, or notification requiring response. Warning icons and colored indicators reflect statistical magnitude relative to historical norms, not importance for trading decisions.<br />
            (c) <strong>Correlation Instability.</strong> Correlation relationships are inherently unstable, regime-dependent, and may reverse suddenly. A correlation observed over any historical period provides no assurance about future behavior. Correlation is not causation, and statistical relationships may be spurious.<br />
            (d) <strong>Regime Classifications.</strong> Market regime classifications (e.g., &apos;Neutral,&apos; &apos;Risk-On,&apos; &apos;Risk-Off&apos;) are model outputs that categorize current statistical conditions. Regimes may be misclassified, may change without detection, and should never be used as sole inputs for trading decisions.<br />
            (e) <strong>&apos;Ask Pelican&apos; on Signals.</strong> The ability to request AI analysis of a Quantitative Signal provides educational commentary about the statistical observation. It does not constitute a recommendation to trade based on the signal.
          </p>
          <p>
            <strong>2.11 Engagement and Gamification Features.</strong> The Services may include progress indicators, achievement milestones, streak counters, onboarding checklists, and similar features (&quot;Engagement Features&quot;). You acknowledge that:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) Engagement Features are designed to help you learn and navigate the platform&apos;s functionality, not to encourage trading activity or increase trading frequency;<br />
            (b) Completion of onboarding milestones (such as logging a trade or exploring a feature) is intended to familiarize you with available tools, not to recommend that you engage in trading;<br />
            (c) Streak indicators and progress tracking reflect platform usage consistency, not trading performance or discipline; and<br />
            (d) You should not increase your trading activity, frequency, or position sizes in response to Engagement Features.
          </p>
          <p>
            <strong>2.12 Earnings Calendar and Event Data.</strong> The Earnings Calendar displays publicly available earnings report dates, consensus estimates, and reported results. You acknowledge that:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) Earnings data is sourced from third-party providers and may be delayed, incorrect, or incomplete;<br />
            (b) Consensus estimates reflect aggregated analyst expectations and are not Pelican&apos;s predictions;<br />
            (c) The &apos;Spotlight&apos; designation for certain earnings events reflects estimated market impact, not a recommendation to trade those events;<br />
            (d) Filtering by &apos;My Positions&apos; is an organizational convenience and does not constitute monitoring of your holdings around earnings; and<br />
            (e) AI-generated analysis triggered by clicking an earnings event is educational commentary, not a recommendation to establish, maintain, or close any position before or after the earnings report.
          </p>
        </section>

        <section id="section-3">
          <h2>3. AI-GENERATED CONTENT DISCLAIMERS</h2>
          <p>
            <strong>3.1 Artificial Intelligence Limitations.</strong> The Services utilize artificial intelligence, machine learning, large language models, and algorithmic systems (collectively, &quot;AI Systems&quot;) that may produce errors, inaccuracies, hallucinations, biases, or misleading information. AI-generated content may appear authoritative but could be partially or entirely incorrect.
          </p>
          <p>
            <strong>3.2 No Guarantee of Accuracy.</strong> WE MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING THE ACCURACY, COMPLETENESS, TIMELINESS, SUITABILITY, OR RELIABILITY OF ANY AI-GENERATED CONTENT. AI Systems may generate false or fabricated information, misinterpret market data, produce inconsistent results, fail to identify critical risks, exhibit unpredictable behavior, contain systematic biases, and hallucinate facts, figures, or events.
          </p>
          <p>
            <strong>3.3 Automation Bias Risk.</strong> Users acknowledge the psychological tendency to over-rely on automated systems (&quot;automation bias&quot;). You must maintain critical judgment and not defer decision-making to AI outputs. The professional appearance, confident tone, and detailed formatting of AI outputs do not indicate accuracy or reliability.
          </p>
          <p>
            <strong>3.4 Model Variability.</strong> Results may vary based on model version, provider, data source, prompt construction, system load, or other factors. Identical queries may produce different outputs. These differences are artifacts of model behavior, not meaningful signals about changing market conditions.
          </p>
          <p>
            <strong>3.5 User Verification Obligation.</strong> YOU HAVE AN ABSOLUTE AND NON-DELEGABLE OBLIGATION TO INDEPENDENTLY VERIFY ALL INFORMATION THROUGH AUTHORITATIVE SOURCES BEFORE TAKING ANY ACTION. This includes validating all data through official market sources, consulting licensed financial professionals for investment decisions, verifying calculations through independent means, cross-referencing statistical claims, confirming regulatory requirements with qualified counsel, and never relying on Pelican as a sole or primary information source. FAILURE TO INDEPENDENTLY VERIFY INFORMATION IS AT YOUR SOLE RISK.
          </p>
          <p>
            <strong>3.6 No Human Review.</strong> ALL OUTPUTS ARE AUTO-GENERATED WITHOUT HUMAN REVIEW, VERIFICATION, OR VALIDATION. No licensed professional has reviewed outputs for accuracy, verified calculations or methodology, approved content for distribution, confirmed regulatory compliance, or validated statistical claims.
          </p>
          <p>
            <strong>3.7 Authoritative Tone Does Not Equal Accuracy.</strong> AI-generated outputs may exhibit confident, authoritative, or professional tone that does not reflect actual accuracy, reliability, or expertise. You must not interpret confident language, professional terminology, detailed explanations, mathematical precision, coherent narrative structure, or the absence of uncertainty markers as indicators of correctness.
          </p>
          <p>
            <strong>3.8 Formatting Is Not Validation.</strong> The presence of charts, graphs, tables, bold text, statistical figures, or professional formatting does not imply accuracy of underlying data, validity of calculations, correctness of methodology, professional review, regulatory compliance, or suitability for any purpose.
          </p>
          <p>
            <strong>3.9 Credit System.</strong> Certain features consume credits upon use. You acknowledge and agree that:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) Credits are consumed when a request is initiated, regardless of whether the output meets your expectations, is useful, or is accurate;<br />
            (b) AI-generated outputs may be unsatisfactory, incomplete, erroneous, or unhelpful, and credit consumption is non-refundable in such cases unless otherwise required by applicable law;<br />
            (c) Pelican reserves the right to modify credit costs per feature, credit allocations per subscription tier, and credit expiration terms at any time with notice;<br />
            (d) When credits are exhausted, access to credit-consuming features is restricted, but access to previously generated content and logged data is maintained; and<br />
            (e) Different features consume different amounts of credits. The credit cost of each feature is displayed at the point of use.
          </p>
        </section>

        <section id="section-4">
          <h2>4. MARKET DATA AND INFORMATION DISCLAIMERS</h2>
          <p>
            <strong>4.1 Non-Display Data Usage.</strong> The Services utilize &quot;non-display data&quot; for computational and analytical purposes. Users do not directly access raw exchange data feeds. All market information is processed, transformed, and presented through intermediary systems.
          </p>
          <p>
            <strong>4.2 Data Accuracy Disclaimer.</strong> Market data, prices, volumes, and other information may be delayed, stale, or cached; incomplete or missing data points; subject to revision or correction; aggregated from multiple sources with varying quality; affected by technical errors or transmission issues; and different from official exchange records.
          </p>
          <p>
            <strong>4.3</strong> WE EXPRESSLY DISCLAIM ALL WARRANTIES REGARDING DATA ACCURACY, COMPLETENESS, OR FITNESS FOR ANY PARTICULAR PURPOSE. DATA MAY CONTAIN ERRORS, OMISSIONS, OR INACCURACIES THAT COULD MATERIALLY AFFECT ANALYSIS OUTCOMES.
          </p>
          <p>
            <strong>4.4 Historical Data Limitations.</strong> Historical data and backtesting results do not guarantee future performance, may suffer from survivorship bias, cannot account for all market conditions, may not include transaction costs, slippage, or market impact, and are hypothetical and may not reflect actual trading results.
          </p>
          <p>
            <strong>4.5 No Duty to Update or Correct.</strong> PELICAN HAS NO OBLIGATION TO UPDATE, REVISE, CORRECT, MAINTAIN, OR VERIFY ANY DATA, OUTPUT, ANALYSIS, OR INFORMATION. Data and outputs may remain incorrect indefinitely, become outdated without notice, and contain undetected errors permanently.
          </p>
          <p>
            <strong>4.6 Data Vendor Compliance.</strong> Pelican transforms, analyzes, delays, aggregates, and summarizes data from various sources. THE SERVICES DO NOT PROVIDE OR REDISTRIBUTE RAW MARKET DATA. You may need separate market data licenses for trading. Pelican is not responsible for your compliance with data vendor requirements.
          </p>
          <p>
            <strong>4.7 Heatmap and Visualization Data.</strong> Market heatmaps, charts, and visual representations display processed market data subject to all limitations in this Section 4. Color coding, tile sizes, and visual emphasis reflect data values but do not indicate investment merit or trading signals. The visual prominence of any security in a heatmap does not constitute a recommendation.
          </p>
        </section>

        <section id="section-5">
          <h2>5. USER TRADING DATA AND POSITION TRACKING</h2>
          <p>
            <strong>5.1 User-Provided Trading Data.</strong> You may voluntarily input trading data, including positions, entry prices, exit prices, stop losses, take profit targets, thesis notes, conviction levels, and other parameters (&quot;User Trading Data&quot;) into the Services. You acknowledge and agree that:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) The Services utilize User Trading Data to generate Contextual Analysis, display portfolio metrics, and provide organizational tools;<br />
            (b) Such utilization does not create a personalized advisory, fiduciary, portfolio management, custodial, or monitoring relationship;<br />
            (c) Pelican does not connect to, access, or monitor your brokerage accounts, exchange accounts, or wallets, and has no ability to verify whether User Trading Data accurately reflects your actual holdings, balances, or trading activity;<br />
            (d) User Trading Data is entirely self-reported and may be incomplete, inaccurate, outdated, or fictional, and Pelican bears no responsibility for the accuracy of any analysis, metric, or display derived from inaccurate inputs;<br />
            (e) Pelican has no duty to alert you to risks in your positions, warn you of adverse price movements, notify you of approaching stop loss levels, or inform you of any condition requiring action, even if the data to do so is available within the Services;<br />
            (f) Risk metrics displayed by the Services, including R:R ratios, exposure calculations, risk budgets, win rates, and similar, are mathematical derivations from your self-reported data and DO NOT constitute professional risk assessment or portfolio management; and<br />
            (g) YOUR TRADING DECISIONS REMAIN ENTIRELY YOUR OWN regardless of any analysis the Services generate about your User Trading Data.
          </p>
          <p>
            <strong>5.2 Trade Logging and Journal.</strong>
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (a) <strong>Self-Reported Records.</strong> The trade logging and journal features store trading activity you manually record (&quot;Trade Log Data&quot;). Pelican does not verify that logged trades were actually executed, that recorded prices are accurate, or that your records reflect your actual trading history.<br />
            (b) <strong>Calculation Accuracy.</strong> P&L calculations, R-multiples, win rates, and other derived metrics are only as accurate as your inputs and the market data available, which is subject to all limitations in Section 4. CALCULATED P&L MAY DIFFER MATERIALLY FROM YOUR ACTUAL BROKERAGE P&L due to data timing, rounding, fees, commissions, slippage, dividends, corporate actions, currency conversion, and other factors.<br />
            (c) <strong>Not Official Records.</strong> Trade Log Data does not constitute official trading records. You must maintain independent records through your brokerage for tax reporting, regulatory compliance, dispute resolution, and legal purposes. Do not rely on Pelican as your sole or primary source of trading records.<br />
            (d) <strong>No Custodial Relationship.</strong> The storage and display of Trade Log Data does not create a custodial, recordkeeping, administrative services, or accounting relationship.<br />
            (e) <strong>Data Persistence.</strong> While Pelican endeavors to maintain Trade Log Data, WE DO NOT GUARANTEE PERMANENT STORAGE, BACKUP, OR AVAILABILITY of any data. You are responsible for maintaining your own backups.<br />
            (f) <strong>Tax Disclaimer.</strong> Pelican does not calculate tax liabilities, does not generate tax documents (including Forms 1099, 8949, or Schedule D), and Trade Log Data should not be used for tax preparation or reporting without independent verification by a qualified tax professional.
          </p>
          <p>
            <strong>5.3 Position Display and Portfolio Visualization.</strong> The Positions page, Morning Brief, and other features display your User Trading Data alongside current market data to provide portfolio visualization. This display is an organizational tool. The aggregation and visualization of your position data does not constitute portfolio management, advisory services, or professional portfolio analysis.
          </p>
        </section>

        <section id="section-6">
          <h2>6. RISK DISCLOSURES</h2>
          <p>
            <strong>6.1</strong> TRADING AND INVESTING IN FINANCIAL INSTRUMENTS INVOLVES SUBSTANTIAL RISK OF LOSS AND IS NOT SUITABLE FOR EVERY PERSON. YOU CAN LOSE ALL OR MORE THAN YOUR INITIAL INVESTMENT. PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.
          </p>
          <p>
            <strong>6.2 Specific Trading Risks.</strong> Users acknowledge and accept risks including but not limited to: total loss of capital; leverage and margin risks; liquidity risks; counterparty risks; technology and system failures; market manipulation; regulatory changes; tax consequences; currency fluctuations; geopolitical events; and unprecedented market events.
          </p>
          <p>
            <strong>6.3 No Profit Guarantee.</strong> THE SERVICES DO NOT GUARANTEE PROFITABILITY, POSITIVE RETURNS, OR SUCCESSFUL OUTCOMES. The majority of retail traders lose money. You should be prepared to lose all funds used for trading.
          </p>
          <p>
            <strong>6.4 User Trading Independence.</strong> YOUR TRADING DECISIONS AND BEHAVIOR ARE COMPLETELY INDEPENDENT OF PELICAN. While the Services may display your self-reported positions and generate analysis that references your User Trading Data, Pelican does not make trading decisions on your behalf, does not execute or route orders, does not manage your portfolio, has no connection to your brokerage account, and has no ability to control, influence, or modify your trading activity. Any correlation between Pelican outputs and your trading decisions reflects your voluntary choice, not Pelican&apos;s direction.
          </p>
          <p>
            <strong>6.5 Model Predictions Disclaimer.</strong> Outputs that discuss probabilities, scenarios, or statistical relationships are not predictions of future events. All modeling is based on historical patterns that may not repeat, cannot account for unprecedented events, contains inherent and irreducible uncertainty, and should never be interpreted as forecasts. TREATING MODEL OUTPUTS AS PREDICTIVE IS A FUNDAMENTAL MISUSE OF THE SERVICES.
          </p>
        </section>

        <section id="section-7">
          <h2>7. PROHIBITED USES</h2>
          <p>
            <strong>7.1 General Restrictions.</strong> You agree not to: use the Services for any unlawful purpose; redistribute, resell, or commercialize any data or content without authorization; reverse engineer, decompile, or disassemble any aspect of the Services; circumvent rate limits, access controls, or security measures; scrape, harvest, or collect data through automated means; manipulate or interfere with the Services; transmit malicious code; impersonate any person or entity; use the Services to engage in market manipulation or fraud; access the Services from prohibited jurisdictions; violate any third-party rights; create derivative works without authorization; or use the Services for competitive analysis or benchmarking.
          </p>
          <p>
            <strong>7.2 Automated Trading Prohibition.</strong> Unless explicitly authorized in writing, you may not connect the Services to any automated trading system, execution management system, or order routing system.
          </p>
          <p>
            <strong>7.3 Professional Use Limitations.</strong> THE SERVICES ARE NOT DESIGNED, LICENSED, TESTED, OR INTENDED FOR high-frequency trading strategies, algorithmic or automated trading systems, professional trading operations, institutional trading desks, market making activities, arbitrage strategies requiring low latency, systematic trading programs, or quantitative fund strategies. Professional traders and institutions must not rely on the Services for time-sensitive, high-volume, or mission-critical trading decisions.
          </p>
        </section>

        <section id="section-8">
          <h2>8. INTELLECTUAL PROPERTY</h2>
          <p>
            <strong>8.1 Ownership.</strong> All content, features, functionality, software, algorithms, models, designs, and technology comprising the Services are owned by Pelican or its licensors and are protected by intellectual property laws.
          </p>
          <p>
            <strong>8.2 Limited License.</strong> Subject to compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for personal, non-commercial purposes.
          </p>
          <p>
            <strong>8.3 User Content.</strong> You retain ownership of content you submit but grant Pelican a worldwide, perpetual, irrevocable, royalty-free license to use, modify, reproduce, and create derivative works from such content for the purpose of providing and improving the Services.
          </p>
          <p>
            <strong>8.4 Feedback.</strong> Any feedback, suggestions, or improvements you provide become the property of Pelican without compensation to you.
          </p>
          <p>
            <strong>8.5 Strategy Content.</strong> Trading strategy descriptions, templates, and educational frameworks in the Strategy Library are owned by Pelican or contributed by community members under license. You may not reproduce, distribute, or create derivative works from Strategy Content without authorization.
          </p>
        </section>

        <section id="section-9">
          <h2>9. LIMITATION OF LIABILITY</h2>
          <p>
            <strong>9.1</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL PELICAN, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO: TRADING LOSSES OF ANY KIND; LOST PROFITS OR REVENUES; LOSS OF DATA INCLUDING TRADE LOG DATA; BUSINESS INTERRUPTION; EMOTIONAL DISTRESS; REPUTATIONAL HARM; LOSSES RESULTING FROM RELIANCE ON AI-GENERATED CONTENT; LOSSES RESULTING FROM INACCURATE RISK METRICS OR PORTFOLIO CALCULATIONS; LOSSES RESULTING FROM AI TRADE GRADES THAT DID NOT ACCURATELY REFLECT TRADE QUALITY; OR LOSSES RESULTING FROM QUANTITATIVE SIGNALS THAT DID NOT PREDICT FUTURE BEHAVIOR.
          </p>
          <p>
            <strong>9.2 Cap on Liability.</strong> PELICAN&apos;S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF (A) ONE HUNDRED DOLLARS ($100) OR (B) THE FEES PAID BY YOU IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
          </p>
          <p>
            <strong>9.3 Basis of Bargain.</strong> These limitations reflect the allocation of risk between the parties and form an essential basis of the bargain. The Services would not be provided without these limitations.
          </p>
          <p>
            <strong>9.4 Feature-Specific Liability Exclusion.</strong> Without limiting the generality of the foregoing, Pelican shall have no liability arising from or related to: any trade you enter, maintain, or exit after viewing AI-generated analysis; any portfolio loss occurring while your positions were displayed in the Services; any trade grade that you relied upon in continuing a trading strategy; any risk metric that inaccurately represented your actual risk exposure; any Quantitative Signal that did not accurately describe future correlation behavior; any strategy from the Strategy Library that produced losses when implemented; or any Morning Brief content that failed to identify material risks to your positions.
          </p>
        </section>

        <section id="section-10">
          <h2>10. INDEMNIFICATION</h2>
          <p>
            <strong>10.1 User Indemnification.</strong> You agree to indemnify, defend, and hold harmless Pelican and its affiliates, officers, directors, employees, agents, licensors, and suppliers from and against all claims, losses, expenses, damages, and costs, including reasonable attorneys&apos; fees, arising from: your violation of these Terms; your use or misuse of the Services; your trading or investment activities; your violation of any laws or third-party rights; content you submit or transmit; your negligence or willful misconduct; your reliance on AI-generated content; and any claim by a third party related to your trading activity.
          </p>
          <p>
            <strong>10.2 Defense Control.</strong> Pelican reserves the right to assume exclusive defense and control of any matter subject to indemnification, at your expense.
          </p>
        </section>

        <section id="section-11">
          <h2>11. DISCLAIMERS OF WARRANTIES</h2>
          <p>
            <strong>11.1</strong> THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
          </p>
          <p>
            <strong>11.2</strong> WE SPECIFICALLY DISCLAIM ALL WARRANTIES INCLUDING: MERCHANTABILITY; FITNESS FOR A PARTICULAR PURPOSE; NON-INFRINGEMENT; TITLE; ACCURACY; RELIABILITY; AVAILABILITY; SECURITY; QUIET ENJOYMENT; AND ANY WARRANTY ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.
          </p>
          <p>
            <strong>11.3 No Warranty of Continuous Operation.</strong> We do not warrant uninterrupted, timely, secure, or error-free operation of the Services. Features may be modified, degraded, or discontinued without notice.
          </p>
          <p>
            <strong>11.4 No Warranty of Data Completeness.</strong> We do not warrant that all relevant market events, earnings reports, corporate actions, or other material information will be captured, displayed, or included in any analysis.
          </p>
        </section>

        <section id="section-12">
          <h2>12. DATA AND PRIVACY</h2>
          <p>
            <strong>12.1 Data Collection.</strong> We collect, process, and store data as described in our Privacy Policy, incorporated herein by reference.
          </p>
          <p>
            <strong>12.2 Non-Personal Data.</strong> We may collect and use aggregated, anonymized data for any purpose, including improving the Services, research, and commercial purposes.
          </p>
          <p>
            <strong>12.3 Data Retention.</strong> We retain data according to legal requirements and business needs. We have no obligation to store data indefinitely.
          </p>
          <p>
            <strong>12.4 Security.</strong> While we implement security measures, we cannot guarantee absolute security. You acknowledge the inherent risks of internet-based services.
          </p>
          <p>
            <strong>12.5 User Trading Data Privacy.</strong> User Trading Data, including positions, trades, and portfolio information, is stored in accordance with our Privacy Policy. We do not sell or share individual User Trading Data with third parties except as required by law or as described in the Privacy Policy. Aggregated, anonymized trading data may be used for product improvement and research.
          </p>
        </section>

        <section id="section-13">
          <h2>13. DISPUTE RESOLUTION</h2>
          <p>
            <strong>13.1 Binding Arbitration.</strong> Any dispute arising from or relating to these Terms or the Services shall be resolved through binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules.
          </p>
          <p>
            <strong>13.2 Arbitration Procedures.</strong> Arbitration shall be conducted in Chicago, Illinois, decided by a single arbitrator, conducted in English, limited to written submissions unless otherwise agreed, and confidential.
          </p>
          <p>
            <strong>13.3 CLASS ACTION WAIVER.</strong> YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION, CLASS ARBITRATION, OR REPRESENTATIVE ACTION. DISPUTES MUST BE BROUGHT INDIVIDUALLY.
          </p>
          <p>
            <strong>13.4 Small Claims Exception.</strong> Either party may bring qualifying claims in small claims court.
          </p>
          <p>
            <strong>13.5 Injunctive Relief.</strong> Pelican may seek injunctive relief in any court of competent jurisdiction for intellectual property violations or breaches of confidentiality.
          </p>
        </section>

        <section id="section-14">
          <h2>14. API AND TECHNICAL TERMS</h2>
          <p>
            <strong>14.1 API Access.</strong> If provided API access, you agree to comply with all documentation and specifications, respect rate limits and quotas, not exceed authorized usage levels, maintain security of credentials, and promptly report any security issues.
          </p>
          <p>
            <strong>14.2 Service Levels.</strong> Unless covered by a separate enterprise agreement, we provide no service level agreements, uptime guarantees, or performance commitments.
          </p>
          <p>
            <strong>14.3 Changes and Deprecation.</strong> We may modify, suspend, or deprecate APIs, features, or services with or without notice.
          </p>
        </section>

        <section id="section-15">
          <h2>15. COMPLIANCE AND REGULATORY MATTERS</h2>
          <p>
            <strong>15.1 User Compliance Obligation.</strong> You are solely responsible for ensuring your use complies with all applicable laws, including securities laws, commodities laws, tax laws, AML requirements, KYC requirements, international trade and sanctions laws, and any professional licensing requirements.
          </p>
          <p>
            <strong>15.2 OFAC Compliance.</strong> You represent that you are not on any prohibited party list maintained by the Office of Foreign Assets Control (OFAC) or similar authority.
          </p>
          <p>
            <strong>15.3 Geographic Restrictions.</strong> The Services are not available in all jurisdictions. You are responsible for compliance with local laws.
          </p>
          <p>
            <strong>15.4 Regulatory Changes.</strong> We may modify or terminate Services in response to regulatory requirements without liability.
          </p>
          <p>
            <strong>15.5 AI Tool Legality.</strong> YOU ARE SOLELY RESPONSIBLE FOR DETERMINING WHETHER YOUR USE OF AI-POWERED ANALYTICS OR TRADING TOOLS IS LEGAL IN YOUR JURISDICTION. Pelican makes no representation that the Services are appropriate, legal, or available for use in any particular location.
          </p>
        </section>

        <section id="section-16">
          <h2>16. BETA FEATURES AND EXPERIMENTAL SERVICES</h2>
          <p>
            <strong>16.1 Beta Disclaimer.</strong> Features designated as &quot;beta,&quot; &quot;preview,&quot; &quot;experimental,&quot; &quot;coming soon,&quot; or similar are provided for evaluation purposes and may contain bugs, be discontinued without notice, change substantially, not be suitable for production use, and have limited or no support.
          </p>
          <p>
            <strong>16.2 No Reliance.</strong> Do not rely on beta features for critical decisions or ongoing workflows.
          </p>
        </section>

        <section id="section-17">
          <h2>17. TERMINATION</h2>
          <p>
            <strong>17.1 Termination Rights.</strong> Either party may terminate these Terms at any time. We may suspend or terminate your access immediately for any reason or no reason.
          </p>
          <p>
            <strong>17.2 Effects of Termination.</strong> Upon termination: your access rights cease immediately; you must stop using the Services; we may delete your data including Trade Log Data; and accrued obligations survive.
          </p>
          <p>
            <strong>17.3 Data Export.</strong> You may export your Trade Log Data prior to termination. After termination, Pelican has no obligation to retain or provide access to any data.
          </p>
          <p>
            <strong>17.4 No Refunds.</strong> Termination does not entitle you to any refunds of credits or subscription fees unless required by applicable law.
          </p>
        </section>

        <section id="section-18">
          <h2>18. ENTERPRISE AND INSTITUTIONAL TERMS</h2>
          <p>
            <strong>18.1 Separate Agreements.</strong> Enterprise or institutional clients may be subject to additional terms through separate agreements.
          </p>
          <p>
            <strong>18.2 Data Vendor Requirements.</strong> Institutional users must comply with all third-party data vendor requirements and may need separate data licenses.
          </p>
          <p>
            <strong>18.3 Redistribution Restrictions.</strong> Unless explicitly authorized, you may not redistribute, resell, or sublicense any data, analysis, or Services to third parties. This includes but is not limited to sharing AI-generated analysis, trade grades, Quantitative Signals, or strategy content with clients, customers, or the public.
          </p>
        </section>

        <section id="section-19">
          <h2>19. MISCELLANEOUS</h2>
          <p>
            <strong>19.1 Entire Agreement.</strong> These Terms, together with the Privacy Policy and any applicable subscription agreement, constitute the entire agreement between you and Pelican regarding the Services.
          </p>
          <p>
            <strong>19.2 Severability.</strong> If any provision is found unenforceable, the remaining provisions continue in full force.
          </p>
          <p>
            <strong>19.3 No Waiver.</strong> Our failure to enforce any right or provision is not a waiver of such right or provision.
          </p>
          <p>
            <strong>19.4 Assignment.</strong> You may not assign these Terms without our prior written consent. We may assign these Terms without restriction.
          </p>
          <p>
            <strong>19.5 Governing Law.</strong> These Terms are governed by the laws of the State of Illinois, excluding conflict of law principles.
          </p>
          <p>
            <strong>19.6 Survival.</strong> Provisions that by their nature should survive termination shall survive, including disclaimers, limitations of liability, indemnification, and dispute resolution.
          </p>
          <p>
            <strong>19.7 Force Majeure.</strong> Neither party is liable for delays or failures due to causes beyond reasonable control.
          </p>
          <p>
            <strong>19.8 Electronic Communications.</strong> You consent to electronic communications and agree electronic signatures have the same legal effect as manual signatures.
          </p>
          <p>
            <strong>19.9 Export Controls.</strong> You agree to comply with all applicable export and re-export control laws and regulations.
          </p>
        </section>

        <section id="section-20">
          <h2>20. SPECIFIC RISK WARNINGS</h2>
          <p>
            <strong>20.1 Model Risk.</strong> Quantitative models and algorithms may contain mathematical errors, be based on flawed assumptions, fail in unprecedented market conditions, suffer from overfitting to historical data, and not capture all relevant risk factors.
          </p>
          <p>
            <strong>20.2 Execution Risk.</strong> The Services do not provide trade execution. Actual execution may differ materially from analysis due to slippage, market impact, latency, partial fills, rejected orders, and technical failures.
          </p>
          <p>
            <strong>20.3 Calculation Disclaimer.</strong> All calculations, including but not limited to returns, volatility, correlations, backtests, statistical measures, P&L, R-multiples, win rates, risk budgets, and portfolio metrics, may be incorrect, incomplete, or based on flawed data.
          </p>
          <p>
            <strong>20.4 AI Grading Risk.</strong> AI-generated trade grades may incorrectly assess trade quality, may provide favorable grades for ultimately destructive trading patterns, and may provide unfavorable grades for sound trading decisions. Grades should never be the primary basis for evaluating your trading methodology.
          </p>
        </section>

        <section id="section-21">
          <h2>21. REGULATORY DISCLOSURES</h2>
          <p>
            <strong>21.1 No SIPC Protection.</strong> The Services are not covered by Securities Investor Protection Corporation (SIPC) insurance.
          </p>
          <p>
            <strong>21.2 No FDIC Insurance.</strong> The Services and any associated accounts are not FDIC insured.
          </p>
          <p>
            <strong>21.3 Not a Registered Entity.</strong> Pelican is not registered as a broker-dealer, investment advisor, commodity trading advisor, commodity pool operator, futures commission merchant, or any other regulated entity with the SEC, CFTC, FINRA, NFA, or any state securities regulator.
          </p>
          <p>
            <strong>21.4 No Suitability Assessment.</strong> We do not assess the suitability or appropriateness of any product, strategy, or transaction for your circumstances.
          </p>
        </section>

        <section id="section-22">
          <h2>22. FUTURE SERVICES DISCLAIMER</h2>
          <p>
            <strong>22.1 Potential Additional Services.</strong> If Pelican offers brokerage, execution, or similar services in the future, such services will be governed by separate agreements and additional regulatory disclosures will apply.
          </p>
          <p>
            <strong>22.2 No Current Execution Capability.</strong> Pelican currently provides no ability to execute, route, or place orders in any financial market.
          </p>
          <p>
            <strong>22.3 Professional Use Limitation.</strong> UNTIL EXPLICITLY AUTHORIZED FOR PROFESSIONAL USE, THE SERVICES ARE NOT INTENDED FOR registered investment advisors, broker-dealers, hedge funds, proprietary trading firms, market makers, trading desks, or financial institutions. Professional entities using the Services do so entirely at their own risk.
          </p>
        </section>

        <section id="section-23">
          <h2>23. COMMUNICATIONS</h2>
          <p>
            <strong>23.1 Electronic Notices.</strong> You consent to receive all communications electronically via email or the Services.
          </p>
          <p>
            <strong>23.2 Notice to Pelican.</strong> Legal notices to Pelican must be sent to:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            <strong>Pelican Trading, LLC</strong><br />
            2045 West Grand Avenue, STE B772866<br />
            Chicago, IL 60612<br />
            Email: <a href="mailto:legal@pelicantrading.ai">legal@pelicantrading.ai</a><br />
            Website: <a href="https://www.pelicantrading.ai">www.pelicantrading.ai</a>
          </p>
          <p>
            <strong>23.3 Notice to You.</strong> We may provide notice via your registered email address or the Services.
          </p>
        </section>

        <section id="section-24">
          <h2>24. ACKNOWLEDGMENTS</h2>
          <p>
            BY USING THE SERVICES, YOU ACKNOWLEDGE THAT:
          </p>
          <p style={{ paddingLeft: '1.5rem' }}>
            (i) You have read and understood these Terms in their entirety;<br />
            (ii) You have had the opportunity to seek independent legal advice;<br />
            (iii) You understand the risks of trading and investing;<br />
            (iv) You will not hold Pelican responsible for any losses;<br />
            (v) The Services provide educational content, organizational tools, and Contextual Analysis, none of which constitute personalized financial advice;<br />
            (vi) AI-generated content may be inaccurate, misleading, or entirely wrong;<br />
            (vii) You must independently verify all information;<br />
            (viii) You are solely responsible for your decisions and their consequences;<br />
            (ix) No fiduciary, advisory, custodial, or monitoring relationship exists;<br />
            (x) AI Trade Grades do not validate or invalidate your trading approach;<br />
            (xi) Quantitative Signals are retrospective observations, not predictions;<br />
            (xii) Strategy Content is educational, and &apos;curated&apos; does not mean &apos;recommended&apos;;<br />
            (xiii) Position analysis features provide educational commentary, not advisory oversight;<br />
            (xiv) You waive rights to class actions; and<br />
            (xv) Disputes will be resolved through individual arbitration.
          </p>
          <p>
            BY ACCESSING OR USING THE SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS.
          </p>
        </section>

        <section style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--bg-elevated)', borderRadius: '12px', border: '1px solid var(--border-default)' }}>
          <p style={{ margin: '0 0 1rem 0', fontWeight: 600 }}>
            <strong>IMPORTANT:</strong> THESE TERMS CONTAIN AN ARBITRATION CLAUSE AND CLASS ACTION WAIVER. BY AGREEING TO THESE TERMS, YOU AGREE TO RESOLVE DISPUTES THROUGH BINDING INDIVIDUAL ARBITRATION AND WAIVE THE RIGHT TO PARTICIPATE IN CLASS ACTIONS.
          </p>
          <p style={{ margin: 0 }}>
            <strong>CRITICAL WARNING:</strong> THE SERVICES ARE FOR EDUCATIONAL, INFORMATIONAL, AND PERSONAL ORGANIZATIONAL PURPOSES ONLY. NO OUTPUT, ANALYSIS, GRADE, SIGNAL, STRATEGY DESCRIPTION, RISK METRIC, OR INFORMATION PROVIDED BY PELICAN SHOULD BE USED AS THE BASIS FOR ANY TRADING OR INVESTMENT DECISION. YOU BEAR FULL RESPONSIBILITY FOR ALL FINANCIAL DECISIONS AND THEIR CONSEQUENCES. PELICAN ACCEPTS NO LIABILITY FOR ANY LOSSES, DAMAGES, OR ADVERSE OUTCOMES RESULTING FROM YOUR USE OF THE SERVICES.
          </p>
        </section>
      </main>
    </div>
  );
}

