import axios from 'axios';
import { addPokemon } from '../redux/actions';
import validate from './validate';

const { VITE_SERVER_URL } = import.meta.env;


// funcion para manejar los campos del formulario y validarlos
export function handleInputChange(e, inputs, setInputs, setErrors) {
    const { name, value } = e.target;
    if (name === "tipos") {
        if (value && !inputs.tipos.includes(value)) {
            setInputs({
                ...inputs,
                tipos: [...inputs.tipos, value],
            });
            setErrors(
                validate({
                    ...inputs,
                    tipos: [...inputs.tipos, value],
                })
            );
        }
    } else {
        setInputs({
            ...inputs,
            [name]: value,
        });

        setErrors(
            validate({
                ...inputs,
                [name]: value,
            })
        );
    }
}

// Función para manejar el envío del formulario
export async function handleFormSubmit(
    e,
    inputs,
    errors,
    setInputs,
    setErrors,
    dispatch
) {
    e.preventDefault();
    if (errors.length > 0) return alert("Complete las validaciones");
    try {
        const { data } = await axios.post(VITE_SERVER_URL, inputs);
        dispatch(addPokemon(data));
        setInputs({
            nombre: "",
            imagen: "",
            vida: "",
            ataque: "",
            defensa: "",
            velocidad: "",
            altura: "",
            peso: "",
            tipos: [],
        });
        setErrors(["Complete los campos * obligatorios"]);
        alert("¡Se creo el Pokemon con Exito!");
    } catch (error) {
        if (error.response?.data?.error) {
            alert(error.response.data.error);
        } else {
            alert("Error al crear el Pokemon");
        }
        console.error(error.message);
    }
}