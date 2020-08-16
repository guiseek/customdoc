module.exports = {
  name: 'common-markdown-tool',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/markdown-tool',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
