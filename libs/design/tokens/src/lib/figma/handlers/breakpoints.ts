import { getTokens, camelCase } from '../../utils';
import { Node } from '../response';

const getBreakpoints = (layerName: string, stylesArtboard: Node[]) => {
  const palette = { breakpoint: {} };
  const decorator = ({ name, absoluteBoundingBox }) => {
    const tokens = {
      [camelCase(name)]: { value: `${absoluteBoundingBox.width}px` },
    };
    Object.assign(palette.breakpoint, tokens);
  };

  return getTokens(layerName, stylesArtboard, palette, decorator);
};

export { getBreakpoints };
