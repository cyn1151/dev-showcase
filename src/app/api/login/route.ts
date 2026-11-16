import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const tokenValue = '123456789'

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { username, password } = body
    if (username === 'admin' && password === '123456') {
        const cookieStore = await cookies();
        cookieStore.set('token', tokenValue, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true, //只允许服务器端访问
        });
        return NextResponse.json({
            code: 200,
            message: '登录成功'
        })
    } else {
        return NextResponse.json({
            code: 400,
            message: '登录失败'
        })
    }
}

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (token?.value === tokenValue) {
        return NextResponse.json({
            code: 200,
            message: '登录成功'
        })
    } else {
        return NextResponse.json({
            code: 400,
            message: '登录失败'
        })
    }
}