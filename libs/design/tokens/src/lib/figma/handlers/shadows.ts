import { getTokens, camelCase, genShadow } from '../../utils';
import { Node } from '../response';

const getShadows = (layerName: string, stylesArtboard: Node[]) => {
  const palette = { shadow: {} };
  const decorator = ({ name, effects }) => {
    const { color, offset, radius } = effects[0];
    const tokens = {
      [camelCase(name)]: { value: genShadow(color, offset, radius) },
    };
    Object.assign(palette.shadow, tokens);
  };

  return getTokens(layerName, stylesArtboard, palette, decorator);
};

export { getShadows };
