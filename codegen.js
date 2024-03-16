const { codegen } = require('swagger-axios-codegen')
require('dotenv').config()

const defaultOptions = {
  serviceNameSuffix: 'Service',
  enumNamePrefix: 'Enum',
  methodNameMode: 'path',
  useStaticMethod: true,
  useCustomerRequestInstance: false,
  include: [],
  strictNullChecks: false,
  modelMode: 'interface',
  useClassTransformer: false,
}

const services = ['/']

services.map(async (each) => {
  try {
    // This tool has bug on basePath, so we need this line to tricky add basePath (not follows OpenAPI v3 spec)
    const source = require(`./src/common/open-api/${each}/swagger.json`)
    source.basePath = '/api/v1'

    await codegen({
      ...defaultOptions,
      source,
      outputDir: `./src/common/open-api/${each}`,
      fileName: `swagger.gen.tsx`,
      methodNameMode: 'shortOperationId',
    })
  } catch (error) {
    console.error('cannot download swagger.json')
    console.error(error)
  }
})
