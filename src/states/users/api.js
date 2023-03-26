import { API } from '../../constant/Url';

const usersAPI = {
    login: async ({ email, password }) => {
        const response = await fetch(API.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data;
    },
    register: async ({ name, email, password }) => {
        const response = await fetch(API.REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        return data;
    },
    getAllUsers: async () => {
        const response = await fetch(API.ALL_USERS);
        const data = await response.json();
        return data;
    },
    getOwnProfile: async () => {
        const response = await fetch(API.OWN_PROFILE, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        return data;
    },
};

export default usersAPI;
