// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  docs: [
    { name: 'common-compodoc-viewer', url: '/compodoc/common-compodoc-viewer/documentation.json' },
    { name: 'common-markdown-tool', url: '/compodoc/common-markdown-tool/documentation.json' },
    { name: 'common-split-content', url: '/compodoc/common-split-content/documentation.json' },
    { name: 'util-formatting', url: '/compodoc/util-formatting/documentation.json' },
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
