import CryptoJS from 'crypto-js';
import store from '../store/index.js'
export default {


    //加密
    encrypt(data) {
        let key = CryptoJS.enc.Utf8.parse(store.state.config.encryptKey)
        let iv= CryptoJS.enc.Utf8.parse(store.state.config.encryptIv)
        let encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            key,
            { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7},
        ).toString()
        return encrypted
    },
    //解密
    decrypt(data) {
        let key = CryptoJS.enc.Utf8.parse(store.state.config.encryptKey)
        let iv= CryptoJS.enc.Utf8.parse(store.state.config.encryptIv)
        let decrypted = CryptoJS.AES.decrypt(
            data,
            key,
            { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7},
        ).toString(CryptoJS.enc.Utf8)
        return decrypted
    }
 
}