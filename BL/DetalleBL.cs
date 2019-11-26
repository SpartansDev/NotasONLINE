using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
    public class DetalleBL
    {
        #region instancia de la clase
        DetalleDAL dal = new DetalleDAL();
        #endregion

        #region retornamos el metodo para verificar que no se repita la matricula
        public int verificarModulo(DetalleInscripcion pDetalle)
        {
            return dal.moduloNoExist(pDetalle);
        }
        #endregion

        #region retornamos el metodo para agregar
        public int Agregar(DetalleInscripcion pDet)
        {
            return dal.Agregar(pDet);
        }
        #endregion

        #region retornamos el metodo para modificar
        public int Modificar(DetalleInscripcion pDet)
        {
            return dal.Modificar(pDet);
        }
        #endregion

        #region retornamos el metodo para mostrar todas las notas
        public List<DetalleInscripcion>Mostrar()
        {
            return dal.ListaDetalles();
        }
        #endregion

        #region retornamos el metodo para obtener las propiedades segun el id
        public static DetalleInscripcion ObtenerPorId(Int64 pId)
        {
            return DetalleDAL.obtenerPorId(pId);
        }
        #endregion

        #region retornamos el metodo para mostrar notas segun el id de la foranea EstudianteId
        public List<DetalleInscripcion>NotasPorEstudianteId(Int64 pId)
        {
            return dal.notasPorEstudianteId(pId);
        }
        #endregion

        #region retornamos mostrar notas por la llave foranea EstudianteId
        public List<DetalleInscripcion> modulosDeMiGrupo(Int64 pId)
        {
            return dal.notasAlumnosPorId(pId);
        }
        #endregion

        #region retornamos metodo para buscar por codigo de estudiante
        public List<DetalleInscripcion> buscarPorCodigo(string pTexto)
        {
            return dal.buscarPorCodigo(pTexto);
        }
        #endregion
    }
}
