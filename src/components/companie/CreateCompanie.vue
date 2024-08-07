<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Crear Cuenta Compañia</span>
      </v-card-title>

      <v-card-text>
        <v-text-field label="Nombre del Negocio" v-model="business"></v-text-field>
        <v-text-field label="RUC" v-model="ruc"></v-text-field>
        <v-text-field label="Nombre de Usuario" v-model="username"></v-text-field>
        <v-text-field label="Contraseña" v-model="password" type="password"></v-text-field>
        <v-text-field label="Token Nimbus" v-model="tokenNimbus"></v-text-field>
        <v-text-field label="Usuario Wialon" v-model="usernameWialon" @blur="fetchRecourses"></v-text-field>
        <v-text-field label="Contraseña Wialon" v-model="passwordWialon" type="password" @blur="fetchRecourses"></v-text-field>
        <v-select
          :items="recourseNames"
          label="Recurso Wialon"
          v-model="selectedRecourseName"
          :disabled="recourseNames.length === 0"
        ></v-select>
        <v-file-input label="Subir Imagen" v-model="image" accept="image/*"></v-file-input>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Swal from 'sweetalert2';
import { CompanieCreatetApi, RecourseListApi } from '@/api/CompanieService';
import store from '@/store';

export default {
  name: 'CreateMaster',
  data() {
    return {
      dialog: false,
      business: '',
      ruc: '',
      username: '',
      password: '',
      tokenNimbus: '',
      usernameWialon: '',
      passwordWialon: '',
      recourses: [],
      recourseNames: [],
      selectedRecourseName: '',
      image: null, 
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.resetForm();
    },
    async save() {
      const selectedRecourse = this.recourses.find(recourse => recourse.name === this.selectedRecourseName);
      const recourseWialon = selectedRecourse ? selectedRecourse.id : '';

      const payload = {
        business: this.business,
        ruc: this.ruc,
        username: this.username,
        password: this.password,
        tokenNimbus: this.tokenNimbus,
        usernameWialon: this.usernameWialon,
        passwordWialon: this.passwordWialon,
        recourseWialon: recourseWialon,
        image: this.image, 
      };

      const token = store.state.token;

      // Crear el FormData
      const formData = new FormData();
      for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          formData.append(key, payload[key]);
        }
      }

      try {
        await CompanieCreatetApi(formData, token);
        this.$emit('accountCreated'); 
        this.dialog = false;
        this.resetForm();
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado exitosamente',
          showConfirmButton: true,
          timer: 3000
        });
      } catch (error) {
        console.error('Error al crear la cuenta:', error);
        this.dialog = false; 
        this.resetForm();
        const errorMessage = Array.isArray(error.response.data.message)
          ? error.response.data.message.join(', ')
          : error.response.data.message;
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la cuenta',
          text: errorMessage || 'Por favor, inténtelo de nuevo.',
          showConfirmButton: true
        });
      }
    },
    async fetchRecourses() {
      if (this.usernameWialon && this.passwordWialon) {
        const payload = {
          usernameWialon: this.usernameWialon,
          passwordWialon: this.passwordWialon
        };
        const token = store.state.token;

        try {
          const response = await RecourseListApi(token, payload);
          this.recourses = response.data.data;
          this.recourseNames = this.recourses.map(recourse => recourse.name);
        } catch (error) {
          console.error('Error al obtener los recursos:', error);
          this.recourses = [];
          this.recourseNames = [];
        }
      }
    },
    resetForm() {
      this.business = '';
      this.ruc = '';
      this.username = '';
      this.password = '';
      this.tokenNimbus = '';
      this.usernameWialon = '';
      this.passwordWialon = '';
      this.recourses = [];
      this.recourseNames = [];
      this.selectedRecourseName = '';
      this.image = null;
    },
  },
};
</script>
