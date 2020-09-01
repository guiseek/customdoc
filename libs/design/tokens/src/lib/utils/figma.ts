import { Node } from '../figma/response';


export const filterArtboard = (layerName: string, stylesArtboard: Node[]) => {
  return stylesArtboard.filter((item) => item.name === layerName)[0].children;
};

export const filterElements = (layerName: string, stylesArtboard: Node[]) => {
  return filterArtboard(layerName, stylesArtboard).filter(
    (item) => item.type === 'COMPONENT'
  );
};

export const getTokens = (
  layerName: string,
  stylesArtboard: Node[],
  palette: object,
  decorator: Function
) => {
  const elements = filterElements(layerName, stylesArtboard);
  elements.map((element) => decorator(element));
  return palette;
};
