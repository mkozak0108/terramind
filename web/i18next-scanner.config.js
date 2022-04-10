const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
  input: 'src/**/*.{ts,tsx}',
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: false,
    sort: false,
    attr: {
      list: ['data-i18n'],
      extensions: ['.html', '.htm'],
    },
    func: {
      list: ['t', 'i18n.t'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: false,
    },
    lngs: ['en', 'bg'],
    ns: ['translation'],
    defaultLng: 'en',
    defaultNs: 'translation',
    defaultValue: '',
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: ':',
    keySeparator: '.',
    pluralSeparator: '_',
    contextSeparator: '_',
    contextDefaultValues: [],
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: typescriptTransform({
    extensions: ['.tsx', 'ts'],
  }),
};
