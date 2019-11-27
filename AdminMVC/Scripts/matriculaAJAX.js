//ejecutarlos al momento que se carga la vista
mostrarMatriculas();
cargarCarreras();
cargarEstudiantes();
cargarGrupos();
cargarModulo();
//select dependiente


$("#frmMatricula").submit(function (event) {
    event.preventDefault();
    verificarMatricula();
});
$("#frmNotasMtricual").submit(function (event) {
    event.preventDefault();
    verificarModulo();
})
$("#frmMatriculaModificar").submit(function (event) {
    event.preventDefault();
    modificarMatricula();
});
function capturarTexto() {
    var texto = $("#texto").val();
    if (!(texto == "")) {
        buscarRegistro(texto);
    }
    else {
        mostrarMatriculas();
    }
}
function buscarRegistro(texto) {
    $.ajax({
        url: "/Matricula/buscarPorCodigo?pText="+texto,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.EstudianteId.NombreEstudiante + '' + item.EstudianteId.ApellidoEstudiante + '</td>';
                html += '<td>' + item.Año + '</td>';
                html += '<td>' + item.Ciclo + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>' + item.GrupoId.NombreGrupo + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalModificar">Modificar</a>||';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#inscribir">Inscribir modulo</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbmatricula tbody').html(html);
        },

        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    })
}
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
                html += '<td>' + item.EstudianteId.NombreEstudiante + ' ' + item.EstudianteId.ApellidoEstudiante + '</td>';
                html += '<td>' + item.Año+ '</td>';
                html += '<td>' + item.Ciclo + '</td>';
                html += '<td>' + item.CarreraId.NombreCarrera + '</td>';
                html += '<td>' + item.GrupoId.NombreGrupo + '</td>';
                html += '<td>';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#modalModificar">Modificar</a>||';
                html += '<a href="#" onclick="detalleMatricula(' + item.Id + ')" class="badge badge-danger" data-toggle="modal" data-target="#inscribir">Inscribir modulo</a>';
                html += '</td>';
                html += '</tr>';
            });

            $('#tbmatricula tbody').html(html);
        },

        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    })
}


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
            url: "/Matricula/verificar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if(resp>0)
                {
                    toastr.warning("Lo sentimos, Alumno existente en este Ciclo.");
                }
                else
                {
                    guardarMatricula();
                }
            },
            error: function (err) {
                toastr.error("No se pudo completar la acción.");
            }
        });
    }
    else {
        toastr.warning("Todos los campos son requeridos.");
    }
};

function guardarMatricula() {
    if (!($("#año").val() == "" || $("#ciclo").val() == "" || $("#carrera").val() == "" || $("#estudiante").val() == "" || $("#grupo").val() == "")) 
    { 
        var obj = {
            Id: $("#id").val(),
            Año: $("#año").val(),
            Ciclo: $("#ciclo").val(),
            CarreraId: { Id: $("#carrera").val(), NombreCarrera: '' },
            EstudianteId: { Id: $('#estudiante').val(), NombreEstudiante: '', ApellidoEstudiante: '', Codigo: '', CarreraId: '', Contraseña: '' },
            GrupoId: {Id:$("#grupo").val(),NombreGrupo:'',Turno:'',CarreraId:'',ProfesorId:''}
        }
        $.ajax({
            url: "/Matricula/Agregar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                toastr.success("El registro se ha guardado exitósamente.");
                limpiarFormulario();
                mostrarMatriculas();
            },
            error: function (err) {
                toastr.error("No se pudo completar la acción.");
            }
        });
    }
    else {
        toastr.warning("Todos los campos son requeridos.");
    }
}

function detalleMatricula(id) {
    limpiar();
    $.ajax({
        url: "/Matricula/ObtenerPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#mid').val(data.Id);
            $('#maño').val(data.Año);
            $('#mciclo').val(data.Ciclo);
            $('#mcarrera').val(data.CarreraId.Id);
            $('#mestudiante').val(data.EstudianteId.Id);
            $('#mgrupo').val(data.GrupoId.Id);
            $('#btnGuardar').val('Guardar cambios');
            $('#nombreAlumno').val(data.EstudianteId.NombreEstudiante + ' ' + data.EstudianteId.ApellidoEstudiante);
            $('#Idmatricula').val(data.Id);
            $('#idCarrera').val(-1)
        },
        error: function (err) {
            toastr.error("No se pudo completar la acción.");
        }
    });
}

function limpiarFormulario() {
    $('#nombreAlumno').val('');
    $('#Idmatricula').val('');
    $('#año').val('');
    $('#ciclo').val('');
    $('#carrera').val(-1);
    $('#estudiante').val(-1);
    $('#grupo').val(-1);
    $('#mid').val('');
    $('#maño').val('');
    $('#mciclo').val('');
    $('#mcarrera').val(-1);
    $('#mestudiante').val('');
    $('#mgrupo').val('');
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
            $('#mestudiante').append(html);
        },
        error: function (err) {
            toastr.error("Se ha produciso un error al mostrar Estudiante.");
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
            $('#mgrupo').append(html);
        },
        error: function (err) {
            toastr.error("Se ha producido un error al mostrar Grupo.");
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
            $('#mcarrera').append(html);
            $('#idCarrera').append(html);
        },
        error: function (err) {
            toastr.error("Se ha producido un error al mostrar Carrera.");
        }
    });
}

function modificarMatricula() {
    if (!($("maño").val() == "" || $("#mciclo").val() == "" || $("#mcarrera").val() == "" || $("#mestudiante").val() == "" || $("#grupo").val() == "")) {
        var obj = {
            Id: $("#mid").val(),
            Año: $("#maño").val(),
            Ciclo: $("#mciclo").val(),
            CarreraId: { Id: $("#mcarrera").val(), NombreCarrera: '' },
            EstudianteId: { Id: $('#mestudiante').val(), NombreEstudiante: '', ApellidoEsdudiante: '', Codigo: '', CarreraId: '', Contraseña: '' },
            GrupoId: { Id: $("#mgrupo").val(), NombreGrupo: '', Turno: '', CarreraId: '', ProfesorId: '' }
        }
        $.ajax({
            url: "/Matricula/Modificar",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                toastr.success("El registro se ha guardado exitósamente.");
                limpiarFormulario();
                mostrarMatriculas();
            },
            error: function (err) {
                toastr.error("No se pudo completar la acción.");
            }
        });
    }
    else {
        toastr.warning("Todos los campos son requeridos.");
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Codigo leydi//////////////////////////////////////


function verificarModulo() {
    if (!($('#Idmatricula').val() == '' || $('#modulo').val() == '' || $('#status').val() == '')) {
        var obj = {
            Id: $('#id').val(),
            MatriculaId: { Id: $('#Idmatricula').val(), Año: '', Ciclo: '', CarreraId: '', EstudianteId: '', GrupoId: '' },
            ModuloId: { Id: $('#moduloPorId').val(), NombreModulo: '', CarreraId: '', UV: '' },
            Nota1: $('#nota1').val(),
            Nota2: $('#nota2').val(),
            Nota3: $('#nota3').val(),
            Nota4: $('#nota4').val(),
            Nota5: $('#nota4').val(),
            NotaFinal: $('#notafinal').val(),
            Status: $('#status').val()
        }
        $.ajax({
            url: "/DetalleInscripcion/verificarModulos",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp > 0) {
                    toastr.warning("El alumno ya esta inscrito en este modulo");
                }
                else {
                   inscribirModulo();
                }
            },
            error: function (err) {
                toastr.error("No se pudo completar la solicitud");
            }
        });
    }
    else{
        toastr.warning("Todos los campos son requeridos");
    }
};
function inscribirModulo() {
    if (!($('#Idmatricula').val() == '' || $('#modulo').val() == '' || $('#status').val() == '')) {
        var obj = {
            Id: $('#id').val(),
            MatriculaId: { Id: $('#Idmatricula').val(), Año: '', Ciclo: '', CarreraId: '', EstudianteId: '', GrupoId: '' },
            ModuloId: { Id: $('#moduloPorId').val(), NombreModulo: '', CarreraId: '', UV: '' },
            Nota1: $('#nota1').val(),
            Nota2: $('#nota2').val(),
            Nota3: $('#nota3').val(),
            Nota4: $('#nota4').val(),
            Nota5: $('#nota4').val(),
            NotaFinal: $('#notafinal').val(),
            Status: $('#status').val()
        }
        $.ajax({
            url: "/DetalleInscripcion/Agregar",
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
    else {
        toastr.warning("Todos los campos son requeridos.");
    }
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
function limpiar() {
    $('#modulo').val(-1);
    $('#status').val('')
};

//codigo extra para el selext dependiente
function pasarIdCarrera()
{
    limpiarAlcambiar();
    var pId = $("#idCarrera").val();
    ModuloDependiente(pId);
}
function ModuloDependiente(id) {
    $.ajax({
        url: "/Modulo/moduloPorCarrera?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (key, item) {
                if (!(item == "")) {
                    html += '<option value="' + item.Id + '">' + item.NombreModulo + '</option>';
                }
                else
                {
                    html += '<option>No hay modulos para esta carrera</option>';
                }
            });
            $("#moduloPorId").html(html);
        },
        error: function (err) {
            toastr.error("Se ha producido un error al mostrar Módulo.");
        }
    });
}
function limpiarAlcambiar()
{
    $("#moduloPorId").val(-1);
}