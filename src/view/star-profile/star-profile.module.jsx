import React from "react";
import { createElement } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { selectorFamily, useRecoilValue } from 'recoil';

import styles from './star-profile.module.css';

const starProfileQuery = selectorFamily({
    key: 'Query Star Profile',
    get: unique => async () => {
        return await fetch(`/assets/manifest/${unique}.json`)
            .then(resp => resp.json())
            .then(payload => ({ code: 200, payload }))
            .catch(err => {
                console.error('查询明星数据出错', err);
                return { dode: 500, message: err.message || '获取数据出错' };
            });
    },
});

export default function StarProfileRoot() {
    return (
        <React.Suspense fallback={<div>加载数据中……</div>}>
            <Outlet context={{ starProfileQuery }} />
        </React.Suspense>
    );
};

export function StarProfileList() {
    const items = ['t-ara'];
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <Link to={`/stars/${item}`}>{item}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function StarProfileItem() {
    const { unique } = useParams();
    const { code, payload: starProfile } = useRecoilValue(starProfileQuery(unique));
    if (code !== 200) {
        return (
            <div>数据加载出错</div>
        );
    }
    const element = layouts[starProfile.layout];
    if (!starProfile.layout || !element) {
        return (
            <div>无法渲染的类型</div>
        );
    }
    return React.createElement(element, { unique, ...starProfile });
}

/**
 * 布局
 */
const layouts = {
    Group(props) {
        return (
            <dl className={styles.layout_group}>
                {Array.isArray(props.members) && props.members.length > 0 ? (
                    <UnitPart label="成员">
                        <ul className={styles.member_group}>
                            {props.members.map((member, index) => (
                                <MemberItem key={index} unique={props.unique} payload={member} />
                            ))}
                        </ul>
                    </UnitPart>
                ) : null}
            </dl>
        );
    },
    Single() {
        return (
            <div>偶像个人</div>
        );
    }
};


const UnitPart = ({ label = '-', children }) => {
    return (
        <React.Fragment>
            <dt className={styles.group_title}>{label}</dt>
            <dd className={styles.group_content}>{children}</dd>
        </React.Fragment>
    );
};


const MemberItem = ({ payload = {} }) => {
    console.log(payload);
    return (
        <li className={styles.member_item}>
            {createElement(payload.unique ? Link : 'span', { to: `/stars/${payload.unique}` }, (
                <React.Fragment>
                    <img className={styles.photo} src={`/assets/cover/${payload.unique || 'no-pic'}.png`} οnerrοr="javascript:this.src='/assets/cover/no-pic.png';" />
                    <span className={styles.label}>{payload.label}</span>
                </React.Fragment>
            ))}
        </li>
    );
};