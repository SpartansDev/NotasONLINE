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
                html += "<th>" + item.EstudianteId.NombreEstudiante + "</th>";
                html += "<th>" + item.EstudianteId.ApellidoEstudiante + "</th>";
                html += "<th>" + item.EstudianteId.Codigo + "</th>";
                html+="<th>"+item.Ciclo+"</th>";
                html += "<th>";
                html += "<a href='#' data-toggle='modal' data-target='#modal' class='badge badge-success' onclick='obtenerModulosPorEstudianteId(" + item.EstudianteId.Id + ")'>ver modulos</a>";
                html += "</th>";
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
                $('#refrescar').val(datos.MatriculaId.EstudianteId.Id);//id del alumno
                $('#modulo').val(datos.ModuloId.Id);
                $('#nombreMod').val(datos.ModuloId.NombreModulo);
                $('#nota1').val(datos.Nota1);
                $('#nota2').val(datos.Nota2);
                $('#nota3').val(datos.Nota3);
                $('#nota4').val(datos.Nota4);
                $('#nota5').val(datos.Nota5);
                $('#notafinal').val(datos.NotaFinal);
                $('#status').val(datos.Status);
            },
            error: function (err)
            {
                toastr.error('No se pudo completar la acción.');
            }
        });
    }

    ///funciones para agregar Notas
    function agregar() {
        if (!($('#matricula').val() == '' || $('#modulo').val() == '' || $('#nota1').val() == '' || $('#nota2').val() == '' || $('#nota3').val() == '' ||
            $('#nota4').val() == '' || $('#nota5').val() == '' || $('#notafinal').val() == '' || $('#status').val() == ''))
        {
            //verificar que nota no sea mayor a 10 o menor a 0
            if ($('#nota1').val() > 10 || $('#nota2').val() > 10 || $('#nota3').val() > 10 || $('#nota4').val() > 10 || $('#nota5').val() > 10 ||
                $('#nota1').val() < 0 || $('#nota2').val() < 0 || $('#nota3').val() < 0 || $('#nota4').val() < 0 || $('#nota5').val() < 0)
            {
                toastr.warning("Verifica si no haz escrito numeros negativos o mayor a 10", "Advertencia");
            }
            else
            {
                var obj = {
                    Id: $('#pid').val(),
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
            var n1 = parseFloat($('#nota1').val());
            var n2 = parseFloat($('#nota2').val());
            var n3 = parseFloat($('#nota3').val());
            var n4 = parseFloat($('#nota4').val());
            var n5 = parseFloat($('#nota5').val());
            var nf = parseFloat($('#notafinal').val());


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

            $('#notafinal').val(nf);
        })
    });

    //limpiar despues de agregar notas
    function limpiar() {
        $('#id').val('');
        $('#matricula').val('');
        $('#modulo').val('');
        $('#nombreMod').val('');
        $('#nota1').val('');
        $('#nota2').val('');
        $('#nota3').val('');
        $('#nota4').val('');
        $('#nota5').val('');
        $('#notafinal').val('');
        $('#status').val('');
    }