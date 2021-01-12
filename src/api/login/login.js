import axios from '../../interceptor/interceptor.js'
import store from '../../store/index.js'
let path = store.state.config.globalPath
export const toLogin = (params) => {
	return axios.post(path+'/jwt/login', {
		params
	}).then(res => {
		return res.data
	}).catch(err => {
	
	})
}

export default{
    toLogin
}