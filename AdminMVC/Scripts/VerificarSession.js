window.onpaint = verificar();
function verificar()
{
    var idProfe = $("#SessionProfe").val();
    var idAdmin = $("#SessionAdmin").val();
    
        if(!(idAdmin==""))
        {
            location.href = "/Grupo/Index";
        }
        else if (!(idProfe == "")) {
            location.href = "/Profesor/Perfil";
        }
}