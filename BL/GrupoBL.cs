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

        #region retornamos el metodo para eliminar
        public int Eliminar(Int64 pId)
        {
            return dal.Eliminar(pId);
        }
        #endregion
        public int Modificar(Grupo pGrupo)
        {
            return dal.Modificar(pGrupo);
        }
        public List<Grupo>Mostrar()
        {
            return dal.ListarGrupos();
        }
        
        public List<Grupo> ObtenerGrupo(string pBuscar)
        {
            return dal.ObtenerGrupos(pBuscar);
        }
        public static Grupo ObtenerPoId(Int64 pId)
        {
            return GrupoDAL.ObtenerPorId(pId);
        }
    }
}
