using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
     public class CarreraBL
    {
        #region instancia de la clase
        CarreraDAL dal = new CarreraDAL();
        #endregion

        #region retornamos el metodo para agregar
        public int Agregar(Carrera pCarrera)
        {
            return dal.Agregar(pCarrera);
        }
        #endregion

        #region retornamos el metodo para modificar
        public int Modificar(Carrera pCarrera)
        {
            return dal.Modificar(pCarrera);
        }
        #endregion

        #region retornamos el metodo para mostrar
        public List<Carrera>Mostrar()
        {
            return dal.ListarCarrera();
        }
        #endregion

        #region retornamos el metodo para obtener propiedades por el id
        public static Carrera ObtenerPorId(Int64 pId)
        {
            return CarreraDAL.ObtenerPorId(pId);
        }
        #endregion
    }
}
