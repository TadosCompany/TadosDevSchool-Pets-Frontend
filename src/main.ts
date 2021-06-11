import Vue from 'vue';
import { AppComponent } from './components/app/AppComponent';
import { router } from './router';

export function initApp(selector: string) {
    const instance = new Vue({
        render: (h) => h(AppComponent),
        router,
    });

    instance.$mount(selector);

    return instance;
}
