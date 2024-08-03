<template>
    <v-list>
        <div v-for="itemNavegation in itemsNavegation" :key="itemNavegation.value">
            <router-link :to="itemNavegation.to" v-if="itemNavegation.children.length == 0">
                <v-list-item @click="selectItem(itemNavegation.to)" :prepend-icon="itemNavegation.icon"
                    :title="itemNavegation.title" :value="itemNavegation.value"
                    :class="{ 'selected-item': selectedItem === itemNavegation.to }"></v-list-item>
            </router-link>
            <v-list-group v-else :value="itemNavegation.value" fluid>
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :prepend-icon="itemNavegation.icon" :title="itemNavegation.title"
                        active-class="bg-indigo-lighten-1"></v-list-item>
                </template>
                <div :class="{ 'my-2 border-l-4 border-blue-500 ml-3': !rail, 'my-2 border-l-4 border-blue-700': rail }">
                    <router-link :to="item.to" v-for="item in itemNavegation.children" :key="item.value" class="rounded-md">
                        <v-list-item @click="selectItem(item.to)" :prepend-icon="item.icon" :title="item.title"
                            :value="item.value" active-class="blue-darken-3 rounded-md"
                            :class="{ 'selected-item': selectedItem === item.to }"></v-list-item>
                    </router-link>
                </div>
            </v-list-group>
        </div>
    </v-list>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default ({
    props: {
        rail: Boolean,
        itemsNavegation: Array
    },
    setup() {
        const selectedItem = ref(null)
        const router = useRoute();

        onMounted(() => {
            const currentRoute = router.fullPath;
            selectedItem.value = currentRoute
        })


        const selectItem = (item) => {
            selectedItem.value = item
        }
        return {
            selectedItem,
            selectItem
        }
    }
})
</script>
<style>
.selected-item {
    background-color: #4777bea1 !important;
    border-right: 4px solid rgb(119, 153, 190);
}
</style>
