# Contribua com o projeto

### Projeto para escrever documentações com editor markdown

`nx s editor -o`

### Projeto para pesquisar em documentações existentes

`nx s viewer -o`

---

## Semantic-release

No diretório `tools/release` existem arquivos que coletam informações dos commits.

Cada biblioteca possui um `.releaserc.js` em sua respectiva raíz, tais arquivos informam aos scripts contidos no diretório citado acima qual escopo o *semantic-release* deve usar na execução corrente.

No arquivo `package.json` existem 2 tasks relacionadas.

1. `prerelease`
    Executa o comando `nx affected:build --all` verificando todos os builds
1. `release`
    Executa o comando `nx affected --target release --all` e assim é executado os novos targets criados no arquivo `angular.json`



### common-compodoc-viewer
[LEIA ME](libs/common/compodoc-viewer/README.md)

### common-markdown-tool

[LEIA ME](libs/common/markdown-tool/README.md)

---


##  @semantic-release/exec
Caso tenha reparado, nos outputs das libs temos esta seção e no diretório `tools/release` também tem um arquivo chamado `insert-versions.ts`, este é referênciado nesta configuração que foi gerada.

```json
[
  "@semantic-release/exec",
  {
    "prepareCmd": "nx format:write --files libs/common/compodoc-viewer/CHANGELOG.md && cp libs/common/compodoc-viewer/CHANGELOG.md dist/libs/common/compodoc-viewer && ts-node --project tools/tsconfig.tools.json tools/release/insert-versions.ts dist/libs/common/compodoc-viewer",
    "execCwd": "../../.."
  }
],
```

## Ou seja
Desta forma temos um semantic-release dinâmico para cada projeto, filtrado por escopo.

## Porém
Ainda resta o problema de `tags` e por este motivo acredito que, se separarmos apenas em projetos que faz *"mais sentido"* estarem juntos, não seria um problema versiona-los igualmente a cada release.
