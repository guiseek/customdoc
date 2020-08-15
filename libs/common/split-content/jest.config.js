module.exports = {
  name: 'common-split-content',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/split-content',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
