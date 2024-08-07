<template>

    <v-card-title>
      <h1 class="font-bold lg:text-2xl text-xl text-gray-400">Cuentas Master</h1>
    </v-card-title>
    <v-row justify="end">
      <v-btn color="primary" class="mb-7 mr-7" @click="openDialog">
        Crear +
      </v-btn>
    </v-row>
    <div class="TableMaster">
    <TableMaster />
  </div>
    <CreateMaster ref="createMasterModal" />

</template>

<script>
import TableMaster from '@/components/master/TableMaster.vue';
import CreateMaster from '@/components/master/CreateMaster.vue';

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
},
};
</script>

<style scoped>
.TableMaster{
border-radius: 15px;
max-width: auto;
margin-top: 0%;
}

</style>
