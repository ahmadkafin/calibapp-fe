<template>
  <nav class="navbar bg-custom">
    <div class="container">
      <a class="navbar-brand">
        <img src="@@/assets/images/logo.png" alt="" class="rounded mx-auto custom-image" />
      </a>
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
          id="search"
          :value="searchValue"
          v-debounce:1s="searchData"
        />
        <button class="btn btn-sm btn-danger" @click="logout">
          <font-awesome-icon :icon="['fa', 'sign-out']" />
        </button>
      </form>
    </div>
  </nav>
  <div class="container-fluid py-4">
    <div class="row g-3 justify-content-center">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex"
        v-for="item of dataCalib"
        :key="item"
      >
        <div class="card h-100 w-100">
          <div :class="['d-flex', 'p-3', `bg-${item.status}`]">
            <font-awesome-icon :icon="['fas', item.icon]" style="color: white; font-size: 2rem" />
            &nbsp;
            <h3>{{ item.name }}</h3>
          </div>
          <div class="card-body">
            <h5 class="card-title">Jumlah {{ item.title }}</h5>
            <p class="card-text">
              <b>{{ item.counting }} alat </b> {{ item.subTitle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TableHomeComponents
    :calibdata="calibdata"
    :isLoading="isLoading"
    :dataRuangans="dataRuangans"
    :currentSelected="currentSelected"
    @pickRuangan="pickRuangan($event)"
  />
</template>

<script>
import TableHomeComponents from '@/components/table.home.components.vue'
import apiServices from '@/services/api.services'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { data } from 'jquery'

export default {
  name: 'HomeView',
  components: { FontAwesomeIcon, TableHomeComponents },
  data() {
    return {
      calibdata: [],
      allCalibData: [],
      dataRuangans: [],
      searchValue: '',
      currentSelected: '',
      isLoading: false,
      aman: 0,
      zeroDays: 0,
      thirtyDays: 0,
      sixtyDays: 0,
      ninetyDays: 0,
      dataCalib: [],
    }
  },
  mounted() {
    this.loadDataRuangan()
    this.countingData()
    // this.loadData()
  },
  methods: {
    searchData() {
      this.searchValue = document.getElementById('search').value
      const q = String(this.searchValue || '').toLowerCase()
      this.calibdata = this.allCalibData.slice()
      this.calibdata = this.allCalibData.filter((p) =>
        String(p?.alat_kesehatan ?? '')
          .toLowerCase()
          .includes(q),
      )
    },
    countingData() {
      apiServices
        .getDataForFilter()
        .then((response) => {
          const data = response.data.data
          this.aman = data.filter((e) => e.bucket_days === null).length
          this.zeroDays = data.filter((e) => e.bucket_days === 0).length
          this.thirtyDays = data.filter((e) => e.bucket_days === 30).length
          this.sixtyDays = data.filter((e) => e.bucket_days === 60).length
          this.ninetyDays = data.filter((e) => e.bucket_days === 90).length
          this.populateDataCalib()
        })
        .catch((e) => {
          this.isLoading = false
          const eMessage = `Error : ${e.response.data.status} - ${e.response.data.message}`
          this.$toast.error(eMessage)
        })
    },
    pickRuangan(item) {
      this.currentSelected = item
      this.loadData()
    },
    loadDataRuangan() {
      this.isLoading = true
      apiServices
        .getDataRuangan()
        .then((response) => {
          this.isLoading = false
          this.dataRuangans = response.data.data
          this.currentSelected = this.dataRuangans[0]
          this.loadData()
        })
        .catch((e) => {
          this.isLoading = false
          const eMessage = `Error : ${e.response.data.status} - ${e.response.data.message}`
          this.$toast.error(eMessage)
        })
    },
    loadData() {
      this.isLoading = true
      apiServices
        .getData(this.currentSelected)
        .then((response) => {
          this.isLoading = false
          const list = Array.isArray(response.data?.data) ? response.data.data : []
          this.allCalibData = list
          this.calibdata = list.slice()
        })
        .catch((e) => {
          this.isLoading = false
          const eMessage = `Error : ${e.response.data.status} - ${e.response.data.message}`
          this.$toast.error(eMessage)
        })
    },
    logout() {
      this.$store.dispatch('logout')
    },
    populateDataCalib() {
      this.dataCalib = [
        {
          name: 'Aman > 90 Hari',
          status: 'success',
          icon: 'check',
          counting: this.aman,
          title: 'Kalibrasi Aman > 90 hari',
          subTitle: 'Masih dalam berlaku kalibrasi',
        },
        {
          name: '≤ 90 hari',
          status: 'warning',
          icon: 'warning',
          counting: this.ninetyDays,
          title: 'Kalibrasi akan berakhir ≤ 90 hari',
          subTitle: 'Akan berakhir masa kalibrasi',
        },
        {
          name: '≤ 60 hari',
          status: 'warning',
          icon: 'warning',
          counting: this.sixtyDays,
          title: 'Kalibrasi akan berakhir ≤ 60 hari',
          subTitle: 'Akan berakhir masa kalibrasi',
        },
        {
          name: '≤ 30 hari',
          status: 'warning',
          icon: 'warning',
          counting: this.thirtyDays,
          title: 'Kalibrasi akan berakhir ≤ 30 hari',
          subTitle: 'Akan berakhir masa kalibrasi',
        },
        {
          name: '0 hari',
          status: 'danger',
          icon: 'xmark',
          counting: this.zeroDays,
          title: 'Kalibrasi Expire (Segera Lakukan Kalibrasi)',
          subTitle: 'Sudah berakhir masa kalibrasi',
        },
      ]
    },
  },
}
</script>

<style scoped>
nav.bg-custom {
  /* background: linear-gradient(90deg, rgba(50, 137, 130, 0.298), rgb(166 174 159), rgb(101 159 153)); */
  background: linear-gradient(90deg, rgba(50, 137, 130, 0.298), rgb(166 174 159), rgb(101 159 153));
}

nav.bg-custom > .container > a {
  color: white;
}

nav.navbar > .container > a > .custom-image {
  width: clamp(120px, 10vw, 20px);
  /* margin-top: 4dvh; */
  filter: brightness(0) invert(1);
}
</style>
