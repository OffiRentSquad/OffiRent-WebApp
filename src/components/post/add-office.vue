<template>
  <v-card class="mx-auto top" max-width="700" elevation="0" v-if="user.isPremium === true">
    <v-container fluid>
      <v-card-title class="justify-center font-weight-light title">Crear Oficina</v-card-title>
      <v-row dense>
        <v-col class="mt-3 grid">
          <v-card elevation="0">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="item.name" label="Título"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                      <v-autocomplete v-model="item.districtId" :items="districts"
                                      item-value="id" item-text="title" label="Distrito"></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field v-model="item.description" label="Descripción"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click=navigateToOffices>Cancelar</v-btn>
              <v-btn text @click="createOffice" >Crear</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-card class="mx-auto top" max-width="700" elevation="0"
          v-else-if="user.isPremium === false && offices.length < 1">
    <v-container fluid>
      <v-card-title class="justify-center font-weight-light title">Crear Oficina</v-card-title>
      <v-row dense>
        <v-col class="mt-3 grid">
          <v-card elevation="0">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="item.name" label="Título"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete v-model="item.districtId" :items="districts"
                                    item-value="id" item-text="title" label="Distrito"></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field v-model="item.description" label="Descripción"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click=navigateToOffices>Cancelar</v-btn>
              <v-btn text @click="createOffice" >Crear</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-card class="mx-auto top" max-width="700" elevation="0"
          v-else-if="user.isPremium === false && offices.length >= 1">
    <v-card-title class="justify-center">
      <template>
        <v-tooltip v-model="show" left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon color="grey lighten-1">
                mdi-help-circle-outline
              </v-icon>
            </v-btn>
          </template>
          <span>Debes mejorar tu cuenta para poder publicar más de 1 oficina</span>
        </v-tooltip>
      </template>No eres premium</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push(`/profile/premium`)" >
        Mejora tu cuenta
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import UserService from "@/services/user-service";
import User from "@/models/user";
import Office from "@/models/office";

export default {
  name: "add-office",
  props: {
    office: Object[Office],
  },
  data(){
    return {
      user: User,
      show: false,
      offices: {},
      item: {
        id: 0,
        userId: 1,//this.$store.state.auth.user.id //por el momento 1
        districtId: '',
        latitude: 0,
        longitude: 0,
        name: '',
        description: '',
      },
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
        { title: 'Villa El Salvador', id: 40 },
        { title: 'Villa Maria del Triunfo', id: 41 },
      ],
    }
  },
  methods: {
    createOffice() {
      UserService.createOffice(this.item)
          .then(() => {
            this.navigateToOffices();
          })
          .catch(e => {
            console.log(e);
          })
    },
    getProfile() {
      UserService.getUserById(1).then(
          response => {
            this.user = response.data;
          }).catch( e => {
        console.log((e));
      })
    },
    retrieveOffices() {
      UserService.getAllOfficesByUserId(1).then(
          response => {
            this.offices = response.data;
          })
    },
    navigateToOffices(){
      this.$router.push({name: 'view-offices'});
    },
  },
  mounted() {
    this.getProfile();
    this.retrieveOffices();
  }
}
</script>

<style scoped>
.top{
  margin-top: 4em;
}
.title{
  font-size: 27px;
}
@media screen and (max-width: 690px) {
  .top{
    margin-top: 0;
  }
}
</style>
