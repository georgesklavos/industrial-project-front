<template>

  <div class="flex justify-content-between py-2 px-3 mb-5" style="background-color: #EFEFEF;">
    <Button label="Home" class="p-button-text py-0" @click="$router.push({ name: 'home' })" />
    <template v-if="Object.keys(loggedIn).length > 0">
      <div class="flex">
        <Button label="Users" v-if="loggedIn.role == 1" class="p-button-text"
          @click="$router.push({ name: 'users' })" />
        <Button class="p-button-text py-0" aria-haspopup="true" aria-controls="menu" @click="toggleMenu">
          <Avatar :label="loggedIn.first_name[0] + loggedIn.last_name[0]" class="mr-2" size="large" />
        </Button>
        <Menu id="menu" ref="menu" :model="loggedIn.role == 1 ? menuItemsAdmin : menuItems" :popup="true" />
      </div>
    </template>
    <template v-else>
      <div>
        <Button label="Login" class="p-button-text" @click="$router.push({ name: 'login' })" />
        <Button label="Register" class="p-button-text" @click="$router.push({ name: 'register' })" />
      </div>
    </template>
  </div>

</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: "navBar",
  data() {
    return {
      menuItems: [
        {
          label: 'Profile',
          command: () => {
            this.$store.commit("profile", { ...this.loggedIn });
            this.$router.push({ name: 'profile' });
          }
        },
        {
          label: 'Logout',
          command: () => {
            this.$store.commit("loggedIn", {});
            this.$router.push({ name: 'login' });
          }
        }
      ],
      menuItemsAdmin: [
         {
          label: 'Logout',
          command: () => {
            this.$store.commit("loggedIn", {});
            this.$router.push({ name: 'login' });
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['loggedIn'])
  },
  methods: {
    toggleMenu(event) {
      console.log(this.$refs);
      this.$refs.menu.toggle(event);
    }
  }
}
</script>