import React from 'react';
import './index.css';
import App from './app/App';
import {createRoot} from 'react-dom/client';
import {store} from "./state/store";
import {Provider} from "react-redux";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)