import BaseInstance from '../base.instance';

const AppService = {
  login(params) {
    return BaseInstance.post('users/login', {...params});
  },
  register(params) {
    return BaseInstance.post('users', {...params});
  },
  /// Dosen
  getDosen(params) {
    return BaseInstance.query('dosen', {params});
  },
  createDosen(data) {
    return BaseInstance.post('dosen', data);
  },
  /// Mata Kuliah
  getMatkul(params) {
    return BaseInstance.query('mata-kuliah', {params});
  },
  createMatkul(data) {
    return BaseInstance.post('mata-kuliah', data);
  },
  /// Ruang
  getRuang(params) {
    return BaseInstance.query('ruang', {params});
  },
  createRuang(data) {
    return BaseInstance.post('ruang', data);
  },
  /// Hari
  getHari(params) {
    return BaseInstance.query('jadwal-hari', {params});
  },
  createHari(data) {
    return BaseInstance.post('jadwal-hari', data);
  },
  /// Jam
  getJam(params) {
    return BaseInstance.query('jadwal-jam', {params});
  },
  createJam(data) {
    return BaseInstance.post('jadwal-jam', data);
  },
  /// Sesi
  createSesi() {
    return BaseInstance.post('jadwal-kuliah/create/sesi');
  },
};

export default AppService;
