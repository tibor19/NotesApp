export interface INote {
    id: number,
    title?: string,
    body?: string,
    notebookId?: number
}

export interface INotebook {
    id: number,
    title: string
}

let lastId = 0;

function nextId() {
    return ++lastId;
}

let defaultNotebook = {
    id: nextId(),
    title: 'My Notes'
};

export const database: { nextId: () => number, notes: INote[], notebooks: INotebook[] } = {
    nextId: nextId,
    notebooks: [
        defaultNotebook
    ],
    notes: [
        {
            id: nextId(),
            notebookId: defaultNotebook.id,
            title: 'Sample Note',
            body: 'This is a sample note. You can type details in here!'
        }
    ]
};
