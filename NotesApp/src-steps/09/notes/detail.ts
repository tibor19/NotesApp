import {Server} from './services/note-server';
import {Router, Redirect} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Server, Router)
export class Detail {
    notebooks  = [];
    note;
    original;
    constructor(private server: Server, private router: Router) {
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
}
