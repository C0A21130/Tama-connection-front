import * as React from 'react';
import {createRoot} from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

import "./../static/css/index.scss";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);