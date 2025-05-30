'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GoogleCallbackPage() {
    const router = useRouter()

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code')
        if (!code) {
            router.push('/login')
            return
        }

        fetch(`http://localhost:8080/api/v1/auth/google/callback?code=${code}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error('❌ 로그인 실패')
                return res.json()
            })
            .then(data => {
                console.log('✅ 로그인 성공:', data.accessToken)
                router.push('/')
            })
            .catch(err => {
                console.error('❌ 로그인 요청 에러:', err)
                router.push('/login')
            })
    }, [router])

    return <p>구글 로그인 처리 중입니다…</p>
}
