$(function () {
    capturarId();
});
function capturarId() {
    var varSession = $("#var").val();
    perfil(varSession);
};
function perfil(id) {
    $.ajax({
        url: "/Profesor/ObtenerPorId?pId=" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#id').val(data.Id);
            $('#nombre').val(data.NombreProfesor);
            $('#apellido').val(data.ApellidoProfesor);
            $('#email').val(data.Email);
            $('#pass').val(data.Contraseña);
        },
        error: function (err) {
            toastr.error("Nose pudo completar");
        }
    });
};