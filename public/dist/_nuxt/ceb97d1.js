(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{835:function(t,e,r){"use strict";r.r(e);r(15),r(12),r(10),r(9),r(11);var n=r(1),o=r(68);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var l={middleware:["pagePermission"],components:{ThemeColors:function(){return Promise.all([r.e(0),r.e(70),r.e(80)]).then(r.bind(null,798))},ThemeApp:function(){return r.e(116).then(r.bind(null,873))}},data:function(){return{items:[{title:this.$t("tabs.dashboard.settings.colors"),href:"#colors"},{title:this.$t("tabs.dashboard.settings.app"),href:"#app"}]}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.d)("settings",{settings:function(t){return t.settings}}))},f=r(37),h=r(46),m=r.n(h),d=r(428),v=r(680),O=r(426),w=r(653),j=r(655),y=r(654),P=r(213),component=Object(f.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-row",[r("v-col",{attrs:{cols:"12",justify:"center"}},[r("v-tabs",{attrs:{"next-icon":"mdi-arrow-right-bold-box-outline","prev-icon":"mdi-arrow-left-bold-box-outline","show-arrows":""}},[r("v-tabs-slider"),t._v(" "),t._l(t.items,(function(e,i){return r("v-tab",{key:i,attrs:{href:e.href}},[t._v("\n          "+t._s(e.title)+"\n        ")])})),t._v(" "),r("v-tab-item",{attrs:{value:"colors"}},[r("theme-colors",{attrs:{colors:t.settings.theme.colors}})],1),t._v(" "),r("v-tab-item",{attrs:{value:"app"}},[r("theme-app",{attrs:{theme:t.settings.theme.theme}})],1)],2)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;m()(component,{VCol:d.a,VContainer:v.a,VRow:O.a,VTab:w.a,VTabItem:j.a,VTabs:y.a,VTabsSlider:P.a})}}]);