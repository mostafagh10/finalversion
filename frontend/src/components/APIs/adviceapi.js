import axios from 'axios';

export const addadviceprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/advice' , data , config)

    return response
};

export const editadviceprocess = async (data,adviceId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/advice/${adviceId}` , data , config)

    return response
};

export const getadvicesprocess = async () => {
    const response = await axios.get('http://localhost:3500/advice')

    return response
};

export const deleteadvicesprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.delete('http://localhost:3500/advice',data,config)

    return response
};