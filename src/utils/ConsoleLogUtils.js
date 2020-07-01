import AppConfig from "../config/AppConfig"
import LogLevel from "../enum/LogLevel";
import {getNow} from "./DateUtils"


export function debug(msg) {
    if (AppConfig.logLevel >= LogLevel.DEBUG) {
        console.log(getNow() + "\t" + "DEBUG" + "\t" + msg);
    }
}

export function info(msg) {
    if (AppConfig.logLevel >= LogLevel.INFO) {
        console.log(getNow() + "\t" + "INFO" + "\t" + msg);
    }
}

export function error(msg) {
    if (AppConfig.logLevel >= LogLevel.ERROR) {
        console.error(getNow() + "\t" + "INFO" + "\t" + msg);
    }
}