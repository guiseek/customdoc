import { getTokens, camelCase, rgbaGenObject, fullColorHex } from '../../utils';
import { Node } from '../response';

const getColors = (layerName: string, stylesArtboard: Node[]) => {
  const palette = { color: {} };
  const decorator = ({ name, children }) => {
    const { r, g, b, a } = children[0].fills[0].color;
    const colorRGBA = rgbaGenObject(r, g, b, a);
    const tokens = {
      [camelCase(name)]: {
        value: `${fullColorHex(colorRGBA.r, colorRGBA.g, colorRGBA.b)}`,
      },
    };
    Object.assign(palette.color, tokens);
  };

  return getTokens(layerName, stylesArtboard, palette, decorator);
};

export { getColors };
