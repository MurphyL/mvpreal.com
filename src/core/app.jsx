import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import 'normalize.css';

const SiteLayout = React.lazy(() => import("/src/plug/layout/site-layout/site-layout.module")) ;
const SiteHome = React.lazy(() => import("/src/view/site-home/site-home.v1.module"));

import './app.css';

const layouts = {
    site: SiteLayout
};

const router = createBrowserRouter([
    {
        element: React.createElement(layouts.site, {}),
        children: [{
            path: "/", element: (<SiteHome />)
        }, {
            path: "/about", element: (<div>About</div>)
        }, {
            path: "*", element: (<div>404</div>)
        }]
    }
]);

export default function App() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </React.Suspense>
    )
}