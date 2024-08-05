<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-card>
          <v-card-title class="text-center">
            <img :src="LogoImage" alt="Logo" class="logo-image">
          </v-card-title>
          <div>
            <div class="w-full flex justify-center">
              
            </div>
            <h1 class="text-2xl pb-2 color-blue-600 text-center">Bienvenido a eBox</h1>
            <p class="text-xs pb-2 text-gray-500 text-center mt-2 pr-10 pl-10">
              Ingresa las credenciales otorgadas por tu proveedor
            </p>
          </div>
          <v-card-text>
            <v-form @submit.prevent="validateLogin">
              <div class="text-subtitle-1 text-medium-emphasis">Usuario</div>
              <v-text-field
                v-model="username"
                density="compact"
                placeholder="Usuario"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
              ></v-text-field>
              <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Contraseña
              </div>
              <v-text-field
                v-model="password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Contraseña"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="toggleVisibility"
              ></v-text-field>
              <v-btn type="submit" color="primary" class="mt-4" block>Ingresar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-none d-md-flex align-center justify-center">
        <img :src="LoginImage" alt="Login Image" class="login-image">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import loginImage from '@/assets/login/login.png'; 
import logoImage from '@/assets/login/logo_sysnet.png';

export default {
    data: () => ({
        visible: false,
        LoginImage: loginImage,
        LogoImage : logoImage
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

<style scoped>
.fill-height {
  height: 100vh;
}

.logo-image {
  width: 80px;
  height: 80px;
  margin-left: 40%;
}

.login-image {
  width: 100%;
  height: 100%;

  object-fit: cover;
}
</style>
