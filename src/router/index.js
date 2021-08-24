import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue"
import EditRecipe from "../views/EditRecipe.vue"

const loginPageName = "Login";
const homePageName = "Home";
const newRecipePageName = "NewRecipe";
const editRecipePageName = "EditRecipe";

const routes = [
  {
    path: '/',
    name: homePageName,
    component: Home,
  },
  {
    path: '/login',
    name: loginPageName,
    component: Login
  },
  {
    path: "/new",
    name: newRecipePageName,
    component: EditRecipe,
  },
  {
    path: "/edit/:id",
    name: editRecipePageName,
    component: EditRecipe,
    props: true,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem("sessionToken");

  if (to.name !== loginPageName && !token)
    next({ name: loginPageName });
  else if (to.name === loginPageName && !!token)
    next({ name: homePageName })
  else
    next();
})

export default router
