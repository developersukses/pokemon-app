import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css'

const fetcher = (...args) => axios.get(...args).then(res => res.data)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <SWRConfig value={{ fetcher }}>
                <App />
            </SWRConfig>
        </BrowserRouter>
    </React.StrictMode>
);
