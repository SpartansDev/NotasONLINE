//ejecutarlos al momento que se carga la vista
mostrarMatriculas();
cargarCarreras();
cargarEstudiantes();
cargarGrupos();

$("#frmMatricula").submit(function (event) {
    event.preventDefault();
    guardarMatricula();
});

function mostrarMatriculas() {
    $.ajax({
        url: "/Matricula/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Año+ '</td>';
                html += '<td>' + item.Ciclo + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>' + item.EstudianteId.NombreEstudiante+ '</td>';
                html += '<td>' + item.GrupoId.NombreGrupo + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#exampleModalLong">Modificar</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbmatricula tbody').html(html);
        },

        error: function (err) {
            toastr.error("Ocurrió un error, no se pudo completar la solicitud");
        }
    })
}

function guardarMatricula() {
    if (!($("año").val() == "" || $("#ciclo").val() == "" || $("carrera").val() == "" || $("estudiante").val() == "" || $("#grupo").val() == "")) 
    { 
        var obj = {
            Id: $("#id").val(),
            Año: $("#año").val(),
            Ciclo: $("#ciclo").val(),
            CarreraId: { Id: $("#carrera").val(), NombreCarrera: '' },
            EstudianteId: { Id: $('#estudiante').val(), NombreEstudiante: '', ApellidoEsdudiante: '', Codigo: '', CarreraId: '', Contraseña: '' },
            GrupoId: {Id:$("#grupo").val(),NombreGrupo:'',Turno:'',CarreraId:'',ProfesorId:''}
        }
        var id = $("#id").val();
        var ruta = "";
        if (id) {
            ruta="/Matricula/Modificar"
        }
        else {
            ruta="/Matricula/Agregar"
        }
        $.ajax({
            url: ruta,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                toastr.success("Registro guardado con éxito");
                limpiarFormulario();
                mostrarMatriculas();
            },
            error: function (err) {
                toastr.error("No se pudo completar la solicitud");
            }
        });
    }
    else {
        toastr.warning("Todos los campos son requeridos");
    }
}

function detalleMatricula(id) {
    $.ajax({
        url: "/Matricula/ObtenerPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#id').val(data.Id);
            $('#año').val(data.Año);
            $('#ciclo').val(data.Ciclo);
            $('#carrera').val(data.CarreraId.Id);
            $('#estudiante').val(data.EstudianteId.Id);
            $('#grupo').val(data.GrupoId.Id);
            $('#btnGuardar').val('Guardar cambios');
        },
        error: function (err) {
            toastr.error("No se pudo completar la solicitud");
        }
    });
}

function limpiarFormulario() {
    $('#id').val('');
    $('#año').val('');
    $('#ciclo').val('');
    $('#carrera').val('');
    $('#estudiante').val('');
    $('#grupo').val('');
}

function cargarEstudiantes() {
    $.ajax({
        url: "/Estudiante/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.NombreEstudiante + '</option>';
            });
            $('#estudiante').append(html);
        },
        error: function (err) {
            alert("No se pudieron leer");
        }
    });
}

function cargarGrupos() {
    $.ajax({
        url: "/Grupo/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.NombreGrupo +' '+ item.CarreraId.NombreCarrera +'</option>';
            });
            $('#grupo').append(html);
        },
        error: function (err) {
            alert("No se pudieron leer");
        }
    });
}

function cargarCarreras() {
    $.ajax({
        url: "/Carrera/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.NombreCarrera + '</option>';
            });
            $('#carrera').append(html);
        },
        error: function (err) {
            alert("No se pudieron leer");
        }
    });
}

