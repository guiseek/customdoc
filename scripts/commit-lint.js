#!/usr/bin/env node

const { types, scopes } = require('../.cz-config.js');

console.log('🐟🐟🐟 Validando mensagem git commit 🐟🐟🐟');
const gitMessage = require('child_process')
  .execSync('git log -1 --no-merges')
  .toString()
  .trim();

const allowedTypes = types.map((type) => type.value);
const allowedScopes = scopes.map((scope) => scope.name);

const commitMsgRegex = `(${allowedTypes.join('|')})\\((${allowedScopes.join(
  '|'
)})\\):\\s(([a-z0-9:\-\s])+)`;

const matchCommit = new RegExp(commitMsgRegex, 'g').test(gitMessage);
const matchRevert = /Revert/gi.test(gitMessage);
const matchRelease = /Release/gi.test(gitMessage);
const exitCode = +!(matchRelease || matchRevert || matchCommit);

if (exitCode === 0) {
  console.log('Commit OK 👌');
} else {
  console.log(
    '[Error]: Ah não! 😦 Sua mensagem de commit: \n' +
      '-------------------------------------------------------------------\n' +
      gitMessage +
      '\n-------------------------------------------------------------------' +
      '\n\n 👉️ Não seguiu nossa convenção para mensagens de commit especificada no arquivo CONTRIBUTING.MD.'
  );
  console.log('\ntipo(escopo): assunto \n LINHA EM BRANCO \n corpo');
  console.log('\n');
  console.log(`possíveis tipos: ${allowedTypes.join('|')}`);
  console.log(
    `possíveis escopos: ${allowedScopes.join('|')} (em caso de dúvida, use "core")`
  );
  console.log(
    '\nEXAMPLE: \n' +
      'feat(compodoc): adicionado flat @deprecated para comentários\n'
  );
}
process.exit(exitCode);