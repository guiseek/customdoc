import { Node } from './types';
import { getColors } from './tokens';

interface TokenMocks {
  [k: string]: {
    name: string;
    nodes: Node[];
  }
}
const tokenMocks: TokenMocks = {
  color: {
    name: 'color',
    nodes: []
  },
  shadow: {
    name: 'shadow',
    nodes: []
  }
}

describe('DataServiceFactory', () => {
  it('getColors', () => {
    const { name, nodes } = tokenMocks.color;
    getColors(name, nodes)
  })
});