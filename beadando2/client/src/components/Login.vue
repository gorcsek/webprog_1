<template>
  <section>
    <div class="column is-one-third is-offset-one-third">
      <h4 class="title is-left">Login</h4>
    </div>
    <div class="column is-one-third is-offset-one-third">
      <b-field label="Username">
        <b-input
          placeholder="Username"
          type="text"
          v-model="user.username"
          :counter="10"
          @keyup.enter.native="login"
        ></b-input>
      </b-field>
      <b-field label="Jelszó">
        <b-input
          type="password"
          value="password"
          v-model="user.password"
          @keyup.enter.native="login"
          password-reveal
        ></b-input>
      </b-field>
      <b-button @click="login">Login</b-button>
    </div>
  </section>
</template>
<script>
import {APIService} from '../APIService';
const apiService = new APIService();

export default {
  name: "Login",
  components: {},
  data() {
    return {
      user: {
        username: "test",
        password: "aaa123"
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      password: "Password"
    };
  },
  methods: {
    login: function() {
      var _this = this;
      apiService.login(this.user).then((result)=>{
        localStorage.setItem('token',result.data.token)
        this.$router.push('/')
      },(error)=>{
          this.showError = true;
      });
    }
  },
  mounted() {}
};
</script>
