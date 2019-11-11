using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class Matricula
    {
        public Int64 Id { get; set; }
        public string Año { get; set; }
        public string Ciclo { get; set; }
        public Carrera CarreraId { get; set; }
        public Estudiante EstudianteId { get; set; }
        public Grupo GrupoId { get; set; }
        public Matricula() { }
        public Matricula(Int64 pId, string pAño, string pCiclo, Carrera pCarrera, Estudiante pEstudiante, Grupo pGrupo)
        {
            Id = pId;
            Año = pAño;
            Ciclo = pCiclo;
            CarreraId = pCarrera;
            EstudianteId = pEstudiante;
            GrupoId = pGrupo;
        }
    }
}
