import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { ModulesComponent } from './modules.component';

describe('ModulesComponent', () => {
  let spectator: SpectatorHost<ModulesComponent>;

  const createHost = createHostFactory(ModulesComponent);

  it('should create', () => {
    spectator = createHost(`<zippy title="Zippy title"></zippy>`);
    expect(spectator.component).toBeTruthy();
  });

  it('should...', () => {
    spectator = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);
    spectator.click('.zippy__title');
    expect(spectator.query('.arrow').textContent).toEqual('Close');
  });

  it('should...', () => {
    spectator = createHost(`<zippy title="Zippy title"></zippy>`);
    spectator.click('.zippy__title');
    expect(spectator.query('.zippy__content').textContent).toBeTruthy();
    spectator.click('.zippy__title');
    expect('.zippy__content').toBeFalsy();
  });

});
