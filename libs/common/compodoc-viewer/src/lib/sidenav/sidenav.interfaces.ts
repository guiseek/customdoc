import { CompodocViewer } from '../compodoc-viewer.interfaces';

export interface CompodocItem {
  name: string;
  id: string;
  file: string;
}
export type CompodocEntry = [keyof CompodocViewer.Compodoc, CompodocItem[]];

export interface CompodocSection {
  section: keyof CompodocViewer.Compodoc;
  items: CompodocItem[];
}
