using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BE;
using BL;

namespace AdminMVC.Controllers
{
    public class CarreraController : Controller
    {
        CarreraBL bl = new CarreraBL();
        // GET: Carrera
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion
        #region Metodo Agregar Carrera
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Carrera pCarrera)
        {
            return Json(bl.Agregar(pCarrera), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Modificar
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Carrera pcarrera)
        {
            return Json(bl.Modificar(pcarrera), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo Mostrar
        [Authorize]
        [HttpGet]
        public JsonResult mostrar()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region obtener por ID
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(int pId)
        {
            return Json(CarreraBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion

    }
}