import axios from '../../interceptor/interceptor.js'
export const selectDataCard = () => {
	return axios.post('apis/statistic/selectDataCard', {
		
	}).then(res => {
		return res.data
	}).catch(err => {
	
	})
}
export default{
    selectDataCard
}