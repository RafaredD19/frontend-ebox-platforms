<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Crear Cuenta Master</span>
        </v-card-title>
  
        <v-card-text>
          <v-text-field label="Nombre del Negocio" v-model="business"></v-text-field>
          <v-text-field label="Nombre de Usuario" v-model="username"></v-text-field>
          <v-text-field label="Contraseña" v-model="password" type="password"></v-text-field>
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
  import { MasterCreatetApi } from '@/api/MasterService';
  import store from '@/store';
  
  export default {
    name: 'CreateMaster',
    data() {
      return {
        dialog: false,
        business: '',
        username: '',
        password: '',
      };
    },
    methods: {
      close() {
        this.dialog = false;
        this.resetForm();
      },
      async save() {
        const payload = {
          business: this.business,
          username: this.username,
          password: this.password,
        };
  
        const token = store.state.token;
  
        try {
          await MasterCreatetApi(payload, token);
          this.$emit('accountCreated'); // Emit event to notify parent component
          this.dialog = false;
          this.resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado exitosamente',
            showConfirmButton: true,
            timer: 3000
          });
          
        setTimeout(() => {
        location.reload();
      }, 3000);
        } catch (error) {
          console.error('Error al crear la cuenta:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al crear la cuenta',
            text: 'Por favor, inténtelo de nuevo.',
            showConfirmButton: true
          });
        }
      },
      resetForm() {
        this.business = '';
        this.username = '';
        this.password = '';
      },
    },
  };
  </script>
  
  <style scoped>
  /* Puedes añadir estilos específicos aquí si los necesitas */
  </style>
  