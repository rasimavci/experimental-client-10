    function saveValue(key, value, hash) {
        var username = 'ravci@genband.com' // $rootScope.user || hash;
        if (username) {
            if (hash) {
                value = aesLib.enc(value, username);
                if (!$rootScope.user) {
                    return window.localStorage.setItem(key, value);
                }
                return window.localStorage.setItem($rootScope.user + '_' + key, value);

            }
            return window.localStorage.setItem(username + '_' + key, value);
        }
        return window.localStorage.setItem(key, value);
    }

    function deleteValue(key) {
        if ($rootScope.user) {
            return window.localStorage.removeItem($rootScope.user + '_' + key);
        }
        return window.localStorage.removeItem(key);

    }

    function getValue(key, hash) {
        var username = 'ravci@genband.com' // $rootScope.user || hash, hashedValue;
        if (username) {
            if (hash) {
                if (!$rootScope.user) {
                    hashedValue = window.localStorage.getItem(key);
                    return aesLib.dec(hashedValue, username);
                }
                hashedValue = window.localStorage.getItem(username + '_' + key);
                return aesLib.dec(hashedValue, username);
            }
            return window.localStorage.getItem(username + '_' + key);
        }
        return window.localStorage.getItem(key);
    }

const FavoritesService = {
    //var favKey = "Fav", speedDialKey = "speedDialContacts",
        setFavorites:(favItems) => {
            saveValue(favKey, JSON.stringify(favItems), false);
        },
        getFavorites: () => {
            return JSON.parse(getValue(favKey, false) || "{}");
        },
        setSpeedDialContacts: (speedDialItems) => {
          let speedDialKey = 'speedDialContacts'
            saveValue(speedDialKey, JSON.stringify(speedDialItems), false);
        },
        getSpeedDialContacts: () => {
            let speedDialKey = 'speedDialContacts'
            return JSON.parse(getValue(speedDialKey, false) || "[]");
        }

};

export default FavoritesService


/* favorites.scss */

// .favorites {
//     /*
//     height: 100%;
//     min-height: 670px;
//     */
// }
// .favorites-row {
//     /*height: 600px;*/
//     height: auto;
//     position: relative;
//     /*min-height: 670px;*/

// }
// .favorites-dropdown {
//     margin: 16px;
// }
// .favorites-block {
//     font-size: 15px;
//     font-weight: 200;
//     line-height: 16px;
// }
// .user-avatar-div{
//     position: relative;
//     display: inline-block;
//     vertical-align: middle;
//     width: 32px;
//     height: 32px;
// }
// .user-avatar {
//     background-position: center center;
//     background-size: cover;
//     background-repeat: no-repeat;
//     border-radius: 50%;
//     width: 38px;
//     height: 38px;
//     position: relative;
// }

// .user-info {
//     display: inline-block;
//     vertical-align: middle;
//     font-size: 13px;
// }
// .favorite-user{
//     background: $white;
//     border-bottom: 1px solid #eceef0;
//     color: $myblack;
//     @extend .cursorpointer;
//     .favorite-user-child {
//         height: 100%;
//     }
//     .profile-presence {
//         border-color: $white;
//     }
// }
// .favorite-user:hover{
//     background-color: $blue-light;
//     color: white;
//     .profile-presence {
//         border-color: $blue-light;
//     }
// }
// .dragging {
//     cursor: move;
// }

// */

// /*favorites list*/

// .favorite-user-list {
//     width: 100%;
//     height: 53px;
//     /*height: 48px;*/
//     display: block;
//     position: relative;
// }
// .favorite-user-list .user-avatar-div{
//     margin: 8px 12px 8px 16px;
// }

// .favorite-user-list .user-info{
//     width: 252px;
//     line-height: 48px;
//     height: 48px;
//     @extend .truncate;
// }
// /*favorites grid*/
// .favorite-user-grid {
//     width: 50%;
//     float: left;
//     height: 69px;
//     position: relative;
//     /*margin: 5px 5px 0 17px;*/
// }
// .favorite-user-grid:nth-child(2n+1){
//     border-right: 1px solid #dfdfdf;
//     margin-right: 0;
// }
// .favorite-user-grid .user-avatar-div{
//     @include mobile {
//         margin: 16px 10px !important;
//     }
//     @include mobile-m {
//         margin: 16px 10px !important;
//     }
//     @include mobile-l {
//         margin: 16px !important;
//     }
//     @include phablet {
//         margin: 16px !important;
//     }
//     @include tablet {
//         margin: 16px !important;
//     }
//     @include desktop {
//         margin: 16px !important;
//     }
// }
// .favorite-user-grid .user-info{
//     width: 60%;
//     @extend .truncate;
// }

// .no-favorite-items {
//     @include mobile {
//         margin-top: 25%;
//         text-align: center;
//         font-size: 120%;
//         padding: 5px;
//         @include mobile-s-height {
//             margin-top: 20%;
//         }
//         @include mobile-m-height {
//             margin-top: 20%;
//         }
//         @include mobile-l-height {
//             margin-top: 20%;
//         }
//     }
//     @include phablet {
//         margin-top: 25%;
//         text-align:center;
//         font-size: 130%;
//         padding: 5px;
//         @include mobile-s-height {
//             margin-top: 20%;
//         }
//         @include mobile-m-height {
//             margin-top: 20%;
//         }
//         @include mobile-l-height {
//             margin-top: 20%;
//         }
//     }
//     @include tablet {
//         margin-top: 25%;
//         text-align:center;
//         font-size: 120%;
//         padding: 10%;
//         @include phablet-height {
//             margin-top: 20%;
//         }
//     }
//     @include desktop {
//         margin-top: 20%;
//         text-align:center;
//         font-size: 120%;
//         padding: 10%;
//         @include desktop-height {
//             margin-top: 20%;
//         }
//     }
//     @include desktophd {
//         margin-top: 20%;
//         text-align:center;
//         font-size: 120%;
//         padding: 10%;
//         @include desktophd-height {
//             margin-top: 20%;
//         }
//     }
//     @include desktophd-wide {
//         margin-top: 20%;
//         text-align:center;
//         font-size: 120%;
//         padding: 10%;
//         @include desktophd-wide-height {
//             margin-top: 20%;
//         }
//     }
//     @include wide {
//         margin-top: 20%;
//         text-align:center;
//         font-size: 120%;
//         padding: 10%;
//         @include wide-height {
//             margin-top: 20%;
//         }
//     }
//     @include wider {
//         margin-top: 20%;
//         text-align:center;
//         font-size: 120%;
//         padding: 10%;
//         @include wider-height {
//             margin-top: 20%;
//         }
//     }
// }

// /*new*/

// .favorites-item{
//     width: 98%;
//     height: 40px;
//     padding: 8px;
//     padding-left: 15px;
//     background: white;
// }

// .favorites-item .user-photo{
//     width: 40px;
//     height: 40px;
//     float: left;
//     position: relative;
//     border-radius: 50%;
// }

// .favorites-item .user-photo > .profile-presence{
//     border-color: white;
// }

// .favorites-item .user-name{
//     width: 200px;
//     height: 40px;
//     line-height: 40px;
//     margin-left: 16px;
//     float: left;
//     color:rgba(0, 0, 0, 0.7);
//     font-size: 14px;
// }

// .favorites-item .user-title{
//     width: 50px;
//     height: 40px;
//     line-height: 40px;
//     margin-left: 11px;
//     margin-right: 11px;
//     float: right;
//     color:rgba(0, 0, 0, 0.5);
//     font-size: 11px;
//     text-align: right;
// }

// .line{
//     border-bottom: 1px solid #e5e5e5; height: 4px;
// }

// .favorite-method {
//     color: rgba(0,0,0,0.5);
// }

// .favorite-user-list .favorite-method {
//     text-align: right;
//     position: absolute;
//     right: 25px;
// }

// .favorite-user-list .user-info > .name {
//     line-height: 32px;
//     margin-top: 7px;
//     display: block;
//     width: 80%;
//     overflow: hidden!important;
//     @extend .truncate;
//     float: left;
// }


// .favorite-user-grid .user-info > .name {
//     display: block;
//     -webkit-line-clamp: 2;
//     -webkit-box-orient: vertical;
//      width: 100% !important;
//     @extend .truncate;
// }

// .favorites-navbar-title {
//     @include mobile {
//         font-size: 17px !important;
//     }
//     @include mobile-s {
//         font-size: 17px !important;
//     }
//     @include mobile-m {
//         font-size: 18px !important;
//     }
//     @include mobile-l {
//         font-size: 18px !important;
//     }
//     @include phablet {
//         font-size: 18.5px !important;
//     }
//     @include tablet {
//         font-size: 18.5 !important;
//     }
//     @include desktop {
//         font-size: 20px !important;
//     }
//     @include desktophd {
//         font-size: 20px !important;
//     }
//     @include desktophd-wide {
//         font-size: 24px !important;
//     }
//     @include wide {
//         font-size: 24px !important;
//     }
//     @include wider {
//         font-size: 24px !important;
//     }
// }

// .action-popup-name{
//     background-color: yellow;
//     color: black;
// }

// .action-popup-label{
//     background-color: #007aff;
//     color: $white;
// }

// .favorites .services-row{
//     width: 100%;
//     margin: 25px 0;
//     height: initial;
// }

// .favorites .services-row > .services{
//     width: initial;
//     height: 14px;
//     color: #455d72;
//     font-size: 12px;
//     margin-left: 14px;
//     margin-bottom: 10px;
// }

// .services-row > .meetMeConferance, .services-row > .callGrab{
//     width: 100%;
//     height: 56px;
//     padding: 8px;
//     padding-left: 15px;
//     background: white;
//     border-top: 1px solid #e5e5e5;
//     border-bottom: 1px solid #e5e5e5;
// }

// .services-row > .meetMeConferance > .meetMe-image, .services-row > .callGrab > .callGrab-image{
//     width: 40px;
//     height: 40px;
//     float: left;
//     position: relative;
//     background-position: center center;
//     background-size: 25px 25px;
//     background-repeat: no-repeat;
//     background-color: #445c72;
//     border-radius: 40px;
// }

// .services-row > .meetMeConferance > .meetMe-title, .services-row > .callGrab > .callGrab-title{
//     width: 200px;
//     height: 40px;
//     line-height: 40px;
//     margin-left: 16px;
//     float: left;
//     color:rgba(0, 0, 0, 0.7);
//     font-size: 14px;
//     cursor: default;
// }
