import { NextRequest, NextResponse } from "next/server";

// 处理跨域请求
// 接口转发例如/api/user -> (可能是其他服务器java/go/python等) -> /api/user
// 限流例如配合第三方服务做限流
// 鉴权/判断是否登录
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Requested-With',
}
export async function proxy(request: NextRequest) {
    console.log(request.url, 'url');
    //拦截所有请求，包括静态资源，API请求，页面请求等，所以需要配置config

    const response = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}

export const config = {
    matcher: [
        '/api/:path*'

    ],
    // matcher: [
    // {
    //     source: '/chat/:path*',
    //     has: [
    //         {
    //             type: 'cookie',
    //             key: 'token',
    //             value: '123456789'
    //         },
    //     ],
    //     missing: [
    //         {
    //             type: 'query',
    //             key: 'userId',
    //             value: '123'
    //         }
    //     ]
    // }
    // ],
};

