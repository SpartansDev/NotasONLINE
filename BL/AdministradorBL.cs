using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
    public class AdministradorBL
    {
        #region instancia de la clase
        AdministradorDAL dal = new AdministradorDAL();
        #endregion

        #region retornamos el metodo para verificar que email no existe
        public int EmailNoExist(Administrador pAdmin)
        {
            return dal.EmailNoExist(pAdmin);
        }
        #endregion

        #region retornamos el metodo que nos sirve para verificar que no haya un admin existente
        public int adminNoExist()
        {
            return dal.adminNoExist();
        }
        #endregion

        #region retornamos el metodo para obtener propiedades segun el id
        public static Administrador ObtenerPorId(Int64 pId)
        {
            return AdministradorDAL.obetenerPorId(pId);
        }
        #endregion

        #region retornamos el metodo para agregar administradores
        public int Agregar(Administrador pAdmin)
        {
            return dal.Agregar(pAdmin);
        }
        #endregion

        #region retornamos el metodo para modificar datos
        public int Modificar(Administrador pAdmin)
        {
            return dal.Modificar(pAdmin);
        }
        #endregion

        #region retornamos el metodo para eliminar
        public int Eliminar(Int64 pId)
        {
            return dal.Eliminar(pId);
        }
        #endregion

        #region retornamos el metodo para mostrar los administradores
        public List<Administrador> Mostrar()
        {
            return dal.ListarAdmin();
        }
        #endregion

        #region retornamos el metodo para loguear
        public Administrador LogIn(Administrador pAdmin)
        {
            return dal.Login(pAdmin);
        }
        #endregion
    }
}
