# common-markdown-tool

## Target `release` adicionado ao `angular.json`
```json
"release": {
  "builder": "@nrwl/workspace:run-commands",
  "options": {
    "commands": [{ "command": "npx semantic-release" }],
    "cwd": "libs/common/markdown-tool"
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
  projectScope: 'common-markdown-tool',
  projectRoot: 'libs/common/markdown-tool',
  buildOutput: 'dist/libs/common/markdown-tool',
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
            "scope": "common-markdown-tool",
            "type": "feat",
            "release": "minor"
          },
          { "type": "build", "release": "patch" },
          { "scope": "*", "type": "build", "release": false },
          {
            "scope": "common-markdown-tool",
            "type": "build",
            "release": "patch"
          },
          { "type": "docs", "release": "patch" },
          { "scope": "*", "type": "docs", "release": false },
          {
            "scope": "common-markdown-tool",
            "type": "docs",
            "release": "patch"
          },
          { "type": "fix", "release": "patch" },
          { "scope": "*", "type": "fix", "release": false },
          {
            "scope": "common-markdown-tool",
            "type": "fix",
            "release": "patch"
          },
          { "type": "perf", "release": "patch" },
          { "scope": "*", "type": "perf", "release": false },
          {
            "scope": "common-markdown-tool",
            "type": "perf",
            "release": "patch"
          },
          { "type": "refactor", "release": "patch" },
          { "scope": "*", "type": "refactor", "release": false },
          {
            "scope": "common-markdown-tool",
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
      { "pkgRoot": "../../../dist/libs/common/markdown-tool" }
    ],
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "nx format:write --files libs/common/markdown-tool/CHANGELOG.md && cp libs/common/markdown-tool/CHANGELOG.md dist/libs/common/markdown-tool && ts-node --project tools/tsconfig.tools.json tools/release/insert-versions.ts dist/libs/common/markdown-tool",
        "execCwd": "../../.."
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md"],
        "message": "chore(common-markdown-tool): release ${nextRelease.version}\n\n${nextRelease.notes}\n\n***\n[skip ci]"
      }
    ]
  ],
  "writerOpts": {},
  "tagFormat": "common-markdown-tool/v${version}",
  "branches": [
    "master",
    "next",
    { "name": "beta", "prerelease": true },
    { "name": "alpha", "prerelease": true }
  ]
}
```

---

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test common-markdown-tool` to execute the unit tests.
