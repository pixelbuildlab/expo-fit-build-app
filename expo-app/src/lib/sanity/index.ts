import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const clientConfig = {
  projectId: process.env.EXPO_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.EXPO_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-02-06',
  useCdn: false,
};

const publicClient = createClient(clientConfig);
export {publicClient as client};

export const adminConfig = {
  ...clientConfig,
  token: process.env.SANITY_TOKEN,
};

export const adminClient = createClient(adminConfig);

const builder = imageUrlBuilder(clientConfig);
export const urlFor = (source: string) => builder.image(source);
