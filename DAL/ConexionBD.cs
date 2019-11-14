using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
namespace DAL
{
    public class ConexionBD
    {
        private static string cadena = @"Data Source=.;Initial Catalog=NotasOnline;Integrated Security=True";
        public static SqlConnection Conectar()
        {
            return new SqlConnection(cadena);
        }
    }
}
