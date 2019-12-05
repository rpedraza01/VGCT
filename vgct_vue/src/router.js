import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/index"
        },
        {
            path: "/create",
            name: "create",
            component: () => import("./components/Create.vue")
        },
        {
            path: "/edit/:id",
            name: "edit",
            component: () => import("./components/Edit.vue")
        },
        {
            path: "/index",
            name: "index",
            component: () => import("./components/Index.vue")
        },
    ]
});