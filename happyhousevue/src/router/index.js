import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Board from '@/views/Board.vue';
import Sign from '@/views/Sign.vue';
import MyPage from '@/views/MyPage.vue';
import test from '@/components/test.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/loginTest',
    name: 'LoginTest',
    component: test,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign,
    children: [
      {
        path: 'modify',
        name: 'Modify',
        component: () => import('@/components/sign/Modify.vue'),
      },
      {
        path: 'up',
        name: 'Up',
        component: () => import('@/components/sign/Up.vue'),
      },
    ],
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
  },
  {
    path: '/board',
    name: 'Board',
    component: Board,
    redirect: '/board/list',
    //중첩 route 설정.
    children: [
      {
        path: 'list',
        name: 'board-list',
        component: () => import('@/components/board/BoardList.vue'),
      },
      {
        path: 'create',
        name: 'board-create',
        component: () => import('@/components/board/BoardCreate.vue'),
      },
      {
        path: 'modify',
        name: 'board-modify',
        component: () => import('@/components/board/BoardModify.vue'),
      },
      {
        path: 'view',
        name: 'board-view',
        component: () => import('@/components/board/BoardView.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
