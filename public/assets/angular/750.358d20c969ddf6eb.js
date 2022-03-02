"use strict";(self.webpackChunkfury=self.webpackChunkfury||[]).push([[750],{3750:(se,g,a)=>{a.r(g),a.d(g,{CreateFormulaModule:()=>ie});var C=a(4382),i=a(9133),T=a(7182),e=a(3668),h=a(238),p=a(4762),c=a(4099);let x=(()=>{class n{constructor(t){this.apiService=t,this.saveFormulaResponse=new c.X({}),this.getCampaignsResponse=new c.X([]),this.getCampaignsColumnsResponse=new c.X([]),this.saveFormulaResponse$=this.saveFormulaResponse.asObservable(),this.getCampaignsResponse$=this.getCampaignsResponse.asObservable(),this.getCampaignsColumnsResponse$=this.getCampaignsColumnsResponse.asObservable()}saveFormula(t){return(0,p.mG)(this,void 0,void 0,function*(){yield this.apiService.postData("formulas",t).then(o=>o.json()).then(o=>{this.saveFormulaResponse.next(o)})})}getCampaigns(){return(0,p.mG)(this,void 0,void 0,function*(){yield this.apiService.getData("get_campaigns").then(t=>t.json()).then(t=>{this.getCampaignsResponse.next(t)})})}getCampaignColumns(t){return(0,p.mG)(this,void 0,void 0,function*(){yield this.apiService.getData(`get_campaign_columns/${t}`).then(o=>o.json()).then(o=>{this.getCampaignsColumnsResponse.next(o)})})}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(h.s))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var A=a(6044),N=a(1136),b=a(7635),_=a(515),d=a(8167),v=a(6400),f=a(6019),y=a(86),F=a(6731),Z=a(138);function I(n,r){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function O(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"button",10),e.NdJ("click",function(){return e.CHM(t),e.oxw().addField()}),e._uU(1,"Add Operand"),e.qZA()}}function J(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"button",10),e.NdJ("click",function(){return e.CHM(t),e.oxw().removeField()}),e._uU(1,"Remove Operand"),e.qZA()}}function R(n,r){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.Q6J("value",t.property),e.xp6(1),e.Oqu(t.name)}}function S(n,r){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function q(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"mat-form-field",19),e.TgZ(1,"mat-label"),e._uU(2,"Select operator:"),e.qZA(),e.TgZ(3,"mat-select",17),e.NdJ("ngModelChange",function(l){e.CHM(t);const s=e.oxw().index;return e.oxw(2).selectedOperators[s]=l})("selectionChange",function(){return e.CHM(t),e.oxw(3).hideGeneratedFormula()}),e.YNc(4,S,2,2,"mat-option",8),e.qZA(),e.qZA()}if(2&n){const t=e.oxw().index,o=e.oxw(2);e.xp6(3),e.Q6J("ngModel",o.selectedOperators[t]),e.xp6(1),e.Q6J("ngForOf",o.operators)}}function w(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"div"),e.TgZ(1,"mat-form-field",16),e.TgZ(2,"mat-label"),e._uU(3,"Select column:"),e.qZA(),e.TgZ(4,"mat-select",17),e.NdJ("ngModelChange",function(l){const m=e.CHM(t).index;return e.oxw(2).selectedOperands[m]=l})("selectionChange",function(){return e.CHM(t),e.oxw(2).hideGeneratedFormula()}),e.YNc(5,R,2,2,"mat-option",8),e.qZA(),e.qZA(),e.YNc(6,q,5,2,"mat-form-field",18),e.qZA()}if(2&n){const t=r.index,o=e.oxw(2);e.xp6(4),e.Q6J("ngModel",o.selectedOperands[t]),e.xp6(1),e.Q6J("ngForOf",o.columns),e.xp6(1),e.Q6J("ngIf",t+1!=o.fieldsCount)}}function M(n,r){if(1&n&&(e.TgZ(0,"div",5),e.YNc(1,w,7,3,"div",15),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.counter(t.fieldsCount))}}function D(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"button",20),e.NdJ("click",function(){return e.CHM(t),e.oxw().generateFormula()}),e._uU(1,"Generate Formula"),e.qZA()}}function U(n,r){if(1&n&&(e.TgZ(0,"div",5),e.TgZ(1,"h4"),e._uU(2),e.qZA(),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.hij("Generated Formula is: ",t.formula,"")}}function Q(n,r){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function G(n,r){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function H(n,r){1&n&&(e.TgZ(0,"mat-hint",30),e._uU(1,"Campaign in progress for formula"),e.qZA())}function P(n,r){if(1&n&&(e.TgZ(0,"mat-form-field",27),e.TgZ(1,"mat-label"),e._uU(2,"Select column to apply formula:"),e.qZA(),e.TgZ(3,"mat-select",28),e.YNc(4,G,2,2,"mat-option",8),e.YNc(5,H,2,0,"mat-hint",29),e.qZA(),e.qZA()),2&n){const t=e.oxw(2);e.xp6(3),e.Q6J("formControl",t.applyToColumn),e.xp6(1),e.Q6J("ngForOf",t.applyToOptions),e.xp6(1),e.Q6J("ngIf",t.campaignError)}}function Y(n,r){1&n&&(e.TgZ(0,"mat-form-field",26),e.TgZ(1,"mat-label"),e._uU(2,"Legacy form field"),e.qZA(),e._UZ(3,"input",31),e.TgZ(4,"mat-hint"),e._uU(5,"New column will be added"),e.qZA(),e.qZA())}function B(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"button",10),e.NdJ("click",function(){return e.CHM(t),e.oxw(2).showNewColumn()}),e._uU(1,"Add New Column"),e.qZA()}}function E(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"button",10),e.NdJ("click",function(){return e.CHM(t),e.oxw(2).showAllColumns()}),e._uU(1,"Show Exiting columns"),e.qZA()}}function $(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"div",5),e.TgZ(1,"div",4),e.TgZ(2,"h2"),e._uU(3,"Apply The Formula"),e.qZA(),e.TgZ(4,"div",5),e.TgZ(5,"mat-form-field",6),e.TgZ(6,"mat-label"),e._uU(7,"Select campaign"),e.qZA(),e.TgZ(8,"mat-select",21),e.NdJ("selectionChange",function(l){return e.CHM(t),e.oxw().campaignChanged(l.value)}),e.YNc(9,Q,2,2,"mat-option",8),e.qZA(),e.qZA(),e.YNc(10,P,6,3,"mat-form-field",22),e.YNc(11,Y,6,0,"mat-form-field",23),e.TgZ(12,"div",9),e.YNc(13,B,2,0,"button",11),e.YNc(14,E,2,0,"button",11),e.qZA(),e.qZA(),e.TgZ(15,"div",5),e.TgZ(16,"mat-form-field",24),e.TgZ(17,"mat-label"),e._uU(18,"Formula Name"),e.qZA(),e._UZ(19,"input",25),e.qZA(),e.TgZ(20,"mat-form-field",26),e.TgZ(21,"mat-label"),e._uU(22,"Formula Shortcut"),e.qZA(),e._UZ(23,"input",25),e.qZA(),e.qZA(),e.TgZ(24,"div",5),e.TgZ(25,"div"),e.TgZ(26,"button",20),e.NdJ("click",function(){return e.CHM(t),e.oxw().testFormula()}),e._uU(27,"Test Formula"),e.qZA(),e.qZA(),e.TgZ(28,"div",9),e.TgZ(29,"button",20),e.NdJ("click",function(){return e.CHM(t),e.oxw().saveFormula()}),e._uU(30,"Save Formula"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();e.xp6(8),e.Q6J("formControl",t.applyToCampaign),e.xp6(1),e.Q6J("ngForOf",t.campaignOptions),e.xp6(1),e.Q6J("ngIf",!t.isNewColumn),e.xp6(1),e.Q6J("ngIf",t.isNewColumn),e.xp6(2),e.Q6J("ngIf",!t.isNewColumn),e.xp6(1),e.Q6J("ngIf",t.isNewColumn),e.xp6(5),e.Q6J("formControl",t.formulaName),e.xp6(4),e.Q6J("formControl",t.formulaShortcut)}}const L=[{path:"",component:(()=>{class n{constructor(t,o){this.apiService=t,this.formulaService=o,this.isGeneratedFields=!1,this.isFormulated=!1,this.isNewColumn=!1,this.campaignError=!1,this.canGenerateFormula=!1,this.isRemoveHidden=!0,this.totalFields=new i.NI,this.applyToCampaign=new i.NI,this.applyToColumn=new i.NI,this.formulaName=new i.NI,this.formulaShortcut=new i.NI,this.options=["2","3","4","5"],this.columns=[{name:"Acq Date",property:"acquisition_date"},{name:"PubID",property:"c1"},{name:"Network",property:"network unknown"},{name:"Ship Price",property:"shipping_amount"},{name:"Taxable Total",property:"order_total"},{name:"Sub Total",property:"order_total"},{name:"Sales Tax Percent",property:null},{name:"Sales Tax Factor",property:null},{name:"Order Total",property:"order_total"},{name:"Date of Sale",property:null},{name:"Gateway Processing Percent",property:null},{name:"Gateway Reserve Percent",property:null},{name:"Gateway Transaction Fee",property:null},{name:"Gateway Chargeback Fee",property:null},{name:"Processor Id",property:null},{name:"Is Cascaded",property:null},{name:"Shipped Date",property:null},{name:"Is Fraud",property:null},{name:"Fraud Date",property:null},{name:"Is Chargeback",property:null},{name:"Chargeback Date",property:null},{name:"Is RMA",property:null},{name:"RMA Number",property:null},{name:"RMA Date",property:null},{name:"RMA Created By",property:null},{name:"Return",property:null},{name:"Is Recurring",property:null},{name:"Recurring Date",property:null},{name:"Retry Date",property:null},{name:"Total Installments",property:null},{name:"Auth Number",property:null},{name:"Retrying",property:null},{name:"Retries Left",property:null},{name:"Retry Attempt",property:null},{name:"Hold Date",property:null},{name:"Is Void",property:null},{name:"Void Amount",property:null},{name:"Void Date",property:null},{name:"Voided By",property:null},{name:"Is Refund",property:null},{name:"Refund Amount",property:null},{name:"Refund Date",property:null},{name:"Refunded By",property:null},{name:"AFID",property:null},{name:"SID",property:null},{name:"AFFID",property:null},{name:"C1",property:null},{name:"C2",property:null},{name:"C3",property:null},{name:"BID",property:null},{name:"AID",property:null},{name:"OPT",property:null},{name:"Rebill Discount",property:null},{name:"Billing Cycle",property:null},{name:"Parent Order Id",property:null},{name:"Product Id",property:null},{name:"Product Attributes",property:null},{name:"Is Product Shippable",property:null},{name:"Product Price",property:null},{name:"Product Sku #",property:null},{name:"Quantity",property:null},{name:"Declared Value",property:null},{name:"Confirmation",property:null},{name:"Confirmation Date",property:null},{name:"Next Recurring Product",property:null},{name:"Next Recurring Product Id",property:null},{name:"Acquisition Date/Time",property:null},{name:"Blacklisted",property:null},{name:"Ancestor Order Id",property:null},{name:"Decline Salvage Discount",property:null},{name:"Decline Salvage Discount %",property:null},{name:"Test",property:null},{name:"Is Cancel",property:null},{name:"Hold Type",property:null},{name:"Offer Id",property:null},{name:"Billing Model Id",property:null}],this.operators=["+","-","*","/","%"],this.selectedOperands=["","","","",""],this.selectedOperators=["","","",""],this.formula="",this.notyf=new T.Iq}ngOnInit(){this.getData(),this.saveFormulaSubscription=this.formulaService.saveFormulaResponse$.subscribe(t=>this.manageFormulaResponse(t)),this.getCampaignsSubscription=this.formulaService.getCampaignsResponse$.subscribe(t=>this.manageCampaignsResponse(t)),this.getCampaignColumnsSubscription=this.formulaService.getCampaignsColumnsResponse$.subscribe(t=>this.manageCampaignColumns(t))}ngAfterViewInit(){}getData(){this.formulaService.getCampaigns()}manageFormulaResponse(t){t.status&&(this.notyf.success("Formula Saved Successfully"),this.clearFields())}manageCampaignsResponse(t){t.status&&(this.campaignOptions=t.data),console.log("campaign data",this.campaignOptions)}manageCampaignColumns(t){t.status?(this.applyToOptions=t.data,this.campaignError=!1):(this.applyToOptions=[],this.campaignError=!0)}generateFields(){null!=this.fieldsCount?(console.log(this.fieldsCount),this.isGeneratedFields=!0):this.notyf.error("Please select number of operands")}clearFields(){this.totalFields.setValue(null),this.isGeneratedFields=!1,this.isFormulated=!1,this.canGenerateFormula=!1,this.isRemoveHidden=!0,this.selectedOperands=["","","","",""],this.selectedOperators=["","","",""],this.applyToCampaign.setValue(""),this.applyToColumn.setValue("")}counter(t){return Array.from({length:t},(o,l)=>l)}generateFormula(){for(var t=0;t<this.fieldsCount;t++)this.canGenerateFormula=!!this.selectedOperands[t];if(this.canGenerateFormula){for(this.formula="",t=0;t<5;t++)this.selectedOperands[t]&&(this.formula+=this.selectedOperands[t]),this.selectedOperators[t]&&(this.formula+=this.selectedOperators[t]),console.log(this.formula);this.isFormulated=!0,console.log(this.formula),console.log(this.selectedOperands),console.log(this.selectedOperators)}else this.isFormulated=!1,this.notyf.error("There are empty fields")}addField(){this.fieldsCount<5?(this.isRemoveHidden=!1,this.isFormulated=!1,this.fieldsCount++):this.notyf.error("More fields cannot be added")}removeField(){console.log(this.fieldsCount),this.fieldsCount>=0&&(2==this.fieldsCount?this.isRemoveHidden=!0:(this.isFormulated=!1,this.selectedOperands[this.fieldsCount-1]="",this.selectedOperators[this.fieldsCount-2]="",this.fieldsCount--,2==this.fieldsCount&&(this.isRemoveHidden=!0)))}campaignChanged(t){console.log("selected campaign",t),this.formulaService.getCampaignColumns(t)}showNewColumn(){this.isNewColumn=!this.isNewColumn}showAllColumns(){this.isNewColumn=!this.isNewColumn}testFormula(){}saveFormula(){var t=this.applyToCampaign.value,o=this.applyToColumn.value,l=this.formula;if(t&&o&&l){var u={operands:this.selectedOperands,operators:this.selectedOperators,campaign_name:t,column_name:o,expression:l,name:this.formulaName.value,shortcut_name:this.formulaShortcut.value};console.log(u),this.formulaService.saveFormula(u)}else this.notyf.error("Please Fill in the required data")}hideGeneratedFormula(){this.isFormulated=!1}ngOnDestroy(){}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(h.s),e.Y36(x))},n.\u0275cmp=e.Xpm({type:n,selectors:[["fury-create-formula"]],decls:29,vars:9,consts:[[1,"padding"],["current","Formula Builder"],["mode","simple"],["fxLayout","row","fxLayoutAlign","start start"],["fxLayout","column"],["fxLayout","row"],["appearance","fill",2,"width","250px"],[3,"formControl","ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[1,"padding-left"],["mat-raised-button","","color","warn",3,"click"],["mat-raised-button","","color","warn",3,"click",4,"ngIf"],["fxLayout","row",4,"ngIf"],["mat-raised-button","","color","primary",3,"click",4,"ngIf"],[3,"value"],[4,"ngFor","ngForOf"],["appearance","fill",1,"padding-left",2,"width","140px"],["required","",3,"ngModel","ngModelChange","selectionChange"],["class","padding-left","style","width:70px;","appearance","fill",4,"ngIf"],["appearance","fill",1,"padding-left",2,"width","70px"],["mat-raised-button","","color","primary",3,"click"],["required","",3,"formControl","selectionChange"],["class","padding-left","style","width:250px;","appearance","fill",4,"ngIf"],["class","padding-left","appearance","fill",4,"ngIf"],["appearance","fill"],["matInput","","placeholder","Optional",3,"formControl"],["appearance","fill",1,"padding-left"],["appearance","fill",1,"padding-left",2,"width","250px"],["required","",3,"formControl"],["style","color: red;",4,"ngIf"],[2,"color","red"],["matInput","","placeholder","Placeholder"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e._UZ(1,"fury-breadcrumbs",1),e.qZA(),e.TgZ(2,"fury-page-layout",2),e.TgZ(3,"fury-page-layout-content",3),e.TgZ(4,"div",4),e.TgZ(5,"h2"),e._uU(6,"Build New Formula"),e.qZA(),e.TgZ(7,"div",5),e.TgZ(8,"div"),e.TgZ(9,"mat-form-field",6),e.TgZ(10,"mat-label"),e._uU(11,"Select number of operands:"),e.qZA(),e.TgZ(12,"mat-select",7),e.NdJ("ngModelChange",function(s){return o.fieldsCount=s}),e.YNc(13,I,2,2,"mat-option",8),e.qZA(),e.qZA(),e.qZA(),e.TgZ(14,"div",9),e.TgZ(15,"button",10),e.NdJ("click",function(){return o.generateFields()}),e._uU(16,"Generate Fields"),e.qZA(),e.qZA(),e.TgZ(17,"div",9),e.TgZ(18,"button",10),e.NdJ("click",function(){return o.clearFields()}),e._uU(19,"Start Over"),e.qZA(),e.qZA(),e.TgZ(20,"div",9),e.YNc(21,O,2,0,"button",11),e.qZA(),e.TgZ(22,"div",9),e.YNc(23,J,2,0,"button",11),e.qZA(),e.qZA(),e.YNc(24,M,2,1,"div",12),e.TgZ(25,"div",5),e.YNc(26,D,2,0,"button",13),e.qZA(),e.YNc(27,U,3,1,"div",12),e.YNc(28,$,31,8,"div",12),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(12),e.Q6J("formControl",o.totalFields)("ngModel",o.fieldsCount),e.xp6(1),e.Q6J("ngForOf",o.options),e.xp6(8),e.Q6J("ngIf",o.isGeneratedFields),e.xp6(2),e.Q6J("ngIf",o.isGeneratedFields&&!o.isRemoveHidden),e.xp6(1),e.Q6J("ngIf",o.isGeneratedFields),e.xp6(2),e.Q6J("ngIf",o.isGeneratedFields),e.xp6(1),e.Q6J("ngIf",o.isFormulated),e.xp6(1),e.Q6J("ngIf",o.isFormulated))},directives:[A.n,N.N,b.d,_.xw,_.Wh,d.KE,d.hX,v.gD,i.JJ,i.oH,f.sg,y.lW,f.O5,F.ey,i.Q7,i.On,Z.Nt,i.Fj,d.bx],styles:[""]}),n})()}];let V=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[C.Bz.forChild(L)],C.Bz]}),n})();var j=a(9198),X=a(6113),k=a(7794),z=a(6153),K=a(5304),W=a(9112),ee=a(9859),te=a(8727),ne=a(3050),oe=a(8898),ae=a(240),re=a(2968),le=a(9009);let ie=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[f.ez,V,i.u5,i.UX,k.q,j.Z,z.o9,K.Is,Z.c,y.ot,W.Ps,ee.Fk,v.LD,te.FA,F.XK,ne.To,oe.IJ,X.J,ae.p0,re.TU,le.Cv]]}),n})()}}]);