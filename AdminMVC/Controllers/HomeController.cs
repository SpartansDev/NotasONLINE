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
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion
        #region Login Profesor

        public ActionResult LoginProfe()
        {
            return View();
        }
        #endregion
        #region Login Administrador

        public ActionResult LoginAdmin()
        {
            return View();
        }
        #endregion
        #region SignOut
        public ActionResult cerrar()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            Session.RemoveAll();
            Session.Clear();
            return RedirectToAction("Index");
        }
        #endregion
        #region Metodo Login Profesor
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
        #endregion
        #region Metodo Login Administrador
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
            #endregion
        }
    }
}