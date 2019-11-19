using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
    public class ProfesorBL
    {
        ProfesorDAL dal = new ProfesorDAL();
        public int ProfesorNoExiste(Profesor pProfe)
        {
            return dal.ProfesorNoExiste(pProfe);
        }
        public Profesor Login(Profesor pProfesor)
        {
            return dal.Login(pProfesor);
        }
        public int Agregar(Profesor pPro)
        {
            return dal.Agregar(pPro);
        }
        public int Modificar(Profesor pPro)
        {
            return dal.Modificar(pPro);
        }
        public List<Profesor>Mostrar()
        {
            return dal.ListarProfesores();
        }
        public static Profesor ObtenerPorId(Int64 pId)
        {
            return ProfesorDAL.ObtenerPorId(pId);
        }
    }
}
