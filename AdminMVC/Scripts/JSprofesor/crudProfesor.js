capturarID();
function capturarID() {
    var Id = $("#MiId").val();
    misAlumnos(Id);
};
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
                html += "<a href='#' data-toggle='modal' data-target='#modal' class='badge badge-success' onclick='detalle(" + item.EstudianteId.Id + ")'>Agregar notas</a>";
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
        url: "/Matricula/obtenerPorId?pId="+id,
        type:"GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (datos) {

        }
    })
}