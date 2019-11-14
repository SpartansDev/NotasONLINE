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
    public class ModuloDAL
    {
        #region metodo para agregar
        public int Agregar(Modulo pModulo)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "insert into Modulos(NombreModulo, CarreraId, UV)values('{0}',{1},{2})";
                string sentencia = string.Format(ssql, pModulo.NombreModulo, pModulo.CarreraId.Id, pModulo.UV);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        #endregion

        #region metodo para modificar
        public int Modificar(Modulo pModulo)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "update Modulos set NombreModulo='{0}', CarreraId={1}, UV={2} where Id={3}";
                string sentencia = string.Format(ssql, pModulo.NombreModulo, pModulo.CarreraId.Id, pModulo.UV, pModulo.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        #endregion

        #region metodo para mostrar resgitros existentes
        public List<Modulo> ListarModulo()
        {
            List<Modulo> lista = new List<Modulo>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Modulos";
                SqlCommand comando = new SqlCommand(ssql, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while (lector.Read())
                {
                    lista.Add(new Modulo(lector.GetInt64(0),
                                           lector.GetString(1),
                                           CarreraDAL.ObtenerPorId(lector.GetInt64(2)),
                                           lector.GetInt32(3)));
                }
                con.Close();
            }
            return lista;
        }
        #endregion

        #region metodo para buscar por nombre
        public List<Modulo> ObtenerPorModulo(string pBuscar)
        {
            List<Modulo> lista = new List<Modulo>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Modulos where NombreModulo like '%{0}%'";
                string sentencia = string.Format(ssql, pBuscar);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while (lector.Read())
                {
                    lista.Add(new Modulo(lector.GetInt64(0),
                                           lector.GetString(1),
                                           CarreraDAL.ObtenerPorId(lector.GetInt64(2)),
                                           lector.GetInt32(3)));
                }
                con.Close();
            }
            return lista;
        }
        #endregion

        #region metodo para ver a detalle un registro
        public static Modulo ObtenerPorId(Int64 pId)
        {
            Modulo mod = new Modulo();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Modulos where Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if (lector.Read())
                {
                    mod.Id = lector.GetInt64(0);
                    mod.NombreModulo = lector.GetString(1);
                    mod.CarreraId = CarreraDAL.ObtenerPorId(lector.GetInt64(2));
                    mod.UV = lector.GetInt32(3);

                }
                con.Close();
            }
            return mod;
        }
        #endregion
    }
}
