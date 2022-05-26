<template>
    <NavBar></NavBar>
    <div class="flex justify-content-end">
        <Button label="Update profile" v-if="Object.keys(profileData).length > 0 && profileData._id == loggedIn._id"
            @click="updateProfile" :loading="loading" iconPos="right" />
    </div>
    <div class="grid">
        <div class="col-12 md:col-6 flex flex-column justify-content-center align-items-center">
            <Card style="height: 20rem; width: 20rem;">
                <template #content>
                    <div class="text-center">
                        <!-- <img style="width: 20rem !important;" class="h-full w-full" src="/logo.png"> -->
                        <Image :src="profileData.img ? `data:image/png;base64,${profileData.img}` : '/no-image.png'" alt="Image" width="310" preview />
                    </div>

                </template>
            </Card>
            <FileUpload v-if="Object.keys(profileData).length > 0 && profileData._id == loggedIn._id"
                style="width: 7rem; height: 3rem;" class="mt-5" @upload="fileUploaded" mode="basic" name="image"
                :url="`https://alumni-softeng-api.herokuapp.com/api/upload?id=${profile._id}`" accept="image/*"
                :auto="true" chooseLabel="Upload" />
        </div>

        <div class="col-12 md:col-6">
            <div class="grid flex-column">
                <div class="col-12">
                    <div class="text-center">
                        <span class="text-5xl">{{ profileData.first_name }} {{ profileData.last_name }}</span>
                    </div>
                </div>
                <div class="col-12">
                    <span class="text-3xl underline">Education</span>
                    <div class="my-4">
                        <div class="flex">
                            <span class="pl-2 text-xl m-0 align-self-center">Gratuation date:</span>
                            <span v-if="profileData.grad_date && profileData._id != loggedIn._id"
                                class="align-self-center ml-2">{{ profileData.grad_date
                                }}</span>
                            <Calendar v-else-if="profileData._id == loggedIn._id" id="basic"
                                v-model="profileData.grad_date" autocomplete="off" class="ml-2" dateFormat='dd-mm-yy' />
                            <span v-else class="align-self-center ml-2">N/A</span>
                        </div>

                        <div class="flex mt-3">
                            <span class="pl-2 text-xl m-0 align-self-center">Degree: </span>
                            <span v-if="profileData.degree && profileData._id != loggedIn._id"
                                class="align-self-center ml-2">{{ profileData.degree
                                }}</span>
                            <InputText v-else-if="profileData._id == loggedIn._id" v-model="profileData.degree"
                                type="text" class="ml-2" />
                            <span v-else class="align-self-center ml-2">N/A</span>
                        </div>

                    </div>
                </div>
                <div class="col-12">
                    <span class="text-3xl underline">Description</span>
                    <p v-if="profileData.description && profileData._id != loggedIn._id"
                        class="text-lg font-italic pl-2">{{ profileData.description }}</p>
                    <div v-else-if="profileData._id == loggedIn._id" class="flex">
                        <Textarea v-model="profileData.description" :autoResize="true" rows="5" cols="30"
                            class="mt-3" />
                    </div>
                    <span v-else class="align-self-center ml-2">N/A</span>
                </div>
                <div class="col-12">
                    <span class="text-3xl underline">Hobbies</span> <br>
                    <div class="my-4">

                        <template v-if="profileData.hobbies != null && profileData._id != loggedIn._id">
                            <Chip class="ml-2" v-for="(hobby, index) in profileData.hobbies" :key="index"
                                :label="hobby" />
                        </template>
                        <div v-else-if="profileData._id == loggedIn._id">
                            <Chips v-model="profileData.hobbies" />

                        </div>
                        <template v-else>
                            <span class="text-lg">No hobbies yet</span>
                        </template>
                    </div>
                </div>
                <div class="col-12">
                    <span class="text-3xl underline">Contact</span>
                    <p>Contact me by email: <a :href="`mailto:${profileData.email}`">here</a></p>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from "../components/NavBar.vue";

export default {
    name: "Profile",
    components: {
        NavBar
    },
    data() {
        return {
            profileData: {},
            loading: false
        }
    },
    computed: {
        ...mapGetters(['profile', 'loggedIn'])
    },
    mounted() {
        this.profileData = { ...this.profile };
    },
    watch: {
        profileData() {

        }
    },
    methods: {
        fileUploaded(value) {
            this.$store.commit('profile', JSON.parse(value.xhr.response));
        },
        async updateProfile() {
            this.loading = true;
            console.log(this.profileData);
           this.profileData.grad_date = this.$dayjs(this.profileData.grad_date).format('DD-MM-YYYY');
        // this.profileData.grad_date = this.$dayjs(this.profileData.grad_date,'DD-MM-YYYY').format('DD-MM-YYYY');
            await this.$store.dispatch('updateUser', this.profileData);
            this.loading = false;
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
</style>