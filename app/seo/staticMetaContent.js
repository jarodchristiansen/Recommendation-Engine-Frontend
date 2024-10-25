// app/recommendations/page.tsx
export const recommendationsPageMetaData = {
  title: "Music Recommender - Recommendations",
  description:
    "Get personalized music recommendations based on your favorite tracks.",
  keywords: ["music recommendations", "Spotify", "personalized music"],
  openGraph: {
    type: "website",
    site_name: "Music Recommender",
  },
};

// app/layout.tsx
export const globalMetaData = {
  title: {
    default: "Music Recommender",
    template: "%s | Music Recommender",
  },
  description:
    "Discover personalized music recommendations tailored to your taste.",
  keywords: [
    "music recommendations",
    "Spotify",
    "recommendation engine",
    "music app",
  ],
  openGraph: {
    type: "website",
    siteName: "Music Recommender",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourtwitterhandle",
  },

  // title: {
  //   default: "Your App",

  //   template: "%s | Your App",
  // },

  // description: "This is a description of your app.",

  // keywords: ["app", "music", "recommendation"],

  // openGraph: {
  //   type: "website",
  //   siteName: "Your App",
  // },

  // twitter: {
  //   card: "summary_large_image",
  //   creator: "@yourapp",
  // }
};

export const MetaDataTable = {
  recommendations: recommendationsPageMetaData,
  global: globalMetaData,
};
