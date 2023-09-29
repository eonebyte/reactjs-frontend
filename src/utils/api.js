const api = (() => {
    const BASE_URL = 'http://127.0.0.1:3000/api/v1';

    async function _fetchWithAuth(url, options = {}) {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
    }

    function putAccessToken(token) {
        localStorage.setItem('accessToken', token);
    }
    function getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    async function register({firstName, lastName = '', email, phoneNumber, address, password }) {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": firstName + lastName, email, "phone_number": phoneNumber, address, password })
        });

        const responseJson = await response.json();
        const {status, message} = responseJson;
        if (status !== 'success') {
            throw new Error(message)
        }

        const { data: { newUser } } = responseJson;
        return newUser;
    }

    async function getOwnProfil() {
        const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
        const responseJson = await response.json();
        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message)
        }

        const { data: { user } } = responseJson

        return user;
    }

    return {
        putAccessToken,
        getAccessToken,
        register,
        getOwnProfil,
        BASE_URL,
    }
})();

export default api;