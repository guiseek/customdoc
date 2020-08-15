module.exports = {
  name: 'common-compodoc-viewer',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/compodoc-viewer',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
