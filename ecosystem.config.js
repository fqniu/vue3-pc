module.exports = {
  apps: [
    {
      name: 'vue3-pc',
      script: 'vue3-pc-server.js'
    },
  ],
  // deploy: {
  //   production: {
  //     user: 'admin',
  //     host: '0.0.0.0',
  //     ref: 'origin/main',
  //     repo: 'git@git.fqniu/vue3-pc.git',
  //     path: '/workspace/vue3-pc',
  //     'post-deploy': 'git reset --hard && git checkout main && git pull && npm i --production=false && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
  //     env: {
  //       NODE_ENV: 'production'
  //     }
  //   }
  // }
}