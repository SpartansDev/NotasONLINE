﻿mostrarCarreras();

$("#formulario").submit(function (event) {
    event.preventDefault()
    agregarCarrera();
});
function mostrarCarreras()
{
    $.ajax({
        url: "/Carrera/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.NombreCarrera + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#exampleModalLong">Modificar</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbcarrera tbody').html(html);
        },

        error: function (err) {
            toastr.error("Se ha producido un error en mostrar las Carreras.");
        }
    })
}
function agregarCarrera() {
    if (!($("#nombre").val() == ""))
    {
        var obj = {
            Id: $("#id").val(),
            NombreCarrera: $('#nombre').val()
        }
        var id = $("#id").val();
        var ruta = "";
        if(id)
        {
            ruta = "/Carrera/Modificar";
        }
        else
        {
            ruta = "/Carrera/Agregar";
        }
        $.ajax({
            url: ruta,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (data) {
                toastr.success("El registro se ha guardado exitósamente.");
                mostrarCarreras();
                limpiar();
                mostrarCarreras();
            },
            error: function (err) {
                toastr.error("Se produjo un error.");
            }
        });
    }
    else
    {
        alert.warning("Todos los campos son requeridos.");
    }
}

function detalle(id) {
    $.ajax({
        url: "/Carrera/ObtenerPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#id').val(data.Id);
            $('#nombre').val(data.NombreCarrera);
            $('#btnGuardar').val('Guardar cambios');
        },
        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    });
}

function limpiar() {
    $('#id').val('');
    $('#nombre').val('');
}