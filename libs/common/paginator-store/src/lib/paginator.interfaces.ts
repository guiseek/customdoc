export interface PaginatorState {
  /** O índice da página atual. */
  pageIndex: number;
  /** O tamanho da página atual */
  pageSize: number;
  /** O número total atual de itens sendo paginados */
  length: number;
  /** O conjunto de opções de tamanho de página fornecidas para exibir ao usuário. */
  pageSizeOptions: ReadonlySet<number>,
}

/**
 * Altere o objeto de evento que é emitido quando o usuário seleciona
 * um tamanho de página diferente ou navega para outra página.
 */
export interface PageEvent extends Pick<PaginatorState, 'pageIndex' | 'pageSize' | 'length'> {
  /**
   * Índice da página que foi selecionada anteriormente.
   */
  previousPageIndex?: number;
}