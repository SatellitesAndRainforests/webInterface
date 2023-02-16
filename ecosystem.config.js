module.exports = {
  apps: [
    {
      name: 'client',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: 'dist/client',
        PM2_SERVE_PORT: +(process.env.PORT || 80)
      }
    }
  ]
};
