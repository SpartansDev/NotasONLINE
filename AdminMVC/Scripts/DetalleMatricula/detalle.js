$(function () {
    cargarModulo();
});
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
    if (!($('#matricula').val() == '' || $('#modulo').val() == '' || $('#nota1').val() == '' || $('#nota2').val() == '' || $('#nota3').val() == '' ||
        $('#nota4').val() == '' || $('#nota5').val() == '' || $('#notafinal').val() == '' || $('#status').val() == '')) {
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
                    toastr.success("Registro guardado");
                    mostrarInscripciones();
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
