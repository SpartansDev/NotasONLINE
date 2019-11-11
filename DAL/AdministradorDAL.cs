﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using BE;

namespace DAL
{
    public class AdministradorDAL
    {
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
        public int Modificar(Administrador pAdmin)
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = @"update Administradores set NombreAdministrador='{0}',
                                                           ApellidoAdministrador='{1}',
                                                           Email='{2}',
                                                           Contraseña='{3}'
                                                           where Id={4}";
                string sentencia = string.Format(ssql, pAdmin.NombreAdministrador, pAdmin.ApellidoAdministrador, pAdmin.Email, pAdmin.Contraseña, pAdmin.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                result = comando.ExecuteNonQuery();
                con.Close();
            }
            return result;
        }
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
        public int Eliminar(Int64 pId)
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "delete from Administradores where Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                result = comando.ExecuteNonQuery();
                con.Close();
            }
            return result;
        }

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
    }
}
