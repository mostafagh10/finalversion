import axios from 'axios';

export const addinfecteduserprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/client/infected' , data , config)

    return response
};

export const signupprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/client/signup' , data , config)

    return response
};

export const getusersprocess = async (data) => {
    const response = await axios.get('http://localhost:3500/user/client')

    return response
};

export const edituserprocess = async (data,userId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/user/client/${userId}` , data , config)

    return response
};