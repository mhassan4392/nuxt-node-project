(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{801:function(t,e,r){"use strict";r.r(e);r(15),r(12),r(10),r(9),r(11);var o=r(1),n=r(68);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={computed:l({},Object(n.d)(["post"])),created:function(){this.fetchFeaturedPosts({axios:this.$axios})},methods:l({},Object(n.b)("post",["fetchFeaturedPosts"]))},v=r(37),f=r(46),h=r.n(f),y=r(203),m=r(84),O=r(103),_=r(78),j=r(428),w=r(680),x=r(79),P=r(115),V=r(38),C=r(6),k=r(13),$=Object(C.a)(P.a,V.a).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter:function(){this.runDelay("open")},onMouseLeave:function(){this.runDelay("close")}},render:function(){return this.$scopedSlots.default||void 0!==this.value?(this.$scopedSlots.default&&(element=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(element)&&1===element.length&&(element=element[0]),element&&!Array.isArray(element)&&element.tag?(this.disabled||(element.data=element.data||{},this._g(element.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),element):(Object(k.c)("v-hover should only contain a single element",this),element)):(Object(k.c)("v-hover is missing a default scopedSlot or bound value",this),null);var element}}),S=r(109),A=r(148),D=r(204),E=r(180),I=r(426),M=r(675),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"py-12"},[r("v-container",[r("div",{staticClass:"text-center"},[r("v-avatar",{attrs:{size:"70"}},[r("v-icon",{staticClass:"rounded-full primary white--text",attrs:{size:"40"}},[t._v("\n          "+t._s(t.$store.getters["icons/getIcon"]("app-featured-posts")?t.$store.getters["icons/getIcon"]("app-featured-posts"):"mdi-newspaper")+"\n        ")])],1),t._v(" "),r("h1",{staticClass:"text-center my-2"},[t._v("\n        "+t._s(t.$t("index.featuredPosts.heading"))+"\n      ")]),t._v(" "),r("base-divider",{staticClass:"mb-6",attrs:{width:"100px",center:""}})],1),t._v(" "),t.$store.state.loading.blog.featuredPosts?r("v-row",[r("v-col",t._l(3,(function(i){return r("v-skeleton-loader",{key:i,attrs:{type:"list-item-avatar, divider"}})})),1)],1):r("v-row",t._l(t.post.featuredPosts,(function(e,o){return r("v-col",{key:o,attrs:{cols:"12",md:"4"}},[r("v-hover",{scopedSlots:t._u([{key:"default",fn:function(o){var n=o.hover;return[r("v-card",{staticClass:"mx-auto",attrs:{light:""}},[r("v-img",{attrs:{"aspect-ratio":"1",src:"/uploads/posts/"+e.avatar},scopedSlots:t._u([{key:"placeholder",fn:function(){return[r("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[r("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1)]},proxy:!0}],null,!0)}),t._v(" "),r("v-card-text",[r("h2",{staticClass:"title primary--text"},[t._v("\n                  "+t._s(e.title.substr(0,20)+" ...")+"\n                ")]),t._v("\n                "+t._s(e.excerpt.substr(0,50)+" ......")+"\n              ")]),t._v(" "),r("v-fade-transition",[n?r("v-overlay",{attrs:{absolute:"",color:"#036358"}},[r("v-btn",{attrs:{color:"primary",link:"",to:"/blog/post/"+e.slug}},[t._v(t._s(t.$t("post.moreInfo")))])],1):t._e()],1)],1)]}}],null,!0)})],1)})),1)],1)],1)}),[],!1,null,"212817a4",null);e.default=component.exports;h()(component,{VAvatar:y.a,VBtn:m.a,VCard:O.a,VCardText:_.b,VCol:j.a,VContainer:w.a,VFadeTransition:x.d,VHover:$,VIcon:S.a,VImg:A.a,VOverlay:D.a,VProgressCircular:E.a,VRow:I.a,VSkeletonLoader:M.a})}}]);