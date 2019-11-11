$(function () {
    mostrar();
    obtenerModulo();
    obtenerEstudiante();
});

function detalle(id) {
    $.ajax({
        url: "ObtenerPorId?=" + id,
        type:"GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

        }
    });
}

function limpiar() { }
$("#frmNotas").submit(function (event) {
    event.preventDefault();
    agregar();
})

function agregar() {
    if (!($("#matricula").val() == "" || $("#modulo").val() == "" || $("#nota1").val() == "" || $("#nota2").val() == "" || $("#nota3").val() == ""||
        $("#nota4").val() == "" || $("#nota5").val() == "" || $("#notaFinal").val() == "" || $("#status").val() == ""))
    {
        var obj = {
            Id: $("#id").val(),
            MatriculaId: $("#matricula").val(),
            ModuloId: $("#modulo").val(),
            Nota1: $("#nota1").val(),
            Nota2: $("#nota2").val(),
            Nota3: $("#nota3").val(),
            Nota4: $("#nota4").val(),
            Nota5: $("#nota5").val(),
            NotaFinal: $("#notaFinal").val(),
            Status:$("#status").val() 
        }
        var id = $("id").val();
        var ruta = "";
        if(id)
        {
            ruta = "/DetalleInscripcion/Modificar";
        }
        else
        {
            ruta = "/DetalleInscripcion/Agregar";
        }
        $.ajax({
            url: ruta,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (datos) {
                alert("Registro guardado");
                limpiar();
                mostrar();
            },
            error: function (err) {
                alert("Algo salió mal");
            }
        })
    }
    else
    {
        alert("todos los campos son requeridos");
    }
}

function mostrar() {
    $.ajax({
        url: "/DetalleInscripcion/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.MatriculaId.Ciclo + '</td>';
                html += '<td>' + item.MatriculaId.EstudianteId.NombreEstudiante + '</td>';
                html += '<td>' + item.MatriculaId.EstudianteId.ApellidoEstudiante + '</td>';
                html += '<td>' + item.MatriculaId.EstudianteId.Codigo + '</td>';
                html += '<td>' + item.ModuloId.NombreModulo + '</td>';
                html += '<td>' + item.Nota1 + '</td>';
                html += '<td>' + item.Nota2 + '</td>';
                html += '<td>' + item.Nota3 + '</td>';
                html += '<td>' + item.Nota4 + '</td>';
                html += '<td>' + item.Nota5 + '</td>';
                html += '<td>' + item.NotaFinal + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#exampleModalLong">Modificar</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbcarrera tbody').html(html);
        },

        error: function (err) {
            alert("Algo salió mal");
        }
    })
}
function obtenerModulo() {
    $.ajax({
        url: "/Modulo/Obtener",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.NombreModulo + '</option>';
            });
            $('#modulo').append(html);
        },
        error: function (err) {
            toastr.error("No se pudieron leer los modulos");
        }
    });
}

function obtenerEstudiante() {
    $.ajax({
        url: "/Matricula/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.MatriculaId.EstudianteId.NombreEstudiante + '</option>';
            });
            $('#matricula').append(html);
        },
        error: function (err) {
            toastr.error("No se pudieron leer los estudiantes");
        }
    });
}
