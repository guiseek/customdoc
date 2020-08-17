const { createReleaseConfigWithScopeFilter } = require('../../../tools/release/index');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'common-compodoc-viewer',
  projectRoot: 'libs/common/compodoc-viewer',
  buildOutput: 'dist/libs/common/compodoc-viewer',
});

// const config = createReleaseConfigWithScopeFilter({
//   projectScope: 'common-compodoc-viewer',
//   projectRoot: 'libs/common/compodoc-viewer',
//   buildOutput: 'dist/libs/common/compodoc-viewer',
// });
// console.log(JSON.stringify(config));
