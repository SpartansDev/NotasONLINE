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
    public class GrupoDAL
    {
        public int Agregar(Grupo pGrupo)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "insert into Grupos(NombreGrupo,Turno,CarreraId,ProfesoresId)values('{0}','{1}',{2},{3})";
                string sentencia = string.Format(ssql, pGrupo.NombreGrupo, pGrupo.Turno, pGrupo.CarreraId.Id, pGrupo.ProfesorId.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        public int Modificar(Grupo pGrupo)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = @"update Grupos set NombreGrupo='{0}',
                                                  Turno='{1}',
                                                  CarreraId={2},
                                                  ProfesorId={3}
                                                  where Id={4}";
                string sentencia = string.Format(ssql, pGrupo.NombreGrupo, pGrupo.Turno, pGrupo.CarreraId.Id, pGrupo.ProfesorId.Id, pGrupo.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }


        //metodo buscar

        public List<Grupo> ObtenerGrupos(string pBuscar)
        {
            List<Grupo> lista = new List<Grupo>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Grupos where NombreGrupo like '%{0}%'";
                string sentencia = string.Format(ssql, pBuscar);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while (lector.Read())
                {
                    lista.Add(new Grupo(lector.GetInt64(0),
                                           lector.GetString(1),
                                           lector.GetString(2),
                                           CarreraDAL.ObtenerPorId(lector.GetInt64(3)),
                                           ProfesorDAL.ObtenerPorId(lector.GetInt64(4))));
                }
                con.Close();
            }
            return lista;
        } 

        public int Eliminar(Int64 pId)
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = @"delete from Grupos where Id={0}";
                string sentencia = string.Format(ssql,pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                result = comando.ExecuteNonQuery();
                con.Close();
            }
            return result;
        }
        public static Grupo ObtenerPorId(Int64 pId)
        {
            Grupo grupo = new Grupo();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Grupos where Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if (lector.Read())
                {
                    grupo.Id = lector.GetInt64(0);
                    grupo.NombreGrupo = lector.GetString(1);
                    grupo.Turno = lector.GetString(2);
                    grupo.CarreraId = CarreraDAL.ObtenerPorId(lector.GetInt64(3));
                    grupo.ProfesorId = ProfesorDAL.ObtenerPorId(lector.GetInt64(4));
                }
                con.Close();
            }
            return grupo;
        }
        public List<Grupo>ListarGrupos()
        {
            List<Grupo> grupo = new List<Grupo>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Grupos";
                SqlCommand comando = new SqlCommand(ssql, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while(lector.Read())
                {
                    grupo.Add(new Grupo(lector.GetInt64(0),
                                        lector.GetString(1),
                                        lector.GetString(2),
                                        CarreraDAL.ObtenerPorId(lector.GetInt64(3)),
                                        ProfesorDAL.ObtenerPorId(lector.GetInt64(4))));
                }
                con.Close();
            }
            return grupo;
        }
    }
}
