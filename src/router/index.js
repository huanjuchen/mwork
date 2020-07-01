import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DashBoard from "../components/home/routeView/DashBoard";
import UserManagement from "../components/home/routeView/UserManagement";
import SubjectManagement from "../components/home/routeView/SubjectManagement";
import ProofManagement from "../components/home/routeView/ProofManagement";
import CashAccount from "../components/home/routeView/CashAccount";
import BankAccount from "../components/home/routeView/BankAccount";
import SubAccount from "../components/home/routeView/SubAccount";
import LedgerAccount from "../components/home/routeView/LedgerAccount";
import UserCenter from "../components/home/routeView/UserCenter";
import InformationCenter from "../components/home/routeView/InformationCenter";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: "/dashboard",
        children: [
            {
                path: "/dashboard",
                name: "DashBoard",
                component: DashBoard
            },
            {
                path: "/userManagement",
                name: "UserManagement",
                component: UserManagement
            },
            {
                path: "/subjectManagement",
                name: "SubjectManagement",
                component: SubjectManagement
            },
            {
                path: "/proofManagement",
                name: "ProofManagement",
                component: ProofManagement
            },
            {
                path: "/cashAccount",
                name: "CashAccount",
                component: CashAccount
            },
            {
                path: "/bankAccount",
                name: "BankAccount",
                component: BankAccount
            },
            {
                path: "/subAccount",
                name: "SubAccount",
                component: SubAccount
            },
            {
                path: "/ledgerAccount",
                name: "LedgerAccount",
                component: LedgerAccount
            },
            {
                path: "/userCenter",
                name: "UserCenter",
                component: UserCenter
            },
            {
                path: "/informationCenter",
                name: "InformationCenter",
                component: InformationCenter
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */"../views/Login")
    }
]

const router = new VueRouter({
    routes
})

export default router
