import { useState, useMemo } from 'react';
import { kebabCase, trim } from 'lodash';

import styles from './kprofiles-parser.module.css';


export default function KpopProfilesParser() {
    const [source, setSource] = useState('');
    const result = useMemo(() => {
        if (source.length === 0) {
            return {};
        }
        console.log(source.split('\n').map(line => line.split(line, ':')))
        return Object.fromEntries(source.split('\n').map(line => {
            const [label, value] = line.split(':');
            return [kebabCase(trim(label)), trim(value)];
        }));
    }, [source]);
    return (
        <div className={styles.root}>
            <div className={styles.part}>
                <textarea value={source} onChange={e => setSource(e.target.value.trim())} />
            </div>
            <div className={styles.part}>
                <pre>
                    <code>{JSON.stringify(result, null, 4)}</code>
                </pre>
            </div>
        </div>
    );
}