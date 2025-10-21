<template>
  <div class="verify-container">
    <div class="position-relative page-wrap">
      <div class="row">
        <font-awesome-icon :icon="['fas', 'robot']" />
      </div>
      <div class="row mt-2">
        <h2 class="title">Masukkan Kode Verifikasi</h2>
        <p class="subtitle">Kami telah mengirimkan kode ke nomor Anda</p>
        <div class="code-box">
          <input
            v-for="(digit, index) in codes"
            :key="index"
            ref="inputs"
            v-model="codes[index]"
            inputmode="numeric"
            @input="handleInput(index)"
            @keydown.backspace="handleBackSpace(index)"
            type="text"
            maxlength="1"
            class="digit"
          />
        </div>

        <button class="verify-btn" @click="submitVerif">Verifikasi</button>
        <button class="resend-btn">Kirim Ulang</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'VerifyTfa',
  components: { FontAwesomeIcon, Form, Field, ErrorMessage },
  data() {
    return {
      codes: ['', '', '', ''],
    }
  },
  mounted() {
    this.isPhoneExists()
  },
  computed: {
    fullCode() {
      return this.codes.join('')
    },
  },
  methods: {
    async handleInput(index) {
      const val = this.codes[index]
      if (!/^[0-9]$/.test(val)) {
        this.codes[index] = ''
        return
      }

      if (index < this.codes.length - 1) {
        await this.$nextTick()
        this.$refs.inputs[index + 1].focus()
      }
    },
    async handleBackSpace(index) {
      if (this.codes[index] === '' && index > 0) {
        await this.$nextTick()
        this.$refs.inputs[index - 1].focus()
      }
    },
    submitVerif() {
      if (this.fullCode.length < 4) {
        alert('Masukkan semua digit kode!')
        return
      }
      console.log('Kode terisi:', this.fullCode)
      this.$store.dispatch('verifyTFA', this.fullCode).then(
        () => {
          this.isLoading = false
          this.$toast.success('Kode Terverifikasi ✅')
          this.$router.push('/home')
        },
        (er) => {
          this.isLoading = false
          this.$toast.error('Gagal Varifikasi, kode tidak sesuai')
        },
      )
    },
    isPhoneExists() {
      const phn = localStorage.getItem('phone')
      if (!phn) {
        this.$router.push('/login')
      }
      return
    },
  },
}
</script>

<style scoped>
.svg-inline--fa.fa-robot {
  color: #389ca4;
  font-size: 5rem;
}

.page-wrap {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center; /* center horizontal */
  justify-content: center; /* center vertical */
}

.page-wrap .row {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* center isi di tengah */
  justify-content: center;
  text-align: center;
}

.verify-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    Arial,
    sans-serif;
  background: linear-gradient(135deg, #2564eb2b, #60a5fa58);
  color: #fff;
}

.title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 24px;
}

.code-box {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.digit {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 12px;
  text-align: center;
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  color: #111;
  outline: none;
  transition: all 0.2s ease;
}

.digit:focus {
  background: #fff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.4);
}

.verify-btn {
  width: 200px;
  padding: 10px 0;
  border: none;
  border-radius: 10px;
  background: #fff;
  color: #2563eb;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.verify-btn:hover {
  background: #f0f4ff;
}

.resend-btn {
  background: transparent;
  border: none;
  color: #fff;
  margin-top: 10px;
  opacity: 0.9;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
}

.resend-btn:hover {
  opacity: 1;
}
</style>
