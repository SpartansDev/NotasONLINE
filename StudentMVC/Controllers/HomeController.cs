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
        #region Notas
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
        #endregion
        #region Login
        [HttpPost]
        public JsonResult Login(Estudiante pEstudiantes)
        {
            Estudiante resp = bl.LogIn(pEstudiantes);
            if (!(Request.IsAuthenticated))
            {
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
            else
            {
                return Json(Session["user"] as Estudiante, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
        #region Cerrar
        public ActionResult Cerrar()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            Session.RemoveAll();
            Session.Clear();
            return RedirectToAction("Index");
        }
        #endregion
    }
}