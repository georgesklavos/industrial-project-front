<template>

    <div class="grid">
        <template v-if="loading">

            <div class="col-12 md:col-4 lg:col-3 xl:col-2" v-for="index in 12" :key="index">
                <Skeleton style="height: 20rem;" class="px-3"></Skeleton>
            </div>
        </template>
        <template v-else class="col-12 md:col-4 lg:col-3 xl:col-2" v-for="(user, index) in users" :key="index">
            <div class="p-3">
                <div class="p-card" :class="Object.keys(loggedIn).length > 0 ? 'cursor-pointer' : ''" style="height: 20rem;" @click="Object.keys(loggedIn).length > 0 ? viewProfile(user) : ''">
                    <div class="img-wrapper">
                        <img class="h-full w-full blur"
                            :src="user.img ? `data:image/png;base64,${user.img}` : '/no-image.png'">
                        <div class="content slide-left">{{ user.first_name }} {{ user.last_name }}</div>
                    </div>
                </div>
            </div>

        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "Users view",
    data() {
        return {

        }
    },
    props: ['users', 'loading'],
    computed: {
        ...mapGetters(['loggedIn'])
    },
    methods: {
        viewProfile(user) {
            this.$store.commit('profile', user);
            this.$router.push({ name: 'profile' });
        },
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

img.blur {
    filter: blur(5px);
}

.img-wrapper:hover>img.blur {
    filter: blur(0px);
}

.img-wrapper:hover>img.blur {
    filter: blur(0px);
}

.img-wrapper>.content.slide-left {
    transform: translateX(0);
}

.img-wrapper:hover>.content.slide-left {
    transform: translateX(-100%);
}
</style>