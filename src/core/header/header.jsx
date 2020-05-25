import React, { useState } from 'react';

import { Link } from "react-router-dom";

import './header.css';

const navItems = [{
    url: '/post/awesome-kits.md',
    label: '应用推荐'
}, {
    url: '/series',
    label: '专栏文章'
}, {
    url: '/about',
    label: '关于'
}];


function Header(props) {
    const [ show, setShow ] = useState(false);
    return (
        <header>
            <div className="container">
                <a href={ `/` }>
                    <div className="logo">
                        <img src="/image/coffee_bean.png" alt="logo" />
                        <span>{ process.env.REACT_APP_TITLE || '未命名站点' }</span>
                    </div>
                </a>
                <ul className={ `navi ${show}` }>
                    { navItems && navItems.map((item, index) => (
                        <li key={ index }>
                            <Link to={ `${item.url || '/'}` }  onClick={ () => setShow(false) }>{ item.label }</Link>
                        </li>
                    ))}
                </ul>
                <div className="navi-trigger" onClick={ () => setShow(!show) }>
                    <div>=</div>
                </div>
            </div>
        </header>
    );
}

export default Header;