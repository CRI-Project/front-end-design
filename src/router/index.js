import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Layout from "../components/layout/Layout";
import Home from "../views/HomePage/Home";
import Control from "../views/Contorl/Control";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            isLogin: false
        }
    },
    {
        path: '/main',
        name: 'main',
        component: Layout,
        redirect: '/main/home',
        meta: {
            isLogin: true
        },
        children: [
            {
                path: '/main/home',
                name: 'home',
                component: Home
            },
            {
                path: '/control',
                name: 'control',
                component: Control
            }
        ]
    },
]

const router = new VueRouter({
    routes,
    mode: 'hash'
})

export default router