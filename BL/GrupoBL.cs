using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
    public class GrupoBL
    {
        GrupoDAL dal = new GrupoDAL();

        public int Agregar(Grupo pGrupo)
        {
            return dal.Agregar(pGrupo);
        }
        public int Eliminar(Int64 pId)
        {
            return dal.Eliminar(pId);
        }
        public int Modificar(Grupo pGrupo)
        {
            return dal.Modificar(pGrupo);
        }
        public List<Grupo>Mostrar()
        {
            return dal.ListarGrupos();
        }

        //buscar
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
