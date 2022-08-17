let token = null;

export const setToken = value => token = value;
export const getToken = () => token;
export const isLogin = () => getToken() !== null && getToken()?.trim() !== "";
