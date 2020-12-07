module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ios.tsx',
          '.android.tsx',
          '.ts',
          '.d.ts',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '#components': './src/components',
          '#dumy': './src/dumy',
          '#typing': './src/types',
          '#screen': './src/screen',
          '#utils': './src/utils',
          '#navigation': './src/router',
          '#GQl': './src/graphql',
          '#context': './src/context',
        },
      },
    ],
  ],
};
