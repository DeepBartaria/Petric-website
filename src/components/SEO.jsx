import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  canonical,
  image,
}) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <link
        rel="canonical"
        href={canonical}
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonical}
      />

      <meta
        property="og:type"
        content="website"
      />

      {image && (
        <meta
          property="og:image"
          content={image}
        />
      )}
    </Helmet>
  );
}