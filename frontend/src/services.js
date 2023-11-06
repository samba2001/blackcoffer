import axios from 'axios';

export default async function AxiosService  (state, data, url,setLoading){
const Baseurl = 'http://127.0.0.1:8000/'
    if (state === 'get') {
        console.log(data)
        const response = await axios.get(Baseurl+'/'+url, {
            params: data   
        });
        setLoading(false)
        return response
    }
    else {
       
    }
    
}