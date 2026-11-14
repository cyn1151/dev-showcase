import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  return NextResponse.json({ message: 'GET 动态参数', id: id })
}

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   return NextResponse.json({ message: 'POST 请求!',body:body ,status:201})
// }
