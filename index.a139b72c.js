!function(){var e=document.querySelector("#search-form");document.querySelector(".gallery");e.addEventListener("submit",(function(e){e.preventDefault();var t=e.currentTarget.elements.searchQuery.value,r=new URLSearchParams({key:"".concat("34753059-f7902d1f02de9c533025c1a5e"),q:"".concat(t),image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40,page:1}),o="https://pixabay.com/api/?".concat(r);console.log(o),fetch(o).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then(console.log)}))}();
//# sourceMappingURL=index.a139b72c.js.map
