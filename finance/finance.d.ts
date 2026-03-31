/**
 * finance.d.ts — Yahoo Finance 行情网关
 */
declare const finance: {
    /**
     * 查询全球任意股票、加密货币和外汇此时此刻的真实盘面价格与涨跌幅。
     * 
     * @param symbol 雅虎财经的股票或货币代码，如 "AAPL" 或 "BTC-USD"。
     * @returns 返回高度摘要的金融数值如最新价格、前一日收盘对比和涨跌幅文本。
     * 
     * @example
     * const nvidiaQuote = await finance.quote("NVDA");
     * console.log(nvidiaQuote);
     */
    quote(symbol: string): Promise<string>;
};
