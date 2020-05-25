import React from 'react';

import './footer.css';

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="sitemap">
                    <dl className="section navi">
                        <dt>站点地图</dt>
                        <dd>
                            <ul>
                                <li><a href="/blog" rel="noopener noreferrer">博客</a></li>
                            </ul>
                        </dd>
                    </dl>
                    <dl className="section links">
                        <dt>友情链接</dt>
                        <dd>
                            <ul>
                                <li><a href="https://cijian.us" target="_blank" rel="noopener noreferrer">此间·我们</a></li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <div className="copyright">
                    <div>Copyright © 2020 { process.env.REACT_APP_TITLE }, All rights reserved. Host by <a href="https://vercel.com/" rel="noopener noreferrer" target="_blank">ZEIT.co</a></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;