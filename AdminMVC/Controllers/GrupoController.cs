using BE;
using BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminMVC.Controllers
{
    public class GrupoController : Controller
    {
        GrupoBL bl = new GrupoBL();
        // GET: Grupo
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion
        #region Metodo Agregar
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Grupo pg)
        {
            return Json(bl.Agregar(pg), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Modificar
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Grupo pcarrera)
        {
            return Json(bl.Modificar(pcarrera), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Mostrar
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Obtener por Id
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(GrupoBL.ObtenerPoId(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Buscar por Grupo
        //buscar  
        [Authorize]
        [HttpGet]
        public JsonResult BuscarGrupo(string pBuscar)
        {
            return Json(bl.ObtenerGrupo(pBuscar), JsonRequestBehavior.AllowGet);
        }
        #endregion

    }
}