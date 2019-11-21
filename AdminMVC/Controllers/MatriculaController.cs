using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BE;
using BL;

namespace AdminMVC.Controllers
{
    public class MatriculaController : Controller
    {
        MatriculaBL bl = new MatriculaBL();
        // GET: Matricula
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion
        #region Matricula
        public ActionResult Matricula()
        {
            return View();
        }
        #endregion
        #region Agregar

        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Matricula pMatricula)
        {
            return Json(bl.Agregar(pMatricula), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Modificar
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Matricula pMatricula)
        {
            return Json(bl.Modificar(pMatricula), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Obtener Por Id
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(MatriculaBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Mostrar
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(),JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Buscar Por Codigo
        [Authorize]
        [HttpGet]
        public JsonResult buscarPorCodigo(string pText)
        {
            return Json(bl.buscarCodigo(pText), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region verificar
        public JsonResult verificar(Matricula pMatricula)
        {
            return Json(bl.verificar(pMatricula), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Alumnos
        [Authorize]
        [HttpGet]
        public JsonResult misAlumnos(Int64 pId)
        {
            return Json(bl.misAlumnos(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}