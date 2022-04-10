import axios from 'axios';
import { API_URL } from 'Consts';

export class FilesService {
  static async save(file: any) {
    return (await axios.post(`${API_URL}/files`,file, { headers: {
      'Content-Type': 'multipart/form-data'
      }
    })).data
  }

  static async getAll() {
    return (await axios.get(`${API_URL}/files`)).data;
  }
}
