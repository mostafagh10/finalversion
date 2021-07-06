import axios from 'axios';

export const addnewsprocess = async (data) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('http://localhost:3500/news' , data , config)

    return response
};

export const getnewsprocess = async (data) => {
    const response = await axios.get('http://localhost:3500/news')

    return response
};

export const editnewsprocess = async (data,adviceId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`http://localhost:3500/news/${adviceId}` , data , config)

    return response
};