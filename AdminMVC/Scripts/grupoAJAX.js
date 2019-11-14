cargarGrupos();
cargarProfesor();
cargarCarrera();

$("#formulario").submit(function (event) {
    event.preventDefault();
    guardar();
});

function capturarTexto() {
    var pBuscar = $("#grupos").val();
    if (pBuscar == "") {
        cargarGrupos();
    }
    else {
        buscar(pBuscar);
    }

}

function cargarProfesor() {
    $.ajax({
        url: "/Profesor/Mostrar",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.NombreProfesor + '</option>';
            });
            $('#profesor').append(html);
        },
        error: function (err) {
            toastr.error("No se pudieron leer");
        }
    });
}
function cargarCarrera() {
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
            toastr.error("No se pudieron leer");
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
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.NombreGrupo + '</td>';
                html += '<td>' + item.Turno + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>' + item.ProfesorId.NombreProfesor +' '+item.ProfesorId.ApellidoProfesor+ '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#exampleModalLong">Modificar</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbgrupos tbody').html(html);
        },

        error: function (err) {
            toastr.error("Ocurrió un error, no se pudo completar la solicitud");
        }
    })
}

//buscar
function buscar(pBuscar) {
    $.ajax({
        url: "/Grupo/BuscarGrupo?pBuscar=" + pBuscar,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.NombreGrupo + '</td>';
                html += '<td>' + item.Turno + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>' + item.ProfesorId.NombreProfesor + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#exampleModalLong">Modificar</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbgrupos tbody').html(html);
        },
        error: function (err) {
            toastr.error("Ocurrió un error, no se pudo completar la solicitud");
        }
    })
}

function guardar() {
    if(!($("#nombre").val()==""||$("#turno").val()==""||$("#carrera").val()==""||$("#profesor").val()==""))
    {
        var obj = {
            Id: $("#id").val(),
            NombreGrupo: $("#nombre").val(),
            Turno: $("#turno").val(),
            CarreraId: { Id: $("#carrera").val(), NombreCarrera: "" },
            ProfesorId: {Id:$("#profesor").val(), NombreProfesor:"", ApellidoProfesor:"", Email:"", Contraseña:""}
        }
        var id = $("#id").val();
        var ruta = "";
        if(id)
        {
            ruta = "/Grupo/Modificar";
        }
        else
        {
            ruta = "/Grupo/Agregar";
        }
        $.ajax({
            url: ruta,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                toastr.success("Registro guardado");
                cargarGrupos();
                limpiar();
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

function detalle(id) {
    $.ajax({
        url: "/Grupo/ObtenerPorId?pId=" + id,
        type: "GET",
        contenType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (datos) {
            $('#id').val(datos.Id);
            $("#nombre").val(datos.NombreGrupo);
            $("#turno").val(datos.Turno);
            $("#carrera").val(datos.CarreraId.Id);
            $("#profesor").val(datos.ProfesorId.Id);
        },
        error: function (err) {
            toastr.error("No se pudo completar la solicitud");
        }
    });
}

function limpiar()
{
    $('#id').val('');
    $("#nombre").val('');
    $("#turno").val('-1');
    $("#carrera").val('-1');
    $("#profesor").val('-1');
}