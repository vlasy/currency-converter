// This will show exchange rates obtained from CNB API

import { ExchangeRateEntry } from '../services/CNBService';

interface ExchangeRatesProps {
    rates: ExchangeRateEntry[];
}

function ExchangeRates(props: ExchangeRatesProps) {
    return (
        <div>
            <table className='pure-table pure-table-horizontal'>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Code</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rates.map((rate) => (
                        <tr key={rate.code}>
                            <th>{rate.country}</th>
                            <th>{rate.currency}</th>
                            <th>{rate.amount}</th>
                            <th>{rate.code}</th>
                            <th>{rate.rate}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExchangeRates;
