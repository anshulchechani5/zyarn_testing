sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, FilterOperator, MessageBox) {
        "use strict";

        return Controller.extend("Zppyarntesting.zppyartesting.controller.yarntesting", {
            onInit: function () {
                var CHANGE = this.getOwnerComponent().getModel("oSelction").getProperty("/change");

                if (CHANGE === true) {

                } else {
                    this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oSecondScreenSecondTableModel");
                    this.getOwnerComponent().getModel("oSecondScreenSecondTableModel").setProperty("/aSecondScreenSecondTableData", []);
                    this.secondtable();
                }


            },
            secondtable: function () {
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZPP_YARN_TESTING_BIN");
                var TableModel = this.getOwnerComponent().getModel("oSecondScreenSecondTableModel");
                var aNewArr = [];
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Fetching Data",
                    text: "Please wait",
                });
                oBusyDialog.open();
                var pr = 1;
                var oFilter = new sap.ui.model.Filter("Progaramno", "EQ", pr);
                oModel.read("/ZParameters", {
                    filters: [oFilter],
                    urlParameters: { "$top": "5000" },
                    success: function (oresponse) {
                        oresponse.results.map(function (items) {
                            var obj = {
                                sno: items.Srno,
                                Parmeters: items.Parameters,
                                Result: ""
                            }
                            aNewArr.push(obj)
                        })
                        TableModel.setProperty("/aSecondScreenSecondTableData", aNewArr)
                        oBusyDialog.close();
                    }.bind(this),
                    error: function (error) {
                        oBusyDialog.close();
                        MessageBox.show("Data Cant Call", {
                            title: "Warning!!!!!!",
                            icon: MessageBox.Icon.ERROR
                        });
                    }

                })
            },
            savedata_old: function () {
                var remark = this.getView().byId("idremark").getValue();
                var status = this.getView().byId("idstatus").getValue();
                if (remark === "") {
                    MessageBox.error("Please Fill Remark");
                }
                else if (status === "") {
                    MessageBox.error("Please Fil Status");
                }
                else {
                    var CHANGE = this.getOwnerComponent().getModel("oSelction").getProperty("/change");
                    if (CHANGE === true) {
                        var oBusyDialog = new sap.m.BusyDialog({
                            text: "Please wait"
                        });
                        oBusyDialog.open();
                        var table1 = this.getView().getModel("oSecondScreenFirstTableModel").getProperty("/aSecondScreenFirstTableData");
                        var table2 = this.getView().getModel("oSecondScreenSecondTableModel").getProperty("/aSecondScreenSecondTableData");


                        this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oTableDataModel1");
                        this.getOwnerComponent().getModel("oTableDataModel1").setProperty("/aTableData1", []);
                        var TableModel1 = this.getOwnerComponent().getModel("oTableDataModel1");

                        var aTablearr1 = [];
                        table1.map(function (data1) {
                            var items1 = {
                                "suppliername": data1.suppliername,
                                "suppliercode": data1.suppliercode,
                                "Material": data1.Material,
                                "matdesc": data1.matdesc,
                                "vehiclenumber": data1.vehiclenumber,
                                "partybillnumber": data1.partybillnumber,
                                "partybilldate": data1.partybilldate,
                                "postingdate": data1.postingdate,
                                "plant": data1.plant,
                                "storagelocation": data1.storagelocation,
                                "millname": data1.millname,
                                "lotnumber": data1.lotnumber,
                                "batch": data1.batch,
                                "salesorder": data1.salesorder,
                                "quantitybaseunit": data1.quantitybaseunit,
                                "noofbags": data1.noofbags,
                                "noofcones": data1.noofcones,
                                "suppliercsp": data1.suppliercsp,
                                "suppliercount": data1.suppliercount,
                                "suppliercspcvper": data1.suppliercspcvper,
                                "suppliercountcvper": data1.suppliercountcvper,
                            }
                            aTablearr1.push(items1);
                        })
                        TableModel1.setProperty("/aTableData1", aTablearr1)

                        this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oTableDataModel2");
                        this.getOwnerComponent().getModel("oTableDataModel2").setProperty("/aTableData2", []);
                        var TableModel2 = this.getOwnerComponent().getModel("oTableDataModel2");


                        var aTablearr2 = [];
                        table2.map(function (data2) {
                            var items2 = {
                                sno: data2.sno,
                                Parmeters: data2.Parmeters,
                                Result: data2.Result
                            }
                            aTablearr2.push(items2);
                        })
                        TableModel2.setProperty("/aTableData2", aTablearr2)
                        // https://my405100.s4hana.cloud.sap:443/sap/bc/http/sap/zpp_yarntesting_http?sap-client=080
                        var url4 = "/sap/bc/http/sap/zpp_yarntesting_http?sap-client=080";
                        var url1 = "&action="
                        var url2 = url1 + "Change";

                        var url = url4 + url2;
                        $.ajax({
                            type: "post",
                            url: url,
                            data: JSON.stringify({
                                remark,
                                status,
                                aTablearr1,
                                aTablearr2
                            }),
                            contentType: "application/json; charset=utf-8",
                            traditional: true,
                            success: function (data) {
                                oBusyDialog.close();
                                MessageBox.show(data
                                    , {
                                        onClose: function (oAction) {
                                            if (oAction === MessageBox.Action.OK) {
                                                var oHistory = sap.ui.core.routing.History.getInstance();
                                                var sPreviousHash = oHistory.getPreviousHash();

                                                if (sPreviousHash !== undefined) {
                                                    window.history.go(-1);
                                                    // window.location.reload(-1);
                                                } else {
                                                    var oRouter = this.getOwnerComponent().getRouter();
                                                    oRouter.navTo("ZYARNTESTING-DISPLAY", {}, true);
                                                }
                                            }
                                        }.bind(this)
                                    });
                            }.bind(this),
                            error: function (error) {
                                oBusyDialog.close();
                                MessageBox.error(error);
                            }

                        })

                    }
                    else {
                        var oBusyDialog = new sap.m.BusyDialog({
                            text: "Please wait"
                        });
                        oBusyDialog.open();
                        var table1 = this.getView().getModel("oSecondScreenFirstTableModel").getProperty("/aSecondScreenFirstTableData");
                        var table2 = this.getView().getModel("oSecondScreenSecondTableModel").getProperty("/aSecondScreenSecondTableData");


                        this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oTableDataModel1");
                        this.getOwnerComponent().getModel("oTableDataModel1").setProperty("/aTableData1", []);
                        var TableModel1 = this.getOwnerComponent().getModel("oTableDataModel1");

                        var aTablearr1 = [];
                        table1.map(function (data1) {
                            var items1 = {
                                "suppliername": data1.suppliername,
                                "suppliercode": data1.suppliercode,
                                "Material": data1.Material,
                                "matdesc": data1.matdesc,
                                "vehiclenumber": data1.vehiclenumber,
                                "partybillnumber": data1.partybillnumber,
                                "partybilldate": data1.partybilldate,
                                "postingdate": data1.postingdate,
                                "plant": data1.plant,
                                "storagelocation": data1.storagelocation,
                                "millname": data1.millname,
                                "lotnumber": data1.lotnumber,
                                "batch": data1.batch,
                                "salesorder": data1.salesorder,
                                "quantitybaseunit": data1.quantitybaseunit,
                                "noofbags": data1.noofbags,
                                "noofcones": data1.noofcones,
                                "suppliercsp": data1.suppliercsp,
                                "suppliercount": data1.suppliercount,
                                "suppliercspcvper": data1.suppliercspcvper,
                                "suppliercountcvper": data1.suppliercountcvper,
                            }
                            aTablearr1.push(items1);
                        })
                        TableModel1.setProperty("/aTableData1", aTablearr1)

                        this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oTableDataModel2");
                        this.getOwnerComponent().getModel("oTableDataModel2").setProperty("/aTableData2", []);
                        var TableModel2 = this.getOwnerComponent().getModel("oTableDataModel2");


                        var aTablearr2 = [];
                        table2.map(function (data2) {
                            var items2 = {
                                sno: data2.sno,
                                Parmeters: data2.Parmeters,
                                Result: data2.Result
                            }
                            aTablearr2.push(items2);
                        })
                        TableModel2.setProperty("/aTableData2", aTablearr2)
                        // https://my405100.s4hana.cloud.sap:443/sap/bc/http/sap/zpp_yarntesting_http?sap-client=080
                        var url4 = "/sap/bc/http/sap/zpp_yarntesting_http?sap-client=080";
                        var url1 = "&action="
                        var url2 = url1 + "Create";

                        var url = url4 + url2;
                        $.ajax({
                            type: "post",
                            url: url,
                            data: JSON.stringify({
                                remark,
                                status,
                                aTablearr1,
                                aTablearr2
                            }),
                            contentType: "application/json; charset=utf-8",
                            traditional: true,
                            success: function (data) {
                                oBusyDialog.close();
                                MessageBox.show(data
                                    , {
                                        onClose: function (oAction) {
                                            if (oAction === MessageBox.Action.OK) {
                                                var oHistory = sap.ui.core.routing.History.getInstance();
                                                var sPreviousHash = oHistory.getPreviousHash();

                                                if (sPreviousHash !== undefined) {

                                                    window.history.go(-1);

                                                } else {

                                                    var oRouter = this.getOwnerComponent().getRouter();
                                                    oRouter.navTo("ZYARNTESTING-DISPLAY", {}, true);
                                                }
                                            }
                                        }.bind(this)
                                    });
                            }.bind(this),
                            error: function (error) {
                                oBusyDialog.close();
                                MessageBox.error(error);
                            }

                        })

                    }
                }
            },
            savedata: function () {
                var remark = this.getView().byId("idremark").getValue();
                var status = this.getView().byId("idstatus").getValue();
                if (remark === "") {
                    MessageBox.error("Please Fill Remark");
                }
                else if (status === "") {
                    MessageBox.error("Please Fil Status");
                }
                else {
                    var aSelectedIndex = this.getView().byId("FirstTable").getSelectedIndices();
                    if (aSelectedIndex.length != 0) {
                        var aNewArr123 = [];
                        var aSecondScreenFirstTableData = this.getView().getModel("oSecondScreenFirstTableModel").getProperty("/aSecondScreenFirstTableData");
                        aSelectedIndex.map(function (item) {
                            aNewArr123.push(aSecondScreenFirstTableData[item])
                        })
                        var CHANGE = this.getOwnerComponent().getModel("oSelction").getProperty("/change");
                        if (CHANGE === true) {
                            var oBusyDialog = new sap.m.BusyDialog({
                                text: "Please wait"
                            });
                            oBusyDialog.open();

                            var table1 = aNewArr123;
                            var table2 = this.getView().getModel("oSecondScreenSecondTableModel").getProperty("/aSecondScreenSecondTableData");


                            this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oTableDataModel1");
                            this.getOwnerComponent().getModel("oTableDataModel1").setProperty("/aTableData1", []);
                            var TableModel1 = this.getOwnerComponent().getModel("oTableDataModel1");

                            var aTablearr1 = [];
                            table1.map(function (data1) {
                                var items1 = {
                                    "suppliername": data1.suppliername,
                                    "suppliercode": data1.suppliercode,
                                    "Material": data1.Material,
                                    "matdesc": data1.matdesc,
                                    "vehiclenumber": data1.vehiclenumber,
                                    "partybillnumber": data1.partybillnumber,
                                    "partybilldate": data1.partybilldate,
                                    "postingdate": data1.postingdate,
                                    "plant": data1.plant,
                                    "storagelocation": data1.storagelocation,
                                    "millname": data1.millname,
                                    "lotnumber": data1.lotnumber,
                                    "batch": data1.batch,
                                    "salesorder": data1.salesorder,
                                    "quantitybaseunit": data1.quantitybaseunit,
                                    "noofbags": data1.noofbags,
                                    "noofcones": data1.noofcones,
                                    "suppliercsp": data1.suppliercsp,
                                    "suppliercount": data1.suppliercount,
                                    "suppliercspcvper": data1.suppliercspcvper,
                                    "suppliercountcvper": data1.suppliercountcvper,
                                }
                                aTablearr1.push(items1);
                            })
                            TableModel1.setProperty("/aTableData1", aTablearr1)

                            this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oTableDataModel2");
                            this.getOwnerComponent().getModel("oTableDataModel2").setProperty("/aTableData2", []);
                            var TableModel2 = this.getOwnerComponent().getModel("oTableDataModel2");


                            var aTablearr2 = [];
                            table2.map(function (data2) {
                                var items2 = {
                                    sno: data2.sno,
                                    Parmeters: data2.Parmeters,
                                    Result: data2.Result
                                }
                                aTablearr2.push(items2);
                            })
                            TableModel2.setProperty("/aTableData2", aTablearr2)
                            // https://my405100.s4hana.cloud.sap:443/sap/bc/http/sap/zpp_yarntesting_http?sap-client=080
                            var url4 = "/sap/bc/http/sap/zpp_yarntesting_http?sap-client=080";
                            var url1 = "&action="
                            var url2 = url1 + "Change";

                            var url = url4 + url2;
                            $.ajax({
                                type: "post",
                                url: url,
                                data: JSON.stringify({
                                    remark,
                                    status,
                                    aTablearr1,
                                    aTablearr2
                                }),
                                contentType: "application/json; charset=utf-8",
                                traditional: true,
                                success: function (data) {
                                    oBusyDialog.close();
                                    MessageBox.show(data
                                        , {
                                            onClose: function (oAction) {
                                                if (oAction === MessageBox.Action.OK) {
                                                    var oHistory = sap.ui.core.routing.History.getInstance();
                                                    var sPreviousHash = oHistory.getPreviousHash();

                                                    if (sPreviousHash !== undefined) {
                                                        window.history.go(-1);
                                                        // window.location.reload(-1);
                                                    } else {
                                                        var oRouter = this.getOwnerComponent().getRouter();
                                                        oRouter.navTo("ZYARNTESTING-DISPLAY", {}, true);
                                                    }
                                                }
                                            }.bind(this)
                                        });
                                }.bind(this),
                                error: function (error) {
                                    oBusyDialog.close();
                                    MessageBox.error(error);
                                }

                            })

                        }
                        else {
                            var oBusyDialog = new sap.m.BusyDialog({
                                text: "Please wait"
                            });
                            oBusyDialog.open();
                            var table1 = aNewArr123;
                            var table2 = this.getView().getModel("oSecondScreenSecondTableModel").getProperty("/aSecondScreenSecondTableData");


                            this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oTableDataModel1");
                            this.getOwnerComponent().getModel("oTableDataModel1").setProperty("/aTableData1", []);
                            var TableModel1 = this.getOwnerComponent().getModel("oTableDataModel1");

                            var aTablearr1 = [];
                            table1.map(function (data1) {
                                var items1 = {
                                    "suppliername": data1.suppliername,
                                    "suppliercode": data1.suppliercode,
                                    "Material": data1.Material,
                                    "matdesc": data1.matdesc,
                                    "vehiclenumber": data1.vehiclenumber,
                                    "partybillnumber": data1.partybillnumber,
                                    "partybilldate": data1.partybilldate,
                                    "postingdate": data1.postingdate,
                                    "plant": data1.plant,
                                    "storagelocation": data1.storagelocation,
                                    "millname": data1.millname,
                                    "lotnumber": data1.lotnumber,
                                    "batch": data1.batch,
                                    "salesorder": data1.salesorder,
                                    "quantitybaseunit": data1.quantitybaseunit,
                                    "noofbags": data1.noofbags,
                                    "noofcones": data1.noofcones,
                                    "suppliercsp": data1.suppliercsp,
                                    "suppliercount": data1.suppliercount,
                                    "suppliercspcvper": data1.suppliercspcvper,
                                    "suppliercountcvper": data1.suppliercountcvper,
                                }
                                aTablearr1.push(items1);
                            })
                            TableModel1.setProperty("/aTableData1", aTablearr1)

                            this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oTableDataModel2");
                            this.getOwnerComponent().getModel("oTableDataModel2").setProperty("/aTableData2", []);
                            var TableModel2 = this.getOwnerComponent().getModel("oTableDataModel2");


                            var aTablearr2 = [];
                            table2.map(function (data2) {
                                var items2 = {
                                    sno: data2.sno,
                                    Parmeters: data2.Parmeters,
                                    Result: data2.Result
                                }
                                aTablearr2.push(items2);
                            })
                            TableModel2.setProperty("/aTableData2", aTablearr2)
                            // https://my405100.s4hana.cloud.sap:443/sap/bc/http/sap/zpp_yarntesting_http?sap-client=080
                            var url4 = "/sap/bc/http/sap/zpp_yarntesting_http?sap-client=080";
                            var url1 = "&action="
                            var url2 = url1 + "Create";

                            var url = url4 + url2;
                            $.ajax({
                                type: "post",
                                url: url,
                                data: JSON.stringify({
                                    remark,
                                    status,
                                    aTablearr1,
                                    aTablearr2
                                }),
                                contentType: "application/json; charset=utf-8",
                                traditional: true,
                                success: function (data) {
                                    oBusyDialog.close();
                                    MessageBox.show(data
                                        , {
                                            onClose: function (oAction) {
                                                if (oAction === MessageBox.Action.OK) {
                                                    var oHistory = sap.ui.core.routing.History.getInstance();
                                                    var sPreviousHash = oHistory.getPreviousHash();

                                                    if (sPreviousHash !== undefined) {

                                                        window.history.go(-1);

                                                    } else {

                                                        var oRouter = this.getOwnerComponent().getRouter();
                                                        oRouter.navTo("ZYARNTESTING-DISPLAY", {}, true);
                                                    }
                                                }
                                            }.bind(this)
                                        });
                                }.bind(this),
                                error: function (error) {
                                    oBusyDialog.close();
                                    MessageBox.error(error);
                                }

                            })

                        }
                    }
                }
            },
        });
    });