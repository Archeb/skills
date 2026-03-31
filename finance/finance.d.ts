/**
 * finance.d.ts — 实时金融行情（yahoo-finance2）
 *
 * 查询全球股票、加密货币、外汇的实时价格与行情数据。免 API Key。
 */

interface FinanceQuote {
    symbol: string;
    shortName?: string;
    longName?: string;
    quoteType: string;
    currency?: string;
    exchange: string;
    marketState: "REGULAR" | "CLOSED" | "PRE" | "POST" | string;
    regularMarketPrice?: number;
    regularMarketChange?: number;
    regularMarketChangePercent?: number;
    regularMarketPreviousClose?: number;
    regularMarketOpen?: number;
    regularMarketDayHigh?: number;
    regularMarketDayLow?: number;
    regularMarketVolume?: number;
    regularMarketTime?: Date;
    fiftyTwoWeekLow?: number;
    fiftyTwoWeekHigh?: number;
    fiftyDayAverage?: number;
    twoHundredDayAverage?: number;
    marketCap?: number;
    trailingPE?: number;
    forwardPE?: number;
    dividendYield?: number;
    [key: string]: any;
}

declare const finance: {
    /**
     * 查询单个代码的实时行情快照。
     *
     * @param symbol Yahoo Finance 代码，如 "AAPL"、"0700.HK"、"BTC-USD"、"CNYUSD=X"
     * @returns 包含价格、涨跌幅、成交量等完整行情数据的对象
     *
     * @example
     * const q = await finance.quote("NVDA");
     * console.log(q.longName, q.regularMarketPrice, q.currency, q.regularMarketChangePercent + "%");
     */
    quote(symbol: string): Promise<FinanceQuote>;

    /**
     * 批量查询多个代码的行情。
     *
     * @example
     * const results = await finance.quote(["AAPL", "TSLA", "BTC-USD"]);
     * results.forEach(q => console.log(q.symbol, q.regularMarketPrice));
     */
    quote(symbols: string[]): Promise<FinanceQuote[]>;

    /**
     * 搜索股票/基金/货币的代码和名称。
     *
     * @example
     * const res = await finance.search("nvidia");
     * res.quotes.forEach(q => console.log(q.symbol, q.shortname));
     */
    search(query: string): Promise<{ quotes: Array<{ symbol: string; shortname: string; quoteType: string; exchange: string }> }>;
};
