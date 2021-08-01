var numeros = new Array(7);
var mayor;

for(var i=0; i<numeros.length; i++){
    numeros[i]=parseInt(prompt('Ingrese un número (' + parseInt(i+1) + ' de 7): ',''));
    console.log('numero ingresado ' + numeros[i]);
}

mayor=numeros[0];
for(var i=1; i<numeros.length; i++){
    if(numeros[i]>mayor){
        mayor=numeros[i];
        console.log('Ahora el número mayor es ' + mayor + ' de la posición ' + parseInt(i));
    }
}

document.write('El número mayor es ' + mayor);