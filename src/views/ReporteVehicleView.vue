<template>
  <v-container>
    <v-card-title>
      <h1 class="font-bold lg:text-2xl text-xl text-gray-400">Reporte de Vehículos</h1>
    </v-card-title>
    <v-row justify="end">
      <v-btn color="red" class="mb-7 mr-7" @click="exportPDF">
        Exportar PDF
      </v-btn>
    </v-row>
    <v-row justify="end">
        
        </v-row>
    <div class="TableMaster">
      <TableMaster ref="tableMaster" />
    </div>
    <CreateMaster ref="createMasterModal" />
  </v-container>
</template>

<script>
import TableMaster from '@/components/reporte/TableRvehicle.vue';
import CreateMaster from '@/components/companie/CreateCompanie.vue';
import { exportVehicleReportPDF } from '@/helpers/ReportVehicle';

export default {
  name: 'MasterView',
  components: {
    TableMaster,
    CreateMaster,
  },
  methods: {
    openDialog() {
      this.$refs.createMasterModal.dialog = true;
    },
    exportPDF() {
      const data = this.$refs.tableMaster.masters;
      exportVehicleReportPDF(data);
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
