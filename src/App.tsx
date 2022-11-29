import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRates from './components/ExchangeRates';
import { getExchangeRates } from './services/CNBService';

const queryClient = new QueryClient();

const Title = styled.h1`
    font-size: 1.5em;
`;

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
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {(error as any).message}</span>;
    }

    return (
        <div className="content">
            <Title>Simple currency converter</Title>
            <CurrencyConverter rates={data} />
            <ExchangeRates rates={data} />
        </div>
    );
}

export default App;
