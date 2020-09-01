import { getTokens, camelCase } from '../../utils';
import { Node } from '../response';

const getSpacing = (layerName: string, stylesArtboard: Node[]) => {
  const palette = { spacing: {} };
  const decorator = ({ name, absoluteBoundingBox }) => {
    const tokens = {
      [camelCase(name)]: { value: `${absoluteBoundingBox.width}px` },
    };
    Object.assign(palette.spacing, tokens);
  };

  return getTokens(layerName, stylesArtboard, palette, decorator);
};

export { getSpacing };
