import * as AC from "./actionConst";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { getGalleryFromServer } from "./galleryAction";

export const addLoginUser = (user) => ({
    type: AC.LOGIN_USER,
    user: user
})

export const logOutUser = ()=>({
    type: AC.LOGOUT_USER
})

export const addRegisteredUser = (user)=> ({
    type: AC.REGISTERED_USER,
    user
})

export const loginUserOnServer = (formInput)=>{
    console.log(formInput)
    return function(dispatch){
        return axios.post("/public/login", formInput).then(function(response){
            console.log(response)
            if(response.data.success){
                console.log("Inside LoginUserOnServer ", response)
                dispatch(addLoginUser(response.data.payload))
                dispatch(getGalleryFromServer(response.data.payload._id))
                NotificationManager.success("Login Successful")
            }
            else
                NotificationManager.error(response.data.error);
        }).catch((e)=>{
            console.log("error", e)
            NotificationManager.error(e)
        })
    }
}

export const registerUserOnServer = (formInput)=>{
    console.log(formInput)
    return function(dispatch){
        return axios.post("/public/register", formInput).then(function(response){
            console.log(response)
            if(response.data.success){
                console.log("Inside registerUserOnServer ", response)
                dispatch(addRegisteredUser(response.data.payload))
                NotificationManager.success("Registration Successful")
            }
            else
                NotificationManager.error(response.data.error);
        }).catch((e)=>{
            console.log("error", e)
            NotificationManager.error(e)
        })
    }
}