import axios from "axios";

const instance=axios.create({
    
    baseURL: 'https://blissglasess.shop',

})

export default instance