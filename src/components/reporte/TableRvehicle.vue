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
  import { RvehicleListApi } from '@/api/ReporteVehicleService';
  import store from '@/store';
  
  export default {
    name: 'TablaCompanie',
    data() {
      return {
        search: '',
        loading: false,
        headers: [
          { title: 'EMPRESA', align: 'start', key: 'codeUnit' },
         { title: 'MARCA', key: 'brand' },
         { title: 'COLOR', key: 'color' },
         { title: 'MODELO', key: 'model' },
         { title: 'TIPO COMBUSTIBLE', key: 'typeFuel' },
         { title: 'CLASE DE VEHÍCULO', key: 'typeUnit' },
         { title: 'COMENTARIO', key: 'comment' },
         { title: 'VIN', key: 'vin' },
         { title: 'AÑO', key: 'year' },
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
          const response = await RvehicleListApi(token);
          this.masters = response.data.data.map(master => ({
            codeUnit: master.codeUnit,
            brand: master.brand,
            color :master.color,
            model : master.model,
            typeFuel: master.typeFuel,
            plate: master.plate,
            typeUnit : master.typeUnit,
            comment : master.comment,
            vin: master.vin,
            year : master.year,


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
  