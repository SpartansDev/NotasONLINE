﻿using System;
using System.Collections.Generic;
using BE;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    public class GrupoDAL
    {
        #region metodo para agregar
        public int Agregar(Grupo pGrupo)
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "insert into Grupos(NombreGrupo,Turno,CarreraId,ProfesorId)values('{0}','{1}',{2},{3})";
                string sentencia = string.Format(ssql, pGrupo.NombreGrupo, pGrupo.Turno, pGrupo.CarreraId.Id, pGrupo.ProfesorId.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
        #endregion

        #region metodo para modificar
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
        #endregion

        #region metodo para buscar por nombre grupo
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
        #endregion
        

        #region metodo para mostrar a detalle un registro
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
        #endregion

        #region metodo para mostrar los resgitros existentes
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
        #endregion
    }
}
