export const showFormattedDate = (date) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString('id-ID', options);
};

export const getUserById = ({ ownerId, users }) => {
    if (users.data) {
        const res = users.data.filter((user) => user.id === ownerId);
        return res && res[0] ? res[0].name : '';
    }

    return null;
};

export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => localStorage.setItem('token', token);
