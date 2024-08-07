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
        } else if (store.state.role == "ADMIN_ROLE") {
            next({ name: 'master' });
        }else if (store.state.role == "MASTER_ADMIN_ROLE"){
            next({name : 'homes'})
        } else {
            next();
        }
    } else if (to.path === '/' && store.state.isAuthenticated) {
        if (store.state.role == "SUPER_MASTER") {
            next({ name: 'master' });
        } else if (store.state.role == "ADMIN_ROLE") {
            next({ name: 'master' });
        }else if (store.state.role == "MASTER_ADMIN_ROLE"){
            next({name : 'homes'})
        } else {
            next();
        }
    } else {
        next();
    }

});
export default router;


