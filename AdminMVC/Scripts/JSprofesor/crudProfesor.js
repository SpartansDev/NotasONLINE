/*
equipo dinamita :v
*/
capturarID();

function capturarID() {
    var Id = $("#MiId").val();
    misAlumnos(Id);
};

$('#frmNotas').submit(function (event) {
    event.preventDefault();
    agregar();
});

//funcion para mostrar los alumnos 
function misAlumnos(Id) {
    $.ajax({
        url: "/Matricula/misAlumnos?pId=" + Id,
        type:"GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (datos) {
            var html = "";
            $.each(datos, function (key, item) {
                html += "<tr>";
                html += "<td>" + item.EstudianteId.NombreEstudiante + "</td>";
                html += "<td>" + item.EstudianteId.ApellidoEstudiante + "</td>";
                html += "<td>" + item.EstudianteId.Codigo + "</td>";
                html += "<td>"+item.Ciclo+"</td>";
                html += "<td>";
                html += "<a href='#' data-toggle='modal' data-target='#modal' class='badge badge-success' onclick='obtenerModulosPorEstudianteId(" + item.EstudianteId.Id + ")'>ver modulos</a>";
                html += "</td>";
                html += "</tr>";
            });
            $("#alumnos tbody").html(html);
        },
        error: function (err) {
            toastr.error("no funciona");
        }
    });
}

function detalle(id) {
    $.ajax({
        url: "/Estudiante/ObtenerPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#nombreEstudiante').val(data.NombreEstudiante);
            $('#mapellido').val(data.ApellidoEstudiante);
        },
        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    });
};

    //funcion que muestra los modulos del alumno
    function obtenerModulosPorEstudianteId(id) {
        $.ajax({
            url: "/DetalleInscripcion/modulosDeMiGrupo?pId=" + id,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (datos) {

                var html = "";
                
                $.each(datos, function (key, item)
                {
                    html += "<tr>";
                    html += "<td>" + item.MatriculaId.EstudianteId.NombreEstudiante + "</td>";
                    html += "<td>" + item.ModuloId.NombreModulo + "</td>";
                    html += "<td>" + item.Nota1 + "</td>";
                    html += "<td>" + item.Nota2 + "</td>";
                    html += "<td>" + item.Nota3 + "</td>";
                    html += "<td>" + item.Nota4 + "</td>";
                    html += "<td>" + item.Nota5 + "</td>";
                    html += "<td>" + item.NotaFinal + "</td>";
                    html += "<td>";
                    html += '<a href="#" onclick="detalleNotas(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#exampleModalLong">Calificar</a>';
                    html += "</td>";
                    html += "</tr>";
                });
                $("#tbMalumno tbody").html(html);
            },
            error: function (err) {
                toastr.error("No se puedieron cargar los detalles de modulo");
            }
        });
    }
    //para abrir la modal de agregar notas
    function detalleNotas(id) {
        $.ajax({
            url: "/DetalleInscripcion/ObtenerPorId?pId=" + id,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (datos)
            {
                $('#pid').val(datos.Id);
                $('#matricula').val(datos.MatriculaId.Id);
                $('#status').val(datos.Status);
                $('#modulo').val(datos.ModuloId.Id);
                $('#refrescar').val(datos.MatriculaId.EstudianteId.Id);//id del alumno
                $('#nombreMod').val(datos.ModuloId.NombreModulo);
                $('#MODnota1').val(datos.Nota1);
                $('#MODnota2').val(datos.Nota2);
                $('#MODnota3').val(datos.Nota3);
                $('#MODnota4').val(datos.Nota4);
                $('#MODnota5').val(datos.Nota5);
                $('#MODnotafinal').val(datos.NotaFinal);
                
            },
            error: function (err)
            {
                toastr.error('No se pudo completar la acción.');
            }
        });
    }

    ///funciones para agregar Notas
    function agregar() {
        if (!($('#matricula').val() == '' || $('#modulo').val() == '' || $('#MODnota1').val() == '' || $('#MODnota2').val() == '' || $('#MODnota3').val() == '' ||
            $('#MODnota4').val() == '' || $('#MODnota5').val() == '' || $('#MODnotafinal').val() == '' || $('#status').val() == ''))
        {
            //verificar que nota no sea mayor a 10 o menor a 0
            if ($('#MODnota1').val() > 10 || $('#MODnota2').val() > 10 || $('#MODnota3').val() > 10 || $('#MODnota4').val() > 10 || $('#MODnota5').val() > 10 ||
                $('#MODnota1').val() < 0 || $('#MODnota2').val() < 0 || $('#MODnota3').val() < 0 || $('#MODnota4').val() < 0 || $('#MODnota5').val() < 0)
            {
                toastr.warning("Verifica si no haz escrito numeros negativos o mayor a 10", "Advertencia");
            }
            else
            {
                var obj = {
                    Id: $('#pid').val(),
                    MatriculaId: { Id: $('#matricula').val(), Año: '', Ciclo: '', CarreraId: '', EstudianteId: '', GrupoId: '' },
                    ModuloId: { Id: $('#modulo').val(), NombreModulo: '', CarreraId: '', UV: '' },
                    Nota1: $('#MODnota1').val(),
                    Nota2: $('#MODnota2').val(),
                    Nota3: $('#MODnota3').val(),
                    Nota4: $('#MODnota4').val(),
                    Nota5: $('#MODnota5').val(),
                    NotaFinal: $('#MODnotafinal').val(),
                    Status: $('#status').val()
                }
                var id = $('#pid').val();
                var ruta = '';
                if (id)
                {
                    ruta = "/DetalleInscripcion/Modificar";
                }
                else
                {
                    ruta = "/DetalleInscripcion/Agregar";
                }
                $.ajax({
                    url: ruta,
                    type: 'POST',
                    contentType: 'application/json;charset=utf-8',
                    dataType: "json",
                    data: JSON.stringify(obj),
                    success: function (respuesta)
                    {
                        //capturamos el id del alumno para refrescar la modal de modulos.
                        var ir = $("#refrescar").val();
                        obtenerModulosPorEstudianteId(ir);//si  no llevara un id la funcion daria un error y valio verga
                        toastr.success("El registro se ha guardado exitósamente.");
                        limpiar();
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

    //promedio automatico
    $(document).ready(function () {
        $('#frmNotas').on('keyup', function () {
            var n1 = parseFloat($('#MODnota1').val());
            var n2 = parseFloat($('#MODnota2').val());
            var n3 = parseFloat($('#MODnota3').val());
            var n4 = parseFloat($('#MODnota4').val());
            var n5 = parseFloat($('#MODnota5').val());
            var nf = parseFloat($('#MODnotafinal').val());


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

            nf = (n1 + n2 + n3 + n4 + n5) * 0.2;

            $('#MODnotafinal').val(nf);
        })
    });

    //limpiar despues de agregar notas
    function limpiar() {
        $('#id').val('');
        $('#matricula').val('');
        $('#modulo').val('');
        $('#nombreMod').val('');
        $('#MODnota1').val('');
        $('#MODnota2').val('');
        $('#MODnota3').val('');
        $('#MODnota4').val('');
        $('#MODnota5').val('');
        $('#MODnotafinal').val('');
        $('#status').val('');
    }