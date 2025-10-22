<template>
  <div class="container">
    <div class="position-relative page-wrap">
      <div class="row">
        <img src="@@/assets/images/logo.png" alt="" class="rounded mx-auto d-block custom-image" />
      </div>

      <Form class="form" @submit="submitLogin" :validation-schema="schema">
        <!-- phones -->
        <div class="row justify-content-center mb-3">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6">
            <Field name="phone" v-slot="{ field, meta, errors }">
              <label for="phone">
                Phone
                <small v-if="meta.touched && errors[0]" class="text-danger">
                  &nbsp;({{ errors[0] }})
                </small>
              </label>
              <div class="input-group mb-1">
                <span class="input-group-text" id="phone-addon">
                  <font-awesome-icon :icon="['fas', 'phone']" />
                </span>
                <input
                  id="phone"
                  v-bind="field"
                  type="text"
                  class="form-control"
                  placeholder="Phone (eg: 081xxxxxxx)"
                  :class="{
                    'is-invalid': meta.touched && errors[0],
                    'is-valid': meta.touched && meta.valid,
                  }"
                />
                <span class="input-group-text" id="phone-addon-2">
                  <font-awesome-icon :icon="['fas', 'phone']" />
                </span>
              </div>
            </Field>
          </div>
        </div>
        <!-- end phone -->

        <!-- password -->
        <div class="row justify-content-center mb-3">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6">
            <Field name="password" v-slot="{ field, meta, errors }">
              <label for="password">
                Password
                <small v-if="meta.touched && errors[0]" class="text-danger">
                  &nbsp;({{ errors[0] }})
                </small>
              </label>
              <div class="input-group mb-1">
                <span class="input-group-text" id="key-addon">
                  <font-awesome-icon :icon="['fas', 'key']" />
                </span>
                <input
                  id="password"
                  v-bind="field"
                  :type="showMask ? 'text' : 'password'"
                  class="form-control"
                  placeholder="Password"
                  :class="{
                    'is-invalid': meta.touched && errors[0],
                    'is-valid': meta.touched && meta.valid,
                  }"
                />
                <span class="input-group-text" id="mask-addon" role="button" @click="changeMask">
                  <font-awesome-icon :icon="['fas', !showMask ? 'eye' : 'eye-slash']" />
                </span>
              </div>
            </Field>
          </div>
        </div>
        <!-- end password -->

        <!-- start button -->
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6">
            <div class="d-grid">
              <button class="btn btn-success btn-sm w-100" v-if="!isLoading">Submit</button>
              <span class="loader d-block w-100 text-center" v-else></span>
            </div>
          </div>
        </div>
        <!-- end button -->
      </Form>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  name: 'LoginView',
  components: { FontAwesomeIcon, Form, Field, ErrorMessage },
  data() {
    const schema = yup.object().shape({
      phone: yup.string().required('Phone is required'),
      password: yup.string().required('Password is required'),
    })
    return {
      isLoading: false,
      schema,
      showMask: false,
    }
  },
  mounted() {
    this.setVh()
    window.addEventListener('resize', this.setVh)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setVh)
  },
  methods: {
    setVh() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    },
  },
  methods: {
    submitLogin(data) {
      console.log(data)
      this.isLoading = true
      this.$store.dispatch('login', data).then(
        () => {
          this.isLoading = false
          this.$toast.success('Nomor Tedaftar')
          this.$router.push('/verify-tfa')
        },
        (error) => {
          this.isLoading = false
          this.$toast.error('Gagal Login: ' + error)
        },
      )
    },
    changeMask() {
      this.showMask = !this.showMask
    },
  },
}
</script>
<style scoped>
/* .page-wrap {
  min-height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: env(safe-area-inset-bottom);
} */

.page-wrap {
  min-height: calc(var(--vh, 1vh) * 100);
  min-height: 100vh; /* fallback */
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: env(safe-area-inset-bottom);
  overflow: auto;
}

.row .custom-image {
  width: clamp(140px, 40vw, 260px);
  /* margin-top: 4dvh; */
  filter: brightness(0) invert(1);
}

@media (max-width: 767px) {
  .row .custom-image {
    width: clamp(100px, 150vw, 250px);
    /* margin-top: 3dvh; */
    filter: brightness(0) invert(1);
  }
}

@media (min-width: 768px) {
  .row .custom-image {
    width: clamp(160px, 24vw, 300px);
    /* margin-top: 5dvh; */
    filter: brightness(0) invert(1);
  }
}

@media (min-width: 1024px) {
  .row .custom-image {
    width: clamp(180px, 16vw, 320px);
    /* margin-top: 6dvh; */
    filter: brightness(0) invert(1);
  }
}

.form .input-group {
  width: 100%;
}

.loader {
  min-height: calc(1.5rem + 0.5rem); /* contoh supaya tinggi sama dengan button */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
