import { isChildPath, isPath, navigateCheck } from './'
import { getClosestParent } from './helpers'

describe('isPath test', () => {
  test('isPath empty', async () => {
    expect(isPath('').isEmpty()).toBe(true)
    expect(isPath('/').isEmpty()).toBe(true)
    expect(isPath('/a').isEmpty()).toBe(false)
    expect(isPath(null).isEmpty()).toBe(true)
    expect(isPath(undefined).isEmpty()).toBe(true)
  })

  test('isPath private check', async () => {
    expect(isPath('/aweb/login').isPrivatePath()).toBe(false)
    expect(isPath('/aweb/auth/azure-ad').isPrivatePath()).toBe(false)
    expect(isPath('/login-fail').isPrivatePath()).toBe(true)
    expect(isPath('/sign-up').isPrivatePath()).toBe(true)
    expect(isPath('/abc').isPrivatePath()).toBe(true)
    expect(isPath(null).isPrivatePath()).toBe(true)
    expect(isPath(undefined).isPrivatePath()).toBe(true)
  })
})

describe('isChildPath test', () => {
  test('isChildPath test', async () => {
    expect(isChildPath(null, undefined)).toBe(false)
    expect(isChildPath('/a', '/a')).toBe(true)
    expect(isChildPath('/a/b', '/a')).toBe(true)
    expect(isChildPath('/b', '/a')).toBe(false)
    expect(isChildPath('/a-c/b', '/a')).toBe(false)
    expect(isChildPath('/', '/a')).toBe(false)
  })
})

describe('getClosestParent test', () => {
  test('getClosestParent test', async () => {
    expect(getClosestParent('/a/b', '')).toBe('')
    expect(getClosestParent('/a/b', '', '/')).toBe('/')
    expect(getClosestParent('/a/b', '', '/', '/a', '/b', '/c')).toBe('/a')
    expect(getClosestParent('/a/b', '', '/', '/a', '/b', '/c', '/a/b', '/a/b/c')).toBe('/a/b')
  })
})

describe('navigateCheck test', () => {
  test.skip('cookie test', async () => {
    const pathname = ''
    let cookie: any = ''
    let redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/aweb/login')

    cookie = '123'
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/aweb/login')

    cookie = null
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/aweb/login')

    cookie = undefined
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/aweb/login')

    cookie = {}
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/aweb/login')
  })

  test.skip('redirect > /aweb/login', async () => {
    const cookie = {}
    let pathname = ''
    let redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/aweb/login')

    pathname = '/abc'
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/aweb/login')
  })

  test.skip('redirect > /{destination}', async () => {
    const cookie: Types.CookieType = {
      logged_in_admin: 'true',
    }
    let pathname = ''
    let redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('')

    pathname = '/abc'
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/abc')

    pathname = '/aweb/auth/azure-ad'
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/aweb/auth/azure-ad')

    pathname = '/aweb/login'
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/aweb')
  })

  test.skip('redirect > /{redirect_client}', async () => {
    const cookie: Types.CookieType = {
      logged_in_admin: 'true',
      redirect_client_admin: '/xyz',
    }
    let pathname = ''
    debugger
    let redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/xyz')

    pathname = '/abc'
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/xyz')

    pathname = '/mfid/auth'
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/xyz')

    pathname = '/login'
    redirect = navigateCheck({ pathname, cookie })
    expect(redirect).toBe('/xyz')
  })
})
