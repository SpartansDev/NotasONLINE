using BE;
using BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace AdminMVC.Controllers
{
    public class EstudianteController : Controller
    {
        EstudianteBL bl = new EstudianteBL();
        // GET: Estudiante
        public ActionResult Index()
        {
            return View();
        }
        [Authorize]
        [HttpGet]
        public JsonResult Mostrar()
        {
            return Json(bl.Mostrar(), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult CodigoNoExist(Estudiante pEstudiante)
        {
            return Json(bl.CodigoNoExiste(pEstudiante), JsonRequestBehavior.AllowGet);
        }

        //buscar  
        [Authorize]
        [HttpGet]
        public JsonResult Buscar(string pBuscar)
        {
            return Json(bl.ObtenerPorNombre(pBuscar), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpGet]
        public JsonResult ObtenerPorId(Int64 pId)
        {
            return Json(EstudianteBL.ObtenerPorId(pId), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult Agregar(Estudiante pStudent)
        {
            return Json(bl.Agregar(pStudent), JsonRequestBehavior.AllowGet);
        }
        [Authorize]
        [HttpPost]
        public JsonResult Modificar(Estudiante pStudent)
        {
            return Json(bl.Modificar(pStudent), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Login(Estudiante pEstudiantes)
        {
            Estudiante resp = bl.LogIn(pEstudiantes);
            if (resp != null)
            {
                FormsAuthentication.SetAuthCookie(resp.Codigo, false);
                Session["user"] = resp;
                return Json(resp, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(resp, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Cerrar()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return RedirectToAction("Index");
        }


        //estudiante activo
        [Authorize]
        [HttpGet]
        public JsonResult alumnosActivo()
        {
            return Json(bl.estudiantesActivo(), JsonRequestBehavior.AllowGet);
        }

    }
}