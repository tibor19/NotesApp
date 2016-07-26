module.exports = {
  "bundles": {
    "dist/app-build": {
      "includes": [
        "[**/*.js]",
        "**/*.html!text",
        "**/*.css!text"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "rev": false
      }
    },
    "dist/vendor-build": {
      "includes": [
        "aurelia-framework",
        "aurelia-bootstrapper",
        "aurelia-router",
        "aurelia-animator-css",
        "aurelia-templating-binding",
        "aurelia-polyfills",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-loader-default",
        "aurelia-history-browser",
        "aurelia-logging-console",
        "bootstrap",
        "bootstrap/css/bootstrap.min.css!text",
        "font-awesome/css/font-awesome.min.css!text",
        "text",
        "css",
        "nprogress",
        "aurelia-dialog",
        "aurelia-dialog/*.css!text",
        "aurelia-dialog/*/**/*.html!text"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "rev": false
      }
    }
  }
};
