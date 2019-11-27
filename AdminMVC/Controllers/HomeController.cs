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
            try
            {
                //pasar el id de admin mediante el ViewBag
                Administrador entidad = Session["user"] as Administrador;
                Int64 admin = entidad.Id;
                ViewBag.IdAdmin = admin;
                //pasar el id del profesor mediante el ViewBag
                Profesor entidadProfe = Session["usuario"] as Profesor;
                Int64 profesor = entidadProfe.Id;
                ViewBag.IdProf = profesor;
                return View();
            }
            catch (Exception)
            {
                return View();
            }
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
                Session["user"] = respuesta;
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