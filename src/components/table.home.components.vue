<template>
  <div class="container-fluid pt-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Silakan Pilih Ruangan</h5>
        <div class="row">
          <div
            class="col-md-3 col-lg-2 col-sm-6 d-grid my-1"
            v-for="item of dataRuangans"
            :key="item"
          >
            <span
              :class="[
                'badge',
                'rounded-pill',
                item === currentSelected ? 'text-bg-primary' : 'text-bg-secondary',
                'mx-2',
                'selected-ruangan',
              ]"
              @click="pickRuangan(item)"
            >
              {{ item.replace(';', '') }}
            </span>
          </div>
        </div>
        <!-- <h5 class="card-title">List Alat</h5> -->
        <div class="d-grid" v-if="isLoading">
          <span class="loader mx-auto my-5"></span>
        </div>
        <div class="table-responsive my-5" v-else>
          <!-- table desktop -->
          <table class="table d-none d-md-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nomor Sertifikat</th>
                <th scope="col">Nama Ruangan</th>
                <th scope="col">Nomor Internal</th>
                <th scope="col">Alat Kesehatan</th>
                <th scope="col">Nomor Seri</th>
                <th scope="col">Merk</th>
                <th scope="col">Tipe</th>
                <th scope="col">Ruangan Pelayanan</th>
                <th scope="col">Instalasi Pelayanan</th>
                <th scope="col">Status Laik</th>
                <th scope="col">Kalibrasi Terakhir</th>
                <th scope="col">Kalibrasi Selanjutnya</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of calibdata" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item.nomor_sertifikat }}</td>
                <td>{{ item.nama_ruangan }}</td>
                <td>{{ item.no_internal }}</td>
                <td>{{ item.alat_kesehatan }}</td>
                <td>{{ item.nomor_seri }}</td>
                <td>{{ item.merk }}</td>
                <td>{{ item.tipe }}</td>
                <td>{{ item.ruangan_pelayanan }}</td>
                <td>{{ item.instalasi_pelayanan }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.calib_date }}</td>
                <td>{{ item.next_calib_date }}</td>
                <td>
                  <span class="badge bg-success" v-if="item.bucket_days === null">Aman</span>
                  <span class="badge bg-danger" v-else>{{ item.diff_days }} hari lagi</span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- end table desktop -->

          <!-- table mobile -->
          <div class="table-mobile d-md-none">
            <div v-for="(item, index) in calibdata" :key="index" class="mobile-row">
              <div class="mobile-header" @click="item.show = !item.show">
                <strong>{{ item.alat_kesehatan }}</strong>
                <span class="text-muted">{{ item.nomor_sertifikat }}</span>
                <span class="toggle">{{ item.show ? '▲' : '▼' }}</span>
              </div>
              <div v-if="item.show" class="mobile-body">
                <p><b>Nomor Internal:</b> {{ item.no_internal }}</p>
                <p><b>Merk:</b> {{ item.merk }}</p>
                <p><b>Tipe:</b> {{ item.tipe }}</p>
                <p><b>Status:</b> {{ item.status }}</p>
                <p><b>Kalibrasi Terakhir:</b> {{ item.calib_date }}</p>
                <p><b>Kalibrasi Selanjutnya:</b> {{ item.next_calib_date }}</p>
                <p>
                  <b>Status: </b>
                  <span class="badge bg-success" v-if="item.bucket_days === null">Aman</span>
                  <span class="badge bg-danger" v-else>{{ item.diff_days }} hari lagi</span>
                </p>
              </div>
            </div>
          </div>
          <!-- end table mobile -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableHomeComponents',
  props: ['calibdata', 'isLoading', 'dataRuangans', 'currentSelected'],
  methods: {
    pickRuangan(item) {
      this.$emit('pickRuangan', item)
    },
  },
}
</script>
<style scoped>
.selected-ruangan {
  cursor: pointer;
}

.table-mobile {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-row {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
}

.mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.mobile-body {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #333;
}

.toggle {
  font-size: 0.8rem;
  color: #999;
}
</style>
