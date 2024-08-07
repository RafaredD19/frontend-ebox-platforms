<template>
    <div class="p-4 bg-white shadow rounded-lg">
      <div v-if="loading" class="text-center py-4">
        <span class="text-gray-500">Cargando... Por favor espere.</span>
      </div>
      <div v-else class="overflow-x-auto" style="max-height: 500px; overflow-y: auto;">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNIDAD</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RUTA</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DESCRIPCIÓN</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HORARIOS</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="(ride, index) in paginatedRides" :key="ride.id">
              <tr @click="toggleDetails(index)" class="cursor-pointer">
                <td class="px-6 py-4 whitespace-nowrap">{{ ride.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ ride.unit }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ ride.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ ride.description }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ ride.firstSchedule }}</td>
              </tr>
              <template v-if="ride.showDetails">
                <tr v-for="(schedule, sIndex) in ride.schedules.slice(1)" :key="`${ride.id}-${sIndex}`" class="bg-gray-100">
                  <td class="px-6 py-4 whitespace-nowrap"></td>
                  <td class="px-6 py-4 whitespace-nowrap"></td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ ride.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ ride.description }}</td>
                 
            
                  <td class="px-6 py-4 whitespace-nowrap">{{ schedule }}</td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
      <div class="flex justify-between items-center mt-4">
        <span class="text-sm text-gray-700">
          Mostrando {{ startIndex + 1 }} a {{ endIndex }} de {{ rides.length }} resultados
        </span>
        <div>
          <label for="itemsPerPage" class="mr-2">Items por página:</label>
          <select id="itemsPerPage" v-model="pageSize" class="px-3 py-1 border rounded mr-2">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 border rounded mr-2">Anterior</button>
          <button @click="nextPage" :disabled="endIndex >= rides.length" class="px-3 py-1 border rounded">Siguiente</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { RridesListApi } from '@/api/ReporteRidesService';
  import store from '@/store';
  
  export default {
    name: 'TableRrides',
    data() {
      return {
        rides: [],
        currentPage: 1,
        pageSize: 5,
        loading: true, // Indicador de carga
      };
    },
    computed: {
      paginatedRides() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.rides.slice(start, start + this.pageSize);
      },
      startIndex() {
        return (this.currentPage - 1) * this.pageSize;
      },
      endIndex() {
        return Math.min(this.startIndex + this.pageSize, this.rides.length);
      },
    },
    methods: {
      async fetchRides(payload) {
        this.loading = true; // Mostrar indicador de carga
        try {
          const token = store.state.token;
          const response = await RridesListApi(token, payload);
          this.rides = response.data.data.flatMap(route => 
            route.rides.map(ride => ({
              name: route.name,
              description: route.description,
              unit: ride.unit,
              date: ride.date,
              firstSchedule: ride.schedules[0],
              schedules: ride.schedules,
              showDetails: false,
              id: `${route.id}-${ride.unit}-${ride.date}`
            }))
          );
        } catch (error) {
          console.error('Error fetching rides:', error);
        } finally {
          this.loading = false; // Ocultar indicador de carga
        }
      },
      toggleDetails(index) {
        const rideIndex = (this.currentPage - 1) * this.pageSize + index;
        this.rides[rideIndex].showDetails = !this.rides[rideIndex].showDetails;
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.endIndex < this.rides.length) {
          this.currentPage++;
        }
      },
      getCurrentDateUTCMinus5() {
        const now = new Date();
        const utcTimestamp = now.getTime() + now.getTimezoneOffset() * 6000;
        const utcDate = new Date(utcTimestamp);
        utcDate.setHours(utcDate.getHours() - 5);
        const year = utcDate.getFullYear();
        const month = String(utcDate.getMonth() + 1).padStart(2, '0');
        const day = String(utcDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
    },
    watch: {
      pageSize() {
        this.currentPage = 1; // Reset to first page when page size changes
      },
      currentPage() {
        // Reiniciar la expansión de detalles al cambiar de página
        this.rides.forEach(ride => {
          ride.showDetails = false;
        });
      }
    },
    created() {
      const currentDate = this.getCurrentDateUTCMinus5();
      const payload = {
        dateFrom: currentDate,
        dateTo: currentDate
      };
      this.fetchRides(payload);
    }
  };
  </script>
  
  <style scoped>
  .table-container {
    max-height: 500px;
    overflow-y: auto;
  }
  </style>
  