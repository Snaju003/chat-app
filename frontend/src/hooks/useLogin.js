import { useState } from 'react';
import { toast } from 'react-hot-toast';

const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async ({username, password}) => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success('Login successful');
            localStorage.setItem('auth-user', JSON.stringify(data));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
}
export default useLogin;