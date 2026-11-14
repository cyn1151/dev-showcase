import Link from "next/link";
const fetchUser = async () => {
    const body = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'test'
        })
    }
    const res = await fetch('http://localhost:3000/api/user',body)
    const user = await res.json()
    return user
}
export default async function Guestbook() {
    const user = await fetchUser()
    console.log(user)
    return (
        <div className="guestbook">guestbook
            <Link href={{ pathname: '/guestbook/me', query: { id: 11 } }}>Me</Link>
            {/* <button style={{ display: 'block', background: 'blue', color: 'white', marginTop: '10px' }} onClick={() => { router.push('/guestbook/me/111') }}>Me detail</button>
            <button style={{ display: 'block', background: 'blue', color: 'white', marginTop: '10px' }} onClick={() => { router.push('/guestbook/me?id=111') }}>Me 111</button>
            <button style={{ display: 'block', background: 'blue', color: 'white', marginTop: '10px' }} onClick={() => { router.refresh() }}>refresh</button>
            <button style={{ display: 'block', background: 'blue', color: 'white', marginTop: '10px' }} onClick={() => { router.back() }}>back</button>
            <button style={{ display: 'block', background: 'blue', color: 'white', marginTop: '10px' }} onClick={() => { router.forward() }}>forward</button>
            <button style={{ display: 'block', background: 'blue', color: 'white', marginTop: '10px' }} onClick={() => { router.replace('/guestbook/me?id=123') }}>replace</button> */}
        </div>
    )
}