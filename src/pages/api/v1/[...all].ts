import httpProxy from 'http-proxy'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}

const proxy = (req: NextApiRequest, res: NextApiResponse) => {
  new Promise((resolve, reject) => {
    const proxy: httpProxy = httpProxy.createProxy()
    const target = process.env.APP_BE
    proxy.once('proxyRes', resolve).once('error', reject).web(req, res, {
      changeOrigin: true,
      target,
    })
  })
}

export default !process.env.ENV ? proxy : undefined // only run on local
