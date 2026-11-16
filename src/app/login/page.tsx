'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const handleLogin = () => {
        console.log('login')
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        }).then((res) => res.json()).then(data => {
            if (data.code === 200) {
                router.push('/')
            } else {
                alert(data.message)
            }
        })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-linear-to-br from-blue-100 to-purple-100">
            <div className="flex flex-col gap-4 p-10 pb-18 w-1/2 h-auto items-center bg-white rounded-lg shadow-lg">
                <h1 className='text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>登录界面</h1>
                <div className="w-full">
                    <label className='text-gray-500 w-full text-left'>用户名</label>
                    <Input type='text' placeholder="请输入用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="w-full">
                    <label className='text-gray-500 w-full text-left'>密码</label>
                    <Input type="password" placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button onClick={handleLogin} size='lg' className='w-full mt-2'>登录</Button>
            </div>
        </div>
    )
}