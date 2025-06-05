
// Config Cloudinary
// cloudinary.config({
//     cloud_name: configs.cloudinary.cloud_name,
//     api_key: configs.cloudinary.api_key,
//     api_secret: configs.cloudinary.api_secret
// });

export const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        return data.secure_url || null;
    } catch (error) {
        console.error("Upload failed:", error);
        return null;
    }
};
