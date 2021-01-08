import CryptoJS from 'crypto-js';
import store from '../store/index.js'
let func = {}
/**
 * 自定义md5加密
 */
func.Md5 = (str) => {
	return CryptoJS.MD5(str).toString()
}

/**
 * 数据签名加密算法
 */
func.signEncrypt = (str) => {
	return func.Md5(func.Md5(str).substring(0, 10))
}
export default func