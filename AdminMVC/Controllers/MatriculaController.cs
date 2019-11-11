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
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Matricula()
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Matricula pMatricula)
        {
            return Json(bl.Agregar(pMatricula), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Matricula pMatricula)
        {
            return Json(bl.Modificar(pMatricula), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(MatriculaBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(),JsonRequestBehavior.AllowGet);
        }
    }
}