



var Calculadora = (function(){


	window.onload = function(){



		document.getElementById("on").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("sign").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("raiz").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("dividido").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("por").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("menos").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("punto").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("igual").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("mas").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("7").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("8").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("9").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("4").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("5").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("6").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("1").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("2").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("3").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});
		document.getElementById("0").addEventListener("mousedown",function(){Calculadora.reducirBoton(this.id);});

		document.getElementById("on").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("sign").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("raiz").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("dividido").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("por").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("menos").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("punto").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("igual").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("mas").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("7").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("8").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("9").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("4").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("5").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("6").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("1").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("2").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("3").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});
		document.getElementById("0").addEventListener("mouseup",function(){Calculadora.aumentarBoton(this.id);});

		document.getElementById("7").addEventListener("click",function(){Calculadora.colocarNumero("7");});
		document.getElementById("8").addEventListener("click",function(){Calculadora.colocarNumero("8");});
		document.getElementById("9").addEventListener("click",function(){Calculadora.colocarNumero("9");});
		document.getElementById("4").addEventListener("click",function(){Calculadora.colocarNumero("4");});
		document.getElementById("5").addEventListener("click",function(){Calculadora.colocarNumero("5");});
		document.getElementById("6").addEventListener("click",function(){Calculadora.colocarNumero("6");});
		document.getElementById("1").addEventListener("click",function(){Calculadora.colocarNumero("1");});
		document.getElementById("2").addEventListener("click",function(){Calculadora.colocarNumero("2");});
		document.getElementById("3").addEventListener("click",function(){Calculadora.colocarNumero("3");});
		document.getElementById("0").addEventListener("click",function(){Calculadora.colocarNumero("0");});
		document.getElementById("on").addEventListener("click",function(){Calculadora.resetear();});
		document.getElementById("sign").addEventListener("click",function(){Calculadora.opuesto()});
		document.getElementById("dividido").addEventListener("click",function(){Calculadora.operar("/");});
		document.getElementById("por").addEventListener("click",function(){Calculadora.operar("*");});
		document.getElementById("menos").addEventListener("click",function(){Calculadora.operar("-");});
		document.getElementById("punto").addEventListener("click",function(){Calculadora.colocarNumero(".");});
		document.getElementById("igual").addEventListener("click",function(){Calculadora.igualar();});
		document.getElementById("mas").addEventListener("click",function(){Calculadora.operar("+");});
		document.getElementById("raiz").addEventListener("click",function(){Calculadora.raizcuadrada()});

	}

	x="0";
	xi	= 1;
	coma=0;
	ni=0; //Numero oculto o en espera
	op="no"; //operacion que vamos a realizar "no" = sin operacion pendiente
	

	return {


		//Función que borra los numeros del display y coloca todo en cero
		resetear: function(){

		x="0";
		xi	= 1;
		coma=0;	
		op="no";
		ni=0;
		document.getElementById('display').innerHTML=x;

		},

		colocarNumero: function(xx){ //Recoge el numero presionado y es pasado como argumento de la función

			  if (x=="0" || xi==1  ) { // inicializar un número, 
            
            document.getElementById('display').innerHTML=xx; //Mostrar en pantalla
            x=xx; //guardar número
            	

            if (xx==".") { //si escribimos una coma al principio del número
              
               document.getElementById('display').innerHTML="0."; //Escribimos 0
               x=xx; //guardar número
               coma=1; //cambiar estado de la coma
               }
           }
           else { //continuar escribiendo un número
               if (xx=="." && coma==0) { //si escribimos una coma decimal pòr primera vez

                   		if(x.length<=8){

                   		   document.getElementById('display').innerHTML+=xx;
		                   x+=xx;
		                   coma=1; //cambiar el estado de la coma 
                   		}else{}
		                   
               }
              //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
               else if (xx=="." && coma==1) {} 
               //Resto de casos: escribir un número del 0 al 9: 	 
               else {

		               	if(x.length<=8){

						   document.getElementById('display').innerHTML+=xx; 
		                   x+=xx

		               	}else{}
                 
               }
            }
            xi=0 //el número está iniciado y podemos ampliarlo.
		},


		reducirBoton: function(id){


			document.getElementById(id).style="padding:2px;";

		},

		aumentarBoton: function(id){

			
			document.getElementById(id).style="padding:0px;";

		},

		operar: function(s){

			Calculadora.igualar(); //Si hay operaciones pendientes se realizan primero
			ni=x;  //Ponemos el primer numero en espera para poder escribir el segundo
			op=s; //Guardamos el tipo de operacion
			xi=1; //inicializar pantalla.

		},

		igualar: function(){

				 if (op=="no") { //no hay ninguna operación pendiente.
           			 document.getElementById('display').innerHTML=x;	//mostramos el mismo número	
            		}
        			 else { //con operación pendiente resolvemos
			            sl=ni+op+x; // escribimos la operación en una cadena
			            sol=eval(sl) //convertimos la cadena a código con la funcion eval() de javascript y resolvemos la operacion
						x=sol; //guardamos la solución
						op="no"; //ya no hay operaciones pendientes
			            xi=1; //se puede reiniciar la pantalla.
			            z=x.toString();

				            if(z.length>8){

				            	x=sol.toFixed(7);
				            	document.getElementById('display').innerHTML=x; //mostramos la solución
				            	 
				            }else{

				            	document.getElementById('display').innerHTML=x //mostramos la solución

				            }

			            }

		},

		raizcuadrada: function(){

		 x=Math.sqrt(x) //resolver raíz cuadrada.
         document.getElementById('display').innerHTML=x.toFixed(5); //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla 

		},

		opuesto: function(){

			nx=Number(x); //convertir en número
            nx=-nx; //cambiar de signo
            x=String(nx); //volver a convertir a cadena
            document.getElementById('display').innerHTML=x; //mostrar en pantalla.
		}
	}
})();