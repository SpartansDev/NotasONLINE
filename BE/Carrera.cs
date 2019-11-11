using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class Carrera
    {
        public Int64 Id { get; set; }
        public string NombreCarrera { get; set; }
        public Carrera() { }
        public Carrera(Int64 pId, string pNombre)
        {
            Id = pId;
            NombreCarrera = pNombre;
        }
    }
}
