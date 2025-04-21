export default async function fetchData() {
  const url =
    "https://api.giphy.com/v1/gifs/trending?api_key=ryWRXWvW3oAUUQGypFXi2GOsbGrSWzuT&limit=20&offset=0&rating=g&bundle=messaging_non_clips";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return formatData(json);
  } catch (error) {
    console.log(error);
  }
}

function formatData(json) {
  return json.data.map((item) => ({
    url: item.images.original.webp,
    clicked: false,
  }));
}
