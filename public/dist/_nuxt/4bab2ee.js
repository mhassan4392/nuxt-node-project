(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{725:function(t,e,r){var content=r(789);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(19).default)("f50893bc",content,!0,{sourceMap:!1})},788:function(t,e,r){"use strict";var n=r(725);r.n(n).a},789:function(t,e,r){(e=r(18)(!1)).push([t.i,".tip-tap-editor-dark .v-toolbar__content{background-color:#1e1e1e!important;width:100%}.tip-tap-editor-dark .tiptap-vuetify-editor__content{color:#fff!important}",""]),t.exports=e},897:function(t,e,r){"use strict";r.r(e);r(15),r(12),r(10),r(9),r(11);var n=r(1),o=r(414),c=r(68),l=r(682);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var d={components:{TiptapVuetify:o.p},mixins:[l.a],props:{value:{type:String,default:""},placeholder:{type:String,default:"Body"}},data:function(t){return{extensions:[o.g,o.a,o.k,o.r,o.o,o.j,o.i,o.l,o.c,o.m,[o.f,{options:{levels:[1,2,3]}}],o.b,o.k,o.d,o.h,o.n,o.e]}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.d)("settings",{dark:function(t){return t.settings.theme.theme.dark}}))},O=(r(788),r(37)),component=Object(O.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("tiptap-vuetify",{class:t.dark?"tip-tap-editor-dark":"",attrs:{value:t.value,extensions:t.extensions,rules:[t.rules.required],placeholder:t.placeholder},on:{input:function(e){return t.$emit("input",arguments[0])}}})],1)}),[],!1,null,null,null);e.default=component.exports}}]);