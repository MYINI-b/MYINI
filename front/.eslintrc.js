module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  extends: [
    'airbnb', // or airbnb-base
    'airbnb/hooks',
    'prettier',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended', // 설치 한경우
    'plugin:import/errors', // 설치한 경우
    'plugin:import/warnings', // 설치한 경우
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    'no-shadow': 0,
    'react/prop-types': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'react/no-array-index-key':0,
    'react/destructuring-assignment':0,
    "@typescript-eslint/no-empty-function":0,
    "jsx-a11y/no-static-element-interactions":0,
    "jsx-a11y/click-events-have-key-events":0,
    "react-hooks/exhaustive-deps":0,
    "no-nested-ternary":0,
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        tabWidth: 2,
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
