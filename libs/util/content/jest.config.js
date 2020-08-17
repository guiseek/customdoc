module.exports = {
  name: 'util-content',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/util/content',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
