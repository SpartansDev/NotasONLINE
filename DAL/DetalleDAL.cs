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
    public class DetalleDAL
    {
        public int Agregar(DetalleInscripcion pDetalle)
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = @"insert into DetallesInscripcion(MatriculaId,ModuloId,Nota1,Nota2,Nota3,Nota4,Nota5,NotaFinal,Status)
                                values({0},{1},{2},{3},{4},{5},{6},{7},{8})";
                string sentencia = string.Format(ssql, pDetalle.MatriculaId.Id,pDetalle.ModuloId.Id, pDetalle.Nota1,pDetalle.Nota2,pDetalle.Nota3,pDetalle.Nota4,pDetalle.Nota5,pDetalle.NotaFinal, pDetalle.Status);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                result = comando.ExecuteNonQuery();
                con.Close();
            }
            return result;
        }
        public int Modificar(DetalleInscripcion pDetalle)
        {
            int result = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = @"update DetallesInscripcion set MatriculaId={0},
                                                            ModuloId={1},
                                                            Nota1={2},
                                                            Nota2={3},
                                                            Nota3={4},
                                                            Nota4={5},
                                                            Nota5={6},
                                                            NotaFinal={7},
                                                            Status={8}
                                                            where Id={9}";
                string sentencia = string.Format(ssql, pDetalle.MatriculaId.Id, pDetalle.ModuloId.Id, pDetalle.Nota1, pDetalle.Nota2, pDetalle.Nota3, pDetalle.Nota4, pDetalle.Nota5, pDetalle.NotaFinal, pDetalle.Status, pDetalle.Id);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                result = comando.ExecuteNonQuery();
                con.Close();
            }
            return result;
        }
        public List<DetalleInscripcion>ListaDetalles()//para admin
        {
            List<DetalleInscripcion> lista = new List<DetalleInscripcion>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from DetallesInscripcion";
                SqlCommand comando = new SqlCommand(ssql, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while(lector.Read())
                {
                    lista.Add(new DetalleInscripcion(lector.GetInt64(0),
                                                     MatriculaDAL.ObtenerPorId(lector.GetInt64(1)),
                                                     ModuloDAL.ObtenerPorId(lector.GetInt64(2)),
                                                     lector.GetDecimal(3),
                                                     lector.GetDecimal(4),
                                                     lector.GetDecimal(5),
                                                     lector.GetDecimal(6),
                                                     lector.GetDecimal(7),
                                                     lector.GetDecimal(8),
                                                     lector.GetInt64(9)));
                }
                con.Close();
            }
            return lista;
        }
        public static DetalleInscripcion obtenerPorId(Int64 pId)
        {
            DetalleInscripcion detalle = new DetalleInscripcion();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "select * from DetallesInscripcion where Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                if(lector.Read())
                {
                    detalle.Id = lector.GetInt64(0);
                    detalle.MatriculaId = MatriculaDAL.ObtenerPorId(lector.GetInt64(1));
                    detalle.ModuloId = ModuloDAL.ObtenerPorId(lector.GetInt64(2));
                    detalle.Nota1 = lector.GetDecimal(3);
                    detalle.Nota2 = lector.GetDecimal(4);
                    detalle.Nota2 = lector.GetDecimal(5);
                    detalle.Nota3 = lector.GetDecimal(6);
                    detalle.Nota4 = lector.GetDecimal(7);
                    detalle.Nota5 = lector.GetDecimal(8);
                    detalle.Status = lector.GetInt64(9);
                }
                con.Close();
            }
            return detalle;
        }

        public List<DetalleInscripcion>notasPorEstudianteId(Int64 pId)//para alumno
        {
            List<DetalleInscripcion> lista = new List<DetalleInscripcion>();
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = @"select a.*, b.EstudianteId, c.Id from DetallesInscripcion as a inner join Matriculas as b on a.MatriculaId= b.Id inner join 
                                Estudiantes as c on b.EstudianteId = c.Id where c.Id={0} and Status=1;";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                IDataReader lector = comando.ExecuteReader();
                while (lector.Read())
                {
                    lista.Add(new DetalleInscripcion(lector.GetInt64(0),
                                                     MatriculaDAL.ObtenerPorId(lector.GetInt64(1)),
                                                     ModuloDAL.ObtenerPorId(lector.GetInt64(2)),
                                                     lector.GetDecimal(3),
                                                     lector.GetDecimal(4),
                                                     lector.GetDecimal(5),
                                                     lector.GetDecimal(6),
                                                     lector.GetDecimal(7),
                                                     lector.GetDecimal(8),
                                                     lector.GetInt64(9)));
                }
                con.Close();
            }
            return lista;
        }
        public int eliminar(Int64 pId)//admin
        {
            int resultado = 0;
            using (SqlConnection con = ConexionBD.Conectar())
            {
                con.Open();
                string ssql = "delete from DetallesInscripcion where Id={0}";
                string sentencia = string.Format(ssql, pId);
                SqlCommand comando = new SqlCommand(sentencia, con);
                comando.CommandType = CommandType.Text;
                resultado = comando.ExecuteNonQuery();
                con.Close();
            }
            return resultado;
        }
    }
}