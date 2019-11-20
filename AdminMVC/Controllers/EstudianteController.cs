using BE;
using BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace AdminMVC.Controllers
{
    public class EstudianteController : Controller
    {
        EstudianteBL bl = new EstudianteBL();
        // GET: Estudiante
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion
        #region Metodo Mostrar Alumno
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Codigo no Existe
        [Authorize]
        [HttpPost]
        public JsonResult CodigoNoExist(Estudiante pEstudiante)
        {
            return Json(bl.CodigoNoExiste(pEstudiante), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Buscar
        //buscar  
        [Authorize]
        [HttpGet]
        public JsonResult Buscar(string pBuscar)
        {
            return Json(bl.ObtenerPorNombre(pBuscar), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Obtener por Id
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(EstudianteBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Agregar Estudiante
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Estudiante pStudent)
        {
            return Json(bl.Agregar(pStudent), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Modificar Estudiante
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Estudiante pStudent)
        {
            return Json(bl.Modificar(pStudent), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Login Estudiante
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
        #endregion
        #region Metodo SignOut
        public ActionResult Cerrar()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return RedirectToAction("Index");
        }
        #endregion
        #region Metodo Estudiante Activo
        //estudiante activo
        [Authorize]
        [HttpGet]
        public JsonResult alumnosActivo()
        {
            return Json(bl.estudiantesActivo(), JsonRequestBehavior.AllowGet);
        }
        #endregion

    }
}