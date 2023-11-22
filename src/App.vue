<template>
  <Header/>
  <RouterView/>
  <Footer/>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import store from "./scripts/store";
import axios from "axios";
import { useRoute } from "vue-router";
import { watch } from "vue";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },

  setup() {
    const hostName = window.location.hostname;
    const hostNameServerUrl = 'http://' + hostName + ':8080';

    const check = () =>{
      axios.get(hostNameServerUrl + '/api/user/check')
        .then(({data})=>{

          if(data){
            store.commit("setAccount", data || 0);
          }
        });
    };

    const route = useRoute();

    watch(route, ()=>{
      check();
    });

    return {hostName, hostNameServerUrl}
  }
}
</script>


<style>

</style>
