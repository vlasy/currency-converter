import { getExchangeRates } from '../services/CNBService';

// This will show exchange rates obtained from CNB API

function ExchangeRates() {
    getExchangeRates();

    return <div>ER</div>;
}

export default ExchangeRates;
