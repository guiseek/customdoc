module.exports = {
  name: 'common-toolbar-editor',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/toolbar-editor',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
