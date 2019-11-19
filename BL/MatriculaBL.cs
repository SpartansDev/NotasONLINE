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
        public int verificar(Matricula pMatricual)
        {
            return dal.matriculaNoExist(pMatricual);
        }
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
        public List<Matricula> misAlumnos(Int64 pId)
        {
            return dal.misAlumnos(pId);
        }
        public List<Matricula> buscarCodigo(string pBuscar)
        {
            return dal.buscarPorCodigo(pBuscar);
        }
        public static Matricula ObtenerPorId(Int64 pId)
        {
            return MatriculaDAL.ObtenerPorId(pId);
        }
    }
}
