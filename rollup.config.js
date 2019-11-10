import babel from "rollup-plugin-babel";
export default {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    name:'exiaEvent',
    format: 'umd'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
