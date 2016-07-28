import {Server, IServer} from '../backend/server';
import {Router, Redirect} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {CommonDialogs} from '../resources/dialogs/common-dialogs';

@inject(Server, Router, CommonDialogs)
export class Detail {
    notebooks  = [];
    note;
    original;
    constructor(private server: Server, private router: Router, private commonDialogs: CommonDialogs) {
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

    edit(note) {
        this.note = note;
        this.original = JSON.parse(JSON.stringify(note));
    }

    save() {
        let isNew = !this.note.id;
        this.server.saveNote(this.note).then(note => {
            this.edit(note);
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
