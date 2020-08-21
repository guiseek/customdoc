const { createReleaseConfigWithScopeFilter } = require('../../../tools/release/index');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'common-compodoc-viewer',
  projectRoot: 'libs/common/compodoc-viewer',
  buildOutput: 'dist/libs/common/compodoc-viewer',
});
