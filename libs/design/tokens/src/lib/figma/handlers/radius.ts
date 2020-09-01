import { getTokens, camelCase } from '../../utils';
import { Node } from '../response';

const getRadius = (layerName: string, stylesArtboard: Node[]) => {
  const palette = { radius: {} };
  const decorator = ({ name, children }) => {
    const { cornerRadius } = children[0];
    const tokens = {
      [camelCase(name)]: { value: `${cornerRadius}px` },
    };
    Object.assign(palette.radius, tokens);
  };

  return getTokens(layerName, stylesArtboard, palette, decorator);
};

export { getRadius };
