

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
// If you host under a subfolder like example.com/hrpsp,
// set NEXT_BASE_PATH=/hrpsp before build (see #3)
const basePath = process.env.NEXT_BASE_PATH || ''

module.exports = {
  output: 'export',               // produce /out for static hosting
  images: { unoptimized: true },  // required for static hosting
  trailingSlash: true,            // safer on many static hosts
  ...(basePath && {
    basePath,
    assetPrefix: basePath,
  }),
}
