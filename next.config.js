const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.ANALYZE,
})

const env = {
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
  return config
}
/**
 * @type {import('next').NextConfig}
 */
const settings = {
  reactStrictMode: false,
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
  transpilePackages: ['@react-hookz/web'],
  swcMinify: true,
  assetPrefix: ['production', 'staging', 'beta'].includes(env.ENVIRONMENT) ? `${env.APP_FE}/${env.ENVIRONMENT}` : '',
  env,
  webpack,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ]
  },
}

module.exports = withBundleAnalyzer(settings)
