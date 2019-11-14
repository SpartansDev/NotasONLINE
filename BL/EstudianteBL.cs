using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BE;
using DAL;

namespace BL
{
    public class EstudianteBL
    {
        EstudianteDAL dal = new EstudianteDAL();
        public int CodigoNoExiste(Estudiante pEstudiante)
        {
            return dal.codigoNoExist(pEstudiante);
        }
        public int Agregar(Estudiante pEstudiante)
        {
            return dal.Agregar(pEstudiante);
        }
        public int Modificar(Estudiante pEstudiante)
        {
            return dal.Modificar(pEstudiante);
        }
        public List<Estudiante>Mostrar()
        {
            return dal.ListarEstudiante();
        }
        public static Estudiante ObtenerPorId(Int64 pId)
        {
            return EstudianteDAL.ObtenerPorId(pId);
        }
        //buscar
        public List<Estudiante> ObtenerPorNombre(string pBuscar)
        {
            return dal.ObtenerPorEstudiante(pBuscar);
        }
        public Estudiante LogIn(Estudiante pEstudiante)
        {
            return dal.Login(pEstudiante);
        }


        //////////////////////////////////////estudiante activo///////////////////

        public List<Estudiante> estudiantesActivo()
        {
            return dal.EstudianteActivo();
        }
    }
}
