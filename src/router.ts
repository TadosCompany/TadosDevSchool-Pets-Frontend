import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { AnimalPageComponent } from './pages/animal/AnimalPageComponent';
import { AnimalsPageComponent } from './pages/animals/AnimalsPageComponent';
import { BreedsPageComponent } from './pages/breeds/BreedsPageComponent';
import { FoodPageComponent } from './pages/food/FoodPageComponent';
import { FoodsPageComponent } from './pages/foods/FoodsPageComponent';

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
];

export const router = new VueRouter({
    routes,
    mode: 'history',
});
