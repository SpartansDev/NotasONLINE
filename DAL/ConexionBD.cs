using System.Data.SqlClient;
namespace DAL
{
    public class ConexionBD
    {
        #region conexion a la base de datos
        //para conectar con somee 
        //private static string cadena = @"user id=gtfofo97_SQLLogin_1;pwd=1dqf6e8otz;data source=NotasOnline.mssql.somee.com;persist security info=False;initial catalog=NotasOnline;";
        private static string cadena = @"Data Source=.;Initial Catalog=NotasOnline;Integrated Security=True";
        public static SqlConnection Conectar()
        {
            return new SqlConnection(cadena);
        }
        #endregion
    }
}
