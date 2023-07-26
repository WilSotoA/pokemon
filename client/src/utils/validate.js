const validate = (inputs) => {

    const textRegex = /^[A-Za-z]+$/;
    const imageRegex = /\.(jpeg|jpg|png|gif|bmp|svg)$/i;
    const inputsValidate = [];

    if (
        !inputs.nombre ||
        !inputs.imagen ||
        !inputs.vida ||
        !inputs.ataque ||
        !inputs.defensa
    )
        inputsValidate.push("Complete los campos * obligatorios");

    if (!textRegex.test(inputs.nombre))
        inputsValidate.push("El nombre solo puede contener letras");

    if (!imageRegex.test(inputs.imagen))
        inputsValidate.push("La url de la imagenn debe ser valida");

    if (inputs.vida > 200 || inputs.ataque > 200 || inputs.defensa > 200 || inputs.velocidad > 200)
        inputsValidate.push("La vida, ataque, defensa o velocidad no debe ser mayor a 200")

    if (inputs.altura > 200)
        inputsValidate.push("La altura no puede ser mayor a 200")

    if (inputs.peso > 9999)
        inputsValidate.push("El peso no puede ser mayor a 9999")

    if (inputs.tipos.length < 2)
        inputsValidate.push("Debe agregar al menos dos tipos")

    return inputsValidate;
};

export default validate;