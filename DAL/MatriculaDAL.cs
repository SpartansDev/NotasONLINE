using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using BE;

namespace DAL
{
    public class MatriculaDAL
    {
        #region metodo que verifica que la matricula no se repita
        public int matriculaNoExist(Matricula pMatricula)
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Matriculas where Ciclo='{0}' and EstudianteId={1}";
                string sentencia = string.Format(ssql, pMatricula.Ciclo, pMatricula.EstudianteId.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if (lector.Read())
                {
                    result = 1;
                }
                else
                {
                    result = 0;
                }
                con.Close();
            }
            return result;
        }
        #endregion

        #region metodo para guardar
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
        #endregion

        #region metodo para modificar
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
        #endregion

        #region metodo para mostrar todas las matriculas existentes
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
        #endregion

        #region metodo para obtener a detalle un registro
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
        #endregion

        #region metodo para mostrar los alumnos que estan en el grupo que el profesor esta encargado
        public List<Matricula> misAlumnos(Int64 pId)
        {
            List<Matricula> lista = new List<Matricula>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select a.*,b.Id, b.ProfesorId, c.Id from Matriculas as a inner join Grupos as b on a.GrupoId=b.Id inner join Profesores as c on b.ProfesorId=c.Id where c.Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
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
        #endregion
        
        #region buscar por codigo de estudiante
        public List<Matricula> buscarPorCodigo(string pBuscar)
            
        {
            List<Matricula> lista = new List<Matricula>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = " select a.*, b.Id, b.Codigo from Matriculas as a inner join Estudiantes as b on a.EstudianteId=b.Id where b.Codigo like '%{0}%' ";
                string sentencia = string.Format(ssql, pBuscar);
                SqlCommand comando = new SqlCommand(sentencia, con);
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
        #endregion
    }
}
