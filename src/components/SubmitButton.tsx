import { useFormStatus } from "react-dom";

const SubmitButton = () => {
    // solo funciona useFormStatuscuando esta este componente dentro del componente del formulario
    const { pending, action, data, method } = useFormStatus();
    console.log("pending", pending);
    console.log("action", action);
    console.log("data", data);
    console.log("method", method);

    return (
        <button className="upload-btn">
            {pending ? "Subiendo..." : "Subir"}
        </button>
    );
};

export default SubmitButton;
