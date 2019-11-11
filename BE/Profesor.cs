using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class Profesor
    {
        public Int64 Id { get; set; }
        public string NombreProfesor { get; set; }
        public string ApellidoProfesor { get; set; }
        public string Email { get; set; }
        public string Contraseña { get; set; }
        public Profesor() { }
        public Profesor(Int64 pId, string pNombre, string pApellido, string pEmail, string pContraseña)
        {
            Id = pId;
            NombreProfesor = pNombre;
            ApellidoProfesor = pApellido;
            Email = pEmail;
            Contraseña = pContraseña;
        }
    }
}
