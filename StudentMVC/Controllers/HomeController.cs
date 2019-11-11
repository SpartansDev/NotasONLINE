using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//Namespaces
using System.Web.Security;
using BE;
using BL;

namespace StudentMVC.Controllers
{
    public class HomeController : Controller
    {
        EstudianteBL bl = new EstudianteBL();
        DetalleBL nota = new DetalleBL();

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Notas()
        {
            try
            {
                Estudiante student = Session["user"] as Estudiante;
                Int64 estudiante = student.Id;
                ViewBag.Idstudent = estudiante;
                return View();
            }
            catch(Exception)
            {
                return RedirectToAction("Index");
            }

        }
        [HttpPost]
        public JsonResult Login(Estudiante pEstudiantes)
        {
            Estudiante resp = bl.LogIn(pEstudiantes);
            if (resp != null)
            {
                FormsAuthentication.SetAuthCookie(resp.Codigo, false);
                Session["user"] = resp;
                return Json(resp, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(resp, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Cerrar()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            Session.Clear();
            return RedirectToAction("Index");
        }
    }
}