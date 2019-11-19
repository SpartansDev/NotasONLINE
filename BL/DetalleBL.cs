﻿using System;
using System.Collections.Generic;
using BE;
using DAL;

namespace BL
{
    public class DetalleBL
    {
        DetalleDAL dal = new DetalleDAL();

        public int Agregar(DetalleInscripcion pDet)
        {
            return dal.Agregar(pDet);
        }
        public int eliminar(Int64 pId)
        {
            return dal.eliminar(pId);
        }
        public int Modificar(DetalleInscripcion pDet)
        {
            return dal.Modificar(pDet);
        }
        public List<DetalleInscripcion>Mostrar()
        {
            return dal.ListaDetalles();
        }
        public static DetalleInscripcion ObtenerPorId(Int64 pId)
        {
            return DetalleDAL.obtenerPorId(pId);
        }
        public List<DetalleInscripcion>NotasPorEstudianteId(Int64 pId)
        {
            return dal.notasPorEstudianteId(pId);
        }
    }
}
