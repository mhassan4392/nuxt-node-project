(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{824:function(e,t,d){"use strict";d.r(t);var r={middleware:["pagePermission"],components:{CrudDataTable:function(){return Promise.all([d.e(0),d.e(1),d.e(2)]).then(d.bind(null,702))},RoleForm:function(){return d.e(75).then(d.bind(null,862))}},data:function(){return{headers:[{text:this.$t("crud.table.headers.title"),value:"title"},{text:this.$t("crud.table.headers.actions"),value:"actions",sortable:!1}],item:{title:"",pagePermissions:[]}}}},l=d(37),o=d(46),n=d.n(o),c=d(428),h=d(680),m=d(426),component=Object(l.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("v-container",[t("v-row",[t("v-col",{attrs:{cols:"12"}},[t("crud-data-table",{attrs:{"default-item":this.item,table:{heading:this.$t("crud.table.headings.roles"),search:!0,showSelect:!0,button:{text:this.$t("crud.table.addNewButtons.roles")}},"add-edit-dialog":{addHeading:this.$t("addEditDialog.headings.add.roles"),editHeading:this.$t("addEditDialog.headings.edit.roles")},headers:this.headers,dialog:{heading:"Role"},actions:{edit:!0,delete:!0},"fetch-data":{url:"/api/roles",data:"roles"},"add-data":{url:"/api/roles",param:"_id",reload:!0},"edit-data":{url:"/api/roles/:param",param:"_id",reload:!0},"delete-data":{url:"/api/roles/:param",param:"_id",reload:!0},"delete-multiple-data":{url:"/api/roles/delete",arrayOf:"_id",reload:!0}},scopedSlots:this._u([{key:"crud-form",fn:function(e){var d=e.item,r=e.edit;return[t("role-form",{attrs:{role:d,edit:r}})]}}])})],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;n()(component,{VCol:c.a,VContainer:h.a,VRow:m.a})}}]);