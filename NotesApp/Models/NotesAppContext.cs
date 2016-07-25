using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace NotesApp.Models
{
    public class NotesAppContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public NotesAppContext() : base("name=NotesAppContext")
        {
            Database.SetInitializer(new NotesAppDbInitializer());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>().HasRequired(n=> n.Notebook).WithMany(nb => nb.Notes);
        }

        public System.Data.Entity.DbSet<NotesApp.Models.Notebook> Notebooks { get; set; }
        public System.Data.Entity.DbSet<NotesApp.Models.Note> Notes { get; set; }
    }
}
