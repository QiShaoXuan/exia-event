import babel from "rollup-plugin-babel";
export default {
  input: 'src/index.js',
  output: {
    file: 'exia-event.js',
    name:'hi',
    format: 'umd'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
