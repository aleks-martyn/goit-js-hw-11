!function(){function e(e){return e&&e.__esModule?e.default:e}var t={};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var n={};function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,t,n){t&&r(e.prototype,t);n&&r(e,n);return e};var a=function(){"use strict";function r(){e(t)(this,r)}return e(n)(r,[{key:"fetchImages",value:function(e){var t=new URLSearchParams({key:"".concat("34753059-f7902d1f02de9c533025c1a5e"),q:"".concat(e),image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40,page:1}),n="".concat("https://pixabay.com/api/","?").concat(t);console.log(n),fetch(n).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then(console.log)}}]),r}(),o=document.querySelector("#search-form"),c=(document.querySelector(".gallery"),document.querySelector(".load-more")),u=new a;o.addEventListener("submit",(function(e){e.preventDefault(),i=e.currentTarget.elements.searchQuery.value,u.fetchImages(i)})),c.addEventListener("click",(function(e){u.fetchImages(i)}));var i=""}();
//# sourceMappingURL=index.e19928f5.js.map