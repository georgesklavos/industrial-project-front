<template>

    <div class="flex justify-content-center align-items-center h-screen">
        <Card style="width: 25vw;">
            <template #title>
                Login
            </template>
            <template #content>
                <div class="flex flex-column">
                    <div class="field p-fluid">

                        <InputText v-model="email" :class="{ 'p-invalid': v$.email.$invalid && submitted }" type="text"
                            placeholder="Email" />
                        <div class="text-center p-0">
                            <span v-if="v$.email.$error && submitted">
                                <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                                    <small class="p-error">{{ error.$message }}</small>
                                </span>
                            </span>
                            <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
                                class="p-error">{{
                                        v$.email.required.$message.replace('Value', 'Email')
                                }}</small>
                        </div>
                    </div>
                    <div class="field p-fluid">
                        <Password v-model="password" placeholder="Password"
                            :class="{ 'p-invalid': v$.password.$invalid && submitted }" toggleMask class="mb-2"
                            :feedback="false" />
                        <div class="text-center p-0">
                            <span v-if="v$.password.$error && submitted">
                                <span id="password-error" v-for="(error, index) of v$.password.$errors" :key="index">
                                    <small class="p-error">{{ error.$message }}</small>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-content-between">
                    <Button label="Continue as guest" @click="$router.push({ name: 'home' })" />
                    <Button label="Login" @click="login" :loading="loading" iconPos="right" />
                </div>
            </template>
        </Card>
    </div>

</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
    name: "Login",
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            email: "",
            password: "",
            submitted: false,
            loading: false,
        }
    },
    validations() {
        return {
            email: {
                email,
                required
            },
            password: {
                required
            }
        }
    },
    methods: {
        async login() {
            this.submitted = true;
            const result = await this.v$.$validate();
            if (result) {
                try {
                    this.loading = true;
                    await this.$store.dispatch("login", { email: this.email, password: this.password });
                    this.$router.push({ name: 'home' });
                } catch {
                    console.log("error");
                    this.$toast.add({
                        severity: "error",
                        summary: "Login error",
                        detail: "Email or password is incorrect",
                        life: 3000
                    });
                }
                this.loading = false;
            }
        }
    }
}

</script>