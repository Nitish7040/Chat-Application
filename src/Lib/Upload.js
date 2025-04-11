

const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "docs_upload"); 
    data.append("cloud_name", "dx3v4admq");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dx3v4admq/upload", {
        method: "POST",
        body: data,
      });
  
      const result = await res.json();
      console.log("Cloudinary upload result:", result);
      return result.secure_url;
    } catch (error) {
      console.error("Upload to Cloudinary failed", error);
      throw error;
    }
};


export default upload;
