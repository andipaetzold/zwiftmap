# ZwiftMap for Strava

## Development

The extension adds **Zwift** to Strava's map-style selector, alongside Standard,
Satellite and Hybrid. It selects Zwift automatically for virtual activities and
uses every world's bundled image and bounds from `zwift-data`. Built-in styles
remain available. Older Leaflet maps and feed-image replacement are also supported.

### Native Strava maps

`src/maps/` separates map discovery, the selector, native styles, geographic
projection, tile rendering and request handling. Images load only when their
bounds intersect a requested tile; decoded images and generated tiles have
bounded caches.

The native adapter reads the current renderer's asset archive to preserve Strava's
own route, segment, marker, gradient and highlight layers. It places Zwift imagery
below those layers using the native `summer-imagery` slot within a custom style.
Switching back restores the original imagery URL and delegates to Strava's selector.
The native tile cache is invalidated between styles so Zwift tiles cannot remain
visible in Satellite or Hybrid.
Only requests for the adapter's unique tile prefix are supplied locally.

Images are extension assets, so rendering does not depend on Zwift's CDN allowing
cross-origin canvas access. No additional extension permissions are required.
Strava's renderer and React context are private interfaces; unsupported changes
fall back to the built-in map and log a warning.

### Building

Run `npm run build` to compile and bundle the source code. The compiled files are located in the `dist` folder.

Run `npm run typecheck` and `npm test` before building. The build produces both
Chrome and Firefox extension archives and source archives. Load the Chrome
extension's folder as an unpacked extension for manual testing.

### Requirements

- Node 22 or later (see the repository's `.nvmrc`)
- NPM 10 or later

## Dependencies

- [`zwift-data`](https://github.com/andipaetzold/zwift-data)
