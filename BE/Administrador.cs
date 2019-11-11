using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class Administrador
    {
        public Int64 Id { get; set; }
        public string NombreAdministrador { get; set; }
        public string ApellidoAdministrador { get; set; }
        public string Email { get; set; }
        public string Contraseña { get; set; }
        public Administrador() { }
        public Administrador(Int64 pId, string pNombre, string pApellido, string pEmail, string pContraseña)
        {
            Id = pId;
            NombreAdministrador = pNombre;
            ApellidoAdministrador = pApellido;
            Email = pEmail;
            Contraseña = pContraseña;
        }
    }
}
