if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),o={module:{uri:n},exports:t,require:r};s[n]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1664-8bb517190d54523e.js",revision:"8bb517190d54523e"},{url:"/_next/static/chunks/1683-e4f79c0a7d8eefe6.js",revision:"e4f79c0a7d8eefe6"},{url:"/_next/static/chunks/1816-8edf46dd476d913c.js",revision:"8edf46dd476d913c"},{url:"/_next/static/chunks/194d40f2-1ec9c2064bf57c7f.js",revision:"1ec9c2064bf57c7f"},{url:"/_next/static/chunks/2141-03649a00163f02f4.js",revision:"03649a00163f02f4"},{url:"/_next/static/chunks/240-ebe3a336e6dafde8.js",revision:"ebe3a336e6dafde8"},{url:"/_next/static/chunks/2453-d46c8c10aee6a446.js",revision:"d46c8c10aee6a446"},{url:"/_next/static/chunks/2809-c63bbd98571c56bc.js",revision:"c63bbd98571c56bc"},{url:"/_next/static/chunks/2886-40305613904efd26.js",revision:"40305613904efd26"},{url:"/_next/static/chunks/3864-ca373ab705050efa.js",revision:"ca373ab705050efa"},{url:"/_next/static/chunks/3965-abe95834e9f6c17d.js",revision:"abe95834e9f6c17d"},{url:"/_next/static/chunks/4248-b51b95f4cb9a9c57.js",revision:"b51b95f4cb9a9c57"},{url:"/_next/static/chunks/5675-4a51c10a0488d558.js",revision:"4a51c10a0488d558"},{url:"/_next/static/chunks/6092-e1511962ef2d9cde.js",revision:"e1511962ef2d9cde"},{url:"/_next/static/chunks/6214-fa6af8e61a82f034.js",revision:"fa6af8e61a82f034"},{url:"/_next/static/chunks/6629-fae4b69a6fb4c231.js",revision:"fae4b69a6fb4c231"},{url:"/_next/static/chunks/6643-0382e1e6a984f95f.js",revision:"0382e1e6a984f95f"},{url:"/_next/static/chunks/675-755ce494bb4994a9.js",revision:"755ce494bb4994a9"},{url:"/_next/static/chunks/7036-0f5b1b5edcabc19f.js",revision:"0f5b1b5edcabc19f"},{url:"/_next/static/chunks/7346-a68d210f3a1417a9.js",revision:"a68d210f3a1417a9"},{url:"/_next/static/chunks/742-f123f461f18c1400.js",revision:"f123f461f18c1400"},{url:"/_next/static/chunks/7439-29513117486bd488.js",revision:"29513117486bd488"},{url:"/_next/static/chunks/7536-fd8d352d3c543abe.js",revision:"fd8d352d3c543abe"},{url:"/_next/static/chunks/8407-45252c932d77ddb7.js",revision:"45252c932d77ddb7"},{url:"/_next/static/chunks/858-5a4c850815371d50.js",revision:"5a4c850815371d50"},{url:"/_next/static/chunks/8764-593a836a579a1569.js",revision:"593a836a579a1569"},{url:"/_next/static/chunks/9188-b0a5fa34e9db4cf0.js",revision:"b0a5fa34e9db4cf0"},{url:"/_next/static/chunks/9281-0d386446dbd3792c.js",revision:"0d386446dbd3792c"},{url:"/_next/static/chunks/9315-d8446d4658ba4cc1.js",revision:"d8446d4658ba4cc1"},{url:"/_next/static/chunks/9669-1fe9ecaf6aa53397.js",revision:"1fe9ecaf6aa53397"},{url:"/_next/static/chunks/9721-4cbeacf140f00738.js",revision:"4cbeacf140f00738"},{url:"/_next/static/chunks/9868-ee49716ffa4d9112.js",revision:"ee49716ffa4d9112"},{url:"/_next/static/chunks/9912-24a4dabd7c3ffb00.js",revision:"24a4dabd7c3ffb00"},{url:"/_next/static/chunks/df92a80e-1956390af4ec5ab6.js",revision:"1956390af4ec5ab6"},{url:"/_next/static/chunks/effa34c9-1aa5b3c32f12a9dd.js",revision:"1aa5b3c32f12a9dd"},{url:"/_next/static/chunks/fec483df-3c40b926ce07cc60.js",revision:"3c40b926ce07cc60"},{url:"/_next/static/chunks/framework-79bce4a3a540b080.js",revision:"79bce4a3a540b080"},{url:"/_next/static/chunks/main-a022129c2978498b.js",revision:"a022129c2978498b"},{url:"/_next/static/chunks/pages/404-b0b1f6aa567c8e24.js",revision:"b0b1f6aa567c8e24"},{url:"/_next/static/chunks/pages/500-1457c1291cbce55e.js",revision:"1457c1291cbce55e"},{url:"/_next/static/chunks/pages/_app-8fa71e4380a24dc6.js",revision:"8fa71e4380a24dc6"},{url:"/_next/static/chunks/pages/_error-fa8709af5501215e.js",revision:"fa8709af5501215e"},{url:"/_next/static/chunks/pages/about-69a17e208041d80a.js",revision:"69a17e208041d80a"},{url:"/_next/static/chunks/pages/admin-f609ac332c6518b9.js",revision:"f609ac332c6518b9"},{url:"/_next/static/chunks/pages/admin/approval-c0173070bf3d8f71.js",revision:"c0173070bf3d8f71"},{url:"/_next/static/chunks/pages/admin/approval/%5Bid%5D-d88d28d78b56e457.js",revision:"d88d28d78b56e457"},{url:"/_next/static/chunks/pages/admin/approval/%5Bid%5D/history-42bc904d817b6d6c.js",revision:"42bc904d817b6d6c"},{url:"/_next/static/chunks/pages/admin/dashboard-7a9a1a5e3e3c0295.js",revision:"7a9a1a5e3e3c0295"},{url:"/_next/static/chunks/pages/admin/dashboard-sample-781b17ba955ef75e.js",revision:"781b17ba955ef75e"},{url:"/_next/static/chunks/pages/admin/giftcard-ec13c896f67cbc73.js",revision:"ec13c896f67cbc73"},{url:"/_next/static/chunks/pages/admin/giftcard/payment/success-5222c882eb84b8ef.js",revision:"5222c882eb84b8ef"},{url:"/_next/static/chunks/pages/admin/icons-f738ed31558d313b.js",revision:"f738ed31558d313b"},{url:"/_next/static/chunks/pages/admin/listings-1c85bb3b39ff537b.js",revision:"1c85bb3b39ff537b"},{url:"/_next/static/chunks/pages/admin/maps-7bcdcabe6eb5c84a.js",revision:"7bcdcabe6eb5c84a"},{url:"/_next/static/chunks/pages/admin/merchants-e7543ca4ec6037e0.js",revision:"e7543ca4ec6037e0"},{url:"/_next/static/chunks/pages/admin/notifications-fb8a215eeb915f13.js",revision:"fb8a215eeb915f13"},{url:"/_next/static/chunks/pages/admin/package-85b72773b4ab4559.js",revision:"85b72773b4ab4559"},{url:"/_next/static/chunks/pages/admin/packages-83634aae8aea4ce1.js",revision:"83634aae8aea4ce1"},{url:"/_next/static/chunks/pages/admin/packages/form/form-1d4dc9ae9fee36d4.js",revision:"1d4dc9ae9fee36d4"},{url:"/_next/static/chunks/pages/admin/packages/form/packageForm-4e8e86f91b325787.js",revision:"4e8e86f91b325787"},{url:"/_next/static/chunks/pages/admin/packages/indexOld-f4339a6f0ec18342.js",revision:"f4339a6f0ec18342"},{url:"/_next/static/chunks/pages/admin/promotion-9cf0c100fe4b8b13.js",revision:"9cf0c100fe4b8b13"},{url:"/_next/static/chunks/pages/admin/promotion/%5Bid%5D-c1e0633176c6b13d.js",revision:"c1e0633176c6b13d"},{url:"/_next/static/chunks/pages/admin/promotion/new-10029911c4825903.js",revision:"10029911c4825903"},{url:"/_next/static/chunks/pages/admin/sample-fca56ba1ec238a94.js",revision:"fca56ba1ec238a94"},{url:"/_next/static/chunks/pages/admin/settings-63dd538531408bae.js",revision:"63dd538531408bae"},{url:"/_next/static/chunks/pages/admin/tabs-a72af1002f59d87f.js",revision:"a72af1002f59d87f"},{url:"/_next/static/chunks/pages/admin/typography-32190a52e8b12d93.js",revision:"32190a52e8b12d93"},{url:"/_next/static/chunks/pages/admin/user-profile-0c0db8dc579ed287.js",revision:"0c0db8dc579ed287"},{url:"/_next/static/chunks/pages/admin/verify-f8eb5b9aedf54acb.js",revision:"f8eb5b9aedf54acb"},{url:"/_next/static/chunks/pages/admin/verify/%5Bid%5D-83d707018f58cd5b.js",revision:"83d707018f58cd5b"},{url:"/_next/static/chunks/pages/auth/____signin-edb9de5ede26e117.js",revision:"edb9de5ede26e117"},{url:"/_next/static/chunks/pages/auth/___credentials-signin-41b505606ff7f7cf.js",revision:"41b505606ff7f7cf"},{url:"/_next/static/chunks/pages/carstats-01c3ca8f95e8e7d4.js",revision:"01c3ca8f95e8e7d4"},{url:"/_next/static/chunks/pages/index-372377939bac2947.js",revision:"372377939bac2947"},{url:"/_next/static/chunks/pages/login-page-8e46765162d502c8.js",revision:"8e46765162d502c8"},{url:"/_next/static/chunks/pages/msf-3767b730483d206a.js",revision:"3767b730483d206a"},{url:"/_next/static/chunks/pages/msf/dashboard-11cc00943e809c75.js",revision:"11cc00943e809c75"},{url:"/_next/static/chunks/pages/msf/edit-list/%5Bcid%5D-5b7f7a389c1854c2.js",revision:"5b7f7a389c1854c2"},{url:"/_next/static/chunks/pages/msf/giftcard-646b1481d2e6d1ce.js",revision:"646b1481d2e6d1ce"},{url:"/_next/static/chunks/pages/msf/giftcard/%5Bid%5D-e5e15ac430100b22.js",revision:"e5e15ac430100b22"},{url:"/_next/static/chunks/pages/msf/giftcard/payment/%5Bpackage_id%5D-a8d3532f8c390ffa.js",revision:"a8d3532f8c390ffa"},{url:"/_next/static/chunks/pages/msf/giftcard/paymethod-a883cf7ca098537a.js",revision:"a883cf7ca098537a"},{url:"/_next/static/chunks/pages/msf/icons-95d0c57c9a03b89a.js",revision:"95d0c57c9a03b89a"},{url:"/_next/static/chunks/pages/msf/listing-1c5eddb789cc6c5c.js",revision:"1c5eddb789cc6c5c"},{url:"/_next/static/chunks/pages/msf/profile-cd5dccf92c3605af.js",revision:"cd5dccf92c3605af"},{url:"/_next/static/chunks/pages/msf/subscriptions-7b6b4687ffb421ef.js",revision:"7b6b4687ffb421ef"},{url:"/_next/static/chunks/pages/msf/subscriptions-o-8b512c5b0b4f8ac9.js",revision:"8b512c5b0b4f8ac9"},{url:"/_next/static/chunks/pages/msf/testlistings-6eccbddfc24852ea.js",revision:"6eccbddfc24852ea"},{url:"/_next/static/chunks/pages/msf/upload-534bc7fce4cc71af.js",revision:"534bc7fce4cc71af"},{url:"/_next/static/chunks/pages/samples/select-e823f89cd4a8a888.js",revision:"e823f89cd4a8a888"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-309fbebe2073f18c.js",revision:"309fbebe2073f18c"},{url:"/_next/static/css/2d776c43f861d24c.css",revision:"2d776c43f861d24c"},{url:"/_next/static/css/a0dce7ce9731ddd3.css",revision:"a0dce7ce9731ddd3"},{url:"/_next/static/css/c82dc8587494198d.css",revision:"c82dc8587494198d"},{url:"/_next/static/css/e2223e897a9ffc07.css",revision:"e2223e897a9ffc07"},{url:"/_next/static/g8bOvXRdyziD2qTuZkVY-/_buildManifest.js",revision:"bad40f231c1cc1e4259d3bcd2d61e5fe"},{url:"/_next/static/g8bOvXRdyziD2qTuZkVY-/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/g8bOvXRdyziD2qTuZkVY-/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/images/wheel-eb492ab03ae39116cd3d235ed4098778.svg",revision:"eb492ab03ae39116cd3d235ed4098778"},{url:"/_next/static/media/roboto-all-300-normal.d24be06d.woff",revision:"d24be06d"},{url:"/_next/static/media/roboto-all-400-normal.22c8c36a.woff",revision:"22c8c36a"},{url:"/_next/static/media/roboto-all-500-normal.58195779.woff",revision:"58195779"},{url:"/_next/static/media/roboto-all-700-normal.6f24ae84.woff",revision:"6f24ae84"},{url:"/_next/static/media/roboto-cyrillic-300-normal.3a0cc9ef.woff2",revision:"3a0cc9ef"},{url:"/_next/static/media/roboto-cyrillic-400-normal.ba1944ac.woff2",revision:"ba1944ac"},{url:"/_next/static/media/roboto-cyrillic-500-normal.233fa179.woff2",revision:"233fa179"},{url:"/_next/static/media/roboto-cyrillic-700-normal.4be457a9.woff2",revision:"4be457a9"},{url:"/_next/static/media/roboto-cyrillic-ext-300-normal.f69a4426.woff2",revision:"f69a4426"},{url:"/_next/static/media/roboto-cyrillic-ext-400-normal.7ea3b60d.woff2",revision:"7ea3b60d"},{url:"/_next/static/media/roboto-cyrillic-ext-500-normal.396c8cca.woff2",revision:"396c8cca"},{url:"/_next/static/media/roboto-cyrillic-ext-700-normal.8a1b6008.woff2",revision:"8a1b6008"},{url:"/_next/static/media/roboto-greek-300-normal.723f7117.woff2",revision:"723f7117"},{url:"/_next/static/media/roboto-greek-400-normal.7026b7dc.woff2",revision:"7026b7dc"},{url:"/_next/static/media/roboto-greek-500-normal.c3beb872.woff2",revision:"c3beb872"},{url:"/_next/static/media/roboto-greek-700-normal.2ad194de.woff2",revision:"2ad194de"},{url:"/_next/static/media/roboto-greek-ext-300-normal.ad174f5f.woff2",revision:"ad174f5f"},{url:"/_next/static/media/roboto-greek-ext-400-normal.771ed7af.woff2",revision:"771ed7af"},{url:"/_next/static/media/roboto-greek-ext-500-normal.6c377f5c.woff2",revision:"6c377f5c"},{url:"/_next/static/media/roboto-greek-ext-700-normal.9f29d948.woff2",revision:"9f29d948"},{url:"/_next/static/media/roboto-latin-300-normal.0dfc8c1e.woff2",revision:"0dfc8c1e"},{url:"/_next/static/media/roboto-latin-400-normal.7b8d7718.woff2",revision:"7b8d7718"},{url:"/_next/static/media/roboto-latin-500-normal.f7e6f1dc.woff2",revision:"f7e6f1dc"},{url:"/_next/static/media/roboto-latin-700-normal.1827c79e.woff2",revision:"1827c79e"},{url:"/_next/static/media/roboto-latin-ext-300-normal.2b4609e0.woff2",revision:"2b4609e0"},{url:"/_next/static/media/roboto-latin-ext-400-normal.cf3d7789.woff2",revision:"cf3d7789"},{url:"/_next/static/media/roboto-latin-ext-500-normal.e607ae89.woff2",revision:"e607ae89"},{url:"/_next/static/media/roboto-latin-ext-700-normal.3219c3cf.woff2",revision:"3219c3cf"},{url:"/_next/static/media/roboto-vietnamese-300-normal.a43bdf55.woff2",revision:"a43bdf55"},{url:"/_next/static/media/roboto-vietnamese-400-normal.0f9be457.woff2",revision:"0f9be457"},{url:"/_next/static/media/roboto-vietnamese-500-normal.2e57caf4.woff2",revision:"2e57caf4"},{url:"/_next/static/media/roboto-vietnamese-700-normal.33144a4d.woff2",revision:"33144a4d"},{url:"/assets/github/angular.png",revision:"d264deea9e616d213cfe87a4c5b79bbb"},{url:"/assets/github/chrome.png",revision:"604656e0b3b40f0b61fb1e48fd8b6509"},{url:"/assets/github/dashboard.jpg",revision:"cdbd4ba87eb0c449202856bbc55ce10e"},{url:"/assets/github/edge.png",revision:"d37f8fab49aea9fb8d03dbf34b51bc74"},{url:"/assets/github/firefox.png",revision:"932a81942082e8974da4cff9fbf82293"},{url:"/assets/github/html.png",revision:"a903484a43a91d93d2cbeac15a1bfc49"},{url:"/assets/github/map.jpg",revision:"002e9004cb6f46a1edf818236584561b"},{url:"/assets/github/md-react.gif",revision:"1e22fdbcdfc42eb80895c78151b7e61e"},{url:"/assets/github/notifications.jpg",revision:"abd20b434a4b10ee9cba3e08970cce9b"},{url:"/assets/github/opera.png",revision:"152379e9d60b0f33c893f7b092277197"},{url:"/assets/github/opt_md_angular_thumbnail.jpg",revision:"8b14e2f3183656e3530dd926b87cbdf2"},{url:"/assets/github/opt_md_thumbnail.jpg",revision:"90add3ffb6bbe51ca768ef2839752c67"},{url:"/assets/github/opt_md_vue_thumbnail.jpg",revision:"41bda045badf374b1895e58b46321dd0"},{url:"/assets/github/opt_mdr_thumbnail.jpg",revision:"26abbe2efb7633ba79117cbbc57e909b"},{url:"/assets/github/react.svg",revision:"8e26f22094a11f6a689d8302dc30782c"},{url:"/assets/github/safari.png",revision:"ea45a6a295ebd4680afd581edb68be80"},{url:"/assets/github/tables.jpg",revision:"aa022c879503f0e3f1923dda105a3de3"},{url:"/assets/github/userprofile.jpg",revision:"adb8d7d5c656ac5bfa2b3000f919d592"},{url:"/assets/github/vuejs.png",revision:"cf23526f451784ff137f161b8fe18d5a"},{url:"/assets/img/apple-icon.png",revision:"173d66da760349a1a276b211e974e5b6"},{url:"/assets/img/bg7.jpg",revision:"b08234a2b7e8e4fb2e3c4e713252021c"},{url:"/assets/img/bhalogari.png",revision:"d8fb515d997347c29eef59d24914483d"},{url:"/assets/img/car_placeholder.png",revision:"3a95f0a341fa359e6359c93a4f10f65e"},{url:"/assets/img/cover.jpeg",revision:"90bb3c7ce3c6a03e40fa3b3b672a0cd9"},{url:"/assets/img/faces/marc.jpg",revision:"8880a65c57d7f031579335be153f64a0"},{url:"/assets/img/favicon.png",revision:"8fd18845fb63d7c0167363428add7ace"},{url:"/assets/img/mask.png",revision:"008b069878a604f7dfd87bf697aa756f"},{url:"/assets/img/new_logo.png",revision:"34b9eced6af38ca58fe83c369c21e600"},{url:"/assets/img/reactlogo.png",revision:"3b38551e8c65303682cb2dd770ce2618"},{url:"/assets/img/sidebar-1.jpg",revision:"8e9f0a3c5578a20733d5bad0e51c91fb"},{url:"/assets/img/sidebar-2.jpg",revision:"310509c95512893dc661bd3a6b0d2a5d"},{url:"/assets/img/sidebar-3.jpg",revision:"2503169017014036cf0dd0dd7c2a2b8a"},{url:"/assets/img/sidebar-4.jpg",revision:"fc9cb0538eb5a4dfd6fbb1bf6dd6189b"},{url:"/assets/img/ss.png",revision:"cbecf30cd9d123971e77aa7d2b74f678"},{url:"/assets/img/tim_80x80.png",revision:"1eb98be26e1cef672dcb5b48dea1069f"},{url:"/banner/668062b0c485af87b883aec01.jpg",revision:"19fdf8656a5b4d4c4f672eaf37ec7c05"},{url:"/banner/d6f33f48e5da2ae128428a900.jpg",revision:"19fdf8656a5b4d4c4f672eaf37ec7c05"},{url:"/banner/d6f33f48e5da2ae128428a901.jpg",revision:"d7053ba8badd240edb562794bf1c3a83"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/giftcard.json",revision:"d5647ce0b44645af0d59372ca26fde09"},{url:"/icons/icon-192x192.png",revision:"6126c89b9161bc07b68e49f6af1a1e41"},{url:"/icons/icon-256x256.png",revision:"0c1a3f6e10e4c670e401c76799f25da1"},{url:"/icons/icon-384x384.png",revision:"1d7d65b1d952c2247d05a7585b5dfca4"},{url:"/icons/icon-512x512.png",revision:"d9fffe984e59414616e1e83d1aa4bae3"},{url:"/icons/maskable_icon.png",revision:"d19a8ca2909fc70634938361c2201243"},{url:"/icons/maskable_icon_x128.png",revision:"5a0eca36224a7870f9b0cb94c4487758"},{url:"/icons/maskable_icon_x192.png",revision:"27d3d656d1ed02327377fc96ef300d66"},{url:"/icons/maskable_icon_x384.png",revision:"d19a8ca2909fc70634938361c2201243"},{url:"/icons/maskable_icon_x48.png",revision:"26a6022e05ceaaf595e14831e3f2051b"},{url:"/icons/maskable_icon_x72.png",revision:"c57a36cf26b6560e7f689fcdc9697b0f"},{url:"/icons/maskable_icon_x96.png",revision:"b9eb2a15f7840ad16acae3d15f7a41e2"},{url:"/log.json",revision:"59a30d2e0ad26bb415c44c0d7d31da3a"},{url:"/manifest.json",revision:"bfa3b3ff0a0425f53b3a8e89576f6dd5"},{url:"/table.json",revision:"cbb3ccb1a3b42e64dd839544084fbe6d"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
