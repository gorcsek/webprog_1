<template>
  <div class="logout">
    <div class="">
      <h3>{{$t('logut')}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    logout: function(){
      var _this = this;
      console.log("+XXX")
      this.$http.post("/users/logout",this.user).then((response) => {
        localStorage.clear();
        _this.$store.commit('setUser', {});
        _this.$store.commit('setLoggedIn', false);
        _this.$router.push({ name: 'Products' });
        this.$toast.open('Sikeresen kijelentkezett');
      })
    }
  },
  mounted() {
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
