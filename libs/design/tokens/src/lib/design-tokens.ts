import fetch from 'node-fetch';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { getBreakpoints, getColors, getRadius, getShadows, getSpacing, getTypography } from './tokens';
import { FigmaResponse } from './types';

export const makeRequest = async (id: string, token: string) => {
  try {
    return fetch(`https://api.figma.com/v1/files/${id}`, {
      headers: { 'X-Figma-Token': token },
    }).then((data) => data.json()) as Promise<FigmaResponse>;
  } catch (err) {
    console.error(err);
  }
};

export const writeTokens = (name: string, tokens: object, dir = '') => {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  writeFileSync(`${dir}/${name}.json`, JSON.stringify(tokens, null, 2));
};

export async function designTokens() {
  const { document } = await makeRequest(
    process.env.FIGMA_FILE,
    process.env.FIGMA_TOKEN
  );

  const dist = 'dist/tokens';
  const nodes = document.children.shift().children;

  writeTokens('color', getColors('Colors', nodes), dist);
  writeTokens('spacing', getSpacing('Spacings', nodes), dist);
  writeTokens('typography', getTypography('Typography', nodes), dist);
  writeTokens('shadow', getShadows('Shadows', nodes), dist);
  writeTokens('radius', getRadius('Radius', nodes), dist);
  writeTokens('breakpoint', getBreakpoints('Breakpoints', nodes), dist);
}