import { ElementRef } from '@angular/core';
import {
  IArea,
  IAreaAbsorptionCapacity,
  IAreaSnapshot,
  IPoint,
  ISplitSideAbsorptionCapacity,
} from './split-content.interfaces';

export function getPointFromEvent(event: MouseEvent | TouchEvent): IPoint {
  // TouchEvent
  if (
    (<TouchEvent>event).changedTouches !== undefined &&
    (<TouchEvent>event).changedTouches.length > 0
  ) {
    return {
      x: (<TouchEvent>event).changedTouches[0].clientX,
      y: (<TouchEvent>event).changedTouches[0].clientY,
    };
  }
  // MouseEvent
  else if (
    (<MouseEvent>event).clientX !== undefined &&
    (<MouseEvent>event).clientY !== undefined
  ) {
    return {
      x: (<MouseEvent>event).clientX,
      y: (<MouseEvent>event).clientY,
    };
  }
  return null;
}

export function getElementPixelSize(
  elRef: ElementRef,
  direction: 'horizontal' | 'vertical'
): number {
  const rect = (<HTMLElement>elRef.nativeElement).getBoundingClientRect();

  return direction === 'horizontal' ? rect.width : rect.height;
}

export function getInputBoolean(v: any): boolean {
  return typeof v === 'boolean' ? v : v === 'false' ? false : true;
}

export function getInputPositiveNumber<T>(v: any, defaultValue: T): number | T {
  if (v === null || v === undefined) return defaultValue;

  v = Number(v);
  return !isNaN(v) && v >= 0 ? v : defaultValue;
}

export function isUserSizesValid(
  unit: 'percent' | 'pixel',
  sizes: Array<number | null>
): boolean {
  // Todos os tamanhos não podem ser nulos e o total deve ser 100
  if (unit === 'percent') {
    const total = sizes.reduce(
      (total, s) => (s !== null ? total + s : total),
      0
    );
    return sizes.every((s) => s !== null) && total > 99.9 && total < 100.1;
  }

  // Um tamanho nulo é obrigatório, mas apenas um.
  if (unit === 'pixel') {
    return sizes.filter((s) => s === null).length === 1;
  }
}

export function getAreaMinSize(a: IArea): null | number {
  if (a.size === null) {
    return null;
  }

  if (a.component.lockSize === true) {
    return a.size;
  }

  if (a.component.minSize === null) {
    return null;
  }

  if (a.component.minSize > a.size) {
    return a.size;
  }

  return a.component.minSize;
}

export function getAreaMaxSize(a: IArea): null | number {
  if (a.size === null) {
    return null;
  }

  if (a.component.lockSize === true) {
    return a.size;
  }

  if (a.component.maxSize === null) {
    return null;
  }

  if (a.component.maxSize < a.size) {
    return a.size;
  }

  return a.component.maxSize;
}

export function getGutterSideAbsorptionCapacity(
  unit: 'percent' | 'pixel',
  sideAreas: Array<IAreaSnapshot>,
  pixels: number,
  allAreasSizePixel: number
): ISplitSideAbsorptionCapacity {
  return sideAreas.reduce(
    (acc, area) => {
      const res = getAreaAbsorptionCapacity(
        unit,
        area,
        acc.remain,
        allAreasSizePixel
      );
      acc.list.push(res);
      acc.remain = res.pixelRemain;
      return acc;
    },
    { remain: pixels, list: [] }
  );
}

function getAreaAbsorptionCapacity(
  unit: 'percent' | 'pixel',
  areaSnapshot: IAreaSnapshot,
  pixels: number,
  allAreasSizePixel: number
): IAreaAbsorptionCapacity {
  // No pain no gain
  if (pixels === 0) {
    return {
      areaSnapshot,
      pixelAbsorb: 0,
      percentAfterAbsorption: areaSnapshot.sizePercentAtStart,
      pixelRemain: 0,
    };
  }

  // Área começa em zero e precisa ser reduzida, não é possível
  if (areaSnapshot.sizePixelAtStart === 0 && pixels < 0) {
    return {
      areaSnapshot,
      pixelAbsorb: 0,
      percentAfterAbsorption: 0,
      pixelRemain: pixels,
    };
  }

  if (unit === 'percent') {
    return getAreaAbsorptionCapacityPercent(
      areaSnapshot,
      pixels,
      allAreasSizePixel
    );
  }

  if (unit === 'pixel') {
    return getAreaAbsorptionCapacityPixel(
      areaSnapshot,
      pixels,
      allAreasSizePixel
    );
  }
}

function getAreaAbsorptionCapacityPercent(
  areaSnapshot: IAreaSnapshot,
  pixels: number,
  allAreasSizePixel: number
): IAreaAbsorptionCapacity {
  const tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
  const tempPercentSize = (tempPixelSize / allAreasSizePixel) * 100;

  // Ampliar área

  if (pixels > 0) {
    // Se maxSize & newSize for maior do que> absorver para o máximo e retornar os pixels restantes
    if (
      areaSnapshot.area.maxSize !== null &&
      tempPercentSize > areaSnapshot.area.maxSize
    ) {
      // Use area.area.maxSize como newPercentSize e retorne calcular os pixels restantes
      const maxSizePixel =
        (areaSnapshot.area.maxSize / 100) * allAreasSizePixel;
      return {
        areaSnapshot,
        pixelAbsorb: maxSizePixel,
        percentAfterAbsorption: areaSnapshot.area.maxSize,
        pixelRemain: areaSnapshot.sizePixelAtStart + pixels - maxSizePixel,
      };
    }
    return {
      areaSnapshot,
      pixelAbsorb: pixels,
      percentAfterAbsorption: tempPercentSize > 100 ? 100 : tempPercentSize,
      pixelRemain: 0,
    };
  }

  // Reduzir área
  else if (pixels < 0) {
    // Se minSize e newSize menor do que> absorver para min e retornar os pixels restantes
    if (
      areaSnapshot.area.minSize !== null &&
      tempPercentSize < areaSnapshot.area.minSize
    ) {
      // Use area.area.minSize como newPercentSize e retorne calcular os pixels restantes
      const minSizePixel =
        (areaSnapshot.area.minSize / 100) * allAreasSizePixel;
      return {
        areaSnapshot,
        pixelAbsorb: minSizePixel,
        percentAfterAbsorption: areaSnapshot.area.minSize,
        pixelRemain: areaSnapshot.sizePixelAtStart + pixels - minSizePixel,
      };
    }
    // Se reduzido abaixo de zero> retorne os pixels restantes
    else if (tempPercentSize < 0) {
      // Use 0 como newPercentSize e retorne calcule os pixels restantes
      return {
        areaSnapshot,
        pixelAbsorb: -areaSnapshot.sizePixelAtStart,
        percentAfterAbsorption: 0,
        pixelRemain: pixels + areaSnapshot.sizePixelAtStart,
      };
    }
    return {
      areaSnapshot,
      pixelAbsorb: pixels,
      percentAfterAbsorption: tempPercentSize,
      pixelRemain: 0,
    };
  }
}

function getAreaAbsorptionCapacityPixel(
  areaSnapshot: IAreaSnapshot,
  pixels: number,
  containerSizePixel: number
): IAreaAbsorptionCapacity {
  const tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;

  // Ampliar área

  if (pixels > 0) {
    // Se maxSize & newSize for maior do que> absorver para o máximo e retornar os pixels restantes
    if (
      areaSnapshot.area.maxSize !== null &&
      tempPixelSize > areaSnapshot.area.maxSize
    ) {
      return {
        areaSnapshot,
        pixelAbsorb: areaSnapshot.area.maxSize - areaSnapshot.sizePixelAtStart,
        percentAfterAbsorption: -1,
        pixelRemain: tempPixelSize - areaSnapshot.area.maxSize,
      };
    }
    return {
      areaSnapshot,
      pixelAbsorb: pixels,
      percentAfterAbsorption: -1,
      pixelRemain: 0,
    };
  }

  // REDUCE AREA
  else if (pixels < 0) {
    // Se minSize e newSize menor do que> absorver para min e retornar os pixels restantes
    if (
      areaSnapshot.area.minSize !== null &&
      tempPixelSize < areaSnapshot.area.minSize
    ) {
      return {
        areaSnapshot,
        pixelAbsorb: areaSnapshot.area.minSize + pixels - tempPixelSize,
        percentAfterAbsorption: -1,
        pixelRemain: tempPixelSize - areaSnapshot.area.minSize,
      };
    }
    // Se reduzido abaixo de zero> retorne os pixels restantes
    else if (tempPixelSize < 0) {
      return {
        areaSnapshot,
        pixelAbsorb: -areaSnapshot.sizePixelAtStart,
        percentAfterAbsorption: -1,
        pixelRemain: pixels + areaSnapshot.sizePixelAtStart,
      };
    }
    return {
      areaSnapshot,
      pixelAbsorb: pixels,
      percentAfterAbsorption: -1,
      pixelRemain: 0,
    };
  }
}

export function updateAreaSize(
  unit: 'percent' | 'pixel',
  item: IAreaAbsorptionCapacity
) {
  if (unit === 'percent') {
    item.areaSnapshot.area.size = item.percentAfterAbsorption;
  } else if (unit === 'pixel') {
    // Atualizar o tamanho, exceto para a área de tamanho do curinga
    if (item.areaSnapshot.area.size !== null) {
      item.areaSnapshot.area.size =
        item.areaSnapshot.sizePixelAtStart + item.pixelAbsorb;
    }
  }
}
