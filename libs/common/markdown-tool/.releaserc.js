const { createReleaseConfigWithScopeFilter } = require('../../../tools/release/index');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'common-markdown-tool',
  projectRoot: 'libs/common/markdown-tool',
  buildOutput: 'dist/libs/common/markdown-tool',
});

// console.log(JSON.stringify(config));
// module.exports = createReleaseConfigWithScopeFilter({
//   projectScope: 'common-markdown-tool',
//   projectRoot: 'libs/common/markdown-tool',
//   buildOutput: 'dist/libs/common/markdown-tool',
// });
