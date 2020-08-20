const { createReleaseConfigWithScopeFilter } = require('../../../tools/release/index');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'common-paginator-store',
  projectRoot: 'libs/common/paginator-store',
  buildOutput: 'dist/libs/common/paginator-store',
});
