import { useEffect, useState } from "react";
import Image from 'next/image'
import axios from "axios";
import Head from 'next/head'
import Link from 'next/link'

export default function FaceList() {

    const [faces, setFaces] = useState([])

    useEffect(async () => {
        const res = await axios.get('/api/storage')
        setFaces(res.data)
    },[])


    return (
        <div className="container mx-auto mt-4">
            <Head>
                <title>facelist</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Link href='/face'>
                <a className="text-2xl text-gray-600 hover:opacity-50">&larr; Back</a>
            </Link>
            <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3" >
                {faces && faces.map((f, i) => (
                    <Image key={i} src={f} width={680} height={400} layout="responsive" alt="face" />
                ))}
            </div>
        </div>
        
    )
}
