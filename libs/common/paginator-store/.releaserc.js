const { createReleaseConfigWithScopeFilter } = require('../../../tools/release/index');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'paginator-store',
  projectRoot: 'libs/common/paginator-store',
  buildOutput: 'dist/libs/common/paginator-store',
});
