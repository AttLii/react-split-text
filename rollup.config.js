import babel from "rollup-plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import external from "rollup-plugin-peer-deps-external"

export default {
  input: "./arha-split-text.js",
  output: [
    {
      file: 'dist/arha-split-text.js',
      format: "cjs",
      strict: false
    },
    {
      file: 'dist/arha-split-text.es.js',
      format: "es",
      exports: 'named'
    }
  ],
  plugins: [
    babel({
      exclude: "node_modules/**",
      presets: [
        "@babel/preset-react"
      ]
    }),
    external(),
    resolve(),
  ]
}