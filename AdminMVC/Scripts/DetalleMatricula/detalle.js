$(function () {
    cargarModulo();
});
$("#frmNotasMtricual").submit(function (event) {
    event.preventDefault();
    agregar();
})

function obtenerModulosPorEstudianteId(id) {
    $.ajax({
        url: "/DetalleInscripcion/notasAlumnoPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (datos) {
            var html = "";
            $.each(datos, function (key, item) {

            })
        }
    })
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
                toastr.error("No se pudieron cargar los modulos");
            }
        });
    }
    function agregar() {
        if (!($('#Idmatricula').val() == '' || $('#modulo').val() == '' || $('#status').val() == '')) {
            var obj = {
                Id: $('#id').val(),
                MatriculaId: { Id: $('#Idmatricula').val(), Año: '', Ciclo: '', CarreraId: '', EstudianteId: '', GrupoId: '' },
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
            var ruta = "/DetalleInscripcion/Agregar";
            $.ajax({
                url: ruta,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                dataType: "json",
                data: JSON.stringify(obj),
                success: function (respuesta) {
                    limpiar();
                    toastr.success("Registro guardado");
                },
                error: function (err) {
                    toastr.error('Error inesperado');
                }
            });
        }
        else {
            toastr.warning("Todos los campos son requeridos");
        }
    }
    function limpiar() {
        $("#status").val("");
        $("#Idmatricula").val("");
    }