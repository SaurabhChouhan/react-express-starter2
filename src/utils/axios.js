import axios from 'axios';

const url = ''
const instance = axios.create({
    baseURL: url
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

// Comment this out during final build
instance.interceptors.request.use(request => {
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error.response)
    if(error.response)
        return Promise.reject({success:false, status: error.response.status, data: error.response.data});    
    return Promise.reject(error);
});

export default instance;