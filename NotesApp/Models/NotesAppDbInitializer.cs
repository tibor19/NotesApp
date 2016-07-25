using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NotesApp.Models
{
    public class NotesAppDbInitializer : System.Data.Entity.DropCreateDatabaseAlways<NotesAppContext>
    {
        protected override void Seed(NotesAppContext context)
        {
            var notebook = new Notebook() { Title = "First Notebook", Notes = new List<Note>() };
            notebook.Notes.Add(new Note { Title = "First Note", Body = "This is the very first note added", Notebook = notebook });
            notebook.Notes.Add(new Note { Title = "Second Note", Body = "This is the second note added", Notebook = notebook });
            context.Notebooks.Add(notebook);

            base.Seed(context);
        }
    }
}