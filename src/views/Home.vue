<template>
  <!-- <Menubar>
    <template #end>
      <Button label="Login" class="p-button-text" />
      <Button label="Register" class="p-button-text" />
    </template>
  </Menubar> -->

  <div class="flex justify-content-end py-2 px-3" style="background-color: #EFEFEF;">
    <Button label="Login" class="p-button-text" @click="$router.push({ name: 'login' })" />
    <Button label="Register" class="p-button-text" @click="$router.push({ name: 'register' })" />
    <Button class="p-button-text" aria-haspopup="true" aria-controls="menu" @click="toggleMenu">
      <Avatar label="P" class="mr-2" size="large" />
    </Button>
    <Menu id="menu" ref="menu" :model="menuItems" :popup="true" />
  </div>

  <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="7" :circular="true"
    style="max-width: 800px">
    <template #item="slotProps">
      <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
    </template>
    <template #thumbnail="slotProps">
      <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;" />
    </template>
  </Galleria>

  <div class="grid">
    <div class="col-12 md:col-4 lg:col-3 xl:col-2" v-for="item in users" :key="item">
      <Card style="height: 20rem;">
        <template #content>
          {{ item }}
        </template>
      </Card>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      users: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      ],
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
      ]
    }
  },
  methods: {
    toggleMenu(event) {
      console.log(this.$refs);
      this.$refs.menu.toggle(event);
    }
  }
}
</script>
