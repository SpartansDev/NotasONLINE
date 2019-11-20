using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
    public class ProfesorBL
    {
        #region instancia de la clase
        ProfesorDAL dal = new ProfesorDAL();
        #endregion

        #region retornamos el metodo para verificar que el email no se repita
        public int ProfesorNoExiste(Profesor pProfe)
        {
            return dal.ProfesorNoExiste(pProfe);
        }
        #endregion

        #region retornamos el metodo para loguear
        public Profesor Login(Profesor pProfesor)
        {
            return dal.Login(pProfesor);
        }
        #endregion

        #region retornamos el metodo para agregar
        public int Agregar(Profesor pPro)
        {
            return dal.Agregar(pPro);
        }
        #endregion

        #region retornamos el metodo para modificar
        public int Modificar(Profesor pPro)
        {
            return dal.Modificar(pPro);
        }
        #endregion

        #region retornamos el metodo para mostrar
        public List<Profesor>Mostrar()
        {
            return dal.ListarProfesores();
        }
        #endregion

        #region retornamos el metodo para obtener las propiedades segun el id
        public static Profesor ObtenerPorId(Int64 pId)
        {
            return ProfesorDAL.ObtenerPorId(pId);
        }
        #endregion
    }
}
