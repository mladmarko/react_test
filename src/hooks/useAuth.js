import axios from "axios";
import qs from "qs";
import {useLocalStorage} from "./useLocalStorage";

export const useAuth = () => {
    const [user, setUser] = useLocalStorage("user", null);
    const [token, setToken] = useLocalStorage("token", null);
    const login = async (values) => {
        const data = {
            grant_type: 'Bearer',
            email: values.email,
            password: values.password
        };

        const options = {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
            url: 'http://www.scripttic.com:8000/oauth2/token'
        };
        const result = await axios(options);

        return await pullUserData(result.data)
            .then(() => {
                setToken(result.data);
            })
            .catch((error) => {
                setToken(null)
            })

    };

    const pullUserData = async (token) => {
        const options = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`},
            url: 'http://www.scripttic.com:8000/api/v1/user'
        };
        const result = await axios(options);

        setUser(result.data);
    };

    const logout = () => {
        setUser(null);
    };

    return {user, login, logout, token};
};