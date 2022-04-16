const { REACT_APP_CLOUD_NAME, REACT_APP_UPLOAD_PRESET } = process.env;

const CLOUD_NAME = REACT_APP_CLOUD_NAME;
const UPLOAD_PRESET = REACT_APP_UPLOAD_PRESET;

const loadImageService = async (file) => {
  const cloudUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("file", file);

  const SETTINGS = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(cloudUrl, SETTINGS);

    if (response) {
      const cloudResponse = await response.json();
      return cloudResponse.secure_url;
    } else {
      throw await response.json();
    }
  } catch (error) {
    throw error;
  }
};

export { loadImageService };
