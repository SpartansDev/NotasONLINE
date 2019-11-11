using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BE;
using BL;

namespace AdminMVC.Controllers
{
    public class AdministradorController : Controller
    {
        AdministradorBL bl = new AdministradorBL();
        // GET: Administrador
        public ActionResult Index()
        {
            return View();
        }
        [Authorize]
        [HttpPost]
        public JsonResult EmailNoExist(Administrador pAdmin)
        {
            return Json(bl.EmailNoExist(pAdmin), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(AdministradorBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Administrador pAdmin)
        {
            return Json(bl.Agregar(pAdmin), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult registrar(Administrador pAdmin)
        {
            return Json(bl.Agregar(pAdmin), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost] 
        public JsonResult Modificar(Administrador pAdmin)
        {
            return Json(bl.Modificar(pAdmin), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult Eliminar(Int64 pId)
        {
            return Json(bl.Eliminar(pId), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult adminNoExist()
        {
            return Json(bl.adminNoExist(), JsonRequestBehavior.AllowGet);
        }
    }
}