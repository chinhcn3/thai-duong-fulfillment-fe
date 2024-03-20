export type ParamType = 'date' | 'datetime' | 'number' | 'boolean' | 'string'

export type ParamIntructions = Record<string, ParamType>

export type ParamProcessType<T = any> = {
  encode: (val?: T) => string
  decode: (val?: string) => T
}
