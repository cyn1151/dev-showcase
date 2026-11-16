import { cacheLife } from "next/cache";
import { Suspense } from "react";

const DynamicContent = async () => {
    'use cache'

    cacheLife(
        {
            stale: 5,
            revalidate: 5,
            expire: 30
        }
    )
    const data = await fetch('https://www.mocklib.com/mock/random/name')
    const json = await data.json()
    return (
        <div>{json.name}</div>
    )
}
// dev 模式下缓存行为和生产不完全一致。dev 里很多缓存会被刻意放松、甚至不命中，
// 最终判断以 npm run build && npm start 为准

export default function CacheComponents() {
    return (
        <div>
            <Suspense fallback={<p>加载中...</p>}>
                <DynamicContent />
            </Suspense>
        </div>
    )
}