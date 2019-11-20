<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    :src="logo"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <router-link v-if="loggedIn"  to="/logout" class="button is-primary">
                        <strong>Logout</strong>
                    </router-link>
                    <router-link  to="/login" v-else class="button is-light">
                        Log in
                    </router-link>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import { EventBus } from '../event-bus.js';
import logo from ".././assets/money_logo.png"
export default {
  name: 'Header',
  components: {
  },
  data: function(){
    return {
        loggedIn: localStorage.getItem('token')==null?false:true,
        logo: logo
    }
  },
  mounted(){
        EventBus.$on('login', function(val){
         this.loggedIn = localStorage.getItem('token')==null?false:true;
        }.bind(this))
  }
}
</script>

