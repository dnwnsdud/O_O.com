import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './component/App';
import { BrowserRouter } from 'react-router-dom';

export function render() {
    let html = renderToString(
        <React.StrictMode>
            <BrowserRouter>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
    return { html };
}