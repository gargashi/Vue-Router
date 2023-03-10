import { createRouter, createWebHistory } from "vue-router";

import TeamsList from "./pages/TeamsList.vue";
import UsersList from "./pages/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import NotFound from "./pages/NotFound.vue";
import TeamFooter from "./pages/TeamFooter.vue";
import UsersFooter from "./pages/UsersFooter.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/teams",
    },
    {
      name: "teams",
      path: "/teams",
      meta: { needsAuth: true },
      // component: TeamsList,
      components: { default: TeamsList, footer: TeamFooter },
      children: [
        {
          name: "team-members",
          path: ":teamId",
          component: TeamMembers,
          props: true,
        },
      ],
      // alias: "/",
    },
    {
      path: "/users",
      // component: UsersList,
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(to, from, next) {
        console.log("User beforeEnter");
        // console.log(to, from);
        next();
      },
    },
    // {
    //   path: "/teams/:teamId",
    //   component: TeamMembers,
    //   props: true,
    // },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach(function (to, from, next) {
  console.log("Global Before Each");
  // console.log(to, from);
  if (to.meta.needsAuth) {
    console.log("Needs auth!");
    next();
  } else {
    next();
  }
  // next(true);
  // next(false);
  // next("./teams");
  // next({
  //   name: "team-members",
  //   path: ":teamId",
  //   component: TeamMembers,
  //   props: true,
  // });
});
router.afterEach((to, from) => {
  // sending analytics data
  console.log("Global afterReach");
  console.log(to, from);
});

export default router;
