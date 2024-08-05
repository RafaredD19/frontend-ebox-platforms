<template>
     <div class="flex justify-between">
          <h1 class="font-bold lg:text-2xl text-xl text-gray-400">Formularios</h1>
          <ModalCreateFormsVue @create-item="onCreateItem" />
     </div>
     <div class="py-5">
          <TableFormVue :desserts="dataForms" @edit-item="onEditItem" @delete-item="onDeleteItem" />
     </div>
     <ModalEditForms :itemEdit="itemEdit" :openModal="dialogEdit" @cancel-item="dialogEdit = false"
          @edit-item="onUpdateItem" />
</template>
<script>


</script>