import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './component/App';

export function render(url) {
    let html = renderToString(
        <React.StrictMode>
            <StaticRouter location={url} basename='/app'>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </StaticRouter>
        </React.StrictMode>
    );
    return { html };
}