using System;
using System.Collections.Generic;
using DAL;
using BE;

namespace BL
{
    public class MatriculaBL
    {
        #region instancia de la clase
        MatriculaDAL dal = new MatriculaDAL();
        #endregion

        #region retornamos el metodo para agregar
        public int Agregar(Matricula pMatricula)
        {
            return dal.Agregar(pMatricula);
        }
        #endregion

        #region retornamos el metodo para modificar
        public int Modificar(Matricula pMatricula)
        {
            return dal.Modificar(pMatricula);
        }
        #endregion

        #region retornamos el metodo para mostrar
        public List<Matricula>Mostrar()
        {
            return dal.ListarMatricula();
        }
        #endregion

        #region retornamos el metodo para mostrarle los alumnos de su grupo a profesor
        public List<Matricula> misAlumnos(Int64 pId)
        {
            return dal.misAlumnos(pId);
        }
        #endregion

        #region retornamos el metodo para buscar por codigo de estudiante
        public List<Matricula> buscarCodigo(string pBuscar)
        {
            return dal.buscarPorCodigo(pBuscar);
        }
        #endregion

        #region retornamos el metodo para obtener propiedades por id
        public static Matricula ObtenerPorId(Int64 pId)
        {
            return MatriculaDAL.ObtenerPorId(pId);
        }
        #endregion
    }
}
