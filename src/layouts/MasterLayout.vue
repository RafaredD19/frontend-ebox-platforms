<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" color="indigo-darken-1"
                class="border-0">
                <div class="p-2 py-7 flex items-center justify-center gap-2">
                    <div>
                        <div class="p-1 pt-4 flex items-center justify-center">
                            <img :src="logoEdriver" class="w-[6rem] bg-gray-100 rounded-md" />
                        </div>
                        <p v-if="!rail" class="font-bold text-2xl text-center w-full">eDriver</p>
                    </div>
                </div>
                <SidebarLayout :itemsNavegation="filteredItems" :rail="rail" />
            </v-navigation-drawer>
            <v-main class="h-screen bg-slate-100 block">
                <div class="w-full bg-white flex justify-between items-center px-3 shadow-sm">
                    <v-btn variant="text" icon="mdi-menu" color="blue-grey-lighten-1" class="cursor-pointer"
                        @click.stop="rail = !rail"></v-btn>
                    <div class="flex items-center">
                        <div class="flex items-center text-start text-xs">
                            <v-list>
                                <v-list-item class="text-start item-personalizado" :prepend-avatar="avatarPath">
                                    <template v-slot:default>
                                        <v-row>
                                            <v-col>
                                                <div class="text-sm">Hola, {{ username }}</div>
                                                <div class="caption">{{ rol }}</div>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-list-item>
                            </v-list>
                        </div>
                        <MenuAsPopover />
                    </div>
                </div>
                <section class="overflow-y-auto section_main" :class="isMobile ? 'p-4' : 'p-8'">
                    <router-view />
                </section>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import SidebarLayout from './SidebarLayout.vue';
import avatarImage from "@/assets/iconuser_hombre.png";
import MenuAsPopover from '@/components/general/MenuAsPopover.vue';
import LogoEdriver from "@/assets/logo_edriver.png";
import store from '@/store';

export default {
    components: {
        MenuAsPopover,
        SidebarLayout
    },
    data() {
        return {
            avatarPath: avatarImage,
            logoEdriver: LogoEdriver
        }
    },
    setup() {
        const isMobile = ref(false);
        const drawer = ref(true)
        const rail = ref(true)
        const rol = ref('')
        const username = ref('')
        const ItemsNavegation = ref([
            {
                icon: "mdi-file-question-outline",
                title: "Formularios",
                value: "forms",
                to: "/forms",
                children: []
            },
            {
                icon: "mdi-form-select",
                title: "Reportes formularios",
                value: "reportsforms",
                to: "/reportsforms",
                children: []
            },
            {
                icon: "mdi-domain",
                title: "Compañias",
                value: "companies",
                to: "/customers",
                children: []
            },
            {
                icon: "mdi-account-group",
                title: "Administradores",
                value: "administrator",
                to: "/administrator",
                children: []
            }
        ]);

        onMounted(() => {
            rol.value = "Administrador"
            username.value = store.state.username
            handleResize();
            window.addEventListener("resize", handleResize);
        })

        const filteredItems = computed(() => {
            // Lógica para filtrar los ítems según el rol
            if (store.state.role === 'ADMIN_ROLE') {
                return ItemsNavegation.value.filter(item => item.value === 'companies');
            } else if (store.state.role === 'REGULAR_USER_ROLE') {
                // Filtra la lista para mostrar solo ciertos ítems para el rol de usuario
                return ItemsNavegation.value.filter(item => item.value === 'forms' || item.value === 'reportsforms');
            } else if (store.state.role === 'MASTER_ADMIN_ROLE') {
                // Filtra la lista para mostrar solo ciertos ítems para el rol de master admin
                return ItemsNavegation.value.filter(item => item.value === 'administrator');
            } else {
                return []; // Si el rol no coincide con ninguna condición, muestra una lista vacía
            }
        });

        const handleResize = () => {
            isMobile.value = window.innerWidth <= 500; // Define aquí el ancho máximo para considerar como pantalla pequeña
        };

        return {
            isMobile,
            drawer,
            rail,
            rol,
            username,
            ItemsNavegation,
            filteredItems
        }
    }
}
</script>

<style>
.v-list-item-title {
    font-size: 14px !important;
}

.v-list-item-subtitle {
    font-size: 13px !important;
}

.section_main {
    overflow-y: auto !important;
    height: 100%;
    padding-bottom: 5rem !important;
}
</style>
