import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {Server, IServer} from '../backend/server';

@inject(Server, EventAggregator)
export class Notes {
    router: Router;
    filter = 'none';
    noteList = [];
    private noteSavedSubscription: Subscription;
    private noteEditingSubscription: Subscription;

    constructor(private server: Server, ea: EventAggregator) {
        this.noteSavedSubscription = ea.subscribe('note:saved', note => this.noteSaved(note));
        this.noteEditingSubscription = ea.subscribe('note:editing', note => this.noteEditing(note));
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

    noteSaved(note) {
        let found = this.noteList.find(x => x.id === note.id);
        if (found) {
            Object.assign(found, note);
        } else {
            this.noteList.push(note);
        }
    }

    noteEditing(note) {
        let prev = this.noteList.find(x => x.isActive);
        let next = this.noteList.find(x => x.id === note.id);
        if (next) {
            if (prev) {
                prev.isActive = false;
            }

            next.isActive = true;
        }
    }

    detached() {
        this.noteSavedSubscription.dispose();
        this.noteEditingSubscription.dispose();
    }
}
