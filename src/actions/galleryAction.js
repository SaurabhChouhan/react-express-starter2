import axios from "axios";
import * as AC from "./actionConst";

export const getImages=(imgArr)=>({
    type: AC.GET_IMAGES,
    imgArr
})

export const getGalleryFromServer = (userId) =>{
    return function(dispatch){
        return axios.get("/public/get-url-by-date/"+userId).then(function(response){
            console.log("Inside getGalleryFromServer ", response);
            if(response.data.success){
                dispatch(getImages(response.data.payload))
            }
        })
    }
}