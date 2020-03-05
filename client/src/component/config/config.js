import Axios from 'axios'
const axios=Axios.create({
    baseURL:'http://localhost:3025'
})
export default axios