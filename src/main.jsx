import React from 'react'
import { createRoot } from 'react-dom/client'

import { RecoilRoot } from 'recoil';

import App from './core/app'

const root = document.getElementById('root')

createRoot(root).render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>
)
