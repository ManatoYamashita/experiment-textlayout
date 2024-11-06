/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
    experimental: {
        workerThreads: false,
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
};
  
export default nextConfig;
