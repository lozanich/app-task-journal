export const fileUpload = async (file) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/dzic51xtl/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react_journalapp");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    // console.log("RESPONSEEEE2", resp);

    if (resp.ok) {
      const cloudJson = await resp.json();
      return cloudJson.secure_url;
    } else {
      // throw await resp.json()
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
