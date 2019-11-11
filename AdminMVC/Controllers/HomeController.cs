using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using BE;
using BL;

namespace AdminMVC.Controllers
{
    public class HomeController : Controller
    {
        ProfesorBL profe = new ProfesorBL();
        AdministradorBL admin = new AdministradorBL();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LoginProfe()
        {
            return View();
        }

        public ActionResult LoginAdmin()
        {
            return View();
        }

        public ActionResult cerrar()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            Session.RemoveAll();
            return RedirectToAction("Index");
        }
        [HttpPost]
        public JsonResult Login(Profesor pProfesor)
        {
            Profesor respuesta = profe.Login(pProfesor);
            if(respuesta != null)
            {
                FormsAuthentication.SetAuthCookie(respuesta.Email, false);
                Session["usuario"] = respuesta;
                return Json(respuesta, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(respuesta, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Inicio(Administrador pAdmin)
        {
            Administrador respuesta = admin.LogIn(pAdmin);
            if (respuesta != null)
            {
                FormsAuthentication.SetAuthCookie(respuesta.Email, false);
                Session["usuario"] = respuesta;
                return Json(respuesta, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(respuesta, JsonRequestBehavior.AllowGet);
            }
        }
    }
}