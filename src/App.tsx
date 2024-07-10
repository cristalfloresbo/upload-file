import { useCallback, useState, useActionState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import mockUploadImage, { InitialStateType } from "./utils/mockUploadImage";
import SubmitButton from "./components/SubmitButton";
import "./App.css";
import CommentsSection from "./components/CommentsSection";

const initialsate: InitialStateType = {
    success: false,
    result: null,
    error: null,
};

const App = () => {
    const [file, setFile] = useState<File>();

    const [{ error, success }, submitAction] =
        useActionState(mockUploadImage, initialsate);

    useEffect(() => {
        if (success && !!file) {
            setFile(undefined);
        }
    }, [success, file]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // Do something with the files
        if (acceptedFiles.length) {
            const file = acceptedFiles[0];

            setFile(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/png": [".png"],
            "image/jpeg": ["jpeg"],
        },
    });

    const renderDropzoneContent = () => {
        if (file) {
            return <p>{file.name}</p>;
        }

        return (
            <p className="drop-title">
                {isDragActive ? "Suelta aqui" : "Arrastra aquí tus archivos"}
            </p>
        );
    };

    return (
        <CommentsSection />
    )

    // return (
    //     <form className="container" action={submitAction}>
    //         <h2 className="title">Administrador de archivos</h2>
    //         <div className="input-area" {...getRootProps()}>
    //             <input {...getInputProps()} name="file" />
    //             {renderDropzoneContent()}
    //             {!success && !!error && <p className="error">{error}</p>}
    //         </div>
    //         {!!file && (
    //             <SubmitButton />
    //             // <button className="upload-btn">
    //             //     {isPending ? "Subiendo..." : "Subir"}
    //             // </button>
    //         )}
    //     </form>
    // );
};

export default App;
