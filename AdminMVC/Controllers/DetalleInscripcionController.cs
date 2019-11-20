using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BE;
using BL;

namespace AdminMVC.Controllers
{
    public class DetalleInscripcionController : Controller
    {
        DetalleBL bl = new DetalleBL();
        // GET: DetalleInscripcion
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion
        #region Metodo Notas
        public ActionResult Notas()
        {
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
        #region Metodo Agregar Notas
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(DetalleInscripcion pDetalle)
        {
            return Json(bl.Agregar(pDetalle), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(DetalleInscripcion pDetalle)
        {
            return Json(bl.Modificar(pDetalle), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Obtener Por Id
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(DetalleBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Mostrar Notas
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}