module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  plugins: ['simple-import-sort'],
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: {
      jsx: true // Enable JSX since we're using React
    }
  },
  settings: {
    react: {
      version: 'detect' // Automatically detect the react version
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
        extensions: ['.js', '.jsx']
      }
    }
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
    es6: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'react/prop-types': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'no-console': ['off'],
    'no-underscore-dangle': ['off'],
    'jsx-a11y/media-has-caption': ['off'],
    'no-unused-vars': ['off'],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^@?\\w'],
          ['^\\u0000'],
          ['^assets(/.*|$)'],
          ['^react'],
          ['^redux(/.*|$)'],
          ['^constants(/.*|$)'],
          ['^services(/.*|$)'],
          ['^tools(/.*|$)'],
          ['^components(/.*|$)'],
          ['^pages(/.*|$)'],
          ['^\\.']
        ]
      }
    ],
    quotes: [2, 'single', { avoidEscape: true }],
    'jsx-a11y/label-has-associated-control': [
      'warn',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'nesting'
      }
    ],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }] // Use our .prettierrc file as source
  }
};
