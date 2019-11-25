using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using BE;

namespace DAL
{
    public class AdministradorDAL
    {
        #region metodo para guardar
        public int Agregar(Administrador pAdmin)
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "insert into Administradores(NombreAdministrador, ApellidoAdministrador,Email,Contraseña)values('{0}','{1}','{2}','{3}')";
                string sentencia = string.Format(ssql, pAdmin.NombreAdministrador, pAdmin.ApellidoAdministrador, pAdmin.Email, pAdmin.Contraseña);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                result = comando.ExecuteNonQuery();
                con.Close();
            }
            return result;
        }
        #endregion
        
        #region metodo para modificar
        public int Modificar(Administrador pAdmin)
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = @"update Administradores set NombreAdministrador='{0}',
                                                           ApellidoAdministrador='{1}',
                                                           Contraseña='{2}'
                                                           where Id={3}";
                string sentencia = string.Format(ssql, pAdmin.NombreAdministrador, pAdmin.ApellidoAdministrador, pAdmin.Contraseña, pAdmin.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                result = comando.ExecuteNonQuery();
                con.Close();
            }
            return result;
        }
        #endregion

        #region metodo para mostrar los administradores existentes
        public List<Administrador>ListarAdmin()
        {
            List<Administrador> lista = new List<Administrador>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Administradores";
                SqlCommand comando = new SqlCommand(ssql, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while(lector.Read())
                {
                    lista.Add(new Administrador(lector.GetInt64(0),
                                                lector.GetString(1),
                                                lector.GetString(2),
                                                lector.GetString(3),
                                                lector.GetString(4)));
                }
                con.Close();
            }
            return lista;
        }
        #endregion

        #region metodo para obtener a detalle un registro
        public static Administrador obetenerPorId(Int64 pId)
        {
            Administrador _admin = new Administrador();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Administradores where Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                IDataReader lector = comando.ExecuteReader();
                if(lector.Read())
                {
                    _admin.Id = lector.GetInt64(0);
                    _admin.NombreAdministrador = lector.GetString(1);
                    _admin.ApellidoAdministrador = lector.GetString(2);
                    _admin.Email = lector.GetString(3);
                    _admin.Contraseña = lector.GetString(4);
                }
                con.Close();
            }
            return _admin;
        }
        #endregion

        #region metodo de login 
        public Administrador Login(Administrador pAdmin)
        {
            Administrador BE = new Administrador();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Administradores where Email='{0}'";
                string sentencia = string.Format(ssql, pAdmin.Email);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if(lector.Read())
                {
                    if (lector["Contraseña"].ToString() == pAdmin.Contraseña)
                    {
                        BE.Id = lector.GetInt64(0);
                        BE.NombreAdministrador = lector.GetString(1);
                        BE.ApellidoAdministrador = lector.GetString(2);
                        BE.Email = lector.GetString(3);
                        BE.Contraseña = lector.GetString(4);
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

        #region verificar que el correo no se repita
        public int EmailNoExist(Administrador pAdmin)
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Administradores where Email ='{0}'";
                string sentencia = string.Format(ssql, pAdmin.Email);
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
                con.Close();
            }
            return result;
        }
        #endregion

        #region metodo que activa o desactiva el boton de registro en el login de admin
        public int adminNoExist()
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Administradores";
                SqlCommand comando = new SqlCommand(ssql, con);
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
    }
}
