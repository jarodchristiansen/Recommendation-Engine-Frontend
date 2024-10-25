// app/components/Meta.tsx
import Head from "next/head";
import { MetaDataTable } from "../seo/staticMetaContent";
import { Metadata } from "next";

type MetaDataType = {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    images?: { url: string; width: number; height: number; alt: string }[];
  };
  twitter?: {
    card?: string;
    site?: string;
    title?: string;
    description?: string;
    image?: string;
  };
};

type MetaDataProps = {
  path?: string;
};

const MetaData = ({ path }: MetaDataProps) => {
  const metadata: MetaDataType = MetaDataTable[path] || MetaDataTable["global"];

  const { title, description, keywords, openGraph, twitter } = metadata;

  console.log({ title, description, keywords, openGraph });

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Open Graph Tags */}
      {openGraph && (
        <>
          <meta property="og:title" content={openGraph.title || title} />
          <meta
            property="og:description"
            content={openGraph.description || description}
          />
          <meta property="og:type" content={openGraph.type} />
          <meta property="og:url" content={openGraph.url} />
          {openGraph.images &&
            openGraph.images.map((image, index) => (
              <meta key={index} property="og:image" content={image.url} />
            ))}
        </>
      )}

      {/* Twitter Tags */}
      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.card} />
          <meta name="twitter:site" content={twitter.site} />
          <meta name="twitter:title" content={twitter.title || title} />
          <meta
            name="twitter:description"
            content={twitter.description || description}
          />
          <meta name="twitter:image" content={twitter.image} />
        </>
      )}
    </Head>
  );
};

export default MetaData;
