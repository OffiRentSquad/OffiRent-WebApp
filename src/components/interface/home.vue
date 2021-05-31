<template>
  <v-card class="mx-auto" elevation="0">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card elevation="0" >
            <v-card-title v-if="allPosts.length === 0" class="justify-center">No existen posts por el momento</v-card-title>
            <v-card-title class="font-weight-light mb-4" v-else>Busque la oficina de su preferencia</v-card-title>
            <v-row class="ml-2" v-model="isValid">
              <v-col cols="12" sm="3">
                <v-text-field v-model="item.minPrice" value="number" prefix="S/." :rules="rules" clearable type="number" label="Precio Mínimo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field v-model="item.maxPrice" prefix="S/." :rules="rules" clearable type="number" label="Precio Máximo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="item.districtId" prepend-icon="mdi-map-marker" :items="districts" :rules="rules"
                                item-value="id" item-text="title" label="Distrito"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-card-actions>
                <v-btn :disabled="!isValid" color="#226bdd" class="mx-auto mb-2 white--text"
                       style="border-radius: 10px"
                       @click="getPostsByFilters(item.minPrice, item.maxPrice, item.districtId)">Buscar</v-btn>
              </v-card-actions>
              </v-col>
            </v-row>
          </v-card>

          <v-card elevation="0" v-if="posts.length > 0">
            <v-card-title class="font-weight-light">Resultados</v-card-title>
            <v-row dense>
              <v-col class="mt-3" v-for="post in posts" :key="post.title" :cols="4">
                <v-card>
                  <v-img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.psicologiadelcolor.es%2Fwp-content%2Fuploads%2F2017%2F10%2FEl-color-ideal-para-el-mobiliario-de-oficina-Psicolog%25C3%25ADa-del-color-y-teor%25C3%25ADa-del-color.jpg&f=1&nofb=1" class="white--text align-end" height="200px">
                    <v-card-title v-text="post.title"></v-card-title>
                    <v-card-subtitle class="white--text">S/. {{post.monthlyPrice}}</v-card-subtitle>
                  </v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text id="view-post" @click="$router.push(`/posts/${post.id}`)" >
                      Ver más
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>

          <v-card v-else>
            <v-card-subtitle class="font-weight-light">No existen posts con esas características</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-card-title class="justify-center">Oficinas</v-card-title>
      <v-row dense>
        <v-col class="mt-3">
          <v-card class="mx-auto" elevation="0" max-width="800">
            <v-card-title v-if="offices.length === 0" class="justify-center">No existen oficinas por el momento</v-card-title>
            <v-carousel v-else cycle height="300" hide-delimiters show-arrows-on-hover>
              <v-carousel-item v-for="office in offices" :key="office.id" :src="image">
                <v-card-actions>
                  <v-card-title v-text="office.name"></v-card-title>
                  <v-btn @click="$router.push(`/offices/${office.id}`)" >Ver</v-btn>
                </v-card-actions>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import User from "@/models/user";
import UserService from "@/services/user-service";

export default {
  name: "home",
  data() {
    return{
      user: User,
      offices: {},
      posts: {},
      allPosts: {},
      item: {
        minPrice: 0,
        maxPrice: 0,
        districtId: '',
      },
      rules: [
        v => !!v || 'Este campo es requerido',
        v => (v > 0 ) || 'No puede ser negativo',
      ],
      districts: [
        { title: 'Ancón', id: 1 },
        { title: 'Ate', id: 2 },
        { title: 'Barranco', id: 3 },
        { title: 'Breña', id: 4 },
        { title: 'Carabayllo', id: 5 },
        { title: 'Chaclacayo', id: 6 },
        { title: 'Chorrillos', id: 7 },
        { title: 'Cieneguilla', id: 8 },
        { title: 'Comas', id: 9 },
        { title: 'El Agustino', id: 10 },
        { title: 'Independencia', id: 11 },
        { title: 'Jesus Maria', id: 12 },
        { title: 'La Molina', id: 13 },
        { title: 'La Victoria', id: 14 },
        { title: 'Lima', id: 15 },
        { title: 'Lince', id: 16 },
        { title: 'Los Olivos', id: 17 },
        { title: 'Lurigancho', id: 18 },
        { title: 'Lurin', id: 19 },
        { title: 'Magdalena del Mar', id: 20 },
        { title: 'Miraflores', id: 21 },
        { title: 'Pachacamac', id: 22 },
        { title: 'Pucusana', id: 23 },
        { title: 'Pueblo Libre', id: 24 },
        { title: 'Puente Piedra', id: 25 },
        { title: 'Punta Hermosa', id: 26 },
        { title: 'Punta Negra', id: 27 },
        { title: 'Rímac', id: 28 },
        { title: 'San Bartolo', id: 29 },
        { title: 'San Borja', id: 30 },
        { title: 'San Isidro', id: 31 },
        { title: 'San Juan de Lurigancho', id: 32 },
        { title: 'San Juan de Miraflores', id: 33 },
        { title: 'San Luis', id: 34 },
        { title: 'San Martín de Porres', id: 35 },
        { title: 'Santa María del Mar', id: 36 },
        { title: 'Santa Rosa', id: 37 },
        { title: 'Santiago de Surco', id: 38 },
        { title: 'Surquillo', id: 39 },
        { tittle: 'Villa El Salvador', id: 40 },
        { title: 'Villa Maria del Triunfo', id: 41 },
      ],
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstudio3peru.com%2Fwp-content%2Fuploads%2F2016%2F12%2FOFICINA-EJECUTIVA-ESCRITORIO-Y-MESA-DE-REUNION.jpg&f=1&nofb=1',
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getContent() {
      UserService.getUserById(this.currentUser.id).then(
          response => {
            this.user = response.data;
          }).catch( e => {
        console.log((e));
      })
    },
    retrieveOffices() {
      UserService.getAllOffices().then(
          response => {
            this.offices = response.data;
          })
    },
    retrievePosts() {
      UserService.getAllPostsByUserId(this.currentUser.id).then(
          response => {
            this.allPosts = response.data;
          })
    },
    getPostsByFilters(minPrice, maxPrice, districtId){
      UserService.getAllPostsByFilters(minPrice, maxPrice, districtId, true).then(
          response => {
            this.posts = response.data;
          })
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.getContent();
    this.retrieveOffices();
    this.getPostsByFilters();
    this.retrievePosts();
  }
}
</script>

<style scoped>

</style>
