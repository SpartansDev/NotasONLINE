using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class Grupo
    {
        public Int64 Id { get; set; }
        public string NombreGrupo { get; set; }
        public string Turno { get; set; }
        public Carrera CarreraId { get; set; }
        public Profesor ProfesorId { get; set; }
        public Grupo() { }
        public Grupo(Int64 pId, string pNombre, string pTurno, Carrera pCarrera, Profesor pProfesor)
        {
            Id = pId;
            NombreGrupo = pNombre;
            Turno = pTurno;
            CarreraId = pCarrera;
            ProfesorId = pProfesor;
        }
    }
}
