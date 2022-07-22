// all req going to api
import axios, { AxiosResponse } from "axios";
import { ModalActions } from "semantic-ui-react";
import { IActivity } from "../models/activity";

axios.defaults.baseURL="https:localhost:5001/api/";
const responseBody= <T> (response:AxiosResponse<T>)=>response.data;
 
const requests={
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:<T>(url:string,body:{})=>axios.post<T>(url,body).then(responseBody),
    del:<T>(url:string)=>axios.delete<T>(url).then(responseBody),
    put:<T>(url:string,body:{})=>axios.put<T>(url,body).then(responseBody)     

}

const Activities=
{
list:()=>requests.get<IActivity[]>('Activities')
}

const agent={
    Activities
}
export default agent;