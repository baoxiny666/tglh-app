import axios from '../../interceptor/interceptor.js'
import store from '../../store/index.js'
let path = store.state.config.globalPath
export const selectDataCard = () => {
	
	return axios.post(path+'statistic/selectDataCard', {
		
	}).then(res => {
		return res.data
	}).catch(err => {
	
	})
}
export default{
    selectDataCard
}