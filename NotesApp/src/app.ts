import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia Notes';
        config.map([
            { route: '', moduleId: 'welcome' }
        ]);

        this.router = router;
    }
}
