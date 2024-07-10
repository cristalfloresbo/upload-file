import { useCallback, useState, useActionState, useEffect, useRef, use } from "react";
import { useDropzone } from "react-dropzone";

import mockUploadImage, { InitialStateType } from "./utils/mockUploadImage";
import SubmitButton from "./components/SubmitButton";
import "./App.css";
import CommentsSection from "./components/CommentsSection";
import CustomInput from "./components/CustomInput";
import ThemeContext from "./context/ThemeContext";

const initialsate: InitialStateType = {
    success: false,
    result: null,
    error: null,
};

const App = () => {
    const theme = use(ThemeContext);
    const myPromise = use(Promise.resolve({data: [{id: 1, value: "one"}]}));
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File>();

    console.log("theme", theme);
    console.log("myPromise", myPromise);
    
    

    const [{ error, success }, submitAction] =
        useActionState(mockUploadImage, initialsate);

    useEffect(() => {
        if (success && !!file) {
            setFile(undefined);
        }
    }, [success, file]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        console.log("inputRef", inputRef.current?.value);
        console.log("containerRef", containerRef);
        
        
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

    // return (
    //     <CommentsSection />
    // )

    return (
        <form className="container" action={submitAction}>
            <h2 className="title">Administrador de archivos</h2>
            <div className="input-area" {...getRootProps()}>
                <input {...getInputProps()} name="file" />
                {renderDropzoneContent()}
                {!success && !!error && <p className="error">{error}</p>}
            </div>
            {!!file && (
                <SubmitButton />
                // <button className="upload-btn">
                //     {isPending ? "Subiendo..." : "Subir"}
                // </button>
            )}
            <CustomInput label="prueba" ref={containerRef} inputRef={inputRef} />
        </form>
    );
};

export default App;
