function cambiar_color(color){
    document.body.style.backgroundColor = color;
}

function contar_caracteres(){
    var comentarios = document.getElementById('comentarios');
    var texto_caracteres = document.getElementById('cant_caracteres');
    
    comentarios.addEventListener('input', function(e){
        var long_maxima = comentarios.getAttribute('maxlength');
        var cantidad = e.target.value.length;

        texto_caracteres.textContent = 'Comentarios: ' + cantidad + ' de ' + long_maxima + ' caracteres';

        if(cantidad == long_maxima){
            texto_caracteres.style = 'font-weight: bold; color: red;';
        }
    });
}