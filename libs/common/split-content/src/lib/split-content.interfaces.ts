import { SplitContentDirective } from './split-content.directive';

export interface IPoint {
  x: number;
  y: number;
}

export interface IArea {
  component: SplitContentDirective;
  order: number;
  size: number | null;
  minSize: number | null;
  maxSize: number | null;
}

// Criado no evento Drag Start

export interface ISplitSnapshot {
  gutterNum: number;
  allAreasSizePixel: number;
  allInvolvedAreasSizePercent: number;
  lastSteppedOffset: number;
  areasBeforeGutter: Array<IAreaSnapshot>;
  areasAfterGutter: Array<IAreaSnapshot>;
}

export interface IAreaSnapshot {
  area: IArea;
  sizePixelAtStart: number;
  sizePercentAtStart: number;
}

// Criado no evento Drag Progress

export interface ISplitSideAbsorptionCapacity {
  remain: number;
  list: Array<IAreaAbsorptionCapacity>;
}

export interface IAreaAbsorptionCapacity {
  areaSnapshot: IAreaSnapshot;
  pixelAbsorb: number;
  percentAfterAbsorption: number;
  pixelRemain: number;
}

// Criado para enviar para fora

export interface IOutputData {
  gutterNum: number;
  sizes: IOutputAreaSizes;
}

export interface IOutputAreaSizes extends Array<number | '*'> {}
