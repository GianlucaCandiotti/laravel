import Vue from 'vue';

const paths = require.context('.', true, /index.js$/);

// eslint-disable-next-line
paths.keys().filter(path => path !== './index.js').forEach((path) => {
  const sPath = path.split('/');
  const name = sPath[sPath.length - 2];
  const selector = name.split``.map((char, i) => (
    !i
      ? char.toLowerCase()
      : char.toUpperCase() === char
      ? `-${char.toLowerCase()}`
      : char
  )).join``;

  const mountPoint = document.getElementById(selector);

  if (mountPoint) {
    const Component = paths(path).default;

    // eslint-disable-next-line no-new
    new Vue({
      el: `#${selector}`,
      render: h => h(Component),
    });
  }
});
