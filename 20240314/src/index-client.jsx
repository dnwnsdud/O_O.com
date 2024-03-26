import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './component/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

hydrateRoot(
    document.querySelector("#root"),
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>
)