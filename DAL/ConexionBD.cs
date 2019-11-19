using System.Data.SqlClient;
namespace DAL
{
    public class ConexionBD
    {
        #region conexion a la base de datos
        private static string cadena = @"Data Source=.;Initial Catalog=NotasOnline;Integrated Security=True";
        public static SqlConnection Conectar()
        {
            return new SqlConnection(cadena);
        }
        #endregion
    }
}
