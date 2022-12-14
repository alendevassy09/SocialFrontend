import axios from "axios";

const instance=axios.create({
    // baseURL: 'http://localhost:4000'
    baseURL: 'https://blissglasess.shop',

})

export default instance