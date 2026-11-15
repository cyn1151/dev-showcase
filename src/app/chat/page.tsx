'use client'
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState<string>("");
    //usechat 自动向/api/chat发请求
    const { messages, sendMessage } = useChat({
        onFinish: () => {
            setInput("")
        }
    })

    const handleMessage = () => {
        if (input.trim()) {
            sendMessage({ text: input })
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleMessage()
        }
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <section className='flex flex-col h-screen bg-linear-to-br from-blue-50 via-white to-purple-50'>
            {/* header section */}
            <div className='sticky bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200'>
                <div className='max-w-4xl mx-auto px-6 py-4'>
                    <h1 className='text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        AI 智能助手
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>随时为您解答问题</p>
                </div>
            </div>

            {/* messages section start */}
            <div className='flex-1 overflow-y-auto px-4 py-6'>
                <div className='content-w mx-auto space-y-4'>
                    {
                        messages.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-full text-center py-20'>
                                <div className='bg-linear-to-br from-blue-100 to-purple-100 rounded-full p-6 mb-4'>
                                    <svg className='w-12 h-12 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
                                    </svg>
                                </div>
                                <h2 className='text-xl font-semibold text-gray-700 mb-2'>开始对话</h2>
                                <p className='text-gray-500'>输入您的问题，我会尽力帮助您</p>
                            </div>
                        ) : (
                            messages.map((message, index) => {
                                return (
                                    <div
                                        key={message.id}
                                        className={`flex flex-col mt-4 ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>

                                            <Avatar
                                                className={`flex items-center justify-center text-white ${message.role === 'user' ? 'ml-2 bg-blue-500' : 'mr-1 bg-purple-500'}`}>
                                                {message.role === 'user' ? '你' : 'AI'}
                                            </Avatar>

                                            <div className={`rounded-2xl px-4 py-3 shadow-sm ${message.role === 'user'
                                                ? 'bg-linear-to-br from-blue-500 to-blue-600 text-white'
                                                : 'bg-white border border-gray-200 text-gray-800'
                                                }`}>
                                                {
                                                    message.parts.map((part, index) => {
                                                        return (
                                                            <div key={message.id + index}>
                                                                {part.type === 'text' ? part.text : ''}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                </div>
                {/* 保证生成自动向下滚动 */}
                <div ref={chatContainerRef}></div>
            </div>

            {/* footer section */}
            <div className="flex justify-center p-4">
                <div className="flex items-center content-w">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="请输入你的问题...（按Enter发送，Shift+Enter换行）"
                        className="resize-none"
                    />
                    <Button onClick={handleMessage}>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                        </svg>
                    </Button>
                </div>
            </div>

        </section>
    );
}
