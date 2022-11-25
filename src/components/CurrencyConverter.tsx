// This will be form for currencies conversions

function CurrencyConverter() {
    return (<div>
        <input type="number" placeholder="Amount in CZK"></input>
        <select>
            <option>CurrencyA</option>
            <option>CurrencyB</option>
        </select>
        <input type="button" value="Convert"></input>
        Here, show converted value in selected currency
    </div>)
}

export default CurrencyConverter