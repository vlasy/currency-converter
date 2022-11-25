import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRates from './components/ExchangeRates';
import { getExchangeRates } from './services/CNBService';

const queryClient = new QueryClient();

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <QueryClientProvider client={queryClient}>
                    <Main />
                </QueryClientProvider>
            </header>
        </div>
    );
}

function Main() {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['rates'],
        queryFn: getExchangeRates,
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {(error as any).message}</span>;
    }

    console.log({ data });

    return (
        <div>
            <CurrencyConverter rates={data} />
            <ExchangeRates rates={data} />
        </div>
    );
}

export default App;
