$(function () {
    cargarModulo();
    cargarCarrera();
})

$('#frmmodulo').submit(function (event) {
    event.preventDefault();
    guardar();
});

function cargarCarrera() {
    $.ajax({
        url: "/Carrera/Obtener",
        type: "GET",
        contentType: "application/json;chrset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<option value="' + item.Id + '">' + item.CarreraId + '</option>';
            });
            $('#carrera').append(html);
        },
        error: function (err) {
            alert("No se pudieron leer los datos");
        }
    });
}


//

function cargarModulo() {
    $.ajax({
        url: "/Modulo/Obtener",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = "";
            $.each(data, function (key, item) {
                html += "<tr>";
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Nombre + '</td>';
                html += '<td>' + item.CarreraId.Id + '</td>';
                html += '<td>' + item.UV + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalle(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#exampleModalLong">Detalles</a>';
                html += '</td>';
                html += "</tr>";
            });
            $("tbmodulo tbody").html(html);
        },
        error: function (err) {
            alert("No se pudo completar la peticion");
        }

    })
  
}

function guardarModulo() {
    if (!($('#modulo').val() == "" || $('#carrera').val() == "" || $('#uv').val() == "")) {
        var obj = {
            Id: $('#id').val(),
            NombreModulo: $('#modulo').val,
            CarreraId: { Id: $('#carrera').val(), NombreCarrera: "" },
            UV: $('#uv').val
        }

        var id = $('#id').val();
        var url = "";

        if (id) {
            url = "/Modulo/Modificar";
        }
        else {
            url = "/Modulo/Agregar";
        }

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                alert("guardado con exito");
                cargarModulos();
                limpiar();
            }
            
        })
    } 
}

function verDetalle(id) {
    $.ajax({
        url: "/Modulo/ObtenerPorId?pId" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#id').val(data.Id);
            $('#nombre').val(data.NombreModulo);
            $('#carrera').val(data.CarreraId);
            $('#uv').val(data.UV);

        }
    });
}


function limpiar() {
    $('#id').val('');
    $('#nombre').val('');
    $('#carrera').val('');
    $('#uv').val('');
    $('#btnGuardar').val("Guardar");

}