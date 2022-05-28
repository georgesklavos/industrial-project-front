<template>
    <div class="flex justify-content-center align-items-center h-screen">
        <Card>
            <template #title>
                Register
            </template>
            <template #content>
                <div class="flex flex-column">
                    <!-- Firstname field -->
                    <div class="field p-fluid">
                        <InputText v-model="data.first_name" type="text" placeholder="First name" />
                        <div class="text-center p-0">
                            <span v-if="v$.data.first_name.$error && submitted">
                                <span id="firstName-error" v-for="(error, index) of v$.data.first_name.$errors"
                                    :key="index">
                                    <small class="p-error">{{ error.$message }}</small>
                                </span>
                            </span>
                        </div>
                    </div>
                    <!-- Lastname field -->
                    <div class="field p-fluid">
                        <InputText v-model="data.last_name" type="text" placeholder="Last name" />
                        <div class="text-center p-0">
                            <span v-if="v$.data.last_name.$error && submitted">
                                <span id="lastName-error" v-for="(error, index) of v$.data.last_name.$errors"
                                    :key="index">
                                    <small class="p-error">{{ error.$message }}</small>
                                </span>
                            </span>
                        </div>
                    </div>
                    <!-- Email field -->
                    <div class="field p-fluid">
                        <InputText v-model="data.email" type="text" placeholder="Email" />
                        <div class="text-center p-0">
                            <span v-if="v$.data.email.$error && submitted">
                                <span id="email-error" v-for="(error, index) of v$.data.email.$errors" :key="index">
                                    <small class="p-error">{{ error.$message }}</small>
                                </span>
                            </span>
                        </div>
                    </div>
                    <!-- Password field -->
                    <div class="field p-fluid">
                        <Password v-model="data.password" toggleMask class="mb-2" placeholder="Password"
                            :feedback="false" />
                        <div class="text-center p-0">
                            <span v-if="v$.data.password.$error && submitted">
                                <span id="password-error" v-for="(error, index) of v$.data.password.$errors"
                                    :key="index">
                                    <small class="p-error">{{ error.$message }}</small>
                                </span>
                            </span>
                        </div>
                    </div>

                    <!-- School field -->
                    <div class="field p-fluid">
                        <Dropdown v-model="data.school" :options="schools" placeholder="Select a school" />
                        <div class="text-center p-0">
                            <span v-if="v$.data.school.$error && submitted">
                                <span id="school-error" v-for="(error, index) of v$.data.school.$errors" :key="index">
                                    <small class="p-error">{{ error.$message }}</small>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-content-between">
                    <Button label="Login" @click="$router.push({ name: 'login' })" />
                    <Button label="Register" @click="register" :loading="loading" iconPos="right"/>
                </div>
            </template>
        </Card>
    </div>

</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";
export default {
    setup: () => ({ v$: useVuelidate() }),
    name: "Register",
    data() {
        return {
            data: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                school: ""
            },
            loading: false
        }
    },
    computed: {
        ...mapGetters(['schools'])
    },
    validations: {
        data: {
            first_name: {
                required
            },
            last_name: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required
            },
            school: {
                required
            }
        }
    },
    methods: {
        async register() {
            this.submitted = true;
            const result = await this.v$.$validate();
            if (result) {
                this.loading = true;
                await this.$store.dispatch("register", this.data);
                this.loading = false;
                this.$router.push({ name: 'login' });
            }
        }
    }
}

</script>