"use strict";(self.webpackChunkfury=self.webpackChunkfury||[]).push([[247],{4625:(D,f,o)=>{o.d(f,{p:()=>g});var d=o(6019),h=o(9133),m=o(7185),u=o(3668);let g=(()=>{class l{}return l.\u0275fac=function(v){return new(v||l)},l.\u0275mod=u.oAB({type:l}),l.\u0275inj=u.cJS({imports:[[d.ez,m.q,h.u5]]}),l})()},5247:(D,f,o)=>{o.r(f),o.d(f,{AffiliatesModule:()=>lt});var d=o(6019),h=o(6153),m=o(9133),u=o(86),g=o(6731),l=o(8727),p=o(5304),v=o(3050),S=o(9112),P=o(138),_=o(2968),x=o(9009),Z=o(9859),b=o(6400),r=o(240),I=o(8898),R=o(9198),k=o(6113),N=o(4625),w=o(7185),M=o(4382),y=o(4762),A=o(2262),E=o(2919),J=o(2411),O=o(8735),Q=o(1168),F=o(9190);class L{constructor(n){this.network_affiliate_id=n.network_affiliate_id,this.network_id=n.network_id,this.name=n.name,this.account_status=n.account_status,this.network_employee_id=n.network_employee_id,this.internal_notes=n.internal_notes,this.has_notifications=n.has_notifications,this.network_traffic_source_id=n.network_traffic_source_id,this.account_executive_id=n.account_executive_id,this.adress_id=n.adress_id,this.default_currency_id=n.default_currency_id,this.is_contact_address_enabled=n.is_contact_address_enabled,this.enable_media_cost_tracking_links=n.enable_media_cost_tracking_links,this.time_created=n.time_created,this.time_saved=n.time_saved,this.relationship=n.relationship,this.referrer_id=n.referrer_id}}var U=o(5351),Y=o(7182),t=o(3668),T=o(4099),B=o(238);let $=(()=>{class i{constructor(e){this.apiService=e,this.affiliatesGetResponse=new T.X([]),this.deleteResponse=new T.X([]),this.affiliatesGetResponse$=this.affiliatesGetResponse.asObservable(),this.deleteResponse$=this.deleteResponse.asObservable()}getAffiliates(){return(0,y.mG)(this,void 0,void 0,function*(){return yield this.apiService.getData("affiliates").then(e=>e.json()).then(e=>{this.affiliates=e}),this.affiliates})}deleteData(e){return(0,y.mG)(this,void 0,void 0,function*(){yield this.apiService.getData(`destroy_affiliates?id=${e}`).then(s=>s.json()).then(s=>{this.deleteResponse.next(s)})})}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(B.s))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var j=o(1136),G=o(7635),z=o(4643),H=o(904);function X(i,n){1&i&&t._UZ(0,"mat-progress-bar",13)}function W(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"th",14),t.TgZ(1,"mat-checkbox",15),t.NdJ("change",function(a){t.CHM(e);const c=t.oxw();return a?c.masterToggle(a):null}),t.qZA(),t.qZA()}if(2&i){const e=t.oxw();t.xp6(1),t.Q6J("checked",e.selection.hasValue()&&e.isAllSelected())("indeterminate",e.selection.hasValue()&&!e.isAllSelected())}}function K(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"td",16),t.TgZ(1,"mat-checkbox",17),t.NdJ("click",function(a){return a.stopPropagation()})("change",function(a){const C=t.CHM(e).$implicit,ct=t.oxw();return a?ct.selectToggle(a,C.id):null}),t.qZA(),t.qZA()}if(2&i){const e=n.$implicit,s=t.oxw();t.xp6(1),t.Q6J("checked",s.selection.isSelected(e))}}function V(i,n){if(1&i&&(t.TgZ(0,"th",21),t._uU(1),t.qZA()),2&i){const e=t.oxw(2).$implicit;t.xp6(1),t.hij(" ",e.name,"")}}function q(i,n){if(1&i&&(t.TgZ(0,"td",22),t._uU(1),t.qZA()),2&i){const e=n.$implicit,s=t.oxw(2).$implicit;t.xp6(1),t.hij(" ",e[s.property]," ")}}function tt(i,n){if(1&i&&(t.ynx(0,19),t.YNc(1,V,2,1,"th",20),t.YNc(2,q,2,1,"td",10),t.BQk()),2&i){const e=t.oxw().$implicit;t.Q6J("matColumnDef",e.property)}}function et(i,n){if(1&i&&(t.ynx(0),t.YNc(1,tt,3,1,"ng-container",18),t.BQk()),2&i){const e=n.$implicit;t.xp6(1),t.Q6J("ngIf",e.isModelProperty)}}function it(i,n){1&i&&(t.TgZ(0,"th",23),t._uU(1," Actions "),t.qZA())}function ot(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"td",22),t.TgZ(1,"a",24),t.NdJ("click",function(){const c=t.CHM(e).$implicit;return t.oxw().viewDetails(c.id)}),t._uU(2,"View"),t.qZA(),t._uU(3," | "),t.TgZ(4,"a",25),t.NdJ("click",function(){const c=t.CHM(e).$implicit;return t.oxw().handleDeleteAction(c.id)}),t._uU(5,"Delete"),t.qZA(),t.qZA()}}function nt(i,n){1&i&&t._UZ(0,"tr",26)}function st(i,n){1&i&&t._UZ(0,"tr",27)}const at=[{path:"",component:(()=>{class i{constructor(e,s){this.dialog=e,this.affiliatesService=s,this.subject$=new E.t(1),this.data$=this.subject$.asObservable(),this.isLoading=!1,this.totalRows=0,this.pageSize=25,this.currentPage=1,this.pageSizeOptions=[5,10,25,100],this.filters={},this.address=[],this.search="",this.notyf=new Y.Iq,this.idArray=[],this.allIdArray=[],this.isChecked=!1,this.columns=[{name:"Checkbox",property:"checkbox",visible:!0},{name:"Network Affiliate Id",property:"network_affiliate_id",visible:!0,isModelProperty:!0},{name:"Network Id",property:"network_id",visible:!0,isModelProperty:!0},{name:"Name",property:"name",visible:!0,isModelProperty:!0},{name:"Account Status",property:"account_status",visible:!0,isModelProperty:!0},{name:"Network Employee Id",property:"network_employee_id",visible:!0,isModelProperty:!0},{name:"Internal Notes",property:"internal_notes",visible:!1,isModelProperty:!0},{name:"Has Notifications",property:"has_notifications",visible:!1,isModelProperty:!0},{name:"Network Traffic Source Id",property:"network_traffic_source_id",visible:!1,isModelProperty:!0},{name:"Account Executive Id",property:"account_executive_id",visible:!1,isModelProperty:!0},{name:"Adress Id",property:"adress_id",visible:!1,isModelProperty:!0},{name:"Default Currency Id",property:"default_currency_id",visible:!0,isModelProperty:!0},{name:"Is Contact Address Enabled",property:"is_contact_address_enabled",visible:!1,isModelProperty:!0},{name:"Enable Media Cost Tracking Links",property:"enable_media_cost_tracking_links",visible:!1,isModelProperty:!0},{name:"Time Created",property:"time_created",visible:!1,isModelProperty:!0},{name:"Time Saved",property:"time_saved",visible:!1,isModelProperty:!0},{name:"Relationship",property:"relationship",visible:!1,isModelProperty:!0},{name:"Referrer Id",property:"referrer_id",visible:!1,isModelProperty:!0},{name:"Actions",property:"actions",visible:!0}],this.selection=new U.Ov(!0,[])}get visibleColumns(){return this.columns.filter(e=>e.visible).map(e=>e.property)}mapData(){return(0,J.of)(this.affiliates.map(e=>new L(e)))}ngOnInit(){this.getData(),this.dataSource=new r.by,this.data$.pipe((0,O.h)(e=>!!e)).subscribe(e=>{this.affiliates=e,this.dataSource.data=e})}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}pageChanged(e){this.pageSize=e.pageSize,this.currentPage=e.pageIndex,this.getData()}getData(){return(0,y.mG)(this,void 0,void 0,function*(){this.isLoading=!0,this.isChecked=!1,this.filters={currentPage:this.currentPage,pageSize:this.pageSize,search:this.search},yield this.affiliatesService.getAffiliates().then(e=>{this.allIdArray=[],this.affiliates=e.data,this.dataSource.data=e.data,this.mapData().subscribe(s=>{this.subject$.next(s)}),setTimeout(()=>{}),this.isLoading=!1},e=>{this.isLoading=!1})})}onFilterChange(e){!this.dataSource||(e=(e=e.trim()).toLowerCase(),this.dataSource.filter=e)}viewDetails(e){console.log(e)}handleDeleteAction(e){console.log(e)}ngOnDestroy(){}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(p.uw),t.Y36($))},i.\u0275cmp=t.Xpm({type:i,selectors:[["fury-affiliates"]],viewQuery:function(e,s){if(1&e&&(t.Gf(_.NW,7),t.Gf(A.YE,7)),2&e){let a;t.iGM(a=t.CRH())&&(s.paginator=a.first),t.iGM(a=t.CRH())&&(s.sort=a.first)}},inputs:{columns:"columns"},decls:14,vars:7,consts:[["mode","simple"],["name","Affiliates",3,"columns","filterChange"],["mode","indeterminate",4,"ngIf"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","checkbox"],["class","actions-cell","mat-header-cell","",4,"matHeaderCellDef"],["class","actions-cell","mat-cell","",4,"matCellDef"],[4,"ngFor","ngForOf"],["matColumnDef","actions"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["class","clickable route-animations-elements","mat-row","",4,"matRowDef","matRowDefColumns"],["mode","indeterminate"],["mat-header-cell","",1,"actions-cell"],[3,"checked","indeterminate","change"],["mat-cell","",1,"actions-cell"],["color","primary",3,"checked","click","change"],[3,"matColumnDef",4,"ngIf"],[3,"matColumnDef"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],[1,"view-link",3,"click"],[1,"delete-link",3,"click"],["mat-header-row",""],["mat-row","",1,"clickable","route-animations-elements"]],template:function(e,s){1&e&&(t.TgZ(0,"fury-page-layout",0),t.TgZ(1,"fury-page-layout-content"),t.TgZ(2,"fury-list",1),t.NdJ("filterChange",function(c){return s.onFilterChange(c)}),t.YNc(3,X,1,0,"mat-progress-bar",2),t.TgZ(4,"table",3),t.ynx(5,4),t.YNc(6,W,2,2,"th",5),t.YNc(7,K,2,1,"td",6),t.BQk(),t.YNc(8,et,2,1,"ng-container",7),t.ynx(9,8),t.YNc(10,it,2,0,"th",9),t.YNc(11,ot,6,0,"td",10),t.BQk(),t.YNc(12,nt,1,0,"tr",11),t.YNc(13,st,1,0,"tr",12),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(1),t.Q6J("@fadeInRight]",void 0),t.xp6(1),t.Q6J("columns",s.columns),t.xp6(1),t.Q6J("ngIf",s.isLoading),t.xp6(1),t.Q6J("dataSource",s.dataSource),t.xp6(4),t.Q6J("ngForOf",s.columns),t.xp6(4),t.Q6J("matHeaderRowDef",s.visibleColumns),t.xp6(1),t.Q6J("matRowDefColumns",s.visibleColumns))},directives:[j.N,G.d,z.n,d.O5,r.BZ,A.YE,r.w1,r.fO,r.Dz,d.sg,r.as,r.nj,x.pW,r.ge,H.oG,r.ev,A.nU,r.XQ,r.Gk],styles:[".view-link[_ngcontent-%COMP%]{color:#6495ed}.delete-link[_ngcontent-%COMP%]{color:#f62217}"],data:{animation:[Q.M,F.X]}}),i})()}];let rt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[[M.Bz.forChild(at)],M.Bz]}),i})(),lt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[[d.ez,rt,m.u5,m.UX,w.q,R.Z,h.o9,p.Is,P.c,u.ot,S.Ps,Z.Fk,b.LD,l.FA,g.XK,v.To,I.IJ,N.p,k.J,r.p0,_.TU,x.Cv]]}),i})()}}]);