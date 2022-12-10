import fs from 'node:fs';
import path from 'node:path';

import _ from 'lodash';

const ASSETS_ROOT = 'public/assets';

const DIR_OPTIONS = { withFileTypes: true };

fs.readdirSync(ASSETS_ROOT).forEach(star => {
    console.log('正在处理：', star);
    const IMG_ROOT = path.resolve(ASSETS_ROOT, star, 'images');
    if (!fs.existsSync(IMG_ROOT)) {
        return;
    }
    fs.readdirSync(IMG_ROOT, DIR_OPTIONS).forEach(item => {
        if (item.isDirectory()) {
            const IMG_DIR = path.resolve(IMG_ROOT, item.name);
            fs.readdirSync(IMG_DIR).forEach(img => {
                const { ext, name } = path.parse(img);
                const target = path.format({
                    dir: IMG_DIR,
                    name: _.kebabCase(_.trim(name)),
                    ext: ext,
                });
                fs.renameSync(path.resolve(IMG_DIR, img), target);
                console.log('- ', star, ': rename ->', { source: img, target });
            });
        }
        if (item.isFile()) {
            console.log('- ', star, item.name);
        }
    });
});