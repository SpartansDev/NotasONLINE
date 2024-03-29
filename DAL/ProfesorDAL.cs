﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using BE;
namespace DAL
{
    public class ProfesorDAL
    {
        #region metodo para agregar
        public int Agregar(Profesor pProfesor)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "insert into Profesores(NombreProfesor, ApellidoProfesor, Email, Contraseña)values('{0}','{1}','{2}','{3}')";
                string sentencia = string.Format(ssql, pProfesor.NombreProfesor, pProfesor.ApellidoProfesor, pProfesor.Email, pProfesor.Contraseña);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado=comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        #endregion

        #region metodo para modificar
        public int Modificar(Profesor pProfesor)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "update Profesores set NombreProfesor='{0}', ApellidoProfesor='{1}', Contraseña='{2}' where Id={3}";
                string sentencia = string.Format(ssql, pProfesor.NombreProfesor, pProfesor.ApellidoProfesor, pProfesor.Contraseña, pProfesor.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado=comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        #endregion

        #region metodo para mostrar datos existentes
        public List<Profesor>ListarProfesores()
        {
            List<Profesor> lista = new List<Profesor>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Profesores";
                SqlCommand comando = new SqlCommand(ssql, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while(lector.Read())
                {
                    lista.Add(new Profesor(lector.GetInt64(0),
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

        #region metodo para ver a detalle un registro
        public static Profesor ObtenerPorId(Int64 pId)
        {
            Profesor profe = new Profesor();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Profesores where Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if(lector.Read())
                {
                    profe.Id = lector.GetInt64(0);
                    profe.NombreProfesor = lector.GetString(1);
                    profe.ApellidoProfesor = lector.GetString(2);
                    profe.Email = lector.GetString(3);
                    profe.Contraseña = lector.GetString(4);
                }
                con.Close();
            }
            return profe;
        }
        #endregion

        #region metodo para loguear
        public Profesor Login(Profesor pProfesor)
        {
            Profesor _profe = new Profesor();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Profesores where Email='{0}'";
                string sentencia = string.Format(ssql, pProfesor.Email);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if (lector.Read())
                {
                    if (lector["Contraseña"].ToString() == pProfesor.Contraseña)
                    {
                        _profe.Id = lector.GetInt64(0);
                        _profe.NombreProfesor = lector.GetString(1);
                        _profe.ApellidoProfesor = lector.GetString(2);
                        _profe.Email = lector.GetString(3);
                        _profe.Contraseña = lector.GetString(4);
                    }
                    else
                    {
                        _profe = null;
                    }
                }
                else
                {
                    _profe = null;
                    con.Close();
                }
                return _profe;
            }
        }
        #endregion

        #region metodo para verificar que no se repita el correo
        public int ProfesorNoExiste(Profesor pProfesor)
        {
            int _profe = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from Profesores where Email='{0}'";
                string sentencia = string.Format(ssql, pProfesor.Email);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if (lector.Read())
                {
                    _profe = 1;
                }
                else
                {
                    _profe = 0;
                    con.Close();
                }
                return _profe;
            }
        }
        #endregion
    }
}
