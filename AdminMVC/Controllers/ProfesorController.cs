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
        public ActionResult Index()
        {
            return View();
        }
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
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Profesor pp)
        {
            return Json(bl.Agregar(pp), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Profesor pp)
        {
            return Json(bl.Modificar(pp), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(ProfesorBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult ExisteProfesor(Profesor pProfesor)
        {
            return Json(bl.ProfesorNoExiste(pProfesor), JsonRequestBehavior.AllowGet);
        }
    }
}