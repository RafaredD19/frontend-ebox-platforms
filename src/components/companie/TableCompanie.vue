<template>
    <v-card>
 
      <v-card-text>
        <div class="table-container">
          <v-data-table
            :headers="headers"
            :items="masters"
            class="elevation-1"
            :search="search"
            :loading="loading"
            loading-text="Cargando... Espere Por favor"
          >
            <template v-slot:top>
       
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
                  @input="handleSearch"
                ></v-text-field>
     
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { CompanieListApi } from '@/api/CompanieService';
  import store from '@/store';
  
  export default {
    name: 'TablaCompanie',
    data() {
      return {
        search: '',
        loading: false,
        headers: [
          { title: 'EMPRESA', align: 'start', key: 'business' },
          { title: 'USUARIO', key: 'username' },
          { title: 'ROL', key: 'role' },
          { title: 'ESTADO', key: 'status' },
        ],
        masters: [],
      };
    },
    created() {
      this.fetchMasters();
    },
    methods: {
      async fetchMasters() {
        this.loading = true;
        try {
          const token = store.state.token;
          const response = await CompanieListApi(token);
          this.masters = response.data.data.map(master => ({
            business: master.business,
            username: master.user.username,
            role: master.user.role,
            status: master.user.status ? 'Activo' : 'Inactivo',
          }));
        } catch (error) {
          console.error('Error fetching masters:', error);
        } finally {
          this.loading = false;
        }
      },
      handleSearch() {
        this.loading = true;
        setTimeout(async () => {
          await this.fetchMasters(); // Aquí puedes modificar para una búsqueda específica
          this.loading = false;
        }, 500); // Agregar un retraso para simular el tiempo de búsqueda
      },
    },
  };
  </script>
  
  <style scoped>
  .table-container {
    max-height: 400px; /* Ajusta esta altura según sea necesario */
    overflow-y: auto;
  }
  </style>
  