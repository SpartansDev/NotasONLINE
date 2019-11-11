using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BE;
using DAL;

namespace BL
{
    public class ModuloBL
    {
        ModuloDAL dal = new ModuloDAL();

        public int Agregar(Modulo pMod)
        {
            return dal.Agregar(pMod);
        }
        public int Modificar(Modulo pMod)
        {
            return dal.Modificar(pMod);
        }
        public List<Modulo>Mostrar()
        {
            return dal.ListarModulo();
        }

        //buscar
        public List<Modulo> ObtenerModulo (string pBuscar)
        {
            return dal.ObtenerPorModulo(pBuscar);
        }

        public static Modulo ObtenerPorId(Int64 pId)
        {
            return ModuloDAL.ObtenerPorId(pId);
        }
    }
}
