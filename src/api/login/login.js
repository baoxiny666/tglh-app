
import axios from '../../interceptor/interceptor.js'
export const toLogin = (params) => {
	return axios.post('apis/jwt/login', {
		params
	}).then(res => {
		return res.data
	}).catch(err => {
	
	})
}

export default{
    toLogin
}