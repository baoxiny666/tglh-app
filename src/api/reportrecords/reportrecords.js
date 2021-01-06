
import axios from '../../interceptor/interceptor.js'
export const getDepartArea = () => {
	return axios.post('apis/report/departarea', {
		
	}).then(res => {
		return res.data
	}).catch(err => {
	
	})
}


export const getReportStatus = () => {
	return axios.post('apis/report/status', {
		
	}).then(res => {
		return res.data
	}).catch(err => {
	
	})
}


export default{
    getDepartArea,
    getReportStatus
}