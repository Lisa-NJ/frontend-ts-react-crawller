import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.css'


const container = document.getElementById('root')

// Create a root.
const root = container ? ReactDOMClient.createRoot(container) : null

root?.render(<App />)
