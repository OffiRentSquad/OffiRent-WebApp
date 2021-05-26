<template>
  <div>
    <v-card class="mx-auto top" max-width="600">
      <v-card-title class="justify-center">Editar Oficina </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-divider class="mb-4"></v-divider>
        <v-form v-model="isValid">
          <v-text-field label="Nombre" v-model="office.resource.name" :rules="rules" clearable required></v-text-field>
          <v-text-field label="Descripcion" v-model="office.resource.description" :rules="rules" clearable required></v-text-field>
          <p v-for="district in districts" v-bind:key="district.title">
            <v-text-field label="Distrito" v-if="office.resource.districtId === district.id"
                          v-model="district.title" disabled></v-text-field>
          </p>
        </v-form>
      </v-container>
      <v-card-actions>
        <v-btn color="#393e4e" class="ma-auto" width="100%" style="border-radius: 10px" dark @click="backClick">Cancelar</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn :disabled="!isValid" color="#226bdd" class="ma-auto mb-2 white--text" width="100%" style="border-radius: 10px" @click="save">Guardar Cambios</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>

import Office from "@/models/office";
import UserService from "@/services/user-service";

export default {
  name: "edit-office",
  data(){
    return {
      office: Office,
      id: this.$route.params.id,
      isValid: true,
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
      rules: [
        v => !!v || 'Este campo es requerido',
      ],
    }
  },
  methods: {
    backClick() {
      this.navigateToOffices();
    },
    navigateToOffices(){
      this.$router.push(`/offices/${this.id}`)
    },
    save() {
      UserService.updateOffice(this.office.resource)
          .then(() => {
            this.navigateToOffices();
          })
          .catch(e => {
            console.log(e);
          })
    },
  },
  mounted() {
    UserService.getOfficeById(this.id)
        .then((response) => {
          this.office = response.data
        })
        .catch(e => {
          console.log((e));
        })
  }
}
</script>

<style scoped>
.top {
  margin-top: 4em;
  border-radius: 20px;
}
</style>
