
# tcrowe-webextension-https-only

I wanted a very simple and compact way to enforce HTTPS.

Other extensions were very large in size with many dependencies. This one has dependencies to build it but none are included in the extension. It will be very understandable if you read through the source.

## Develop and build

```sh
# download the repo
git clone https://github.com/tcrowe/tcrowe-webextension-https-only.git
cd tcrowe-webextension-https-only

# install development dependencies
npm install

# watch for changes and rebuild in development mode
# includes sourcemaps
npm run dev

# build compact version for production
# minified without sourcemaps
npm run prd
```

Load `./dist` into your browser.

For the future

+ [Pack extension for Chrome](https://www.adambarth.com/experimental/crx/docs/packaging.html). Zip and sign the extension for distribution.

## Confirmed working for

+ Chromium v67
