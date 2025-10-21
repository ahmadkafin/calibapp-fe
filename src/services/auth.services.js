import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

class AuthServices {
    async login(data) {
        return await axios.post(`${BASE_URL}/auth/login`, {
            phone: data.phone,
            password: data.password
        }).then((response) => {
            let dataResponse = response.data;
            if (dataResponse.TFA) {
                localStorage.setItem("phone", data.phone);
            }
            return dataResponse;
        })
    }
    async verifyTFA(code) {
        await axios.post(`${BASE_URL}/auth/verify-tfa`, {
            phone: localStorage.getItem("phone"),
            tfaCode: parseInt(code)
        }).then((response) => {
            let dataResponse = response.data;
            if (dataResponse.message === "code match") {
                localStorage.setItem("userdata", JSON.stringify(dataResponse));
            }
            return dataResponse;
        })
    }

    logout() {
        localStorage.removeItem("userdata");
        localStorage.removeItem("phone");
    }
}

export default new AuthServices();