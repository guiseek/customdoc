import { Node } from './types';

export const filterByToken = (name: string, artboards: Node[]) => {
  const layer = artboards.find((node) => node.name === name);
  return layer ? layer.children : [];
};

export const filterByComponent = (layer: string, artboards: Node[]) => {
  const type = 'COMPONENT';
  return filterByToken(layer, artboards).filter((item) => item.type === type);
};
