import {Server} from './services/note-server';
import {inject} from 'aurelia-framework';

@inject(Server)
export class Notes {
    notebookName = '';
    notebookList = [];
    constructor(private server: Server) {
    }

    activate() {
        return this.server.getNotebookList().then(x => this.notebookList = x);
    }

    createNotebook() {
        if (!this.notebookName) {
            return;
        }

        this.server.createNotebook(this.notebookName).then(notebook => {
            this.notebookName = '';
            this.notebookList.push(notebook);
        });
    }
}

