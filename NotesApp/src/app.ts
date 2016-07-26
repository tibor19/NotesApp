import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia Notes';
        config.map([
            { route: '', moduleId: 'welcome' },
            { route: 'notebooks', moduleId: 'notebooks/index', nav: true, title: 'Notebooks', settings: { icon: 'book' } },
            { route: 'settings', moduleId: 'settings/index', nav: true, title: 'Settings', settings: { icon: 'cog' } }
        ]);

        this.router = router;
    }
}
