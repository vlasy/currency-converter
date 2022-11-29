// This will communicate with the CNB exchange rate API
// Keep it here for testing purposes.
// TODO: Add environment-dependent configuration
/* const dummyResponse = `24 Nov 2022 #227
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.831
Brazil|real|1|BRL|4.395
Bulgaria|lev|1|BGN|12.473
Canada|dollar|1|CAD|17.559
China|renminbi|1|CNY|3.278
Croatia|kuna|1|HRK|3.235
Denmark|krone|1|DKK|3.280
EMU|euro|1|EUR|24.395
Hongkong|dollar|1|HKD|3.000
Hungary|forint|100|HUF|5.903
Iceland|krona|100|ISK|16.652
IMF|SDR|1|XDR|30.663
India|rupee|100|INR|28.690
Indonesia|rupiah|1000|IDR|1.495
Israel|new shekel|1|ILS|6.855
Japan|yen|100|JPY|16.955
Malaysia|ringgit|1|MYR|5.212
Mexico|peso|1|MXN|1.210
New Zealand|dollar|1|NZD|14.697
Norway|krone|1|NOK|2.358
Philippines|peso|100|PHP|41.353
Poland|zloty|1|PLN|5.195
Romania|leu|1|RON|4.958
Singapore|dollar|1|SGD|17.038
South Africa|rand|1|ZAR|1.376
South Korea|won|100|KRW|1.765
Sweden|krona|1|SEK|2.247
Switzerland|franc|1|CHF|24.849
Thailand|baht|100|THB|65.476
Turkey|lira|1|TRY|1.258
United Kingdom|pound|1|GBP|28.387
USA|dollar|1|USD|23.427`; */

export interface ExchangeRateEntry {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

const ratesURL =
    'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

const downloadExchangeRates = async () => {
    // Direct request was not working for me, so I used CORS proxy
    const data = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(ratesURL)}`);
    return (await data.json()).contents;
};

const parseExchangeRates = (data: string): ExchangeRateEntry[] => {
    const rows = data.split('\n');
    const rates = rows
        .slice(2)
        .filter((item) => item !== '')
        .map((row: string) => {
            const splitted = row.split('|');
            return {
                country: splitted[0],
                currency: splitted[1],
                amount: parseInt(splitted[2]),
                code: splitted[3],
                rate: parseFloat(splitted[4]),
            };
        });
    return rates;
};

export const getExchangeRates = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // TODO: remove
    const rawData = await downloadExchangeRates();
    console.log({ rawData });
    const rates = await parseExchangeRates(rawData);
    return rates;
};
