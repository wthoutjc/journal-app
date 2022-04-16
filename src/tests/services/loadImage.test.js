import "setimmediate";
import cloudinary from "cloudinary";
import { loadImageService } from "../../services/loadImage";

const { REACT_APP_CLOUD_NAME, REACT_APP_API_KEY, REACT_APP_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: REACT_APP_CLOUD_NAME,
  api_key: REACT_APP_API_KEY,
  api_secret: REACT_APP_API_SECRET,
  secure: true,
});

describe("Pruebas en loadImageService.js", () => {
  test("Debe de cargar un archivo y retornar un URL", async () => {
    const response = await fetch(
      "https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg"
    );
    const blob = await response.blob();

    const file = new File([blob], "foto.jpg");
    const url = await loadImageService(file);

    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    cloudinary.v2.api.delete_resources(imageId, {}, (err, res) => {
      console.log(err, res);
    });
  });

  test("Debe de retornar un error", async () => {
    const file = new File([], "foto.jpg");
    const url = await loadImageService(file);

    expect(url).toBe(undefined);
  });
});
