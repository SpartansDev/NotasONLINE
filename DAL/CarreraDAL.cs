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
    public class CarreraDAL
    {
        public int Agregar(Carrera pCarrera)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "insert into Carreras(NombreCarrera)values('{0}')";
                string sentencia = string.Format(ssql, pCarrera.NombreCarrera);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        public int Modificar(Carrera pCarrera)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "update Carreras set NombreCarrera='{0}' where Id={1}";
                string sentencia = string.Format(ssql, pCarrera.NombreCarrera, pCarrera.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        public List<Carrera> ListarCarrera()
        {
            List<Carrera> lista = new List<Carrera>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Carreras";
                SqlCommand comando = new SqlCommand(ssql, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while (lector.Read())
                {
                    lista.Add(new Carrera(lector.GetInt64(0),
                                           lector.GetString(1)));
                }
                con.Close();
            }
            return lista;
        }
        public static Carrera ObtenerPorId(Int64 pId)
        {
            Carrera car = new Carrera();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Carreras where Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if (lector.Read())
                {
                    car.Id = lector.GetInt64(0);
                    car.NombreCarrera = lector.GetString(1);             

                }
                con.Close();
            }
            return car;
        }
    }
}
