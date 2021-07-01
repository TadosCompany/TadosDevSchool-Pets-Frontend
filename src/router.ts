import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { AnimalPageComponent } from './pages/animal/AnimalPageComponent';
import { AnimalsPageComponent } from './pages/animals/AnimalsPageComponent';
import { AnimalEditPageComponent } from './pages/animal-edit/AnimalEditPageComponent';
import { BreedsPageComponent } from './pages/breeds/BreedsPageComponent';
import { FoodPageComponent } from './pages/food/FoodPageComponent';
import { FoodsPageComponent } from './pages/foods/FoodsPageComponent';
import { FeedLimitsPageComponent } from './pages/feed-limits/FeedLimitsPageComponent';
import { FeedLimitEditPageComponent } from './pages/feed-limit-edit/FeedLimitEditPageComponent';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'animals',
        component: AnimalsPageComponent,
    },
    {
        path: '/breeds',
        name: 'breeds',
        component: BreedsPageComponent,
    },
    {
        path: '/foods',
        name: 'foods',
        component: FoodsPageComponent,
    },
    {
        path: '/foods/:id',
        name: 'food',
        component: FoodPageComponent,
    },
    {
        path: '/animals/:id',
        name: 'animal',
        component: AnimalPageComponent,
    },
    {
        path: '/animals/edit/:id',
        name: 'animal-edit',
        component: AnimalEditPageComponent,
    },
    {
        path: '/feed-limits',
        name: 'feed-limits',
        component: FeedLimitsPageComponent,
    },
    {
        path: '/feed-limits/edit/:id',
        name: 'feed-limit-edit',
        component: FeedLimitEditPageComponent,
    },
];

export const router = new VueRouter({
    routes,
    mode: 'history',
});
