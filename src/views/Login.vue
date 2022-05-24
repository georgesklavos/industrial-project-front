<template>

    <div class="flex justify-content-center align-items-center h-screen">
        <Card>
            <template #title>
                Login
            </template>
              <template #content>
                  <div class="flex flex-column">
                      <InputText v-model="email" type="text" placeholder="Email" class="mb-5"/>
                      <Password v-model="password" toggleMask class="mb-2" :feedback="false"/>
                  </div>
            </template>
            <template #footer>
                <div class="flex justify-content-between">
                    <Button label="Continue as guest"/>
                    <Button label="Login"/>
                </div>
            </template>
        </Card>
    </div>

</template>

<script>

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: ""
        }
    }
}

</script>