import Auth from './auth.service';

export default function authHeader() {
    const user = Auth.getCurrentUser();
    if (user && user.token) {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        }; 
    } else {
        return {

        };
    }
}