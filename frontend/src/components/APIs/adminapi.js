import axios from 'axios';

export const addadminprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/admin/addnewadmin' , data , config)

    return response
};

export const getadminsprocess = async (data) => {
    const response = await axios.get('http://localhost:3500/user/admin')

    return response
};

export const loginAsAdminProcess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/user/admin/login' , data , config)

    return response
};

export const editadminprocess = async (data,adminId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/user/admin/${adminId}` , data , config)

    return response
};


export const addnotificationprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('https://co-safe.herokuapp.com/user/client/notification' , data , config)

    return response
};