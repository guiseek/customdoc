/**
 * Tipos gerados a partir da API Response
 * Apesar da lib @figma/plugin-typings ter
 * algumas caracteristicas em comuns, ela
 * não corresponde ao retornado, avaliar.
 *
 * @todo avaliar alternativas oficiais
 *
 * @export
 * @interface FigmaResponse
 */

export interface FigmaResponse {
  document: Document;
  components: { [key: string]: Component };
  schemaVersion: number;
  styles: { [key: string]: Component };
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  role: string;
}

export interface Component {
  key: string;
  name: string;
  description: string;
  styleType?: StyleType;
}

export enum StyleType {
  Effect = 'EFFECT',
  Fill = 'FILL',
  Grid = 'GRID',
  Text = 'TEXT',
}

export interface Document {
  id: string;
  name: string;
  type: string;
  children: DocumentChild[];
}

export interface DocumentChild {
  id: string;
  name: CharactersEnum;
  type: string;
  children: Node[];
  backgroundColor: Color;
  prototypeStartNodeID: null;
  prototypeDevice: PrototypeDevice;
  exportSettings?: ExportSetting[];
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Node {
  id: string;
  name: string;
  type: NodeType;
  blendMode: BlendMode;
  children?: FluffyChild[];
  absoluteBoundingBox: AbsoluteBoundingBox;
  constraints: Constraints;
  clipsContent?: boolean;
  background?: Background[];
  fills: Background[];
  strokes: any[];
  strokeWeight: number;
  strokeAlign: StrokeAlign;
  backgroundColor?: Color;
  effects: any[];
  characters?: string;
  style?: Style;
  characterStyleOverrides?: any[];
  styleOverrideTable?: Record<string, any>;
  layoutGrids?: LayoutGrid[];
  styles?: StickyStyles;
}

export interface AbsoluteBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Background {
  blendMode: BlendMode;
  type: BackgroundType;
  color: Color;
  visible?: boolean;
}

export enum BlendMode {
  Normal = 'NORMAL',
  PassThrough = 'PASS_THROUGH',
}

export enum BackgroundType {
  Image = 'IMAGE',
  Solid = 'SOLID',
}

export interface FluffyChild {
  id: string;
  name: string;
  type: FluffyType;
  blendMode: BlendMode;
  children?: TentacledChild[];
  absoluteBoundingBox: AbsoluteBoundingBox;
  constraints: Constraints;
  clipsContent?: boolean;
  background?: Background[];
  fills: Background[];
  strokes: Background[];
  strokeWeight: number;
  strokeAlign: StrokeAlign;
  backgroundColor?: Color;
  effects: Effect[];
  characters?: string;
  style?: Style;
  characterStyleOverrides?: any[];
  styleOverrideTable?: Record<string, any>;
  styles?: TentacledStyles;
  preserveRatio?: boolean;
  componentId?: string;
}

export interface TentacledChild {
  id: string;
  name: string;
  type: NodeType;
  blendMode: BlendMode;
  opacity?: number;
  absoluteBoundingBox: AbsoluteBoundingBox;
  constraints: Constraints;
  fills: FillElement[];
  strokes: Background[];
  strokeWeight: number;
  strokeAlign: StrokeAlign;
  effects: any[];
  styles?: FluffyStyles;
  characters?: string;
  style?: Style;
  characterStyleOverrides?: any[];
  styleOverrideTable?: Record<string, any>;
  children?: StickyChild[];
  clipsContent?: boolean;
  background?: Background[];
  backgroundColor?: Color;
  cornerRadius?: number;
  rectangleCornerRadii?: number[];
  preserveRatio?: boolean;
  exportSettings?: any[];
  layoutVersion?: number;
  layoutGrids?: any[];
  layoutMode?: string;
  itemSpacing?: number;
  horizontalPadding?: number;
  verticalPadding?: number;
}

export interface StickyChild {
  id: string;
  name: NodeName;
  type: NodeType;
  blendMode: BlendMode;
  absoluteBoundingBox: AbsoluteBoundingBox;
  constraints: Constraints;
  fills: Background[];
  strokes: Background[];
  strokeWeight: number;
  strokeAlign: StrokeAlign;
  styles?: NodeStyles;
  effects: any[];
  characters?: CharactersEnum;
  style?: Style;
  characterStyleOverrides?: any[];
  styleOverrideTable?: Record<string, any>;
  visible?: boolean;
  layoutAlign?: string;
  cornerRadius?: number;
  rectangleCornerRadii?: number[];
}

export enum CharactersEnum {
  Atoms = 'Atoms',
  DefaultButton = 'Default button',
  DesignTokens = 'Design tokens',
  Molecules = 'Molecules',
  Organisms = 'Organisms',
}

export interface Constraints {
  vertical: Vertical;
  horizontal: Horizontal;
}

export enum Horizontal {
  Left = 'LEFT',
  LeftRight = 'LEFT_RIGHT',
  Right = 'RIGHT',
  Scale = 'SCALE',
}

export enum Vertical {
  Scale = 'SCALE',
  Top = 'TOP',
}

export enum NodeName {
  Atoms = 'Atoms',
  DefaultButton = 'Default button',
  Molecules = 'Molecules',
  Organism = 'Organism',
  Rectangle = 'Rectangle',
  Rectangle1 = 'Rectangle 1',
}

export enum StrokeAlign {
  Center = 'CENTER',
  Inside = 'INSIDE',
  Outside = 'OUTSIDE',
}

export interface Style {
  fontFamily: FontFamily;
  fontPostScriptName: FontPostScriptName;
  fontWeight: number;
  paragraphSpacing?: number;
  textAutoResize?: TextAutoResize;
  fontSize: number;
  textAlignHorizontal: TextAlignHorizontal;
  textAlignVertical: TextAlignVertical;
  letterSpacing: number;
  lineHeightPx: number;
  lineHeightPercent: number;
  lineHeightPercentFontSize?: number;
  lineHeightUnit: LineHeightUnit;
}

export enum FontFamily {
  OpenSans = 'Open Sans',
}

export enum FontPostScriptName {
  OpenSansBold = 'OpenSans-Bold',
  OpenSansRegular = 'OpenSans-Regular',
}

export enum LineHeightUnit {
  Intrinsic = 'INTRINSIC_%',
  Pixels = 'PIXELS',
}

export enum TextAlignHorizontal {
  Center = 'CENTER',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export enum TextAlignVertical {
  Bottom = 'BOTTOM',
  Top = 'TOP',
}

export enum TextAutoResize {
  Height = 'HEIGHT',
  WidthAndHeight = 'WIDTH_AND_HEIGHT',
}

export interface NodeStyles {
  fill: string;
  text?: string;
  stroke?: string;
}

export enum NodeType {
  Frame = 'FRAME',
  Group = 'GROUP',
  Rectangle = 'RECTANGLE',
  Text = 'TEXT',
}

export interface FillElement {
  opacity?: number;
  blendMode: BlendMode;
  type: BackgroundType;
  color?: Color;
  scaleMode?: StyleType;
  imageRef?: string;
}

export interface FluffyStyles {
  fill?: string;
  text?: string;
  fills?: string;
  strokes?: string;
  stroke?: string;
}

export interface Effect {
  type: string;
  visible: boolean;
  color: Color;
  blendMode: BlendMode;
  offset: Offset;
  radius: number;
}

export interface Offset {
  x: number;
  y: number;
}

export interface TentacledStyles {
  text?: FluffyText;
  effect?: string;
  stroke?: string;
}

export enum FluffyText {
  The481385 = '48:1385',
  The481386 = '48:1386',
}

export enum FluffyType {
  Component = 'COMPONENT',
  Group = 'GROUP',
  Instance = 'INSTANCE',
  Text = 'TEXT',
  Vector = 'VECTOR',
}

export interface LayoutGrid {
  pattern: string;
  sectionSize: number;
  visible: boolean;
  color: Color;
  alignment: StrokeAlign;
  gutterSize: number;
  offset: number;
  count: number;
}

export interface StickyStyles {
  grid: string;
}

export interface ExportSetting {
  suffix: string;
  format: string;
  constraint: Constraint;
}

export interface Constraint {
  type: Horizontal;
  value: number;
}

export interface PrototypeDevice {
  type: string;
  rotation: string;
}
