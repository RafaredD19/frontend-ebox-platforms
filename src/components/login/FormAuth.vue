<template>
    <div class="w-full pt-4">
        <div>
            <div class="w-full flex justify-center">
                <img :src="imgLogo" alt="" class="w-12">
            </div>
            <p class="text-2xl pb-2 font-bold text-blue-600 text-center">Bienvenido!</p>
            <p class="text-xs pb-2 text-gray-500 text-center">Ingresa las credenciales otorgadas por tu proveedor</p>
        </div>

        <v-card class="mx-auto pa-8 pt-2 elevation-0" elevation="8" max-width="448" rounded="lg">
            <form :action="validateLogin">
                <div class="text-subtitle-1 text-medium-emphasis">Usuario</div>

                <v-text-field density="compact" placeholder="Ingrese su usuario" prepend-inner-icon="mdi-account"
                    variant="outlined" v-model="username" color="blue"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Contraseña

                    <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                        target="_blank">
                        Olvidaste tu contraseña?</a>
                </div>

                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Ingrese su contraseña" prepend-inner-icon="mdi-lock-outline"
                    variant="outlined" @click:append-inner="visible = !visible" v-model="password"
                    color="blue"></v-text-field>

                <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="validateLogin">
                    Ingresar
                </v-btn>
            </form>
        </v-card>
    </div>
</template>
<script>
import { ref } from 'vue'
import ImgLogo from '@/assets/login/logo_sysnet.png'

export default {
    data: () => ({
        visible: false,
        imgLogo: ImgLogo
    }),
    emits: ['validate-login'],
    setup(_, { emit }) {
        const username = ref('');
        const password = ref('');

        const validateLogin = () => {
            const data = {
                username: username.value,
                password: password.value
            }
            emit('validate-login', data)
        }

        return {
            username,
            password,
            validateLogin
        }
    }
}
</script>