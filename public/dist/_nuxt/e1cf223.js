(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{709:function(t,e,o){var content=o(731);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(19).default)("151b4c2e",content,!0,{sourceMap:!1})},730:function(t,e,o){"use strict";var n=o(709);o.n(n).a},731:function(t,e,o){(e=o(18)(!1)).push([t.i,".post-image{cursor:pointer}.post-date{position:absolute;right:0;top:0}.post-text{text-indent:30px;font-size:1.1rem;line-height:1.4rem}",""]),t.exports=e},810:function(t,e,o){"use strict";o.r(e);o(22);var n={components:{AppSidebar:function(){return o.e(17).then(o.bind(null,857))},PageShowcase:function(){return o.e(4).then(o.bind(null,851))}},computed:{getPage:function(){return this.$store.state.post.page}},watch:{getPage:function(){this.$router.push({path:this.$route.path,query:{page:this.$store.state.post.page}})}},created:function(){this.$route.query.page?this.$store.state.post.page=Number(this.$route.query.page):this.$store.state.post.page=1}},r=(o(730),o(37)),c=o(46),l=o.n(c),h=o(428),d=o(680),f=o(426),component=Object(r.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("page-showcase",{attrs:{heading:"Blog",text:"welcome to our blog"}}),this._v(" "),e("v-container",[e("v-row",[e("v-col",{attrs:{cols:"12",md:"8"}},[e("nuxt-child")],1),this._v(" "),e("v-col",{attrs:{cols:"12",md:"4"}},[e("app-sidebar")],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VCol:h.a,VContainer:d.a,VRow:f.a})}}]);