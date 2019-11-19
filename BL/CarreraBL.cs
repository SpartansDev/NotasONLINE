using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
     public class CarreraBL
    {
        CarreraDAL dal = new CarreraDAL();

        public int Agregar(Carrera pCarrera)
        {
            return dal.Agregar(pCarrera);
        }
        public int Modificar(Carrera pCarrera)
        {
            return dal.Modificar(pCarrera);
        }
        public List<Carrera>Mostrar()
        {
            return dal.ListarCarrera();
        }
        public static Carrera ObtenerPorId(Int64 pId)
        {
            return CarreraDAL.ObtenerPorId(pId);
        }
    }
}
