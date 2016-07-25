<<<<<<< 74f72690c7dd1cc8c2e585512687ba731a831eee
<<<<<<< b2a5f65ea67d62c801e3ee1f0220f68b5085e8a4
=======
>>>>>>> Create the starting app
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
<<<<<<< 74f72690c7dd1cc8c2e585512687ba731a831eee
=======
﻿export class App { }
>>>>>>> Add support for Aurelia
=======
>>>>>>> Create the starting app
