module.exports = {
  types: [
    { value: 'feat', name: 'feat:     Uma nova feature' },
    { value: 'fix', name: 'fix:      Correção de um bug' },
    { value: 'docs', name: 'docs:     Apenas documentação' },
    { value: 'build', name: 'build:    Apenas o build é afetado' },
    {
      value: 'cleanup',
      name:
        'cleanup:  Uma mudança no código que não corrige um bug nem adiciona uma feature',
    },
    {
      value: 'chore',
      name: "chore:    Outras mudanças que não modificam arquivos em src ou de teste",
    },
    { value: 'ci', name: 'ci:       Integração contínua / Pipeline / Esteira' },
  ],

  scopes: [
    { name: 'angular', description: 'qualquer coisa específica sobre Angular' },
    { name: 'core', description: 'qualquer coisa específica no core' },
    { name: 'scully', description: 'qualquer coisa específica sobre Scully' },
    { name: 'docs', description: 'qualquer coisa específica sobre documentação' },
    { name: 'paginator', description: 'qualquer coisa específica sobre paginator' },
    { name: 'compodoc', description: 'qualquer coisa específica sobre documentação COM compodoc' },
    { name: 'markdown', description: 'qualquer coisa específica sobre Markdown' },
    { name: 'plugin', description: 'qualquer coisa específica sobre Plugin (nx ou scully)' },
    { name: 'web', description: 'qualquer coisa específica sobre Web Components' },
    { name: 'linter', description: 'qualquer coisa específica sobre Linter' },
    { name: 'storybook', description: 'qualquer coisa específica sobre Storybook' },
    { name: 'tokens', description: 'qualquer coisa específica sobre Design Tokens' },
    {
      name: 'testing',
      description: 'qualquer coisa sobre testing (e.g., jest or cypress)',
    },
    {
      name: 'repo',
      description: 'qualquer coisa relacionada a gerenciamento deste repo',
    },
    { name: 'misc', description: 'outras coisas' },
  ],

  allowTicketNumber: true,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  messages: {
    type: "Selecione o tipo de alteração que você está enviando:",
    scope: '\nIndique o ESCOPO desta alteração (opcional):',
    customScope: 'Indique o escopo desta alteração:',
    subject: 'Escreva uma descrição CURTA e IMPERATIVA da mudança:\n',
    body:
      'Forneça uma descrição mais detalhada da alteração (optional). Use "|" para quebras de linha:\n',
    breaking: 'Listar quaisquer ALTERAÇÕES DE QUEBRA / BREAKING CHANGES (opcional):\n',
    footer:
      'Liste quaisquer conclusões de PROBLEMAS / ISSUES por esta alteração (opcional). Ex.: #31, #34:\n',
    confirmCommit: 'Tem certeza de que deseja continuar com o commit acima?',
  },
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['ticketNumber'],
  subjectLimit: 100,
};