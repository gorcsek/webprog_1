<template>
    <div id="container" class="container">
        <div class="row">
            <div class="column is-half is-offset-one-quarter">
                <div class="has-text-centered">
                    <h1 class="title is-5">Create a Money</h1>
                </div>

                <div class="text-left">
                    <b-field label="Username"
                        type="is-success">
                        <b-input v-model="money.user" maxlength="50"></b-input>
                    </b-field>
                    <b-field label="Amount"
                        type="number">
                        <b-input v-model="money.amount" maxlength="50"></b-input>
                    </b-field>
                    <b-field label="Message">
                        <b-input v-model="money.description" maxlength="200" type="textarea"></b-input>
                    </b-field>
                </div>
                    
                <div class="row">
                    <div class="column is-inline-block is-half has-text-left">
                        <b-button @click="newMoney()" type="is-info">Clear form</b-button>
                    </div>
                    <div class="column is-inline-block is-half has-text-right">
                        <b-button v-if="!this.money._id"  @click="createMoney()" type="is-success">Create</b-button>
                        <b-button v-if="this.money._id" @click="updateMoney()" type="is-success">Update</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {APIService} from '../APIService';

const apiService = new APIService();

export default {
    name: 'CreateMoney',
    components: {
    },
    props: ['money'],
    data() {
        return {
            showError: false,
        };
    },
    methods: {
        createMoney(){
            var _this = this;
            apiService.createMoney(this.money).then((result)=>{
                console.log(result);
                _this.$emit('event');
                if(result.status === 201){
                    this.money = result.data;
                }
            },(error)=>{
                _this.$emit('event');
                this.showError = true;
            });
        },
        updateMoney(){
            var _this = this;
            apiService.updateMoney(this.money).then((result)=>{
                _this.$emit('event');
                console.log(result);
            },(error)=>{
                _this.$emit('event');
                this.showError = true;
            });
        },
        newMoney(){
            this.$emit("event");
            this.money = {};
        }
    },

    mounted() {
        if(this.$route.params.pk){
            apiService.getMoney(this.$route.params.pk).then((money)=>{
                this.money = money;
            })
        }
    },
}

</script>
<style scoped>
</style>
