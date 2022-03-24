sap.ui.define(
  ['emc/hr/payroll/controller/BaseController'],
  function (Controller) {
    'use strict';

    return Controller.extend('emc.hr.payroll.controller.View2', {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        // this pointer here forcefully added to the controller Object
        this.oRouter
          .getRoute('detail')
          .attachPatternMatched(this.herculis, this);
      },
      herculis: function (oEvent) {
        var sPath = this.extractPath(oEvent);
        this.getView().bindElement(sPath);
        // binding with /fruits/4
      },
      onBack: function () {
        var oAppCon = this.getView().getParent();
        oAppCon.to('idView1');
      },
    });
  }
);
