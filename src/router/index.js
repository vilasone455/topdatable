import Vue from "vue";
import Router from "vue-router";
import userpage from "../pages/userpage.vue";
import formuser from "../pages/formuser.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/userpage"
    },
    {
      path: "/userpage",
      name: "userpage",
      component: userpage
    },
    {
      path: "/userform/",
      name: "userform",
      component: formuser
    },
    {
      path: "/userform/:id",
      name: "userform",
      component: formuser
    }
  ]
});
