import { NextRequest, NextResponse } from "next/server"

import { createDeepSeek } from "@ai-sdk/deepseek"
import { convertToModelMessages, streamText } from "ai"

const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY,
})
export async function POST(request: NextRequest) {
    const { messages } = await request.json()
    console.log('apikey', messages,process.env.DEEPSEEK_API_KEY)
    const result = streamText({
        model: deepseek('deepseek-chat'),
        messages: await convertToModelMessages(messages),
        system: 'You are a helpful assistant.',
    })

    return result.toUIMessageStreamResponse()
}