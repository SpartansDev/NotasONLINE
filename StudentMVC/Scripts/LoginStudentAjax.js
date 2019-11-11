$("#frmLogin").submit(function(event){
    event.preventDefault();
    login();
});

function login() {
    if (!($('#cod').val() == "" || $('#pass').val() == "")) {
        var obj = {
            Codigo: $('#cod').val(),
            Contraseña: $('#pass').val()
        }
        $.ajax({
            url: "/Home/Login",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
            success: function (resp) {
                if (resp != null) {
                    location.href = "/Home/Notas";
                }
            },
            error: function (err) {
                toastr.error('Codigo o contraseña son incorrectos');
            }
        });
    }
    else {
        toastr.warning("Todos los campos son requeridos");
    }
};