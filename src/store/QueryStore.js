import {getQueryStoreData} from "../utils/StoreUtils";
import {debug} from "../utils/ConsoleLogUtils"

const backupData = getQueryStoreData();


let queryStore = {
    subjectManagement:{
        searchText:"",
        pageSize:5,
        page:1,
        desc:"code",
        parentId:null,
        valid:null
    },
    userManagement:{
        searchText:"",
        pageSize:5,
        page:1,
        desc:true,
        valid:null,
    },
    proofManagement:{
        rid: null,
        startDate: null,
        endDate: null,
        verify: -2,
        orderType: "dateDESC",
        page: 1,
        pageSize: 7,
        showMode: 1,
        verifyStatus: -2,
        monthValue: null
    }
}

if (backupData != null) {
    queryStore = backupData;
}


export default queryStore;