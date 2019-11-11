﻿using System;
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
        public ActionResult Index()
        {
            return View();
        }
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
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(DetalleInscripcion pDetalle)
        {
            return Json(bl.Agregar(pDetalle), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(DetalleInscripcion pDetalle)
        {
            return Json(bl.Modificar(pDetalle), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(DetalleBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        [HttpGet]
        public JsonResult misAlumnos(Int64 pId)
        {
            return Json(bl.misALumnos(pId), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult eliminar(Int64 pId)
        {
            return Json(bl.eliminar(pId), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
    }
}