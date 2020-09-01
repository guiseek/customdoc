import { parseRGBA } from './colors';

export const genShadow = (color, offset, radius) => {
  const { x, y } = offset;
  return `${x}px ${y}px ${radius}px ${parseRGBA(color)}`;
};
