import * as AC from "../actions/actionConst";
let initialState={
    list:[]
}
export const galleryReducer= ( state = initialState, action)=>{
    switch(action.type){
        case AC.GET_IMAGES:
            return Object.assign({}, state, {
                list: action.imgArr
            })
        default: 
            return state;
    }
}
export default galleryReducer