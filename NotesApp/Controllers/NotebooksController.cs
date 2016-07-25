using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using NotesApp.Models;

namespace NotesApp.Controllers
{
    public class NotebooksController : ApiController
    {
        private NotesAppContext db = new NotesAppContext();

        // GET: api/Notebooks
        public IQueryable<Notebook> GetNotebooks()
        {
            return db.Notebooks;
        }

        // GET: api/Notebooks/5
        [ResponseType(typeof(Notebook))]
        public IHttpActionResult GetNotebook(int id)
        {
            Notebook notebook = db.Notebooks.Include(n=>n.Notes).SingleOrDefault(n=>n.Id == id);
            if (notebook == null)
            {
                return NotFound();
            }

            return Ok(notebook);
        }

        // PUT: api/Notebooks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNotebook(int id, Notebook notebook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != notebook.Id)
            {
                return BadRequest();
            }

            db.Entry(notebook).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotebookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Notebooks
        [ResponseType(typeof(Notebook))]
        public IHttpActionResult PostNotebook(Notebook notebook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Notebooks.Add(notebook);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = notebook.Id }, notebook);
        }

        // DELETE: api/Notebooks/5
        [ResponseType(typeof(Notebook))]
        public IHttpActionResult DeleteNotebook(int id)
        {
            Notebook notebook = db.Notebooks.Find(id);
            if (notebook == null)
            {
                return NotFound();
            }

            db.Notebooks.Remove(notebook);
            db.SaveChanges();

            return Ok(notebook);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NotebookExists(int id)
        {
            return db.Notebooks.Count(e => e.Id == id) > 0;
        }
    }
}