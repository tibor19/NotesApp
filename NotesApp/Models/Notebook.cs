using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NotesApp.Models
{
    public class Notebook
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<Note> Notes { get; set; }
    }
}