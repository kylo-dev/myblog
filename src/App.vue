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
    const check = () =>{
      axios.get("/api/user/check")
        .then(({data})=>{
          console.log(data);

          if(data){
            store.commit("setAccount", data || 0);
          }
        });
    };

    const route = useRoute();

    watch(route, ()=>{
      check();
    });

  }
}
</script>


<style>

</style>
