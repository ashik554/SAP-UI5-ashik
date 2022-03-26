sap.ui.define(
  ['emc/hr/payroll/controller/BaseController', 'sap/ui/core/Fragment'],
  function (Controller, Fragment) {
    'use strict';

    return Controller.extend('emc.hr.payroll.controller.View2', {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        // this pointer here forcefully added to the controller Object
        this.oRouter
          .getRoute('detail')
          .attachPatternMatched(this.herculis, this);
      },
      oCityPopup: null,
      oSuppylierPopup: null,
      onConfirm: function (oEvent) {
        // read the value which was selected in the popup
        //place the value to the fields Inside the table.
        this.selectedField.setValue('Bazunga');
      },
      selectedField: null,
      onF4Help: function (oEvent) {
        // when user click F4 on the field inside the table, that field object we are storing in a temporary object
        this.selectedField = oEvent.getSource();
        //alert('That is our final product');
        var that = this;
        if (!this.oCityPopup) {
          Fragment.load({
            name: 'emc.hr.payroll.fragments.popup',
            type: 'XML',
            id: 'city',
            controller: this,
          }).then(function (oPopup) {
            // assaign the object created by system to our global variable
            that.oCityPopup = oPopup;
            //  Change the title
            that.oCityPopup.setTitle('Select City');
            that.getView().addDependent(that.oCityPopup);
            that.oCityPopup.bindAggregation('items', {
              path: '/cities',
              template: new sap.m.DisplayListItem({
                label: '{cityName}',
                value: '{state}',
              }),
            });
            that.oCityPopup.setMultiSelect(false);
            that.oCityPopup.open();
          });
        } else {
          that.oCityPopup.open();
        }
      },
      onFilter: function () {
        // alert('This is under construction');
        var that = this;
        if (!this.oSuppylierPopup) {
          Fragment.load({
            name: 'emc.hr.payroll.fragments.popup',
            type: 'XML',
            id: 'supplier',
            controller: this,
          }).then(function (oSupplier) {
            that.oSuppylierPopup = oSupplier;
            that.oSuppylierPopup.setTitle('Select Supplier');
            // providing access of the immune system to parasite using WBC(who is alrready access to the resóurce)
            that.getView().addDependent(that.oSuppylierPopup);
            that.oSuppylierPopup.bindAggregation('items', {
              path: '/supplier',
              template: new sap.m.DisplayListItem({
                label: '{name}',
                value: '{city}',
              }),
            });
            that.oSuppylierPopup.open();
          });
        } else {
          that.oSuppylierPopup.open();
        }
      },
      onLinkPress: function (oEvent) {
        var sText = oEvent.getSource().getText();
        sText = 'https://google.com?q=' + sText;
        window.open(sText);
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
