using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BE;
using BL;

namespace AdminMVC.Controllers
{
    public class ProfesorController : Controller
    {
        ProfesorBL bl = new ProfesorBL();
        // GET: Profesor
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion
        #region Perfil
        public ActionResult Perfil()
        {
           // return View();
            try
            {
            Profesor entidad = Session["usuario"] as Profesor;
            Int64 profesor = entidad.Id;
            ViewBag.IdProfesor = profesor;
            return View();
            }
            catch (Exception)
            {
                return Redirect("/Home/Index");
            }
        }
        #endregion
        #region Agregar
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Profesor pp)
        {
            return Json(bl.Agregar(pp), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Modificar
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Profesor pp)
        {
            return Json(bl.Modificar(pp), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Mostrar
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Obtener Por Id
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(ProfesorBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Existe Profesor
        [Authorize]
        [HttpPost]
        public JsonResult ExisteProfesor(Profesor pProfesor)
        {
            return Json(bl.ProfesorNoExiste(pProfesor), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}