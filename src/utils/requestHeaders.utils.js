export default function requestHeader() {
    let user = JSON.parse(localStorage.getItem('userdata'));
    if (user && user.token) {
        return {
            'Authorization': `Bearer ${user.token}`
        }
    }
    return {}
}