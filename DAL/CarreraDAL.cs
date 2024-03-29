﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using BE;

namespace DAL
{
    public class CarreraDAL
    {
        #region metodo para agregar
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
        #endregion

        #region metodo para modificar 
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
        #endregion

        #region metodo para mostrar los registro existentes
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
        #endregion

        #region metodo para mostrar a detalle un registro
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
        #endregion
    }
}
