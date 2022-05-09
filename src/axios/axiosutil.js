import axios from 'axios'
import {Modal} from 'antd'

export default class Axios{
    static ajax(options){
        let host = 'localhost';
        let port = '8080';
        let base = '/api';
        let baseApi = 'http://' + host + ':' + port + base;

        return new Promise((resolve, reject)=>{
            axios({
                url:options.url,
                method:options.method,
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                if (response.status == '200'){
                    let res = response.data;
                    if (res.code == '0'){
                        resolve(res);
                    }else {
                        Modal.info({
                            title:"提示",
                            content: res.msg
                        })
                    }
                }else {
                    reject(response.data);
                }
            })
        });
    }
}