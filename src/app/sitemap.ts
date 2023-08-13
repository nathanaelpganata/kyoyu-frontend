export default async function sitemap() {
  const baseUrl = 'https://www.kyoyu.com';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/my`, lastModified: new Date() },
  ];
}
