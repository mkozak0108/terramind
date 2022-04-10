const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      Components: path.resolve(__dirname, 'src/components/index'),
      Features: path.resolve(__dirname, 'src/features/index'),
      Images: path.resolve(__dirname, 'src/images'),
      Services: path.resolve(__dirname, 'src/services/index'),
      Hooks: path.resolve(__dirname, 'src/hooks/index'),
      Providers: path.resolve(__dirname, 'src/providers/index'),
      Store: path.resolve(__dirname, 'store.ts'),
      Styles: path.resolve(__dirname, 'src/styles'),
      Helpers: path.resolve(__dirname, 'src/helpers/index'),
      Types: path.resolve(__dirname, 'src/types/index'),
      Consts: path.resolve(__dirname, 'src/consts/index'),
    },
  };

  return config;
};
