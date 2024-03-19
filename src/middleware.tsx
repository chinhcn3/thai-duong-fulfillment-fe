import { NextRequest, NextResponse } from 'next/server'
export async function middleware(req: NextRequest) {
  req.nextUrl

  return NextResponse.next()
}
