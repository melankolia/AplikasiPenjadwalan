import BaseInstance from '../base.instance';

const AppService = {
  login(params) {
    return BaseInstance.post('users/login', {...params});
  },
  register(params) {
    return BaseInstance.post('users', {...params});
  },
  getDosen(params) {
    return BaseInstance.query('dosen', {params});
  },
  getMatkul(params) {
    return BaseInstance.query('mata-kuliah', {params});
  },
  getRuang(params) {
    return BaseInstance.query('ruang', {params});
  },
  getHari(params) {
    return BaseInstance.query('jadwal-hari', {params});
  },
  getJam(params) {
    return BaseInstance.query('jadwal-jam', {params});
  },
};

export default AppService;
