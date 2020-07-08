import Axios from "axios";
import RequestType from "../enum/RequestType"
import {Message} from "element-ui"
import router from "../router";
import MwStore from "../store/MwStore";
import AppConfig from "../config/AppConfig";
import {debug} from "../utils/ConsoleLogUtils"


Axios.defaults.timeout = 10000;

const defaultHeaders = {
    "content-type": "application/json;charset=utf-8"
}


Axios.interceptors.request.use(config => {
    let tokenId = MwStore.tokenId;
    if (tokenId != null) {
        config.headers.token_id = tokenId;
    }
    return config;
});


export function baseApi(url, data = {},
                        type = RequestType.GET,
                        headers = defaultHeaders) {
    if (AppConfig.dev) {
        url = "/api" + url;
    }

    return new Promise(resolve => {
        let promise = null;
        if (type === RequestType.GET) {
            promise = Axios.get(url, {
                headers: headers
            });
        } else if (type === RequestType.POST) {
            promise = Axios.post(url, data, {
                headers: headers
            });
        } else if (type === RequestType.PUT) {
            promise = Axios.put(url, data, {headers: headers});
        } else {
            promise = Axios.delete(url, {headers: headers});
        }


        //2、如果成功则调用resolve
        promise.then(response => {
            if (response && response.status === 200 && response.data) {
                if (response.data.code === 200) {
                    resolve(response);
                } else if (response.data.code === 401) {
                    Message.error("未登录或登录已过期")
                    MwStore.tokenId = null;
                    MwStore.user = null;
                    let tp = router.path;
                    router.push({name: "Login"}).then(() => {
                        MwStore.Login.targetPath = tp;
                    });
                } else {
                    Message({
                        message: response.data.msg + "\t错误代码：" + response.data.code,
                        type: "error"
                    });
                    resolve(response);
                }
            }
        }).catch(error => {
            Message({
                message: "请求出现了一个错误，请稍后重试\t错误代码：" + error.response.status,
                type: "error"
            });

        });
        return promise;


    })

}
