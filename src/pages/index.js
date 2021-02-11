import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        Router.replace('sign-in')
    }, [])
    return (
        <div className={""}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={""}>
                Create Next App
            </div>
        </div>
    )
}
