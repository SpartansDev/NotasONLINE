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
        #region vista Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion

        #region vista Notas
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
        #endregion

        #region modificar
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

        #region metodo para verificar que no se repitan los modulos en un ciclo
        public JsonResult verificarModulos(DetalleInscripcion pDetalle)
        {
            return Json(bl.verificarModulo(pDetalle), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region mostrar notas por la foranea EstudianteId
        public JsonResult notasAlumnoPorId(Int64 pId)
        {
            return Json(bl.NotasPorEstudianteId(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region mostrale los modulos inscritos al profesor
        public JsonResult modulosDeMiGrupo(Int64 pId)
        {
            return Json(bl.modulosDeMiGrupo(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}