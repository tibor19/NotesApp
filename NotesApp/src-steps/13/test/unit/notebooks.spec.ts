import {Notes} from 'notebooks/index';

describe('the notebooks index view-model', () => {
  let notes;
  let server;
  
  beforeEach(() => {
    server = jasmine.createSpyObj('server', ['getNotebookList', 'createNotebook']);
    notes = new Notes(server);
  });
  
  it('should load the notebookList when it activates', done => {
    let serverResults = [];
    server.getNotebookList.and.returnValue(Promise.resolve(serverResults));
    
    notes.activate().then(() => {
      expect(server.getNotebookList).toHaveBeenCalled();
      expect(notes.notebookList).toEqual(serverResults);
      done();
    });
  });
});