import axios from 'axios';
import { API_URL } from 'Consts';

export class AuthService {
  static async signIn({ email, password }: { email: string, password: string }): Promise<any> {
    return axios.post(`${API_URL}/signin`, { email, password });
  }

  static async signOut(): Promise<any> {
    return axios.post(`${API_URL}/user/logout`);
  }
}
