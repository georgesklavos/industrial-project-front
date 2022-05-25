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
                        <InputText v-model="data.firstName" type="text" placeholder="First name" />
                             <div class="text-center p-0">
                            <span v-if="v$.data.firstName.$error && submitted">
                                <span id="firstName-error" v-for="(error, index) of v$.data.firstName.$errors" :key="index">
                                    <small class="p-error">{{ error.$message }}</small>
                                </span>
                            </span>
                        </div>
                    </div>
                    <!-- Lastname field -->
                     <div class="field p-fluid">
                         <InputText v-model="data.lastName" type="text" placeholder="Last name" />
                             <div class="text-center p-0">
                            <span v-if="v$.data.lastName.$error && submitted">
                                <span id="lastName-error" v-for="(error, index) of v$.data.lastName.$errors" :key="index">
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
                         <Password v-model="data.password" toggleMask class="mb-2" placeholder="Password" :feedback="false" />
                             <div class="text-center p-0">
                            <span v-if="v$.data.password.$error && submitted">
                                <span id="password-error" v-for="(error, index) of v$.data.password.$errors" :key="index">
                                    <small class="p-error">{{ error.$message }}</small>
                                </span>
                            </span>
                        </div>
                    </div>
                   
                    
                   
                </div>
            </template>
            <template #footer>
                <div class="flex justify-content-between">
                    <Button label="Login" @click="$router.push({name: 'login'})" />
                    <Button label="Register" @click="register" />
                </div>
            </template>
        </Card>
    </div>

</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
    setup: () => ({ v$: useVuelidate() }),
    name: "Register",
    data() {
        return {
            data: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            }
        }
    },
    validations: {
        data: {
            firstName: {
                required
            },
            lastName: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required
            },
        }
    },
    methods: {
       async register() {
            this.submitted = true;
            const result = await this.v$.$validate();
            if(result) {
                this.loading = true;
                this.$store.dispatch("register", this.data);
                this.loading = false;
                this.$router.push({name: 'login'});
            }
        }
    }
}

</script>