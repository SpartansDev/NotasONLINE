using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using BE;

namespace BL
{
    public class MatriculaBL
    {
        MatriculaDAL dal = new MatriculaDAL();
        public int Agregar(Matricula pMatricula)
        {
            return dal.Agregar(pMatricula);
        }
        public int Modificar(Matricula pMatricula)
        {
            return dal.Modificar(pMatricula);
        }
        public List<Matricula>Mostrar()
        {
            return dal.ListarMatricula();
        }
        public static Matricula ObtenerPorId(Int64 pId)
        {
            return MatriculaDAL.ObtenerPorId(pId);
        }
    }
}
