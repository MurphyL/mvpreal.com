import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import styles from './site-layout.module.css';

const markActive = (props) => props.isActive ? styles.active : undefined;

export default function SiteLayout() {
    return (
        <React.Suspense fallback={<div>加载页面</div>}>
            <header className={styles.header}>
                <Link className={styles.logo} to="/">首页</Link>
                <nav className={styles.navi}>
                    <NavLink className={markActive} to="/stars">明星库</NavLink>
                    <NavLink className={markActive} to="/about">关于</NavLink>
                </nav>
            </header>
            <main className={styles.body}>
                <React.Suspense fallback={<div>数据加载中……</div>}>
                    <Outlet />
                </React.Suspense>
            </main>
            <footer className={styles.footer}>
                <div>Copyright © 2020 咖啡•薄荷, All rights reserved. Host by <a href="https://pages.github.com/" target="_blank">Github Pages</a></div>
            </footer>
        </React.Suspense>
    );
}