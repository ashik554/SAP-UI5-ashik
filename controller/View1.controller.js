sap.ui.define(
  [
    'emc/hr/payroll/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
  ],
  function (Controller, Filter, FilterOperator) {
    'use strict';

    return Controller.extend('emc.hr.payroll.controller.View1', {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter
          .getRoute('detail')
          .attachPatternMatched(this.herculis, this);
      },
      herculis: function (oEvent) {
        debugger;

        // var fruitId = oEvent.getParameter('arguments').fruitId;
        // var sPath = '/fruits/' + fruitId;
        var sPath = this.extractPath(oEvent);

        var oList = this.getView().byId('idList');
        debugger;
        var element;
        if (oList.getItems().length > 0) {
          for (let i = 0; i < oList.getItems().length; i++) {
            element = oList.getItems()[i];
            if (element.getBindingContextPath() === sPath) {
              break;
            }
          }
          if (element) {
            oList.setSelectedItem(element);
          }
        }
      },
      onNext: function () {
        // var
        var oAppCon = this.getView().getParent();
        oAppCon.to('idView2', {
          hi: 2,
        });
      },
      onSearch: function (oEvent) {
        // what is the user type in search field
        var sSearch = oEvent.getParameter('query');
        if (sSearch === '' || sSearch === undefined) {
          sSearch = oEvent.getParameter('newValue');
        }
        ////  filter object
        var oFilter = new Filter('name', FilterOperator.Contains, sSearch);
        var oFilter2 = new Filter('taste', FilterOperator.Contains, sSearch);
        var aFilter = [oFilter, oFilter2];
        var oMaster = new Filter({
          filters: aFilter,
          and: false,
        });

        // get list object
        var oList = this.getView().byId('idList');
        //inject the filter to the list
        oList.getBinding('items').filter(oMaster);
      },
      onITemClick: function () {
        //this is my current class object- which is our contrler
        this.onNext();
      },
      onNavNext: function (oEvent) {
        this.onNext();
      },
      onDelete: function (oEvent) {
        // fi  selected item
        var oSelected = oEvent.getParameter('listItem');
        //get list item
        var oList = oEvent.getSource();
        // remove the item from the list
        oList.removeItem(oSelected);
      },
      onDeleteItems: function (oEvent) {
        var oList = this.getView().byId('idList');
        var aSelectedItems = oList.getSelectedItems();
        console.log(aSelectedItems);
        aSelectedItems.forEach((item) => {
          oList.removeItem(item);
        });
      },
      onFruitSelect: function (oEvent) {
        //step 1 get the router object
        // this.Route
        // step 2 Trigger the route
        var oSelectedItem = oEvent.getParameter('listItem');

        this.oRouter.navTo('detail', {
          fruitId: oSelectedItem.getBindingContext().getPath().split('/')[2],
        });
      },
    });
  }
);
