import axios from "axios";
import Cookies from "universal-cookie";


export default async function getToken() {
    const cookie = new Cookies()
    const tokenFromCookie = cookie.get('token')

    if(tokenFromCookie === undefined) {
        try {
            const res = await axios.get('/api/token')
            const token = res.data.token
            const region = res.data.region
            cookie.set('token', region + ':' + token, {maxAge: 540, path: '/', sameSite: 'strict'})

            console.log('token fetched from next-api')
            return { authToken: token, region: region }
        } catch(err) {
            // console.log(err.response.data);
            console.log(err)
            return { authToken: null};
        }
    } else {
        // console.log('Token fetched from cookie')
        const idx = tokenFromCookie.indexOf(':')
        return {
            authToken: tokenFromCookie.slice(idx + 1), 
            region: tokenFromCookie.slice(0,idx)
        }
    }
}