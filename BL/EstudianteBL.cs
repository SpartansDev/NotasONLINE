using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
    public class EstudianteBL
    {
        #region instancia de la cles
        EstudianteDAL dal = new EstudianteDAL();
        #endregion

        #region retornamos el metodo para verificar que el codigo no se repita
        public int CodigoNoExiste(Estudiante pEstudiante)
        {
            return dal.codigoNoExist(pEstudiante);
        }
        #endregion

        #region retornamos el metodo para agregar
        public int Agregar(Estudiante pEstudiante)
        {
            return dal.Agregar(pEstudiante);
        }
        #endregion

        #region retornamos el metodo para modificar
        public int Modificar(Estudiante pEstudiante)
        {
            return dal.Modificar(pEstudiante);
        }
        #endregion

        #region retornamos el metodo para mostrar
        public List<Estudiante>Mostrar()
        {
            return dal.ListarEstudiante();
        }
        #endregion

        #region retornamos el metodo para obtener propiedades segun el id
        public static Estudiante ObtenerPorId(Int64 pId)
        {
            return EstudianteDAL.ObtenerPorId(pId);
        }
        #endregion

        #region retornamos el metodo para buscar por nombre
        public List<Estudiante> ObtenerPorNombre(string pBuscar)
        {
            return dal.ObtenerPorEstudiante(pBuscar);
        }
        #endregion

        #region retornamos el metodo para loguear
        public Estudiante LogIn(Estudiante pEstudiante)
        {
            return dal.Login(pEstudiante);
        }
        #endregion

        #region retornamos el metodo para mostrar solo los alumnos activos
        public List<Estudiante> estudiantesActivo()
        {
            return dal.EstudianteActivo();
        }
        #endregion
    }
}
