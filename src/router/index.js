import { createRouter, createWebHistory } from "vue-router"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import("../views/Home.vue") },
        { path: '/register', component: () => import("../views/Register.vue") },
        { path: '/signin', component: () => import("../views/Signin.vue") },
        {
            path: '/feed', component: () => import("../views/Feed.vue"),
            meta: {
                requireAuth: true
            }
        }
    ]
});


const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}
router.beforeEach(async(to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
        if (await getCurrentUser()) {
            next()
        } else {

            alert("No access");
            next("/");
        }
    } else {
        next();
    }

})
export default router;