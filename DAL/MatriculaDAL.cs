using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using BE;

namespace DAL
{
    public class MatriculaDAL
    {
        public int Agregar(Matricula pMatricula)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "insert into Matriculas(Año, Ciclo, CarreraId,EstudianteId,GrupoId)values('{0}','{1}',{2},{3},{4})";
                string sentencia = string.Format(ssql, pMatricula.Año, pMatricula.Ciclo, pMatricula.CarreraId.Id, pMatricula.EstudianteId.Id ,pMatricula.GrupoId.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        public int Modificar(Matricula pMatricula)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = @"update Matriculas set Año='{0}',
                                                      Ciclo='{1}',
                                                      CarreraId={2},
                                                      EstudianteId={3},
                                                      GrupoId={4} where Id={5}";
                string sentencia = string.Format(ssql, pMatricula.Año, pMatricula.Ciclo, pMatricula.CarreraId.Id, pMatricula.EstudianteId.Id, pMatricula.GrupoId.Id,pMatricula.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        public List<Matricula> ListarMatricula()
        {
            List<Matricula> lista = new List<Matricula>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Matriculas";
                SqlCommand comando = new SqlCommand(ssql, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while (lector.Read())
                {
                    lista.Add(new Matricula(lector.GetInt64(0),
                                            lector.GetString(1),
                                            lector.GetString(2),
                                            CarreraDAL.ObtenerPorId(lector.GetInt64(3)),
                                            EstudianteDAL.ObtenerPorId(lector.GetInt64(4)),
                                            GrupoDAL.ObtenerPorId(lector.GetInt64(5))));
                }
                con.Close();
            }
            return lista;
        }
        public static Matricula ObtenerPorId(Int64 pId)
        {
            Matricula matricula = new Matricula();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Matriculas where Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if (lector.Read())
                {
                    matricula.Id = lector.GetInt64(0);
                    matricula.Año = lector.GetString(1);
                    matricula.Ciclo = lector.GetString(2);
                    matricula.CarreraId = CarreraDAL.ObtenerPorId(lector.GetInt64(3));
                    matricula.EstudianteId = EstudianteDAL.ObtenerPorId(lector.GetInt64(4));
                    matricula.GrupoId = GrupoDAL.ObtenerPorId(lector.GetInt64(5));
                }
                con.Close();
            }
            return matricula;
        }
    }
}
