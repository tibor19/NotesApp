import {Server, IServer} from '../backend/server';
import {Router, Redirect} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {CommonDialogs} from '../resources/dialogs/common-dialogs';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Server, Router, CommonDialogs, EventAggregator)
export class Detail {
    notebooks  = [];
    note;
    original;
    constructor(private server: Server, private router: Router, private commonDialogs: CommonDialogs, private ea: EventAggregator) {
    }

    canActivate(params) {
        return this.server.getNotebookList()
          .then(notebooks => this.notebooks = notebooks)
          .then(() => {
              if(!params.noteId) {
                  return this.server.newNote();
              } else {
                  return this.server.getNote(params.noteId);
              }
          }).then(note => {
              if(note) {
                  this.edit(note);
              } else {
                  return new Redirect('');
              }
          });
    }

    activate() {
        if (this.note.id) {
            this.ea.publish('note:editing', this.note);
        }
    }

    edit(note) {
        this.note = note;
        this.original = Object.assign(note);
    }

    save() {
        let isNew = !this.note.id;
        this.server.saveNote(this.note).then(note => {
            this.ea.publish('note:saved', note);
            this.edit(note);

            if (isNew) {
                this.router.navigateToRoute('edit', { noteId: note.id }, { replace: true, trigger: true });
            }
        });
    }

    canDeactivate() {
        if (this.original && this.server.hasChanged(this.note, this.original)) {
            let message = 'You have made changes to your note. Are you sure you wish to navigate away?';

            return this.commonDialogs
                .showMessage(message, 'Unsaved Changes', ['Yes', 'No'])
                .then(result => !result.wasCancelled);
        }

        return Promise.resolve(true);
    }
}
