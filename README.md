# Experimental Client 10 with F7 v2
Just another experimental client based on vue and f7 version 2 with webpack & cordova

<p>
<img src="src/assets/kandylogo.png"/>
</p>

## Introduction
In this application I have built a mobile webRTC client using vuejs 2 and framework 7 version 2.


## Issues
Targeted for mobile. Since phonegap structure needs www folder, directly builds into www folder when build.

## Development
This project can be developed using necessary libraries
**please install node.js if you have not yet**
**please deploy kandy.js API first**

## Requirements

+ Vue 2.5.1
+ Vuex 3.0.1
+ Framework7 1.6.5
+ Framework7-vue 0.9.4
+ Webpack 3.6.0
+ node@^7.6(development)

* vue-notification 1.3.7
* vuex-i18n lo1.10.5
* moment 2.22.0

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# build apk for android mobile
cordova build/run android
```

# Framework7 Vue + Webpack App Template

A full-featured Framework7 Vue with Webpack setup with hot-reload & css extraction used[Vue Webpack Boilerplate](https://github.com/pvtallulah/base-vue-f7v2-template)


## Project Structure

* `src/assets` - folder with static assets (images)
* `src/components` - folder with custom `.vue` components
* `src/css` - put custom app CSS styles here. Don't forget to import them in `main.js`
* `src/pages` - app `.vue` pages
* `src/main.js` - main app file where you include/import all required libs and init app
* `src/routes.js` - app routes
* `src/app.vue` - main app structure/component
## License
MIT
