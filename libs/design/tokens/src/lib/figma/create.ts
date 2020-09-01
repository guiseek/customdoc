import {
  getBreakpoints,
  getColors,
  getRadius,
  getShadows,
  getSpacing,
  getTypography,
} from './handlers';
import { output } from '../utils';
import { request } from './request';
import { FigmaResponse } from './response';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const secret = {
  file: process.env.FIGMA_FILEID,
  key: process.env.FIGMA_APIKEY,
};
const dist = 'dist/tokens';

if (process.env.FIGMA_DEBUG) {
  console.log(secret);
}

export const handler = (name: string, data: object, dist = '') => {
  writeFileSync(`${dist}/${name}.json`, JSON.stringify(data, null, 2));
};

export const create = async () => {
  const { file, key } = secret;
  if (!file || !key) {
    output.error(' ❌  Preencha');
  }
  if (!existsSync(dist)) {
    mkdirSync(dist);
  }

  try {
    await request(file, key).then(({ document }: FigmaResponse) => {
      const nodes = document.children.shift().children;

      output.log(' 🚧  Contruindo tokens... ');

      handler('color', getColors('Colors', nodes), dist);
      handler('spacing', getSpacing('Spacings', nodes), dist);
      handler('typography', getTypography('Typography', nodes), dist);
      handler('shadow', getShadows('Shadows', nodes), dist);
      handler('radius', getRadius('Radius', nodes), dist);
      handler('breakpoint', getBreakpoints('Breakpoints', nodes), dist);

      output.log(' 🚀 Sucesso, enviando alterações. ');
    });
  } catch (err) {
    output.error(' ❌  ' + err + '\n \n');
  }
};
