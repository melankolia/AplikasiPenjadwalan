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
  deleteDosen(params) {
    return BaseInstance.delete('dosen', {params});
  },
  /// Mata Kuliah
  getMatkul(params) {
    return BaseInstance.query('mata-kuliah', {params});
  },
  createMatkul(data) {
    return BaseInstance.post('mata-kuliah', data);
  },
  deleteMatkul(params) {
    return BaseInstance.delete('mata-kuliah', {params});
  },
  /// Ruang
  getRuang(params) {
    return BaseInstance.query('ruang', {params});
  },
  createRuang(data) {
    return BaseInstance.post('ruang', data);
  },
  deleteRuang(params) {
    return BaseInstance.delete('ruang', {params});
  },
  /// Hari
  getHari(params) {
    return BaseInstance.query('jadwal-hari', {params});
  },
  createHari(data) {
    return BaseInstance.post('jadwal-hari', data);
  },
  deleteHari(params) {
    return BaseInstance.delete('jadwal-hari', {params});
  },
  /// Jam
  getJam(params) {
    return BaseInstance.query('jadwal-jam', {params});
  },
  createJam(data) {
    return BaseInstance.post('jadwal-jam', data);
  },
  deleteJam(params) {
    return BaseInstance.delete('jadwal-jam', {params});
  },
  /// Sesi
  getSesi(params) {
    return BaseInstance.query('sesi', {params});
  },
  createSesi() {
    return BaseInstance.post('jadwal-kuliah/create/sesi');
  },
  cleanUpSesi() {
    return BaseInstance.delete('sesi/clean-up');
  },
  /// Generate Jadwal Kuliah
  generateJadwal() {
    return BaseInstance.post('jadwal-kuliah/create');
  },
  getJadwalKuliah(params = '') {
    return BaseInstance.query('jadwal-kuliah', {params});
  },
  cleanUpJadwal() {
    return BaseInstance.delete('jadwal-kuliah/create');
  },
};

export default AppService;
