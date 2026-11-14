'use client'
import { useParams } from "next/navigation";

export default function MePage() {
    const params = useParams()
    const id = params.id
    return (
        <div>me detail {id}</div>
    )
}