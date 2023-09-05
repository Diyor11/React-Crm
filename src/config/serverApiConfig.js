// export const localUrl = 'http://localhost:8080/api/'
export const localUrl = 'https://edurar-back.onrender.com/api/'

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? localUrl
    : localUrl;
export const DOWNLOAD_BASE_URL =
  process.env.NODE_ENV === 'production' || process.env.REACT_APP_DEV_REMOTE === 'remote'
    ? localUrl
    : localUrl;
export const ACCESS_TOKEN_NAME = 'x-auth-token';

