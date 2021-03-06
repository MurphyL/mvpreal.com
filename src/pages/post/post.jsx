import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Markdown from 'markdown-to-jsx';

import { ajaxGet } from 'utils/rest_client';

import './post.css';

const Title = ({ type, children }) => {
    return React.createElement(type, { className: 'title' }, children);
}

const H3 = (props) => (<Title type='h3' { ...props } />);

const Paragraph = ({ children }) => {
    if(children && Array.isArray(children)) {
        if(children[0] && children[0].type === 'img') {
            return (
                <p className="image">{ children }</p>
            )
        }
    }
    return (
        <p className="paragraph">{ children }</p>
    );
};

const FlexImage = ({ items, alt }) => {
    return (
        <div className="flex-wrapper">
            { (JSON.parse(items) || []).map((item, index) => (
                <div className="flex-item image" key={ index }>
                    <img src={ item } alt={ alt || ''} />
                </div>
            )) }
        </div>
    );
};

const Prepare = ({ children }) => {
    return (
        <div className="prepare">{ children }</div>
    );
};

const markdownOptions = {
    overrides: {
        h1: {
            component: H3
        },
        h2: {
            component: H3
        },
        h3: {
            component: H3
        },
        h4: {
            component:  (props) => (<Title type='h4' { ...props } />)
        },
        h5: {
            component:  (props) => (<Title type='h5' { ...props } />)
        },
        h6: {
            component:  (props) => (<Title type='h6' { ...props } />)
        },
        p: {
            component: Paragraph
        },
        pre: {
            component: Prepare
        },
        div: {
            props: {
                className: 'content'
            }
        },
        table: {
            props: {
                className: 'm10',
                border: 1,
                cellSpacing: 0,
                cellPadding: 0,
            }
        },
        FlexImage: {
            component: FlexImage
        }
    }
};

function Post() {
    const { unique } = useParams();
    const [ post, setPost ] = useState({});
    useEffect(() => {
        ajaxGet(`posts/${unique}.json`).then(res => {
            if(res.code === 0) {
                return { code: 0, ...(res.payload || {}) };
            } else {
                return { code: 1 }
            }
        }).then(setPost)
    }, [ unique ]);
    return (
        <article>
            <h2>{ post.title || '' }</h2>
            <section>
                <Markdown children={ post.markdown || '' } options= { markdownOptions }/>
            </section>
        </article>
    );
};

export default Post;