
import axios from '../../interceptor/interceptor.js'
import store from '../../store/index.js'
let path = store.state.config.globalPath
export const getDepartArea = () => {
	return axios.post(path+'/report/departarea', {
		
	}).then(res => {
		return res.data
	}).catch(err => {
	
	})
}


export const getReportStatus = () => {
	return axios.post(path+'/report/status', {
		
	}).then(res => {
		return res.data
	}).catch(err => {
	
	})
}


export const reportRecordListApi = (data) => {
    return axios.post(path+'/report/select', {
		data
	}).then(res => {
		return res.data
	}).catch(err => {
	
	})
}


export default{
    getDepartArea,
    getReportStatus,
    reportRecordListApi
}