//se ejecutan al mostrar la vista
$(function () {
    mostrarInscripciones();
    cargarMatricula();
    cargarModulo();
    
})

$("#frmMatricula").submit(function (event) {
    event.preventDefault();
    verificarModulo();
});

$('#frmNotas').submit(function (event) {
    event.preventDefault();
    agregar();
});

$(document).ready(function () {
    $('#frmNotas').on('keyup', function () {
        var n1 = parseFloat($('#nota1').val());
        var n2 = parseFloat($('#nota2').val());
        var n3 = parseFloat($('#nota3').val());
        var n4 = parseFloat($('#nota4').val());
        var n5 = parseFloat($('#nota5').val());


        if (isNaN(n1)) {
            n1 = 0;
        }
        if (isNaN(n2)) {
            n2 = 0;
        }
        if (isNaN(n3)) {
            n3 = 0;
        }
        if (isNaN(n4)) {
            n4 = 0;
        }
        if (isNaN(n5)) {
            n5 = 0;
        }
        var neto = (n1 + n2 + n3 + n4 + n5) * 0.2;

        $('#notafinal').val(neto);
    })
});

function agregar() {
    if (!($('#matricula').val() == '' || $('#modulo').val() == '' || $('#nota1').val() == '' || $('#nota2').val() == '' || $('#nota3').val() == '' ||
        $('#nota4').val() == '' || $('#nota5').val() == '' || $('#notafinal').val() == '' || $('#status').val() == '')) {
        //verificar que nota no sea mayor a 10 o menor a 0
        if ($('#nota1').val() >10 || $('#nota2').val() >10 || $('#nota3').val() >10 || $('#nota4').val() >10 || $('#nota5').val()>10||
            $('#nota1').val()<0 || $('#nota2').val()<0 || $('#nota3').val()<0 || $('#nota4').val()<0 || $('#nota5').val()<0) {
            toastr.warning("Verifica si no haz escrito numeros negativos o mayor a 10","Advertencia");
        }else{
            var obj = {
                Id: $('#id').val(),
                MatriculaId: { Id: $('#matricula').val(), Año: '', Ciclo: '', CarreraId: '', EstudianteId: '', GrupoId: '' },
                ModuloId: { Id: $('#modulo').val(), NombreModulo: '', CarreraId: '', UV: '' },
                Nota1: $('#nota1').val(),
                Nota2: $('#nota2').val(),
                Nota3: $('#nota3').val(),
                Nota4: $('#nota4').val(),
                Nota5: $('#nota4').val(),
                NotaFinal: $('#notafinal').val(),
                Status: $('#status').val()
            }
            var id = $('#id').val();
            var ruta = '';
            if (id) {
                ruta = "/DetalleInscripcion/Modificar";
            }
            else {
                ruta = "/DetalleInscripcion/Agregar";
            }
            $.ajax({
                url: ruta,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                dataType: "json",
                data: JSON.stringify(obj),
                success: function (respuesta) {
                    limpiar();
                    toastr.success("El registro se ha guardado exitósamente.");
                    mostrarInscripciones();
                },
                error: function (err) {
                    toastr.error('Se produjo un error.');
                }
            });
        }
    }
    else {
        toastr.warning("Todos los campos son requeridos.");
    }
}


///////////////////////////////////////////Codigo leydi//////////////////////////////////////


function verificarMatricula() {
    if (!($("#año").val() == "" || $("#ciclo").val() == "" || $("#carrera").val() == "" || $("#estudiante").val() == "" || $("#grupo").val() == "")) {
        var obj = {
            Id: $("#id").val(),
            Año: $("#año").val(),
            Ciclo: $("#ciclo").val(),
            CarreraId: { Id: $("#carrera").val(), NombreCarrera: '' },
            EstudianteId: { Id: $('#estudiante').val(), NombreEstudiante: '', ApellidoEsdudiante: '', Codigo: '', CarreraId: '', Contraseña: '' },
            GrupoId: { Id: $("#grupo").val(), NombreGrupo: '', Turno: '', CarreraId: '', ProfesorId: '' }
        }
        $.ajax({
            url: "/DetalleInscripcion/verificarModulos",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    toastr.warning("El alumno ya esta inscrito en este ciclo");
                }
                else {
                    guardarMatricula();
                }
            },
            error: function (err) {
                toastr.error("No se pudo completar la solicitud");
            }
        });
    }
    else {
        toastr.warning("Todos los campos son requeridos");
    }
};

/////////////////////////////////////////////////////////////////////////////////

function detalles(id) {
    $.ajax({
        url: "/DetalleInscripcion/ObtenerPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (datos) {
            $('#id').val(datos.Id);
            $('#matricula').val(datos.MatriculaId.Id);
            $('#modulo').val(datos.ModuloId.Id);
            $('#nota1').val(datos.Nota1);
            $('#nota2').val(datos.Nota2);
            $('#nota3').val(datos.Nota3);
            $('#nota4').val(datos.Nota4);
            $('#nota5').val(datos.Nota5);
            $('#notafinal').val(datos.NotaFinal);
            $('#status').val(datos.Status);
        },
        error: function (err) {
            toastr.error('No se pudo completar la acción.');
        }
    });
}
function cargarMatricula() {
    $.ajax({
        url: "/Matricula/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.EstudianteId.NombreEstudiante + '</option>';
            });
            $('#matricula').append(html);
        },
        error: function (err) {
            toastr.error("Se ha producido un error al mostrar Matrícula.");
        }
    });
}
function cargarModulo() {
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
            $("#modulo").append(html);
        },
        error: function (err) {
            toastr.error("Se ha producido un error al mostrar Módulo.");
        }
    });
}
function mostrarInscripciones() {
    $.ajax({
        url: "/DetalleInscripcion/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = "";
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.MatriculaId.EstudianteId.NombreEstudiante + ' ' + item.MatriculaId.EstudianteId.ApellidoEstudiante + '</td>';
                html += '<td>' + item.ModuloId.NombreModulo + '</td>';
                html += '<td>' + item.Nota1 + '</td>';
                html += '<td>' + item.Nota2 + '</td>';
                html += '<td>' + item.Nota3 + '</td>';
                html += '<td>' + item.Nota4 + '</td>';
                html += '<td>' + item.Nota5 + '</td>';
                html += '<td>' + item.NotaFinal + '</td>';
                if (item.Status == 1) {
                    html += '<td>Notas Visibles</td>';
                }
                else {
                    html += '<td>Notas Ocultas</td>';
                }
                html += '<td>';
                html += '<a href="#" onclick="detalles(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#exampleModalLong">Modificar</a>|';
                html += '<a href="#" onclick="eliminar(' + item.Id + ')" class="badge badge-danger">Eliminar</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbNotas tbody').html(html);
        },
        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    })
}
function eliminar(id) {
     $.ajax({
         url: "/DetalleInscripcion/eliminar?pId=" + id,
         type: "GET",
         contentType: "application/json;charset=utf-8",
         dataType: "json",
         success: function (resp) {
             if (resp > 0) {
                 toastr.success("El registro se ha eliminado exitósamente.", "Exito");
                 mostrarInscripciones();
             }
             else {
                 toastr.error("Ocurrio un error, inténtelo nuevamente.", "Error");
             }
         },
         error: function (err) {
             toastr.error("Ocurrio un error en el sistema, inténtelo nuevamente.", "Error");
         }
     })
 }

function limpiar() {
    $('#id').val('');
    $('#matricula').val('');
    $('#modulo').val('');
    $('#nota1').val('');
    $('#nota2').val('');
    $('#nota3').val('');
    $('#nota4').val('');
    $('#nota5').val('');
    $('#notafinal').val('');
    $('#status').val('');
}
