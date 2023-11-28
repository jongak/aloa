module.exports = {
  apps: [
    {
      name: "aloa",
      script: "./bin/www-https",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};
