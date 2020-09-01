import fetch from 'node-fetch';
import { output } from '../utils';

const config = {
  api: 'https://api.figma.com/v1/files',
  header: 'X-Figma-Token',
  method: 'GET',
};

export const request = async (file: string, key: string) => {
  const { api, header, method } = config;
  const endpoint = `${api}/${file}`;
  const headers = { [header]: key };

  try {
    output.log(' 🛰  Conectando de marte... ');

    const res = await fetch(endpoint, { method, headers });

    output.log(' 🛸  Conexão estabelecida. ');

    return await res.json();
  } catch (err) {
    output.error(' ❌  ' + err + '\n \n');
  }
};