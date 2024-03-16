const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.ANALYZE,
})

const env = {
  ENVIRONMENT: process.env.ENVIRONMENT || '',
  APP_BE: process.env.APP_BE,
  APP_FE: process.env.APP_FE,
  APP_CLIENT_ID: process.env.APP_CLIENT_ID,
  APP_MFID_BASE: process.env.APP_MFID_BASE,
  APP_NAVIS_BASE: process.env.APP_NAVIS_BASE,
  APP_INQUIRY_LINK: process.env.APP_INQUIRY_LINK,
  APP_ACCOUNTING_PLUS_BASE: process.env.APP_ACCOUNTING_PLUS_BASE,
  APP_DEPARTMENT_MASTER_BASE: process.env.APP_DEPARTMENT_MASTER_BASE,
  APP_PROJECT_MASTER_BASE: process.env.APP_PROJECT_MASTER_BASE,
  APP_UPLOAD_ASSETS: process.env.APP_UPLOAD_ASSETS,
  APP_MF_CONTACT: process.env.APP_MF_CONTACT || 'https://mfccs.zendesk.com/hc/ja/requests/new',
  HOLIDAY_URL: process.env.HOLIDAY_URL,
  ROLLBAR_SERVER_TOKEN: process.env.ROLLBAR_SERVER_TOKEN,
  ROLLBAR_CLIENT_TOKEN: process.env.ROLLBAR_CLIENT_TOKEN,
  GTM_ID: process.env.GTM_ID,
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
  config.module.rules.push({
    test: /pjc_common\/frontend\/shared\/(antd|components|helpers|hooks)\/index.tsx/i,
    sideEffects: false,
  })

  return config
}

const devOnlyPages = ['/project-master']

/**
 * @type {import('next').NextConfig}
 */
const settings = {
  reactStrictMode: false,
  productionBrowserSourceMaps: env.ENVIRONMENT !== 'production',
  compiler: {
    ...(['production'].includes(env.ENVIRONMENT)
      ? {
          reactRemoveProperties: true,
        }
      : {}),
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
  async redirects() {
    // Write your redirects here
    let output = []

    // Add devOnlyPages
    output = [
      ...output,
      ...(env.ENVIRONMENT === 'production'
        ? devOnlyPages.map((page) => ({
            source: page,
            destination: '/404',
            permanent: true,
          }))
        : []),
    ]

    return output
  },

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
