import {database, INote, INotebook} from './database';

export interface IServer {
    newNote(): INote;
    getNoteList(filter): Promise<INote[]>;
    getNotebookList(): Promise<INotebook[]>;
    createNotebook(name): Promise<INotebook>;
}

export class Server implements IServer {
    newNote(): INote {
        return {
            
            title: 'New Note',
            body: '',
            notebookId: database.notebooks[0].id
        };
    }

    hasChanged(a: INote, b: INote) {
        return a.title !== b.title || a.body !== b.body || a.notebookId !== b.notebookId;
    }

    getNoteList(filter) : Promise<INote[]> {
        let source = filter && filter !== 'none'
            ? database.notes.filter(x => x.notebookId === parseInt(filter))
            : database.notes;

        let results = source.map(x => ({
            id: x.id,
            title: x.title,
            body: x.body
        }));
        return Promise.resolve(results);
    }

    getNote(id) : Promise<INote>{
        let found = database.notes.find(x => x.id == id);
        return Promise.resolve(found ? JSON.parse(JSON.stringify(found)) : null);
    }

    getNotebookList(): Promise<INotebook[]>  {
        return Promise.resolve(database.notebooks.map(x => ({
            id: x.id,
            title: x.title
        })));
    }

    saveNote(note: INote): Promise<INote>{
        let existing : INote;

        if (note.id) {
            existing = database.notes.find(x => x.id === note.id);
        } else {
            existing = { id: database.nextId() };
            database.notes.push(existing);
        }

        existing = Object.assign(existing, note);
        return Promise.resolve(JSON.parse(JSON.stringify(existing)));
    }

    createNotebook(name): Promise<INotebook> {
        let notebook = {
            id: database.nextId(),
            title: name
        };

        database.notebooks.push(notebook);
        return Promise.resolve(JSON.parse(JSON.stringify(notebook)));
    }
}
