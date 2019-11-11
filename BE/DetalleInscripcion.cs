using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class DetalleInscripcion
    {
        public Int64 Id { get; set; }
        public Matricula MatriculaId { get; set; }
        public Modulo ModuloId { get; set; }
        public decimal Nota1 { get; set; }
        public decimal Nota2 { get; set; }
        public decimal Nota3 { get; set; }
        public decimal Nota4 { get; set; }
        public decimal Nota5 { get; set; }
        public decimal NotaFinal { get; set; }
        public Int64 Status { get; set; }
        public DetalleInscripcion() { }
        public DetalleInscripcion(Int64 pId, Matricula pMatricula, Modulo pModulo, decimal pNota1, decimal pNota2, decimal pNota3, decimal pNota4, decimal pNota5, decimal pNotaFinal, Int64 pStatus)
        {
            Id = pId;
            MatriculaId = pMatricula;
            ModuloId = pModulo;
            Nota1 = pNota1;
            Nota2 = pNota2;
            Nota3 = pNota3;
            Nota4 = pNota4;
            Nota5 = pNota5;
            NotaFinal = pNotaFinal;
            Status = pStatus;
        }
    }
}
