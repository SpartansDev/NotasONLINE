using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
    public class ModuloBL
    {
        #region instancia de la clase
        ModuloDAL dal = new ModuloDAL();
        #endregion

        #region retornamos el metodo para agregar
        public int Agregar(Modulo pMod)
        {
            return dal.Agregar(pMod);
        }
        #endregion

        #region retornamos el metodo para modificar
        public int Modificar(Modulo pMod)
        {
            return dal.Modificar(pMod);
        }
        #endregion

        #region retornamos el metodo para mostrar
        public List<Modulo>Mostrar()
        {
            return dal.ListarModulo();
        }
        #endregion

        #region retornamos el metodo para buscar por nombre
        public List<Modulo> ObtenerModulo (string pBuscar)
        {
            return dal.ObtenerPorModulo(pBuscar);
        }
        #endregion

        #region retornamos el metodo para obtener las propiedades segun el id
        public static Modulo ObtenerPorId(Int64 pId)
        {
            return ModuloDAL.ObtenerPorId(pId);
        }
        #endregion
    }
}
