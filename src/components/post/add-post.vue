<template>
  <v-card class="mx-auto top" max-width="700" elevation="0">
    <v-container fluid>
      <v-card-title class="justify-center font-weight-light title">Crear Post</v-card-title>
      <v-row dense>
        <v-col class="mt-3 grid">
          <v-card elevation="0">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                            :return-value.sync="item.startDate" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="item.startDate" label="Inicio del Post" prepend-icon="mdi-calendar"
                                      readonly v-bind="attrs" v-on="on">
                        </v-text-field>
                      </template>
                      <v-date-picker v-model="item.startDate" no-title scrollable locale="es-ES">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false"> Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(item.startDate)"> OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                            :return-value.sync="item.endDate" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="item.endDate" label="Fin del Post" prepend-icon="mdi-calendar"
                                      readonly v-bind="attrs" v-on="on">
                        </v-text-field>
                      </template>
                      <v-date-picker v-model="item.endDate" no-title scrollable locale="es-ES">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false"> Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu2.save(item.endDate)"> OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="item.title" label="Titulo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="item.monthlyPrice" prefix="S/." label="Precio Mensual"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click=navigateToOffices>
                Cancelar
              </v-btn>
              <v-btn text id="create-post" @click="createPost" >
                Crear
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

export default {
  name: "add-post",
  data() {
    return {
      id: this.$route.params.id,
      item: {
        id: 0,
        officeId: this.$route.params.id,
        userId: 1,//this.$store.state.auth.user.id //por el momento 1
        startDate: '',
        endDate: '',
        title: '',
        monthlyPrice: 0,
      },
    }
  },
  methods: {
    createPost() {
      UserService.createPosts(this.item)
          .then(() => {
            this.navigateToPosts();
          })
          .catch(e => {
            console.log(e);
          })
    },
    navigateToPosts(){
      this.$router.push({name: 'view-posts'});
    },
    navigateToOffices(){
      this.$router.push({name: 'view-offices'});
    },
  },
  mounted() {

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
