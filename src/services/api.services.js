import axios from "axios"
import request from "@/utils";


const URL = import.meta.env.VITE_API_BASE_URL;

class ApiServices {
    getDataRuangan() {
        return axios.get(URL + `/kalibrasi/getRuangan`, { headers: request.requestHeader() })
    }

    getData(namaRuangan, filterDiff) {
        return axios.get(URL + `/kalibrasi/get?nama_ruangan=${namaRuangan}&filter_diff=${filterDiff}`, { headers: request.requestHeader() })
    }

    getDataForFilter() {
        return axios.get(URL + `/kalibrasi/get`, { headers: request.requestHeader() })
    }
}

export default new ApiServices;