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
        public ActionResult Index()
        {
            return View();
        }
        [Authorize]
        [HttpGet]
        public JsonResult Obtener()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(ModuloBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Modulo pMod)
        {
            return Json(bl.Agregar(pMod), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Modulo pMod)
        {
            return Json(bl.Modificar(pMod), JsonRequestBehavior.AllowGet);
        }

        //buscar  
        [Authorize]
        [HttpGet]
        public JsonResult BuscarModulo(string pBuscar)
        {
            return Json(bl.ObtenerModulo(pBuscar), JsonRequestBehavior.AllowGet);
        }
    }
}