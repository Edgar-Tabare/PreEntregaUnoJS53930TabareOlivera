



const VALOR_UR = Number(prompt('Cargue el valor de UR al día 1642.33: '));

let tesorero = 'yama';
let pass = '1234';

function calcularIncrementoPorAtraso(diferenciaDias) {
    let incremento;

    if (diferenciaDias <= 0) {
        incremento = 0; 
    } else if (diferenciaDias <= 10) {
        incremento = 0.02;
    } else if (diferenciaDias <= 30) {
        incremento = 0.04;
    } else if (diferenciaDias <= 60) {
        incremento = 0.06;
    } else if (diferenciaDias <= 90) {
        incremento = 0.08;
    } else {
        incremento = 0.10;
    }

    return incremento;
}

function calcularDiferenciaDias(fechaInicial, fechaFinal) {
    const unDia = 24 * 60 * 60 * 1000;
    return Math.ceil((fechaFinal.getTime() - fechaInicial.getTime()) / unDia);
}

function calcularCuotaTotal(conAmortizacion, fechaVencimiento, fechaPago) {
    let diferenciaDias = calcularDiferenciaDias(fechaVencimiento, fechaPago);
    let incremento = calcularIncrementoPorAtraso(diferenciaDias);
    let cuotaBase = 15 * VALOR_UR;
    let cuotaTotal = cuotaBase * (1 + incremento);

    if (conAmortizacion) {
        cuotaTotal += 15 * VALOR_UR;
    }

    return cuotaTotal;
}

while (true) {
    tesorero = prompt('Ingrese el nombre de usuario: ');
    pass = prompt('Ingrese la contraseña: ');

    if (tesorero === 'yama' && pass === '1234') {
        alert('Bienvenido, tesorero.');
        break;
    } else {
        alert('Credenciales incorrectas. Inténtelo de nuevo.');
    }
}

while (true) {
    let numeroSocio = prompt('Ingrese el número de socio: ');
    let nombre = prompt('Ingrese el nombre del socio: ');
    let conAmortizacion = confirm('La cuota social incluye amortización? (Aceptar para sí, Cancelar para no)');
    let fechaVencimientoInput = prompt('Ingrese la fecha de vencimiento de la cuota en formato "YYYY-MM-DD": ');
    let fechaVencimiento = new Date(fechaVencimientoInput);
    
    let fechaPago = prompt('Ingrese la fecha de pago de la cuota en formato "YYYY-MM-DD": ');
    let fechaPagoCuotaParseada = new Date(fechaPago);

    let cuotaTotal = calcularCuotaTotal(conAmortizacion, fechaVencimiento, fechaPagoCuotaParseada);

    alert(`Detalle de deuda para el socio ${numeroSocio} - ${nombre}:\nCuota social: ${cuotaTotal.toFixed(2)} UR\nFecha de vencimiento de la cuota: ${fechaVencimientoInput}`);

    if (!confirm('¿Desea calcular la deuda para otro socio?')) {
        alert('Gracias por usar nuestro servicio.');
        break;
    }
}
