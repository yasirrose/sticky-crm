"use strict";(self.webpackChunkfury=self.webpackChunkfury||[]).push([[359],{4625:(M,u,n)=>{n.d(u,{p:()=>h});var c=n(6019),d=n(9133),y=n(7185),f=n(3668);let h=(()=>{class s{}return s.\u0275fac=function(m){return new(m||s)},s.\u0275mod=f.oAB({type:s}),s.\u0275inj=f.cJS({imports:[[c.ez,y.q,d.u5]]}),s})()},6359:(M,u,n)=>{n.r(u),n.d(u,{TicketWeeklyModule:()=>ie});var c=n(6019),d=n(9133),y=n(6113),f=n(4625),h=n(7185),s=n(4382),g=n(4762),m=n(2968),k=n(2262),r=n(240),Z=n(1168),P=n(9190),x=n(7182),e=n(3668),T=n(5304);let S=(()=>{class o{constructor(){}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var D=n(9978),b=n(1136),A=n(7635),v=n(86),R=n(4643),C=n(9009),N=n(904),J=n(3530),W=n(9112);function _(o,a){1&o&&e._UZ(0,"mat-progress-bar",18)}function B(o,a){1&o&&(e.TgZ(0,"th",19),e.TgZ(1,"mat-checkbox",20),e.NdJ("click",function(i){return i.stopPropagation()}),e.qZA(),e.qZA())}function L(o,a){1&o&&(e.TgZ(0,"td",21),e.TgZ(1,"mat-checkbox",20),e.NdJ("click",function(i){return i.stopPropagation()}),e.qZA(),e.qZA())}function O(o,a){1&o&&e._UZ(0,"th",22)}function Q(o,a){if(1&o&&(e.TgZ(0,"td",23),e._UZ(1,"img",24),e.qZA()),2&o){const t=a.$implicit;e.xp6(1),e.MGl("src","http://i.pravatar.cc/30?u=",t.name,"",e.LSH)}}function Y(o,a){if(1&o&&(e.TgZ(0,"th",29),e._uU(1),e.qZA()),2&o){const t=e.oxw(2).$implicit;e.xp6(1),e.hij(" ",t.name,"")}}function I(o,a){if(1&o&&(e.TgZ(0,"td",30),e._uU(1),e.qZA()),2&o){const t=a.$implicit,i=e.oxw(2).$implicit;e.xp6(1),e.hij(" ",t[i.property]," ")}}function U(o,a){if(1&o&&(e.ynx(0,26),e.YNc(1,Y,2,1,"th",27),e.YNc(2,I,2,1,"td",28),e.BQk()),2&o){const t=e.oxw().$implicit;e.Q6J("matColumnDef",t.property)}}function z(o,a){if(1&o&&(e.ynx(0),e.YNc(1,U,3,1,"ng-container",25),e.BQk()),2&o){const t=a.$implicit;e.xp6(1),e.Q6J("ngIf",t.isModelProperty)}}function F(o,a){1&o&&e._UZ(0,"th",31)}function E(o,a){if(1&o&&(e.TgZ(0,"td",21),e.TgZ(1,"button",32),e.NdJ("click",function(i){return i.stopPropagation()}),e.TgZ(2,"mat-icon"),e._uU(3,"more_horiz"),e.qZA(),e.qZA(),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("matMenuTriggerFor",t.actionsMenu)}}function G(o,a){1&o&&e._UZ(0,"tr",33)}function H(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"tr",34),e.NdJ("click",function(){const p=e.CHM(t).$implicit;return e.oxw().updateCustomer(p)}),e.qZA()}}const $=[{path:"",component:(()=>{class o{constructor(t,i,l){this.dialog=t,this.goldenTicketService=i,this.campaignService=l,this.isLoading=!1,this.totalRows=0,this.pageSize=25,this.currentPage=0,this.pageSizeOptions=[5,10,25,100],this.filters={},this.notyf=new x.Iq({types:[{type:"info",background:"#6495ED",icon:'<i class="fa-solid fa-clock"></i>'}]}),this.columns=[{name:"Checkbox",property:"checkbox",visible:!1},{name:"Week",property:"week",visible:!0,isModelProperty:!0},{name:"Volume",property:"volume",visible:!0,isModelProperty:!0},{name:"Rebills",property:"rebills",visible:!0,isModelProperty:!0},{name:"Rebill %",property:"rebill_per",visible:!0,isModelProperty:!0},{name:"AVG Day %",property:"avg_per",visible:!0,isModelProperty:!0},{name:"% Filled",property:"filled_per",visible:!0,isModelProperty:!0},{name:"Avg Ticket",property:"avg_ticket",visible:!0,isModelProperty:!0},{name:"Revenue",property:"revenue",visible:!0,isModelProperty:!0},{name:"Refund",property:"refund",visible:!0,isModelProperty:!0},{name:"Refund Rate",property:"refund_rate",visible:!0,isModelProperty:!0},{name:"CBs",property:"CBs",visible:!0,isModelProperty:!0},{name:"CB %",property:"CB_per",visible:!0,isModelProperty:!0},{name:"CB $",property:"CB_currency",visible:!0,isModelProperty:!0},{name:"Fulfillment",property:"fulfillment",visible:!0,isModelProperty:!0},{name:"Processing",property:"processing",visible:!0,isModelProperty:!0},{name:"CPA",property:"cpa",visible:!0,isModelProperty:!0},{name:"CPA AVG",property:"cpa_avg",visible:!0,isModelProperty:!0},{name:"Net",property:"net",visible:!0,isModelProperty:!0},{name:"CLV",property:"clv",visible:!0,isModelProperty:!0}]}get visibleColumns(){return this.columns.filter(t=>t.visible).map(t=>t.property)}ngOnInit(){this.getSubscription=this.campaignService.ticketWeeklyResponse$.subscribe(t=>this.manageGetResponse(t)),this.getData(),this.dataSource=new r.by}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}pageChanged(t){this.pageSize=t.pageSize,this.currentPage=t.pageIndex,this.getData()}getData(){return(0,g.mG)(this,void 0,void 0,function*(){this.isLoading=!0,yield this.campaignService.getWeeklyTicket().then(t=>{this.tickets=t.data,this.dataSource.data=t.data,setTimeout(()=>{}),this.isLoading=!1},t=>{this.isLoading=!1})})}manageGetResponse(t){t.status?(this.tickets=t.data,this.dataSource.data=t.data,setTimeout(()=>{}),this.isLoading=!1):this.isLoading=!1}onFilterChange(t){!this.dataSource||(t=(t=t.trim()).toLowerCase(),this.dataSource.filter=t)}refresh(){return(0,g.mG)(this,void 0,void 0,function*(){this.notyf.open({type:"info",message:"Records will be refreshed soon..."}),this.isLoading=!0,yield this.campaignService.refreshWeeklyTicket().then(t=>{this.tickets=t.data,this.dataSource.data=t.data,this.notyf.success("Records are updated successfully"),this.isLoading=!1},t=>{this.isLoading=!1})})}ngOnDestroy(){}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(T.uw),e.Y36(S),e.Y36(D.U))},o.\u0275cmp=e.Xpm({type:o,selectors:[["fury-ticket-weekly"]],viewQuery:function(t,i){if(1&t&&(e.Gf(m.NW,7),e.Gf(k.YE,7)),2&t){let l;e.iGM(l=e.CRH())&&(i.paginator=l.first),e.iGM(l=e.CRH())&&(i.sort=l.first)}},inputs:{columns:"columns"},decls:21,vars:11,consts:[["mode","simple"],["mat-raised-button","","color","accent",1,"mb",3,"click"],["name","Golden STicket (Weekly)",3,"columns","filterChange"],["mode","indeterminate",4,"ngIf"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","checkbox"],["class","actions-cell","mat-header-cell","",4,"matHeaderCellDef"],["class","actions-cell","mat-cell","",4,"matCellDef"],["matColumnDef","image"],["class","image-cell","mat-header-cell","",4,"matHeaderCellDef"],["class","image-cell","mat-cell","",4,"matCellDef"],[4,"ngFor","ngForOf"],["matColumnDef","actions"],["class","actions-cell","mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["class","clickable route-animations-elements","mat-row","",3,"click",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageIndex","pageSize","pageSizeOptions","page"],["paginator",""],["mode","indeterminate"],["mat-header-cell","",1,"actions-cell"],["color","primary",3,"click"],["mat-cell","",1,"actions-cell"],["mat-header-cell","",1,"image-cell"],["mat-cell","",1,"image-cell"],[3,"src"],[3,"matColumnDef",4,"ngIf"],[3,"matColumnDef"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell","","mat-sort-header","",1,"actions-cell"],["type","button","mat-icon-button","",3,"matMenuTriggerFor","click"],["mat-header-row",""],["mat-row","",1,"clickable","route-animations-elements",3,"click"]],template:function(t,i){1&t&&(e.TgZ(0,"fury-page-layout",0),e.TgZ(1,"fury-page-layout-content"),e.TgZ(2,"button",1),e.NdJ("click",function(){return i.refresh()}),e._uU(3,"Refresh"),e.qZA(),e.TgZ(4,"fury-list",2),e.NdJ("filterChange",function(p){return i.onFilterChange(p)}),e.YNc(5,_,1,0,"mat-progress-bar",3),e.TgZ(6,"table",4),e.ynx(7,5),e.YNc(8,B,2,0,"th",6),e.YNc(9,L,2,0,"td",7),e.BQk(),e.ynx(10,8),e.YNc(11,O,1,0,"th",9),e.YNc(12,Q,2,1,"td",10),e.BQk(),e.YNc(13,z,2,1,"ng-container",11),e.ynx(14,12),e.YNc(15,F,1,0,"th",13),e.YNc(16,E,4,1,"td",7),e.BQk(),e.YNc(17,G,1,0,"tr",14),e.YNc(18,H,1,0,"tr",15),e.qZA(),e.TgZ(19,"mat-paginator",16,17),e.NdJ("page",function(p){return i.pageChanged(p)}),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(1),e.Q6J("@fadeInUp",void 0),e.xp6(3),e.Q6J("columns",i.columns),e.xp6(1),e.Q6J("ngIf",i.isLoading),e.xp6(1),e.Q6J("dataSource",i.dataSource),e.xp6(7),e.Q6J("ngForOf",i.columns),e.xp6(4),e.Q6J("matHeaderRowDef",i.visibleColumns),e.xp6(1),e.Q6J("matRowDefColumns",i.visibleColumns),e.xp6(1),e.Q6J("length",i.totalRows)("pageIndex",i.currentPage)("pageSize",i.pageSize)("pageSizeOptions",i.pageSizeOptions))},directives:[b.N,A.d,v.lW,R.n,c.O5,r.BZ,k.YE,r.w1,r.fO,r.Dz,c.sg,r.as,r.nj,m.NW,C.pW,r.ge,N.oG,r.ev,k.nU,J.p6,W.Hw,r.XQ,r.Gk],styles:[".mb[_ngcontent-%COMP%]{margin-bottom:10px}"],data:{animation:[Z.M,P.X]}}),o})()}];let j=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[s.Bz.forChild($)],s.Bz]}),o})();var K=n(9198),V=n(6153),X=n(138),w=n(9859),q=n(6400),ee=n(8727),te=n(6731),oe=n(3050),ne=n(8898);let ie=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[c.ez,j,d.u5,d.UX,h.q,K.Z,V.o9,T.Is,X.c,v.ot,W.Ps,w.Fk,q.LD,ee.FA,te.XK,oe.To,ne.IJ,f.p,y.J,r.p0,m.TU,C.Cv]]}),o})()}}]);