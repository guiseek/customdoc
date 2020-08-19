import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { MarkdownToolbarArrowDirective } from './markdown-toolbar-arrow.directive';

describe('MarkdownToolbarArrowDirective ', () => {
  let spectator: SpectatorDirective<MarkdownToolbarArrowDirective>;
  const createDirective = createDirectiveFactory(MarkdownToolbarArrowDirective);

  it('should change the background color', () => {
    spectator = createDirective(`<div highlight>Testing MarkdownToolbarArrowDirective</div>`);

    spectator.dispatchMouseEvent(spectator.element, 'mouseover');

    expect(spectator.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)'
    });

    spectator.dispatchMouseEvent(spectator.element, 'mouseout');
    expect(spectator.element).toHaveStyle({
      backgroundColor: '#fff'
    });
  });

});
