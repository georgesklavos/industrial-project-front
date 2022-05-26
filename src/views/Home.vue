<template>
  <!-- <Menubar>
    <template #end>
      <Button label="Login" class="p-button-text" />
      <Button label="Register" class="p-button-text" />
    </template>
  </Menubar> -->


  <NavBar></NavBar>

  <!-- <div class="flex justify-content-center" style="height: 60vh;">

    <Galleria :value="images" :numVisible="5" containerStyle="max-width: 40vw;" :circular="true" :showThumbnails="false"
      :showIndicators="true" :autoPlay="true">
      <template #item="slotProps">
        <img :src="slotProps.item.src" :alt="slotProps.item.alt" style="max-width: 40vw; display: block;" />
      </template>
    </Galleria>
  </div> -->
  <div class="flex align-items-center justify-content-center">
    <span class="text-5xl underline font-bold">Our alumnis</span>
  </div>

  <TabView class="mt-5">
    <TabPanel v-for="(school, index) in schools" :key="index" :header="school">
      <UsersView :users="alumniUsers(school)" :loading="loading"></UsersView>
    </TabPanel>

  <TabPanel  header="All">
      <UsersView :users="alumni" :loading="loading"></UsersView>
    </TabPanel>

  </TabView>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "../components/NavBar.vue";
import UsersView from "../components/UsersView.vue";
export default {
  name: 'Home',
  components: {
    NavBar,
    UsersView
  },
  data() {
    return {
      loading: false,
      images: [
        {
          src: "/thumbnail1.jpg",
          alt: "",
        },
        {
          src: "/thumbnail2.jpg",
          alt: "",
        },
        {
          src: "/thumbnail3.jpg",
          alt: "",
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['alumni', 'schools']),
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("alumni");
    this.loading = false;
  },
  methods: {
    alumniUsers(school) {
      return this.alumni.filter((el) => el.school == school)
    }
  }

}
</script>

