import axios from "axios";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] ?? "";

export async function postImg({
  file,
  folder,
}: {
  file: File;
  folder: string;
}) {
  if (!file) return;
  try {
    const getCheck = await getImg({ folder });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    const res = await axios.post("/api/storage", formData);
    if (res.status === 201) {
      console.log("posted img");
      alert("The image was succesfully added. Reloading the page now.");
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
    alert(`The image failed to get added. Error: ${error}`);
  }
}

export async function getImg({ folder }: { folder: string }) {
  try {
    // axios can pass in obj for query params
    const { data } = await axios.get("/api/storage", {
      params: {
        folderName: folder,
      },
    });
    const links = await data.map(
      (pic: any) =>
        `${supabaseUrl}/storage/v1/object/public/cat-website-pics/${folder}/${pic}`,
    );
    return [data, links];
  } catch (error) {
    console.error(error);
  }
}

export async function deleteImg(folder: string, fileName: string) {
  try {
    const res = await axios.delete("/api/storage", {
      params: { folder: folder, fileName: fileName },
    });
    if (res.status === 200) {
      // idk why 204 doesnt work
      console.log("deleted sucessfully");
      alert(
        `${fileName} has been deleted from ${folder} succesfully. Reloading the page now.`,
      );
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}
