// all req going to api
import axios, { AxiosResponse } from "axios";
import { ModalActions } from "semantic-ui-react";

axios.defaults.baseURL="https:localhost:5001/api/";
const responseBody= (response:AxiosResponse)=>response.data;
 
const requests={
    get:(url:string)=>axios.get(url).then(responseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
    del:(url:string)=>axios.delete(url).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody)     

}

const Activities=
{
list:()=>requests.get('Activities')
}

const agent={
    Activities
}
export default agent;