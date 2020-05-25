import React, { useEffect, useState } from 'react';

import { ajaxGet } from 'utils/rest_client';

import { Loading } from 'core/loading/loading';

function Home() {
    const [ state, setState ] = useState({ code: -1 });
    useEffect(() => {
        ajaxGet('top.json').then(setState);
    }, []);
    if(state.code === -1) {
        return (
            <Loading message="正在加载博客数据……" />
        );
    } else if(state.code === 1) {
        return (
            <div>加载置顶文章出错~</div>
        );
    }
    return (
        <div style={{ padding: '20vh 0 100px', textAlign: 'center' }}>
            <h2>嘿，你好，我是MurphyL！</h2>
            <p>欢迎来访我的个人主页！</p>
        </div>
    );
}

export default Home;