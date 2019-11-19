using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BE;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    public class EstudianteDAL
    {
        #region metodo para verificar que el codigo no se repita
        public int codigoNoExist(Estudiante pEstudiante)
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Estudiantes Where Codigo='{0}'";
                string sentencia = string.Format(ssql, pEstudiante.Codigo);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if(lector.Read())
                {
                    result = 1;
                }
                else
                {
                    result = 0;
                }
            }
            return result;
        }
        #endregion

        #region metodo para agregar
        public int Agregar(Estudiante pEstudiante)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "insert into Estudiantes(NombreEstudiante, ApellidoEstudiante, Codigo, CarreraId,Contraseña, StatusStudent)values('{0}','{1}','{2}',{3},'{4}',{5})";
                string sentencia = string.Format(ssql, pEstudiante.NombreEstudiante, pEstudiante.ApellidoEstudiante, pEstudiante.Codigo, pEstudiante.CarreraId.Id, pEstudiante.Contraseña, pEstudiante.StatusStudent);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        #endregion

        #region metodo para modificar
        public int Modificar(Estudiante pEstudiante)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "update Estudiantes set NombreEstudiante='{0}', ApellidoEstudiante='{1}', Codigo='{2}',CarreraId={3}, Contraseña='{4}', StatusStudent={5} where Id={6}";
                string sentencia = string.Format(ssql, pEstudiante.NombreEstudiante, pEstudiante.ApellidoEstudiante, pEstudiante.Codigo, pEstudiante.CarreraId.Id, pEstudiante.Contraseña, pEstudiante.StatusStudent, pEstudiante.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        #endregion

        #region metodo para mostrar los registros existentes
        public List<Estudiante> ListarEstudiante()
        {
            List<Estudiante> lista = new List<Estudiante>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Estudiantes order by Id desc";
                SqlCommand comando = new SqlCommand(ssql, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while (lector.Read())
                {
                    lista.Add(new Estudiante(lector.GetInt64(0),
                                           lector.GetString(1),
                                           lector.GetString(2),
                                           lector.GetString(3),
                                           CarreraDAL.ObtenerPorId(lector.GetInt64(4)),
                                           lector.GetString(5),
                                           lector.GetInt64(6)));
                }
                con.Close();
            }
            return lista;
        }
        #endregion

        #region metodo para mostrar a detalle un registro
        public static Estudiante ObtenerPorId(Int64 pId)
        {
            Estudiante estud = new Estudiante();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Estudiantes where Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if (lector.Read())
                {
                    estud.Id = lector.GetInt64(0);
                    estud.NombreEstudiante = lector.GetString(1);
                    estud.ApellidoEstudiante = lector.GetString(2);
                    estud.Codigo = lector.GetString(3);
                    estud.CarreraId = CarreraDAL.ObtenerPorId(lector.GetInt64(4));
                    estud.Contraseña = lector.GetString(5);
                    estud.StatusStudent = lector.GetInt64(6);
                }
                con.Close();
            }
            return estud;
        }
        #endregion

        #region metodo para buscar un registro por nombre o codigo
        //buscar
        public List<Estudiante> ObtenerPorEstudiante(string pBuscar)
        {
            List<Estudiante> lista = new List<Estudiante>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "SELECT * FROM Estudiantes WHERE NombreEstudiante  like '%{0}%' or Codigo like '%{0}%'";
                string sentencia = string.Format(ssql, pBuscar);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader reader = comando.ExecuteReader();
                while(reader.Read())
                {
                    lista.Add(new Estudiante(reader.GetInt64(0), 
                                             reader.GetString(1), 
                                             reader.GetString(2), 
                                             reader.GetString(3), 
                                             CarreraDAL.ObtenerPorId(reader.GetInt64(4)), 
                                             reader.GetString(5),
                                             reader.GetInt64(6)));
                }
                con.Close();
            }
            return lista;
        }
        #endregion

        #region metodo para loguear
        public Estudiante Login(Estudiante pEstudiante)
        {
            Estudiante BE = new Estudiante();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Estudiantes where Codigo='{0}'";
                string sentencia = string.Format(ssql, pEstudiante.Codigo);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if (lector.Read())
                {
                    if (lector["Contraseña"].ToString() == pEstudiante.Contraseña)
                    {
                        BE.Id = lector.GetInt64(0);
                        BE.NombreEstudiante = lector.GetString(1);
                        BE.ApellidoEstudiante = lector.GetString(2);
                        BE.Codigo = lector.GetString(3);
                        BE.CarreraId = CarreraDAL.ObtenerPorId(lector.GetInt64(4));
                        BE.Contraseña = lector.GetString(5);
                        BE.StatusStudent = lector.GetInt64(6);
                    }
                    else
                    {
                        BE = null;
                    }
                }
                else
                {
                    BE = null;
                    con.Close();
                }
                return BE;
            }
        }
        #endregion

        #region metodo para mostrar los estudiantes activos
        public List<Estudiante> EstudianteActivo()
        {
            List<Estudiante> lista = new List<Estudiante>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Estudiantes where StatusStudent = 1";
                SqlCommand comando = new SqlCommand(ssql, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while (lector.Read())
                {
                    lista.Add(new Estudiante(lector.GetInt64(0),
                                           lector.GetString(1),
                                           lector.GetString(2),
                                           lector.GetString(3),
                                           CarreraDAL.ObtenerPorId(lector.GetInt64(4)),
                                           lector.GetString(5),
                                           lector.GetInt64(6)));
                }
                con.Close();
            }
            return lista;
        }
        #endregion

    }
}
