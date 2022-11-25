// This will be form for currencies conversions

import { useState } from 'react';
import { ExchangeRateEntry } from '../services/CNBService';

interface CurrencyConverterProps {
    rates: ExchangeRateEntry[];
}

function CurrencyConverter(props: CurrencyConverterProps) {
    function performConversion() {
        const exchangeRate = codeToExchangeRate[currencyOption];
        const result = (amount * exchangeRate.amount) / exchangeRate.rate;
        setConverted(result);
    }

    // Not sure about the sorting here. It's more practical, but then the order is different
    // than in exchange rate tables. Went with sorting in the end
    const currencyOptions = props.rates
        .map((rate) => ({
            text: `${rate.code} - ${rate.currency}`,
            code: rate.code,
        }))
        .sort((a, b) => a.text.localeCompare(b.text));

    const codeToExchangeRate = Object.fromEntries(props.rates.map((rate) => [rate.code, rate]));

    const [currencyOption, setCurrencyOption] = useState(currencyOptions[0].code);
    const [amount, setAmount] = useState(0);
    const [converted, setConverted] = useState<number>();
    return (
        <div>
            <input
                type="number"
                placeholder="Amount in CZK"
                onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            ></input>
            <select onChange={(e) => setCurrencyOption(e.target.value)}>
                {currencyOptions.map((option) => (
                    <option value={option.code} key={option.code}>
                        {option.text}
                    </option>
                ))}
            </select>
            <input type="button" value="Convert" onClick={performConversion}></input>
            {converted}
        </div>
    );
}

export default CurrencyConverter;
