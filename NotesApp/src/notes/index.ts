import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Server, IServer} from '../backend/server';

@inject(Server)
export class Notes {
    router: Router;
    filter = 'none';
    noteList = [];

    constructor(private server: Server) {
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: '', moduleId: './no-selection' },
            { route: 'new', moduleId: './detail', name: 'new' },
            { route: 'edit/:noteId', name: 'edit', moduleId: './detail' }
        ]);

        this.router = router;
    }

    activate(params) {
        this.filter = params.filter ? params.filter : this.filter;
        return this.server.getNoteList(this.filter).then(x => this.noteList = x);
    }
}
