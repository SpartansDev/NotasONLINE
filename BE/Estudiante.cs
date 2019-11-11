using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class Estudiante
    {
        public Int64 Id { get; set; }
        public string NombreEstudiante { get; set; }
        public string ApellidoEstudiante { get; set; }
        public string Codigo { get; set; }
        public Carrera CarreraId { get; set; }
        public string Contraseña { get; set; }


        public Estudiante() { }

        public Estudiante(Int64 pId,string pNombre, string pApellido, string pCodigo, Carrera pCarrera, string pContraseña)
        {
            Id = pId;
            NombreEstudiante = pNombre;
            ApellidoEstudiante = pApellido;
            Codigo = pCodigo;
            CarreraId = pCarrera;
            Contraseña = pContraseña;
        }
    }
}
