using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BE;
using BL;

namespace AdminMVC.Controllers
{
    public class ModuloController : Controller
    {
        ModuloBL bl = new ModuloBL();
        // GET: Modulo
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion
        #region Obtener
        [Authorize]
        [HttpGet]
        public JsonResult Obtener()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Obtener Por Id
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(ModuloBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Agregar
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Modulo pMod)
        {
            return Json(bl.Agregar(pMod), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Modificar
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Modulo pMod)
        {
            return Json(bl.Modificar(pMod), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Buscar
        //buscar  
        [Authorize]
        [HttpGet]
        public JsonResult BuscarModulo(string pBuscar)
        {
            return Json(bl.ObtenerModulo(pBuscar), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region mostrar Modulo Segun Carrera
        [HttpGet]
        public JsonResult moduloPorCarrera(Int64 pId)
        {
            return Json(bl.ModulosSegunCarrera(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}