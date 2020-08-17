# common-compodoc-viewer

## Target `release` adicionado ao `angular.json`
```json
"release": {
  "builder": "@nrwl/workspace:run-commands",
  "options": {
    "commands": [{ "command": "npx semantic-release" }],
    "cwd": "libs/common/compodoc-viewer"
  }
}
```

<span style="display:flex;justify-content:space-between;">
  <span> ⇩ </span> <span>⬇︎</span> <span>⇩</span>
</span>


## `.releaserc.js`
```js
const { createReleaseConfigWithScopeFilter } = require('../../../tools/release/index');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'common-compodoc-viewer',
  projectRoot: 'libs/common/compodoc-viewer',
  buildOutput: 'dist/libs/common/compodoc-viewer',
});
```

<span style="display:flex;justify-content:space-between;">
  <span> ⇩ </span> <span>⬇︎</span> <span>⇩</span>
</span>


## Exemplo de output do `.releaserc.js`
```json
{
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "feat", "release": "minor" },
          { "scope": "*", "type": "feat", "release": false },
          {
            "scope": "common-compodoc-viewer",
            "type": "feat",
            "release": "minor"
          },
          { "type": "build", "release": "patch" },
          { "scope": "*", "type": "build", "release": false },
          {
            "scope": "common-compodoc-viewer",
            "type": "build",
            "release": "patch"
          },
          { "type": "docs", "release": "patch" },
          { "scope": "*", "type": "docs", "release": false },
          {
            "scope": "common-compodoc-viewer",
            "type": "docs",
            "release": "patch"
          },
          { "type": "fix", "release": "patch" },
          { "scope": "*", "type": "fix", "release": false },
          {
            "scope": "common-compodoc-viewer",
            "type": "fix",
            "release": "patch"
          },
          { "type": "perf", "release": "patch" },
          { "scope": "*", "type": "perf", "release": false },
          {
            "scope": "common-compodoc-viewer",
            "type": "perf",
            "release": "patch"
          },
          { "type": "refactor", "release": "patch" },
          { "scope": "*", "type": "refactor", "release": false },
          {
            "scope": "common-compodoc-viewer",
            "type": "refactor",
            "release": "patch"
          }
        ],
        "parserOpts": {
          "noteKeywords": ["BREAKING", "BREAKING CHANGE", "BREAKING CHANGES"]
        }
      }
    ],
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],
    "@semantic-release/gitlab",
    [
      "@semantic-release/npm",
      { "pkgRoot": "../../../dist/libs/common/compodoc-viewer" }
    ],
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "nx format:write --files libs/common/compodoc-viewer/CHANGELOG.md && cp libs/common/compodoc-viewer/CHANGELOG.md dist/libs/common/compodoc-viewer && ts-node --project tools/tsconfig.tools.json tools/release/insert-versions.ts dist/libs/common/compodoc-viewer",
        "execCwd": "../../.."
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md"],
        "message": "chore(common-compodoc-viewer): release ${nextRelease.version}\n\n${nextRelease.notes}\n\n***\n[skip ci]"
      }
    ]
  ],
  "writerOpts": {},
  "tagFormat": "common-compodoc-viewer/v${version}",
  "branches": [
    "master",
    "next",
    { "name": "beta", "prerelease": true },
    { "name": "alpha", "prerelease": true }
  ]
}
```
Volte para [CONTRIBUIR](/CONTRIBUTING.md)
---


---

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test common-compodoc-viewer` to execute the unit tests.
