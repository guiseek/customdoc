export const getColor = (color: number) => Math.round(color * 255);

export const rgbaGen = (r: number, g: number, b: number, a: number) =>
  `rgba(${getColor(r)}, ${getColor(g)}, ${getColor(b)}, ${a})`;

export const rgbaGenObject = (r: number, g: number, b: number, a: number) => {
  return { r: getColor(r), g: getColor(g), b: getColor(b), a: a };
};

export const rgbGen = (r: number, g: number, b: number) => {
  // const getColor = (color: number) => Math.round(color * 255);
  return `rgba(${getColor(r)}, ${getColor(g)}, ${getColor(b)})`;
};

export const rgbToHex = (rgb: number) => {
  const hex = Number(rgb).toString(16);
  return hex.length < 2 ? `0${hex}` : hex;
};

export const fullColorHex = (r: number, g: number, b: number) => {
  const red = rgbToHex(r);
  const green = rgbToHex(g);
  const blue = rgbToHex(b);
  return `#${red + green + blue}`;
};

export const parseRGBA = (color: {
  r: number;
  g: number;
  b: number;
  a: number;
}) => {
  const { r, g, b, a } = color;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
