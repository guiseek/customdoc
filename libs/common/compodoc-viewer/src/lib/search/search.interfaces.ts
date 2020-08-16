import { CompodocViewer } from '../compodoc-viewer.interfaces';

export type compodoc = CompodocViewer.Compodoc;
export type valueof<T> = T[keyof T];

export type CompodocResult = {
  type: string;
} & {
  results: valueof<compodoc>;
};
