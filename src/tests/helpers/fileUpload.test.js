import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "dzic51xtl",
  api_key: "957173276522649",
  api_secret: "6B7t5BvGfi8zBy87qA0wJVU8IHU",
});

describe("Pruebas en el fileUpload", () => {
  test("Debe de cargar un archivo y retornar el URL", async () => {
    const response = await fetch(
      "https://image.flaticon.com/icons/png/128/3202/3202926.png"
    );
    const blob = await response.blob();
    const file = new File([blob], "car.png");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    // borrar imagen por ID
    const segments = url.split("/");
    const imageID = segments[segments.length - 1].replace(".png", "");

    await cloudinary.v2.api.delete_resources(imageID, {}, () => {
      console.log("terminada");
    });
  });

  test("Debe de retornar un error", async () => {
    // const file = new File([], "car.png");
    // const url = await fileUpload(file);
    // console.log(url);
  });
});
