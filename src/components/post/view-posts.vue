<template>
  <v-card class="mx-auto top" max-width="900" elevation="0">
    <v-container fluid>
      <v-card-title class="justify-center font-weight-light title">Posts</v-card-title>
      <v-card-subtitle v-if="posts.length === 0" class="text-center mt-5">Por el momento no cuentas con posts activos.</v-card-subtitle>
      <v-row dense>
        <v-col class="mt-3 grid" v-for="post in posts" :key="post.title" :cols="6">
          <v-card v-if="post.userId === currentUser.id">
            <v-img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.psicologiadelcolor.es%2Fwp-content%2Fuploads%2F2017%2F10%2FEl-color-ideal-para-el-mobiliario-de-oficina-Psicolog%25C3%25ADa-del-color-y-teor%25C3%25ADa-del-color.jpg&f=1&nofb=1"
                   class="white--text align-end" height="200px">
              <v-card-title v-text="post.title"></v-card-title>
              <v-card-subtitle class="white--text">S/. {{post.monthlyPrice}}</v-card-subtitle>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn id="view-post" text @click="$router.push(`/posts/${post.id}`)" >
                Ver más
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="mt-3 grid2" v-for="post in posts" :key="post.title" :cols="12">
          <v-card v-if="post.userId === currentUser.id">
            <v-img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.psicologiadelcolor.es%2Fwp-content%2Fuploads%2F2017%2F10%2FEl-color-ideal-para-el-mobiliario-de-oficina-Psicolog%25C3%25ADa-del-color-y-teor%25C3%25ADa-del-color.jpg&f=1&nofb=1"
                   class="white--text align-end" height="200px">
              <v-card-title v-text="post.title"></v-card-title>
              <v-card-subtitle class="white--text">S/. {{post.monthlyPrice}}</v-card-subtitle>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="$router.push(`/posts/${post.id}`)" >
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
import UserService from "@/services/user-service";

export default {
  name: "view-posts",
  data(){
    return {
      posts: {},
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    retrievePosts() {
      UserService.getAllPostsByPostState(1).then(
          response => {
            this.posts = response.data;
          })
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.retrievePosts();
  }
}
</script>

<style scoped>
.top{
  margin-top: 4em;
}
.title{
  font-size: 27px;
  margin-bottom: 0.25em;
}
.grid{
  display: block;
}
.grid2 {
  display: none;
}
@media screen and (max-width: 580px) {
  .top{
    margin-top: 0;
  }
  .grid{
    display: none;
  }
  .grid2 {
    display: block;
  }
}
</style>
