import { getTokens, camelCase } from '../../utils';
import { Node } from '../response';

const getTypography = (layerName: string, stylesArtboard: Node[]) => {
  const palette = { typography: {} };
  const decorator = ({ name, children }) => {
    const {
      fontFamily,
      fontSize,
      lineHeightPx,
      fontWeight,
    } = children[0].style;

    const tokens = {
      [camelCase(name)]: {
        fontFamily: { value: `'${fontFamily}'` },
        fontSize: { value: `${fontSize}px` },
        lineHeight: { value: `${Math.floor(lineHeightPx)}px` },
        fontWeight: { value: fontWeight },
      },
    };
    Object.assign(palette.typography, tokens);
  };

  return getTokens(layerName, stylesArtboard, palette, decorator);
};

export { getTypography };
