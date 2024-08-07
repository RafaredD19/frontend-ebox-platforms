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
  import { RdriverListApi } from '@/api/ReporteDriverService';
  import store from '@/store';
  
  export default {
    name: 'TablaCompanie',
    data() {
      return {
        search: '',
        loading: false,
        headers: [
          { title: 'CONDUCTOR', align: 'start', key: 'name' },
         { title: 'TIPO DE LICENCIA', key: 'typeLicense' },
         { title: 'PUNTOS DE LICENCIA', key: 'pointsLicense' },
         { title: 'FECHA DE VENCIMIENTO', key: 'expirationDate' },
         { title: 'CEDULA', key: 'identification' },
   
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
          const response = await RdriverListApi(token);
          this.masters = response.data.data.map(master => ({
            name: master.name,
            typeLicense: master.typeLicense,
            pointsLicense :master.pointsLicense,
            expirationDate : master.expirationDate,
            identification: master.identification,
           


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
    max-height: 700px; /* Ajusta esta altura según sea necesario */
    overflow-y: auto;
  }
  </style>
  