<template>
<div class="flex justify-content-center align-items-center h-screen">
        <Card>
            <template #title>
                Register
            </template>
              <template #content>
                  <div class="flex flex-column">
                      <InputText v-model="email" type="text" placeholder="Email" class="mb-5"/>
                      <Password v-model="password" toggleMask class="mb-2" :feedback="false"/>
                  </div>
            </template>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button label="Register"/>
                </div>
            </template>
        </Card>
    </div>

</template>

<script>

export default {
    name: "Register"
}

</script>