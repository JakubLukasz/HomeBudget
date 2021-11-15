const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Assets': path.resolve(__dirname, 'src/assets'),
      '@Contexts': path.resolve(__dirname,'src/contexts'),
      '@Hooks': path.resolve(__dirname,'src/hooks'),
      '@Pages': path.resolve(__dirname,'src/pages'),
      '@Services': path.resolve(__dirname,'src/services'),
      '@Helpers': path.resolve(__dirname,'src/helpers'),
      '@Modals': path.resolve(__dirname,'src/modals')
    }
  },
};