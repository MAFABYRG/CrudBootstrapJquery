const URL_API = 'http://programacion.xyz/mtw/204/crud/index.php/api/'


$(document).ready(function()
{


    $('#btnBuscar').click(function()
    {

        var url = URL_API + 'usuarios/obtener';
    
        

        $.ajax({
           type: 'get',
           url:url,
           data:'',
           contentType:'application/json;charset=utf-8',
           traditiona: true,
           success:tblUsuarios,
           error: function(result){
               alert('Ocurrion un error al llamar al servicio')
           }
        });
    });

    $('#btnNuevo').click(function()
    {
       window.location.href = 'edicion.html';     
    });


});

function tblUsuarios(result)
{
    if(result.status){

        var tbl = '';

        $.each(result.result, function(i, usuario){

            tbl+='<tr>';
            tbl+='<td class="d-none d-md-table-cell">' + (i+1)+'</td>';
            tbl+='<td class="d-none d-md-table-cell">' + usuario.nombre+'</td>';
            tbl+='<td class="d-none d-md-table-cell">' + usuario.apellidos+'</td>';
            tbl+='<td class="d-table-cell d-md-none">' +usuario.nombre+usuario.apellidos+'</td>';
            tbl+='<td class="d-table-cell">';
            tbl+='<div class="justify-content-center">';
            tbl+='<button class="btn btn-primary mr-2" onclick="editar('+usuario.id+')">Editar</button>';
            tbl+='<button class="btn btn-danger ml-2" onclick="eliminar('+usuario.id+')">Eliminar</button>';
            tbl+=' </div>';
            tbl+='</td>';
            tbl+='</tr>';
        });
       
        $('#usuarios-table-body').html(tbl);

    }else{

        alert('Ocurrion un error');
    }
}

function editar(id)
{
    window.location.href = 'edicion.html?id='+id;
}

function eliminar(id)
{
   

    var method = 'DELETE';
    var urlApi = URL_API + 'usuarios/eliminar/';
     
    
    var usuario = {

        id: 0,
        nombre: '',
        apellidos : ''
    };

    
    usuario.id = id;


    urlApi += usuario.id;

    $.ajax({
        type: method,
        url: urlApi,
        data: JSON.stringify(usuario),
        contentType: 'application/json; charset=utf-8',
        success: function(result){
            window.location.href = 'index.html';
        },
        error: function(result){
            alert('Ocurrio un error al llamar al servicio')

        }
    });

    


}