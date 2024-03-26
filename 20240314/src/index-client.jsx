import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './component/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

if (typeof window !== 'undefined') {
    hydrateRoot(
        document.querySelector("#root"),
        <React.StrictMode>
            <BrowserRouter basename='/app'>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </BrowserRouter>
        </React.StrictMode>
    )
}