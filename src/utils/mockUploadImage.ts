export type InitialStateType = {
    success: boolean;
    result: Record<string, string> | null;
    error: string | null;
};

const uploadImage = async (
    previousState: { success: boolean; result: Record<string, string> },
    formData: FormData
) => {
    const image = formData.get("file");
    console.log(image, previousState);

    const result: Record<string, string> = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                url: "https://via.placeholder.com/150",
                name: "image-05",
            });
        }, 2000);
    });

    // return { success: false, error: "Ha ocurrido un error al subir la imagen", result };
    return { success: true, result, error: null };
};

export default uploadImage;
