<template>
  <v-card class="mx-auto top" max-width="600" elevation="0">
    <v-container fluid>
      <v-card-title class="justify-center font-weight-light title-office" v-text="posts.title"></v-card-title>
      <v-row dense>
        <v-col class="mt-3">
          <v-card elevation="0">
            <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
                <v-card-title class="float-end white--text">S/. {{posts.monthlyPrice}}</v-card-title>
              </v-carousel-item>
            </v-carousel>
            <v-card-subtitle v-if="posts.postState === 1">Post Activo</v-card-subtitle>
            <v-card-subtitle v-else-if="posts.postState === 2">Post Finalizado</v-card-subtitle>
            <v-card-subtitle v-else-if="posts.postState === 3">Post Cancelado</v-card-subtitle>
            <v-card-title>Inicio: {{formatDate(posts.startDate.split("T")[0])}}</v-card-title>
            <v-card-title>Acaba: {{formatDate(posts.endDate.split("T")[0])}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="$router.push(`/offices/${posts.officeId}`)" >
                Ver Oficina
              </v-btn>
              <v-btn text @click="$router.push(`/posts/${posts.id}/booking-intents`)" v-if="posts.userId === 1">
                Ver Reservas
              </v-btn>
              <v-btn text @click="deletePost(posts.id)" v-if="posts.userId === 1">
                Eliminar
              </v-btn>
              <v-btn text @click="$router.push(`/posts/${posts.officeId}/booking`)" v-else>
                Reservar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>

import Post from "@/models/post";
import UserService from "@/services/user-service";

export default {
  name: "view-post",
  props: {
    post: Object[Post],
  },
  data(){
    return {
      posts: {},
      id: this.$route.params.id,
      items: [
        {
          src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstudio3peru.com%2Fwp-content%2Fuploads%2F2016%2F12%2FOFICINA-EJECUTIVA-ESCRITORIO-Y-MESA-DE-REUNION.jpg&f=1&nofb=1',
        },
        {
          src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Festilooficina.com%2Fwp-content%2Fuploads%2F2020%2F02%2Fmuebles-para-oficinas_img1381n2t2.jpg&f=1&nofb=1',
        },
        {
          src: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.cleanlab.com.mx%2Fwp-content%2Fuploads%2F2019%2F01%2Foficina-privada-08.jpg&f=1&nofb=1',
        },
        {
          src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2Fd97be0_c681798867744e8087c0e9f746fd757e~mv2.jpg%2Fv1%2Ffill%2Fw_600%2Ch_363%2Cal_c%2Cq_90%2Fd97be0_c681798867744e8087c0e9f746fd757e~mv2.jpg&f=1&nofb=1',
        },
      ],
    }
  },
  methods:{
    retrievePost() {
      UserService.getPostById(this.id).then(
        response => {
          this.posts = response.data;
        })
    },
    deletePost(id){
      UserService.deletePostById(id)
        .then(() => {
          this.navigateToPosts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    postBooking(){
      UserService.postBooking()
          .then(() => {
            this.navigateToPosts();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    navigateToPosts(){
      this.$router.push({name: 'view-posts'});
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
},
  mounted() {
    this.retrievePost();
},
}
</script>

<style scoped>
.top {
  margin-top: 4em;
  border-radius: 20px;
}
</style>
