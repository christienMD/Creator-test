import { useAuthStore } from '@/stores/useAuthStore';
import { useApi } from './fetcher';
import { LoginEntity} from '@/types/entities';

export const useAuth = () => {
  const setAuth = useAuthStore.getState().setAuth;
  const clearAuth = useAuthStore.getState().clearAuth;
  const token = useAuthStore.getState().token;

  const { API } = useApi();

  const login = async (data: LoginEntity) => {
    try {
      const response = await API.login(data);
      const res = await response[1];
      const status = response[2];

      if (status) {
        const { token, user } = res.data;
        setAuth(user, token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const req = await API.logout(token ?? '');
      // const statusCode = req[0];
      // const res = await req[1];
      const status = req[2];
      if (status) {
        clearAuth();
      } 
    } catch (error) {
      console.log(error); 
    } 
  };

  return { login, logout };
};
