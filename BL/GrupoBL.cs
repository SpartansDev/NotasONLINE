using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
    public class GrupoBL
    {
        #region instacia de la clase
        GrupoDAL dal = new GrupoDAL();
        #endregion

        #region retornamos el metodo para agregar
        public int Agregar(Grupo pGrupo)
        {
            return dal.Agregar(pGrupo);
        }
        #endregion
        

        #region retornamos el metodo para modificar
        public int Modificar(Grupo pGrupo)
        {
            return dal.Modificar(pGrupo);
        }
        #endregion

        #region retornamos el metodo para mostrar
        public List<Grupo>Mostrar()
        {
            return dal.ListarGrupos();
        }
        #endregion

        #region retornamos el metodo para buscar por nombre
        public List<Grupo> ObtenerGrupo(string pBuscar)
        {
            return dal.ObtenerGrupos(pBuscar);
        }
        #endregion

        #region retornamos el metodo para obtener propiedades por id
        public static Grupo ObtenerPoId(Int64 pId)
        {
            return GrupoDAL.ObtenerPorId(pId);
        }
        #endregion
    }
}
