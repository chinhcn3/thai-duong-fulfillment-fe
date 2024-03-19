const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.ANALYZE,
})

const env = {
  ENVIRONMENT: process.env.ENVIRONMENT || '',
  APP_BE: process.env.APP_BE,
  APP_FE: process.env.APP_FE,
}

const webpack = (config, _options) => {
  config.module.rules.push({
    test: /\.html$/i,
    use: 'raw-loader',
  })
  config.module.rules.push({
    test: /\.svg$/,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          removeViewBox: false,
        },
      },
    ],
    exclude: /(\/fonts)/,
  })
  config.module.rules.push({
    test: /src\/common\/(antd|components|helpers|hocs|hooks|security)\/index.tsx/i,
    sideEffects: false,
  })
  return config
}

const settings = {
  reactStrictMode: false,
  swcMinify: true,
  styledComponents: true,
  env,
  webpack,
  compiler: {
    styledComponents: true,
  },
  modularizeImports: {
    antd: {
      transform: 'antd/lib/{{kebabCase member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
    '@ant-design/icons': {
      transform: '@ant-design/icons/{{member}}',
    },
    'react-use': {
      transform: 'react-use/lib/{{member}}',
    },
  },
}

module.exports = withBundleAnalyzer(settings)
