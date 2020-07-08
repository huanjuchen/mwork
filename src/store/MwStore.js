import {getMwStoreData} from "../utils/StoreUtils"

const backupData = getMwStoreData();

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

