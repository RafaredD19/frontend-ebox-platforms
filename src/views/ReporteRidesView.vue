<template>
  <v-container>
    <v-card-title>
      <h1 class="font-bold lg:text-2xl text-xl text-gray-400">Reporte de Rutinas</h1>
    </v-card-title>
    <DateFilter @filter-applied="applyFilter" @export-pdf="exportPDF" />
    <div class="TableMaster">
      <TableRrides ref="tableRrides" />
    </div>
  </v-container>
</template>

<script>
import TableRrides from '@/components/reporte/TableRrides.vue';
import DateFilter from '@/components/reporte/DateFilter.vue';
import { generatePDF } from '@/helpers/ReportRides';

export default {
  name: 'ReporteRidesView',
  components: {
    TableRrides,
    DateFilter,
  },
  methods: {
    applyFilter(filter) {
      this.$refs.tableRrides.fetchRides(filter);
    },
    exportPDF() {
      const data = this.$refs.tableRrides.rides;
      generatePDF(data);
    },
  },
};
</script>

<style scoped>
.TableMaster {
  border-radius: 15px;
  max-width: auto;
  margin-top: 0%;
}
</style>
