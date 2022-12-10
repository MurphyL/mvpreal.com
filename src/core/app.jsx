import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import 'normalize.css';
import './app.css';


const SiteLayout = React.lazy(() => import("/src/plug/layout/site-layout/site-layout.stage"));

const SiteHome = React.lazy(() => import("/src/view/site-home/site-home.v1.module"));

import StarProfileRoot, { StarProfileList, StarProfileItem } from "../view/star-profile/star-profile.module";

import KpopProfilesParser from "../view/parsers/kprofiles-parser.module";

const router = createHashRouter([
    {
        element: <SiteLayout />,
        children: [{
            path: "/", element: (<SiteHome />)
        }, {
            path: "/stars/", 
            element: <StarProfileRoot />,
            children: [{
                index: true,
                element: (<StarProfileList />),
                errorElement: (<div>加载明星数据出错</div>)
            }, {
                path: ':unique',
                element: (<StarProfileItem />),
                errorElement: (<div>加载明星数据出错</div>)
            }]
        }, {
        }, {
            path: "/about", element: (<div>About</div>)
        }, {
            path: '/parsers/',
            children: [{
                path: 'kprofilesdotcom',
                element: (<KpopProfilesParser />)
            }]
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