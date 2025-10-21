<template>
  <div class="container pt-5">
    <div class="position-relative page-wrap">
      <div class="row">
        <img src="@@/assets/images/logo.png" alt="" class="rounded mx-auto d-block custom-image" />
      </div>
      <div class="row">
        <Form class="form" @submit="submitLogin" :validation-schema="schema">
          <!-- phones -->
          <div class="d-flex justify-content-center">
            <div class="col-6">
              <Field name="phone" v-slot="{ field, meta, errors }">
                <label for="phone">
                  Phone
                  <small v-if="meta.touched && errors[0]" class="text-danger">
                    &nbsp;({{ errors[0] }})
                  </small>
                </label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="phone-addon">
                    <font-awesome-icon :icon="['fas', 'phone']" />
                  </span>
                  <input
                    v-bind="field"
                    type="text"
                    class="form-control"
                    placeholder="Phone (eg: 081xxxxxxx)"
                    :class="{
                      'is-invalid': meta.touched && errors[0],
                      'is-valid': meta.touched && meta.valid,
                    }"
                  />
                </div>
              </Field>
            </div>
          </div>
          <!-- end phone -->

          <!-- password -->
          <div class="d-flex justify-content-center">
            <div class="col-6">
              <Field name="password" v-slot="{ field, meta, errors }">
                <label for="passworrd">
                  Password
                  <small v-if="meta.touched && errors[0]" class="text-danger">
                    &nbsp;({{ errors[0] }})
                  </small>
                </label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="phone-addon">
                    <font-awesome-icon :icon="['fas', 'key']" />
                  </span>
                  <input
                    v-bind="field"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    :class="{
                      'is-invalid': meta.touched && errors[0],
                      'is-valid': meta.touched && meta.valid,
                    }"
                  />
                  <span class="input-group-text" id="phone-addon">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                  </span>
                </div>
              </Field>
            </div>
          </div>
          <!-- end password -->

          <!-- start button -->
          <div class="d-flex justify-content-center">
            <div class="col-6">
              <div class="d-grid">
                <button class="btn btn-success btn-sm" v-if="!isLoading">Submit</button>
                <span class="loader mx-auto" v-else></span>
              </div>
            </div>
          </div>
          <!-- end button -->
        </Form>
      </div>
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
    }
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
  },
}
</script>

<style scoped>
.page-wrap {
  min-height: 100dvh;
}

.row .custom-image {
  width: clamp(140px, 40vw, 260px);
  margin-top: 4dvh;
  filter: brightness(0) invert(1);
}

@media (min-width: 768px) {
  .row .custom-image {
    width: clamp(160px, 24vw, 300px);
    margin-top: 5dvh;
    filter: brightness(0) invert(1);
  }
}

@media (min-width: 1024px) {
  .row .custom-image {
    width: clamp(180px, 16vw, 320px);
    margin-top: 6dvh;
    filter: brightness(0) invert(1);
  }
}
</style>
