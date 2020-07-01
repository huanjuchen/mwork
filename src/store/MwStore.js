import {getStoreData} from "../utils/StoreUtils"
import {debug} from "../utils/ConsoleLogUtils"

const backupData = getStoreData();
debug("getStoreData执行一次");

let obj = {
    tokenId: null,
    user: null,
    Login: {
        targetPath: null,
        routeName: null
    },
    Home: {
        LeftNavigation: {
            activeIndex: "DashBoard"
        }
    }
}

if (backupData != null) {
    obj = backupData;
}

export default obj;

