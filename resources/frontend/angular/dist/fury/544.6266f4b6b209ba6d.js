"use strict";(self.webpackChunkfury=self.webpackChunkfury||[]).push([[544],{9190:(g,u,n)=>{n.d(u,{X:()=>e});var s=n(9814);const e=(0,s.X$)("fadeInUp",[(0,s.eR)(":enter",[(0,s.oB)({transform:"translateY(3vh)",opacity:0}),(0,s.jt)("400ms cubic-bezier(0.35, 0, 0.25, 1)",(0,s.oB)({transform:"translateY(0)",opacity:1}))])])},7544:(g,u,n)=>{n.r(u),n.d(u,{LoginModule:()=>w});var s=n(6019),e=n(9133),p=n(7794),c=n(4382),f=n(9190),t=n(3668),Z=n(9966),d=n(515),l=n(8167),h=n(138),y=n(86),v=n(7444),L=n(904),T=n(9112);function x(o,i){1&o&&(t.TgZ(0,"mat-error"),t._uU(1,"We need an email address to log you in"),t.qZA())}function A(o,i){1&o&&(t.TgZ(0,"mat-icon"),t._uU(1,"visibility"),t.qZA())}function b(o,i){1&o&&(t.TgZ(0,"mat-icon"),t._uU(1,"visibility_off"),t.qZA())}function C(o,i){1&o&&(t.TgZ(0,"mat-error"),t._uU(1,"We need a password to log you in"),t.qZA())}const U=function(){return["/forgot-password"]},M=function(){return["/register"]},k=[{path:"",component:(()=>{class o{constructor(r,a,m,I){this.router=r,this.fb=a,this.cd=m,this.snackbar=I,this.inputType="password",this.visible=!1}ngOnInit(){this.form=this.fb.group({email:["",e.kI.required],password:["",e.kI.required]})}send(){this.router.navigate(["/"]),this.snackbar.open("Lucky you! Looks like you didn't need a password or email address! For a real application we provide validators to prevent this. ;)","LOL THANKS",{duration:1e4})}toggleVisibility(){this.visible?(this.inputType="password",this.visible=!1,this.cd.markForCheck()):(this.inputType="text",this.visible=!0,this.cd.markForCheck())}}return o.\u0275fac=function(r){return new(r||o)(t.Y36(c.F0),t.Y36(e.qu),t.Y36(t.sBO),t.Y36(Z.ux))},o.\u0275cmp=t.Xpm({type:o,selectors:[["fury-login"]],decls:37,vars:11,consts:[["fxLayout","column","fxLayoutAlign","center center",1,"page","background-pattern"],[1,"card","border-radius","elevation"],["fxLayout","column","fxLayoutAlign","center center",1,"header","padding","background-primary"],[1,"logo","fill-primary-contrast"],["viewBox","0 0 33.74 33.99","xmlns","http://www.w3.org/2000/svg"],["d","M26.83,19.33c-.36.37-.73.71-1.09,1l.31,3.22a5.41,5.41,0,0,1-2.43,5.14L15.72,34l-.67-8.74a6.54,6.54,0,0,1-6.57-6.53L0,18.18l5-7.93a5.41,5.41,0,0,1,5.23-2.54l3.1.31q.49-.55,1.05-1.11C20.78.54,30.82-.62,33.48.26,34.37,2.93,33.2,13,26.83,19.33Zm-.45-12a3.77,3.77,0,1,0,0,5.33A3.77,3.77,0,0,0,26.38,7.36ZM2.82,23.72l3.24-3.24a8.24,8.24,0,0,0,7.11,7.1L10.5,30.25,7.74,33V29.46L2.41,31.23l1.78-5.32H.64Z"],["fxLayout","column","fxLayoutGap","16px",1,"padding",3,"formGroup"],["fxFlex","auto","fxLayout","column"],["fxFlex","grow"],["matInput","","required","","formControlName","email"],[4,"ngIf"],["matInput","","formControlName","password","required","",3,"type"],["type","button","mat-icon-button","","matSuffix","","matTooltip","Toggle Visibility",3,"click"],["fxLayout","row","fxLayoutAlign","space-between center"],[1,"caption"],[1,"caption",3,"routerLink"],["type","button","color","primary","mat-raised-button","",3,"click"],[1,"secondary-text","text-center"],[3,"routerLink"]],template:function(r,a){1&r&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"div",3),t.O4$(),t.TgZ(4,"svg",4),t.TgZ(5,"title"),t._uU(6,"icon"),t.qZA(),t._UZ(7,"path",5),t.qZA(),t.qZA(),t.qZA(),t.kcU(),t.TgZ(8,"div",6),t.TgZ(9,"div",7),t.TgZ(10,"mat-form-field",8),t.TgZ(11,"mat-label"),t._uU(12,"E-Mail"),t.qZA(),t._UZ(13,"input",9),t.YNc(14,x,2,0,"mat-error",10),t.qZA(),t.TgZ(15,"mat-form-field",8),t.TgZ(16,"mat-label"),t._uU(17,"Password"),t.qZA(),t._UZ(18,"input",11),t.TgZ(19,"button",12),t.NdJ("click",function(){return a.toggleVisibility()}),t.YNc(20,A,2,0,"mat-icon",10),t.YNc(21,b,2,0,"mat-icon",10),t.qZA(),t.TgZ(22,"mat-hint"),t._uU(23,"Click the eye to toggle visibility"),t.qZA(),t.YNc(24,C,2,0,"mat-error",10),t.qZA(),t.qZA(),t.TgZ(25,"div",13),t.TgZ(26,"mat-checkbox",14),t._uU(27,"Remember Me"),t.qZA(),t.TgZ(28,"a",15),t._uU(29,"Forgot Password?"),t.qZA(),t.qZA(),t.TgZ(30,"button",16),t.NdJ("click",function(){return a.send()}),t._uU(31," SIGN IN "),t.qZA(),t.TgZ(32,"p",17),t._uU(33," Don't have an account?"),t._UZ(34,"br"),t.TgZ(35,"a",18),t._uU(36,"Click here to create one"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&r&&(t.xp6(1),t.Q6J("@fadeInUp",void 0),t.xp6(7),t.Q6J("formGroup",a.form),t.xp6(6),t.Q6J("ngIf",a.form.get("email").hasError("required")),t.xp6(4),t.Q6J("type",a.inputType),t.xp6(2),t.Q6J("ngIf",a.visible),t.xp6(1),t.Q6J("ngIf",!a.visible),t.xp6(3),t.Q6J("ngIf",a.form.get("password").hasError("required")),t.xp6(4),t.Q6J("routerLink",t.DdM(9,U)),t.xp6(7),t.Q6J("routerLink",t.DdM(10,M)))},directives:[d.xw,d.Wh,d.SQ,e.JL,e.sg,d.yH,l.KE,l.hX,h.Nt,e.Fj,e.Q7,e.JJ,e.u,s.O5,y.lW,l.R9,v.gM,l.bx,L.oG,c.yS,l.TO,T.Hw],styles:[".page[_ngcontent-%COMP%]{display:block;height:100%;width:100%}.card[_ngcontent-%COMP%]{width:380px}@media screen and (max-width: 599px){.card[_ngcontent-%COMP%]{width:300px}}.card[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{border-top-left-radius:8px;border-top-right-radius:8px}.logo[_ngcontent-%COMP%]{width:80px;height:80px}"],data:{animation:[f.X]}}),o})()}];let q=(()=>{class o{}return o.\u0275fac=function(r){return new(r||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[c.Bz.forChild(k)],c.Bz]}),o})(),w=(()=>{class o{}return o.\u0275fac=function(r){return new(r||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[s.ez,q,p.q,e.UX]]}),o})()}}]);