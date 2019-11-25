$(function () {
    CapturarId();
});

    function CapturarId() {
        var dato = $("#alumn").val();

        cargarNotas(dato);
        detalle(dato);
    }

    function detalle(id) {
        $.ajax({
            url: "/Estudiante/Alumno?pId=" + id,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                var html = "";
                html += "<strong>" + data.NombreEstudiante + " " + data.ApellidoEstudiante + "</strong>";
                html += "<br>";
                $("#DatosPersonales div").append(html);
            },
            error: function (err) {
                toastr.error("No se pudo completar");
            }
        });
    };
    function cargarNotas(id) {
        $.ajax({
            url: "/Estudiante/Nota?pId=" + id,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                var html = '';
                if (!(data == ""))
                {
                    $.each(data, function (key, item) {
                        html += '<tr>';
                        html += '<td>' + item.ModuloId.NombreModulo + '</td>';
                        html += '<td>' + item.Nota1 + '</td>';
                        html += '<td>' + item.Nota2 + '</td>';
                        html += '<td>' + item.Nota3 + '</td>';
                        html += '<td>' + item.Nota4 + '</td>';
                        html += '<td>' + item.Nota5 + '</td>';
                        html += '<td>' + item.NotaFinal + '</td>';
                        html += '</tr>';
                    });
                }
                else {
                    html += '<tr>';
                    html += '<td></td>';
                    html += '<td></td>';
                    html += '<td></td>';
                    html += '<td>';
                    html += '<h3 class="text-center">No hay notas</h3>';
                    html += '</td>';
                    html += '</tr>';
                }
                $('#nota tbody').html(html);
            },
            error: function (err) {
                toastr.error("Algo salio mal.");
            }
        });
    }