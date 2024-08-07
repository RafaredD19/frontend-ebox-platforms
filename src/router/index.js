import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            meta: {
                title: "Home",
                requiresAuth: true
            },
            path: "/",
            component: () => import("@/layouts/MasterLayout.vue"),
            children: [
              
                {
                    name: "master",
                    path: "master",
                    component: () => import("@/views/MasterView.vue"),
                },
                {
                    name: "companie",
                    path: "companie",
                    component: () => import("@/views/CompanieView.vue"),
                },
                {
                    name: "vehicle",
                    path: "vehicle",
                    component: () => import("@/views/VehicleView.vue"),
                },
                {
                    name: "rVehicle",
                    path: "rVehicle",
                    component: () => import("@/views/ReporteVehicleView.vue"),
                },
                {
                    name: "rRides",
                    path: "rRides",
                    component: () => import("@/views/ReporteRidesView.vue"),
                },
               
               
               
             
            ]
        },
        {
            meta: {
                title: "Login"
            },
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue")
        }
    ]
})
// Navigation Guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.state.isAuthenticated) {
       
        next({ name: 'login' });
    } else if (to.name === 'login' && store.state.isAuthenticated) {
        if (store.state.role == "SUPER_MASTER") {
            next({ name: 'master' });
        } else if (store.state.role == "MASTER") {
            next({ name: 'companie' });
        }else if (store.state.role == "COMPANY"){
            next({name : 'vehicle'})
        } else {
            next();
        }
    } else if (to.path === '/' && store.state.isAuthenticated) {
        if (store.state.role == "SUPER_MASTER") {
            next({ name: 'master' });
        } else if (store.state.role == "MASTER") {
            next({ name: 'companie' });
        }else if (store.state.role == "COMPANY"){
            next({name : 'vehicle'})
        } else {
            next();
        }
    } else {
        next();
    }

});
export default router;


