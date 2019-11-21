using System.Data.SqlClient;
namespace DAL
{
    public class ConexionBD
    {
        #region conexion a la base de datos
        private static string cadena = @"Data Source=NotasOnline.mssql.somee.com;Initial Catalog=NotasOnline;user id=gtfofo97_SQLLogin_1;pwd=1dqf6e8otz;";
        public static SqlConnection Conectar()
        {
            return new SqlConnection(cadena);
        }
        #endregion
    }
}
