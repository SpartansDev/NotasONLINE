using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//Namespaces
using System.Web.Security;
using BE;
using BL;

namespace StudentMVC.Controllers
{
    public class EstudianteController : Controller
    {
        EstudianteBL bl = new EstudianteBL();
        DetalleBL nota = new DetalleBL();
   
        [Authorize]
        [HttpGet]
        public JsonResult Nota(Int64 pId)
        {
            Int64 id = 0;
            Estudiante dato = Session["user"] as Estudiante;
            id = dato.Id;
            return Json(nota.NotasPorEstudianteId(id), JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        [HttpGet]
        public JsonResult Alumno(Int64 pId)
        {
            return Json(EstudianteBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
    }
}