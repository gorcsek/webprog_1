<template>
  <section>
    <div class="column is-half is-offset-one-quarter">
      <h1 class="title has-text-centered">List money</h1>
    </div>
    <div class="column is-half is-offset-one-quarter">
        <div class="has-text-right">
          <button class="button field is-danger" @click="selected = null"
              :disabled="!selected">
              <b-icon icon="close"></b-icon>
              <span>Clear selected</span>
          </button>
        </div>

        <b-tabs>
            <b-tab-item label="Table">
                <b-table
                    :data="money"
                    :columns="columns"
                    :selected.sync="selected"
                    focusable>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Modify">
              <CreateMoney  @event="getMoneyList" v-bind:money="selected" />
            </b-tab-item>
        </b-tabs>
      </div>
  </section>
</template>
<script>
import {APIService} from '../APIService';
import CreateMoney from '@/components/CreateMoney';
const apiService = new APIService();
export default {
  name: 'ListMoney',
  components: {
    CreateMoney
  },
  data() {
    return {
      money: [],
      numberOfTodos:0,
      selected: {},
      columns: [
        {
            field: '_id',
            label: 'ID',
            width: '40',
            numeric: true
        },
        {
            field: 'amount',
            label: 'Amount',
            numeric: true,
        },
        {
            field: 'description',
            label: 'Description',
        },
        {
            field: 'user',
            label: 'Username',
        },
        {
            field: 'createdAt',
            label: 'Created',
        },
      ]
    };
  },
  methods: {
    getMoneyList(){
      apiService.getMoneyList().then((data) => {
        this.money = data;
        this.numberOfProducts = data.count;
      });
    },
    deleteTodo(item){
      apiService.deleteTodo(item).then((r)=>{
        if(r.status === 204)
        {
          alert("Money deleted");
          this.$router.go()
        }
      })
    },
  },
  mounted() {
    this.getMoneyList();
  },
}
</script>
<style scoped>
.list-horizontal li {
  display:inline-block;
}
.list-horizontal li:before {
  content: '\00a0\2022\00a0\00a0';
  color:#999;
  color:rgba(0,0,0,0.5);
  font-size:11px;
}

.list-horizontal li:first-child:before {
  content: '';
}
</style>
