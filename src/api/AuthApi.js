import {baseApi} from "./MwBaseApi";
import RequestType from "../enum/RequestType"

export const LoginApi = (uname, pwd) => {
    let obj = {
        username: uname,
        password: pwd
    };

    return baseApi("/login", JSON.stringify(obj), RequestType.POST);
}

export const LogoutApi = () => {
    return baseApi("/logout", null, RequestType.GET);
}
