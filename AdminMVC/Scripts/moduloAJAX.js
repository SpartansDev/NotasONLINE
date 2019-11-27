obtenerCarreras();
mostrarModulos();

$("#frmmodulo").submit(function (event) {
    event.preventDefault();
    agregarModulo();
});

function mostrarModulos() {
    $.ajax({
        url: "/Modulo/Obtener",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.NombreModulo + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>' + item.UV + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#exampleModalLong">Modificar</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbmodulo tbody').html(html);
        },

        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    })
}

function Iniciar() {
    var pBuscar = $("#mod").val();
    if (pBuscar == "") {
        mostrarModulos();
    }
    else {
        buscar(pBuscar);
    }
  
}

//buscar
function buscar(pBuscar) {
    $.ajax({
        url: "/Modulo/BuscarModulo?pBuscar=" + pBuscar,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.NombreModulo + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>' + item.UV + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#exampleModalLong">Modificar</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbmodulo tbody').html(html);
        },
        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    })
}


function agregarModulo() {
    if (!($("#nombre").val() == "" || $("#carrera").val() == "" || $("#uv").val() == "")) {
        var obj = {
            Id: $("#id").val(),
            NombreModulo: $("#nombre").val(),
            CarreraId: { Id: $("#carrera").val(), NombreCarrera: '' },
            UV:$("#uv").val()
        }
        var id = $("#id").val();
        var ruta = "";
        if (id) {
            ruta = "/Modulo/Modificar";
        }
        else {
            ruta = "/Modulo/Agregar";
        }
        $.ajax({
            url: ruta,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                toastr.success("El registro se ha guardado exitósamente.");
                mostrarModulos();
                limpiar();
            },
            error: function (err) {
                toastr.error("No se pudo completar la acción.");
            }
        });
    }
    else
    {
        toastr.warning("todos los campos son requeridos.");
    }
}
function limpiar() {
    $("#id").val('');
    $("#nombre").val('');
    $("#carrera").val('');
    $("#uv").val('');
}
function obtenerCarreras() {
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
            toastr.error("Se produjo un error al mostrar Carrera");
        }
    });
}

function detalle(id)
{
    $.ajax({
        url: "/Modulo/ObtenerPorId?pId=" + id,
        type: "GET",
        contenType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (datos) {
            $("#id").val(datos.Id);
            $("#nombre").val(datos.NombreModulo);
            $("#carrera").val(datos.CarreraId.Id);
            $("#uv").val(datos.UV);
        },
        error: function (err) {
            toastr.error("Se produjo un error.");
        }
    });
}