sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'emc/hr/payroll/util/formatter'],
  function (Controller, Formatter) {
    'use strict';

    return Controller.extend('emc.hr.payroll.controller.BaseController', {
      formatter: Formatter,
      extractPath: function (oEvent) {
        var fruitId = oEvent.getParameter('arguments').fruitId;
        return '/fruits/' + fruitId;
      },
      readMessage: function (key, param1) {
        var oResourceModel = this.getOwnerComponent().getModel('i18n');
        var oResouceBundle = oResourceModel.getResourceBundle();
        return oResouceBundle.getText(key, param1);
      },
    });
  }
);
