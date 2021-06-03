import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'pages/App';
import { StateProvider } from 'store/index';

ReactDOM.render(
    <StateProvider>
        <App />
    </StateProvider>,
    document.getElementById('output'),
);
