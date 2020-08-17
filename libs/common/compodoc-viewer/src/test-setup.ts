import 'jest-preset-angular';
import { createMockFor } from '@customdoc/util/testing';

export function createMock(comp) {
  return function createComponent({
    mock = createMockFor(comp),
  } = {}) {
    return mock;
  }
}
