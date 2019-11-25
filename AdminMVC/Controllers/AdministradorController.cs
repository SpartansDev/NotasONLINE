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
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion

        #region Metodo cuando el email no existe
        [Authorize]
        [HttpPost]
        public JsonResult EmailNoExist(Administrador pAdmin)
        {
            return Json(bl.EmailNoExist(pAdmin), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Metodo obtener por ID
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(AdministradorBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo agregar Administrador
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Administrador pAdmin)
        {
            return Json(bl.Agregar(pAdmin), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo registrar administrador
        [HttpPost]
        public JsonResult registrar(Administrador pAdmin)
        {
            return Json(bl.Agregar(pAdmin), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo modificar Administrador
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Administrador pAdmin)
        {
            return Json(bl.Modificar(pAdmin), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo mostrar administrador
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Metodo cuando el administrador no existe
        [HttpPost]
        public JsonResult adminNoExist()
        {
            return Json(bl.adminNoExist(), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}