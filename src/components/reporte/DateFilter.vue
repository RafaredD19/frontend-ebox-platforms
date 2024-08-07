<template>
    <div class="p-4 bg-white shadow rounded-lg">
      <form @submit.prevent="applyFilter">
        <div class="flex flex-wrap -mx-3 mb-0">
          <div class="w-full md:w-1/4 px-3  md:mb-0  pl-10">
            <v-text-field
              label="Fecha desde"
              type="date"
              hide-details
              density="compact"
              v-model="dateFrom"
              variant="outlined"
              color="indigo"
              class="mb-3 md:mb-0 max-w-[100%]"
            ></v-text-field>
          </div>
          <div class="w-full md:w-1/4 px-5 pl-10">
            <v-text-field
              label="Fecha hasta"
              type="date"
              hide-details
              density="compact"
              v-model="dateTo"
              variant="outlined"
              color="indigo"
                 class="mb-3 md:mb-0 max-w-[100%]"
            ></v-text-field>
          </div>
 
          <div class="w-full px-6 pl-16 pr-0  md:w-1/4">
            <button
              type="submit"
              class="bg-blue-500 text-white font-bold py-2 px-10  rounded hover:bg-blue-700 mb-3"
            >
              Aplicar Filtro
            </button>
        </div>
        <div class="w-full px-3 pr-9 pl-1  md:w-1/4">
            <button
              type="button"
              @click="exportPDF"
              class="bg-red-500 text-white font-bold py-2 px-10 rounded hover:bg-red-700"
            >
              Exportar PDF
            </button>
        </div>
          

        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DateFilter',
    data() {
      return {
        dateFrom: '',
        dateTo: '',
      };
    },
    methods: {
      applyFilter() {
        this.$emit('filter-applied', {
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
        });
      },
      exportPDF() {
        this.$emit('export-pdf');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  