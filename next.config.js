const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.ANALYZE,
})

const env = {
  ENVIRONMENT: process.env.ENVIRONMENT || '',
  APP_BE: process.env.APP_BE,
  APP_FE: process.env.APP_FE,
  APP_FRONTSIDE_AGENT: process.env.APP_FRONTSIDE_AGENT || '/agent',
  APP_AZURE_AD_TENANT_ID: process.env.APP_AZURE_AD_TENANT_ID,
  APP_AZURE_AD_CLIENT_ID: process.env.APP_AZURE_AD_CLIENT_ID,
  APP_CLIENT_ID: process.env.APP_CLIENT_ID,
  APP_MFID_BASE: process.env.APP_MFID_BASE,
  APP_NAVIS_BASE: process.env.APP_NAVIS_BASE,
  APP_INQUIRY_LINK: process.env.APP_INQUIRY_LINK,
  APP_ACCOUNTING_PLUS_BASE: process.env.APP_ACCOUNTING_PLUS_BASE,
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
  assetPrefix: ['production', 'staging', 'beta'].includes(env.ENVIRONMENT)
    ? `${env.APP_FE}/${env.ENVIRONMENT}/aweb`
    : '',
  productionBrowserSourceMaps: env.ENVIRONMENT !== 'production',
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
