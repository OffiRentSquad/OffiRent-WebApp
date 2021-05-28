<template>
  <v-container>
    <v-row>
      <v-col class="col-lg-12 text-center">
        <h3 class="mt-5"><strong>Esta página no está disponible</strong></h3>
        <p class="lead">Es posible que el enlace esté roto o que se haya eliminado la página. <br/>Verifica que el enlace que quieres abrir es<br> correcto.</p>
        <router-link to="/" style="text-decoration: none;">
          <a class="text-center">Ir a la sección de inicio</a>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "page-not-found",
  data(){
    return {

    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
