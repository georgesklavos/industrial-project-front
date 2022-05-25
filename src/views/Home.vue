<template>
  <!-- <Menubar>
    <template #end>
      <Button label="Login" class="p-button-text" />
      <Button label="Register" class="p-button-text" />
    </template>
  </Menubar> -->


  <NavBar></NavBar>

  <!-- <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="7" :circular="true"
    style="max-width: 800px">
    <template #item="slotProps">
      <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
    </template>
    <template #thumbnail="slotProps">
      <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;" />
    </template>
  </Galleria> -->
  <div class="flex align-items-center justify-content-center">
    <span class="text-5xl underline font-bold">Our alumnis</span>
  </div>
  <div class="grid">
    <template v-if="loading">

      <div class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2" v-for="index in 12" :key="index">
        <Skeleton style="height: 20rem;" class="px-3"></Skeleton>
      </div>
    </template>
    <template v-else class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2 cursor-pointer" v-for="(user, index) in alumni"
      :key="index" @click="viewProfile(user)">
      <div class="p-card" style="height: 20rem;">
        <div class="img-wrapper">
          <img class="h-full w-full blur" :src="`data:image/png;base64,${user.img}`">
          <div class="content slide-left">{{ user.first_name }} {{ user.last_name }}</div>
        </div>
      </div>
      <!-- <Card style="height: 20rem;"> -->
      <!-- <template #content> -->
      <!-- </template> -->
      <!-- </Card> -->
    </template>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "../components/NavBar.vue";
export default {
  name: 'Home',
  components: {
    NavBar
  },
  data() {
    return {
      menuItems: [
        {
          label: 'Profile',
          to: 'profile'
        },
        {
          label: 'Logout',
          command: () => {
            console.log('logout');
          }
        }
      ],
      loading: false
    }
  },
  computed: {
    ...mapGetters(['alumni'])
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("alumni");
    this.loading = false;
  },
  methods: {
    viewProfile(user) {
      this.$store.commit('profile', user);
      this.$router.push({ name: 'profile' });
    }
  }

}
</script>

<style lang="scss" scoped>
::v-deep(.p-card) {

  .p-card-body,
  .p-card-content {
    padding: 0;
    height: 100%;
  }
}

.img-wrapper {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.img-wrapper>img {
  display: block;
  width: 90%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  object-position: center;
}

.img-wrapper>.content {
  position: absolute;
  inset: 0;
  font-size: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, .4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-wrapper>img,
.img-wrapper>.content {
  transition: 200ms ease-in-out;
}

.img-wrapper:hover>img.blur {
  filter: blur(5px);
}

.img-wrapper:hover>img.blur {
  filter: blur(5px);
}

.img-wrapper>.content.slide-left {
  transform: translateX(-100%);
}

.img-wrapper:hover>.content.slide-left {
  transform: translateX(0);
}
</style>