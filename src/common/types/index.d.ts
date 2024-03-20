import '@testing-library/jest-dom'
import 'styled-components/cssprop'

import { LanguageType } from './language-type'

declare global {
  // eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
  declare module SharedTypes {
    export { LanguageType }
  }
}

declare module 'react' {
  type FC17<P = Record<string, unknown>> = React.FunctionComponent<React.PropsWithChildren<P>>
}
