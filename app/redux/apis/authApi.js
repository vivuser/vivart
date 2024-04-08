export function loginApi(data) {
    return apiPost('auth/login', data);
} 

export function signupApi(data) {
    return apiPost('auth/signup', data);
}