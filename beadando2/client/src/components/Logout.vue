<template>
  <div class="logout">
    <div class="">
      <h3>logout</h3>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js';

export default {
  name: 'Logout',
  methods: {
    logout: function(){

      localStorage.removeItem('token')
        localStorage.clear();
               EventBus.$emit('login', false)
      this.$router.push('/')
    }
  },
  mounted() {
   this.checkLoggedIn()
    this.logout();

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
