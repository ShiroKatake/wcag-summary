import sanityClient from "../sanity.config";

const query = `*[_type == "criterion"]`;

export const getSitemap = async (stateSetter: any) => {
  const data = await sanityClient.fetch(query);
  stateSetter(data);
}
