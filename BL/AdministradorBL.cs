using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BE;
using DAL;

namespace BL
{
    public class AdministradorBL
    {
        AdministradorDAL dal = new AdministradorDAL();
        public int EmailNoExist(Administrador pAdmin)
        {
            return dal.EmailNoExist(pAdmin);
        }
        public int adminNoExist()
        {
            return dal.adminNoExist();
        }
        public static Administrador ObtenerPorId(Int64 pId)
        {
            return AdministradorDAL.obetenerPorId(pId);
        }
        public int Agregar(Administrador pAdmin)
        {
            return dal.Agregar(pAdmin);
        }
        public int Modificar(Administrador pAdmin)
        {
            return dal.Modificar(pAdmin);
        }
        public int Eliminar(Int64 pId)
        {
            return dal.Eliminar(pId);
        }
        public List<Administrador> Mostrar()
        {
            return dal.ListarAdmin();
        }

        public Administrador LogIn(Administrador pAdmin)
        {
            return dal.Login(pAdmin);
        }
    }
}
