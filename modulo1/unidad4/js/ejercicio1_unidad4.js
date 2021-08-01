var distancia, respuesta;

distancia=prompt('Ingrese la distancia a recorrer: ', '');

respuesta='El medio de transporte apropiado es: ';

if(distancia<1000){
    document.write(respuesta + 'pie');
    console.log('0 a 1000: '+distancia);
}
else if(distancia<10000){
    document.write(respuesta + 'bicicleta');
    console.log('1000 a 10000: '+distancia);
}
else if(distancia<30000){
    document.write(respuesta + 'colectivo');
    console.log('10000 a 30000: '+distancia);
}
else if(distancia<100000){
    document.write(respuesta + 'auto');
    console.log('30000 a 100000: '+distancia);
}
else{
    document.write(respuesta + 'avión');
    console.log('Mayor e igual a 100000: '+distancia);
}
