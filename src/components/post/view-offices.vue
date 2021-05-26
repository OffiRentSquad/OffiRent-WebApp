<template>
  <v-card class="mx-auto top" max-width="1000" elevation="0">
    <v-container fluid>
      <v-card-title class="justify-center font-weight-light title">Oficinas</v-card-title>
      <v-row dense>
        <v-col class="mt-3 grid" v-for="office in offices" :key="office.name" :cols="6">
          <v-card> <!--v-card v-if="office.userId === 1" para solo llamar a los offices de este user-->
            <v-img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstudio3peru.com%2Fwp-content%2Fuploads%2F2016%2F12%2FOFICINA-EJECUTIVA-ESCRITORIO-Y-MESA-DE-REUNION.jpg&f=1&nofb=1" class="white--text align-end" height="200px">
              <v-card-title v-text="office.name"></v-card-title>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text v-if="office.userId === 1" @click="$router.push(`/offices/${office.id}/post`)" >
                Crear post
              </v-btn>
              <v-btn text @click="$router.push(`/offices/${office.id}`)" >
                Ver más
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="mt-3 grid2" v-for="office in offices" :key="office.name" :cols="12">
          <v-card>
            <v-img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstudio3peru.com%2Fwp-content%2Fuploads%2F2016%2F12%2FOFICINA-EJECUTIVA-ESCRITORIO-Y-MESA-DE-REUNION.jpg&f=1&nofb=1" class="white--text align-end" height="200px">
              <v-card-title v-text="office.name"></v-card-title>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="$router.push(`/offices/${office.id}`)" >
                Ver más
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Office from "@/models/office";
import UserService from "@/services/user-service";

export default {
  name: "view-office",
  props: {
    office: Object[Office],
  },
  data(){
    return {
      offices: {},
    }
  },
  methods: {
    retrieveOffices() {
      UserService.getAllOffices(4).then(
          response => {
            this.offices = response.data;
          })
    },
  },
  mounted() {
    this.retrieveOffices();
  }
}
</script>

<style scoped>
.top{
  margin-top: 4em;
  border-radius: 20px;
}
.grid{
  display: block;
}
.grid2 {
  display: none;
}
@media screen and (max-width: 690px) {
  .top{
    margin-top: 0;
  }
}
@media screen and (max-width: 580px) {
  .grid{
    display: none;
  }
  .grid2 {
    display: block;
  }
}
.title{
  font-size: 27px;
  margin-bottom: 0.25em;
}
</style>
