export const fileToBuffer = async (acceptedFiles: File[]) => {
    const buffers: ArrayBuffer[] = [];

    const readFile = (file: File): Promise<ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onabort = () => reject(new Error("File reading was aborted"));
            reader.onerror = () => reject(new Error("File reading has failed"));
            reader.onload = () => resolve(reader.result as ArrayBuffer);

            reader.readAsArrayBuffer(file);
        });
    };

    await Promise.all(
        acceptedFiles.map(async (file) => {
            try {
                const buffer = await readFile(file);
                buffers.push(buffer);
            } catch (error) {
                console.error(error);
            }
        })
    );

    return buffers;
}