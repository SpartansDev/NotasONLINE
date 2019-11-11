using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class Modulo
    {
        public Int64 Id { get; set; }
        public string NombreModulo { get; set; }
        public Carrera  CarreraId { get; set; }
        public int UV { get; set; }
        public Modulo() { }
        public Modulo(Int64 pId, string pNombre, Carrera pCarrera, int pUV)
        {
            Id = pId;
            NombreModulo = pNombre;
            CarreraId = pCarrera;
            UV = pUV;
        }
    }
}
