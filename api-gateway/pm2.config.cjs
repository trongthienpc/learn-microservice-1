module.exports = {
  apps: [
    {
      name: "api-gateway",
      script: "./src/index.js",
      restart: true,
      watch: true,
      ignore_watch: ["node_modules"],
      instances: 4,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
