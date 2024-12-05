export const uploadToCloudinary = async (pics) => {
  const cloud_name = "dzi9os1qh";
  const upload_preset = "quitqecom";

  if (pics) {
    const data = new FormData();

    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzi9os1qh/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const fileDate = await res.json();
    return fileDate.url;
  } else {
    console.log("error : pics not found");
  }
};
