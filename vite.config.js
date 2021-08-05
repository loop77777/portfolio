const { resolve } = require("path");

module.exports = {
  build: {
    lib: {
      entry: resolve(__dirname, "index.html"),
      name: "deepanshu",
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "src/pages/about.html"),
        work: resolve(__dirname, "src/pages/work.html"),
        home: resolve(__dirname, "src/pages/home.html"),
        letstalk: resolve(__dirname, "src/pages/letstalk.html"),
      },
      output: {
        home: resolve(__dirname, "home.html"),
        about: resolve(__dirname, "about.html"),
        letstalk: resolve(__dirname, "letstalk.html"),
        main: resolve(__dirname, "index.html"),
        work: resolve(__dirname, "work.html"),
      },
      external: ["main.js", "home.js"],
    },
  },
};
