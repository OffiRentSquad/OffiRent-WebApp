<template>
  <v-card class="mx-auto top" max-width="700" elevation="0">
    <v-container fluid>
      <v-card-title class="justify-center font-weight-light title">{{offices.resource.name}}</v-card-title>
      <v-row dense>
        <v-col class="mt-3 grid">
          <v-card>
            <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
              </v-carousel-item>
            </v-carousel>
            <v-card-title v-text="offices.resource.description"></v-card-title>
            <v-card-subtitle class="mt-2" v-if="offices.resource.busy === false">Disponible</v-card-subtitle>
            <v-card-subtitle class="mt-2" v-else>Ocupada</v-card-subtitle>
            <p v-for="district in districts" v-bind:key="district.title">
            <v-card-text v-if="offices.resource.districtId === district.id">
              <v-icon>mdi-map-marker</v-icon>{{district.title}}
            </v-card-text>
            </p>
            <v-card-actions v-if="offices.resource.userId === currentUser.id && offices.resource.busy === false">
              <v-btn id="edit-office" text @click="$router.push(`/offices/${id}/edit`)" >
                Editar
              </v-btn>
              <v-btn text @click="deleteOffice(offices.resource.id)" >
                Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import UserService from "@/services/user-service";
import Office from "@/models/office";

export default {
  name: "view-office",
  props: {
    office: Object[Office],
  },
  data() {
    return {
      id: this.$route.params.id,
      offices: {},
      items: [
        {
          src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstudio3peru.com%2Fwp-content%2Fuploads%2F2016%2F12%2FOFICINA-EJECUTIVA-ESCRITORIO-Y-MESA-DE-REUNION.jpg&f=1&nofb=1',
        },
        {
          src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftuapartamentohoy.com%2Fwp-content%2Fuploads%2F2019%2F02%2F23184.jpg&f=1&nofb=1',
        },
        {
          src: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.cleanlab.com.mx%2Fwp-content%2Fuploads%2F2019%2F01%2Foficina-privada-08.jpg&f=1&nofb=1',
        },
        {
          src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2Fd97be0_c681798867744e8087c0e9f746fd757e~mv2.jpg%2Fv1%2Ffill%2Fw_600%2Ch_363%2Cal_c%2Cq_90%2Fd97be0_c681798867744e8087c0e9f746fd757e~mv2.jpg&f=1&nofb=1',
        },
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
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    retrieveOffices() {
      UserService.getOfficeById(this.id).then(
          response => {
            this.offices = response.data;
          })
    },
    deleteOffice(id){
      UserService.deleteOfficeById(id)
          .then(() => {
            this.navigateToOffices();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    navigateToOffices(){
      this.$router.push({name: 'view-offices'});
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.retrieveOffices();
  },
}
</script>

<style scoped>
.top{
  margin-top: 4em;
}
@media screen and (max-width: 690px) {
  .top{
    margin-top: 0;
  }
}
.title{
  font-size: 27px;
  margin-bottom: 0.25em;
}
</style>
