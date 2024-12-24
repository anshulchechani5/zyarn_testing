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

        return Controller.extend("Zppyarntesting.zppyartesting.controller.View1", {
            onInit: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel(), "oFirstScreenTableDataModel");
                this.getView().getModel("oFirstScreenTableDataModel").setProperty("/aFirstScreenTableData", []);
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oSecondScreenFirstTableModel");
                this.getOwnerComponent().getModel("oSecondScreenFirstTableModel").setProperty("/aSecondScreenFirstTableData", []);

                var slection = {
                    change: false
                }
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(slection), "oSelction")

            },
            GetTableData: function () {
                var Plant = this.getView().byId("Plant").getValue();
                var partybillno = this.getView().byId("partybillno").getValue();
                partybillno = partybillno.toUpperCase();
                if (Plant === "") {
                    MessageBox.error("Please Enter Plant");
                }
                else if (partybillno === "") {
                    MessageBox.error("Please Enter Party Bill NO.");
                }
                else {
                    var suppliercode = this.getView().byId("suppliercode").getValue();
                    if (suppliercode === "") {
                        var oModel = this.getView().getModel();
                        var TableModel = this.getView().getModel("oFirstScreenTableDataModel");
                        var aNewArr = [];
                        var today = new Date();
                        var year = today.getFullYear()
                        var oFilter = new sap.ui.model.Filter("Plant", "EQ", Plant);
                        var oFilter1 = new sap.ui.model.Filter("Partybillnumber", "EQ", partybillno);
                        // var oFilter2 = new sap.ui.model.Filter("Partybillnumber", "EQ", year);
                        var oBusyDialog = new sap.m.BusyDialog({
                            title: "Fetching Data",
                            text: "Please wait",
                        });
                        oBusyDialog.open();
                        oModel.read("/partybillname", {
                            filters: [oFilter, oFilter1],
                            urlParameters: { "$top": "50000" },
                            success: function (oresponse) {
                                if (oresponse.results.length > 0) {
                                    function getFiscalYear(entryDate, fiscalStartMonth, fiscalStartDay) {
                                        let today = new Date(entryDate); // Ensure entryDate is a Date object
                                        let fiscalStart = new Date(today.getFullYear(), fiscalStartMonth - 1, fiscalStartDay); // Adjust month to 0-index
                                    
                                        if (today < fiscalStart) {
                                            return today.getFullYear() - 1;
                                        } else {
                                            return today.getFullYear();
                                        }
                                    }
                                    
                                    // Example usage with oresponse.results[0].entrydate
                                    let entryDate = new Date();
                                    let fiscalStartMonth = 4; // April (4th month)
                                    let fiscalStartDay = 1;   // 1st day
                                    let fiscalYear = getFiscalYear(entryDate, fiscalStartMonth, fiscalStartDay);
                                    // console.log("Current fiscal year:", fiscalYear);

                                    for (var i = 0; i < oresponse.results.length; i++) {
                                        var k= i +1;
                                        let entryDate1 = new Date(oresponse.results[i].postingdate); 
                                        let fiscalStartMonth1 = 4; 
                                        let fiscalStartDay1 = 1;   
                                        let fiscalYear1 = getFiscalYear(entryDate1, fiscalStartMonth1, fiscalStartDay1);
                                    
                                        if (fiscalYear === fiscalYear1) {
                                            // var gateno = oresponse.results[i].gateno;
                                            MessageBox.error("Already Existed Party Bill Number" + partybillno);
                                            break;
                                        }
                                        else if(oresponse.results.length === k){
                                            this.GetTableData1();
                                        }
                                        
                                    }
                                }
                                else {
                                   
                                    this.GetTableData1();
                                }

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
                    }
                    else {
                        var oModel = this.getView().getModel();
                        var TableModel = this.getView().getModel("oFirstScreenTableDataModel");
                        var aNewArr = [];
                        var oFilter = new sap.ui.model.Filter("Plant", "EQ", Plant);
                        var oFilter2 = new sap.ui.model.Filter("suppliercode", "EQ", suppliercode);
                        var oFilter1 = new sap.ui.model.Filter("Partybillnumber", "EQ", partybillno);
                        var oBusyDialog = new sap.m.BusyDialog({
                            title: "Fetching Data",
                            text: "Please wait",
                        });
                        oBusyDialog.open();
                        oModel.read("/partybillname", {
                            filters: [oFilter, oFilter1, oFilter2],
                            urlParameters: { "$top": "50000" },
                            success: function (oresponse) {
                                if (oresponse.results.length > 0) {
                                    function getFiscalYear(entryDate, fiscalStartMonth, fiscalStartDay) {
                                        let today = new Date(entryDate); // Ensure entryDate is a Date object
                                        let fiscalStart = new Date(today.getFullYear(), fiscalStartMonth - 1, fiscalStartDay); // Adjust month to 0-index
                                    
                                        if (today < fiscalStart) {
                                            return today.getFullYear() - 1;
                                        } else {
                                            return today.getFullYear();
                                        }
                                    }
                                    
                                    // Example usage with oresponse.results[0].entrydate
                                    let entryDate = new Date();
                                    let fiscalStartMonth = 4; // April (4th month)
                                    let fiscalStartDay = 1;   // 1st day
                                    let fiscalYear = getFiscalYear(entryDate, fiscalStartMonth, fiscalStartDay);
                                    // console.log("Current fiscal year:", fiscalYear);

                                    for (var i = 0; i < oresponse.results.length; i++) {
                                        var k= i +1;
                                        let entryDate1 = new Date(oresponse.results[i].postingdate); 
                                        let fiscalStartMonth1 = 4; 
                                        let fiscalStartDay1 = 1;   
                                        let fiscalYear1 = getFiscalYear(entryDate1, fiscalStartMonth1, fiscalStartDay1);
                                    
                                        if (fiscalYear === fiscalYear1) {
                                            // var gateno = oresponse.results[i].gateno;
                                            MessageBox.error("Already Existed Party Bill Number" + partybillno);
                                            break;
                                        }
                                        else if(oresponse.results.length === k){
                                            this.GetTableData1();
                                        }
                                        
                                    }
                                }
                                else {
                                    this.GetTableData1();
                                }

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
                    }



                }
            },
            GetTableData1: function () {
                var Plant = this.getView().byId("Plant").getValue();
                var partybillno = this.getView().byId("partybillno").getValue();
                if (Plant === "") {
                    MessageBox.error("Please Enter Plant");
                }
                else if (partybillno === "") {
                    MessageBox.error("Please Enter Party Bill NO.");
                }
                else {
                    var suppliercode = this.getView().byId("suppliercode").getValue();
                    if (suppliercode === "") {
                        var oModel = this.getView().getModel();
                        var TableModel = this.getView().getModel("oFirstScreenTableDataModel");
                        var aNewArr = [];
                        var oFilter = new sap.ui.model.Filter("Plant", "EQ", Plant);
                        var oFilter1 = new sap.ui.model.Filter("ReferenceDocument", "EQ", partybillno);
                        var oBusyDialog = new sap.m.BusyDialog({
                            title: "Fetching Data",
                            text: "Please wait",
                        });
                        oBusyDialog.open();
                        oModel.read("/YarnTesting", {
                            filters: [oFilter, oFilter1],
                            urlParameters: { "$top": "50000" },
                            success: function (oresponse) {
                                oresponse.results.map(function (items) {
                                    var dt = items.DocumentDate;
                                    var dt1 = dt.getFullYear() + '-' + Number(dt.getMonth() + 1) + '-' + dt.getDate();
                                    var date = dt1;
                                    if (date.length === 10) {
                                        var yyyy = date.slice(0, 4);
                                        var mm = date.slice(5, 7);
                                        var dd = date.slice(8, 10);
                                        var dte = yyyy + mm + dd;
                                    }
                                    else if (date.length === 9) {
                                        var yyyy = date.slice(0, 4);
                                        var mm = date.slice(5, 7);
                                        if (mm.slice(1, 2) === '-') {
                                            var mm = date.slice(5, 6);
                                            mm = "0" + mm;
                                            var dd = date.slice(7, 9);
                                        }
                                        else {
                                            var mm = date.slice(5, 7);
                                            var dd = date.slice(8, 9);
                                            dd = "0" + dd;
                                        }
                                        var dte = yyyy + mm + dd;
                                    }
                                    else if (date.length === 8) {
                                        var yyyy = date.slice(0, 4);
                                        var mm = date.slice(5, 6);
                                        mm = "0" + mm;
                                        var dd = date.slice(7, 8);
                                        dd = "0" + dd;
                                        var dte = yyyy + mm + dd;
                                    }

                                    var dt1 = items.PostingDate;
                                    var dt11 = dt1.getFullYear() + '-' + Number(dt1.getMonth() + 1) + '-' + dt1.getDate();
                                    var date1 = dt11;
                                    if (date1.length === 10) {
                                        var yyyy = date.slice(0, 4);
                                        var mm = date1.slice(5, 7);
                                        var dd = date1.slice(8, 10);
                                        var dte1 = yyyy + mm + dd;
                                    }
                                    else if (date1.length === 9) {
                                        var yyyy = date1.slice(0, 4);
                                        var mm = date1.slice(5, 7);
                                        if (mm.slice(1, 2) === '-') {
                                            var mm = date1.slice(5, 6);
                                            mm = "0" + mm;
                                            var dd = date1.slice(7, 9);
                                        }
                                        else {
                                            var mm = date1.slice(5, 7);
                                            var dd = date1.slice(8, 9);
                                            dd = "0" + dd;
                                        }
                                        var dte1 = yyyy + mm + dd;
                                    }
                                    else if (date1.length === 8) {
                                        var yyyy = date1.slice(0, 4);
                                        var mm = date1.slice(5, 6);
                                        mm = "0" + mm;
                                        var dd = date1.slice(7, 8);
                                        dd = "0" + dd;
                                        var dte1 = yyyy + mm + dd;
                                    }

                                    var obj = {
                                        "suppliername": items.SupplierName,
                                        "suppliercode": items.Supplier,
                                        "Material": items.Material,
                                        "matdesc": items.ProductDescription,
                                        "vehiclenumber": items.vehical_no,
                                        "partybillnumber": items.ReferenceDocument,
                                        "partybilldate": dte,
                                        "postingdate": dte1,
                                        "plant": items.Plant,
                                        "storagelocation": items.StorageLocation,
                                        "millname": items.MilName,
                                        "lotnumber": items.lotno,
                                        "salesorder": items.SalesOrder,
                                        "batch": items.Batch,
                                        "quantitybaseunit": items.QuantityInBaseUnit,
                                        "noofbags": items.NoofBags,
                                        "noofcones": items.NoOfCones,
                                        "suppliercsp": items.SupplierCsp,
                                        "suppliercount": items.SupplierCount,
                                        "suppliercspcvper": items.Suppliercvper,
                                        "suppliercountcvper": items.SupplierCountCvPer,
                                    }
                                    aNewArr.push(obj);
                                })
                                TableModel.setProperty("/aFirstScreenTableData", aNewArr);
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
                    }
                    else {
                        var oModel = this.getView().getModel();
                        var TableModel = this.getView().getModel("oFirstScreenTableDataModel");
                        var aNewArr = [];
                        var oFilter = new sap.ui.model.Filter("Plant", "EQ", Plant);
                        var oFilter1 = new sap.ui.model.Filter("ReferenceDocument", "EQ", partybillno);
                        var oFilter2 = new sap.ui.model.Filter("Supplier", "EQ", suppliercode);
                        var oBusyDialog = new sap.m.BusyDialog({
                            title: "Fetching Data",
                            text: "Please wait",
                        });
                        oBusyDialog.open();
                        oModel.read("/YarnTesting", {
                            filters: [oFilter, oFilter1, oFilter2],
                            urlParameters: { "$top": "50000" },
                            success: function (oresponse) {
                                oresponse.results.map(function (items) {
                                    var dt = items.DocumentDate;
                                    var dt1 = dt.getFullYear() + '-' + Number(dt.getMonth() + 1) + '-' + dt.getDate();
                                    var date = dt1;
                                    if (date.length === 10) {
                                        var yyyy = date.slice(0, 4);
                                        var mm = date.slice(5, 7);
                                        var dd = date.slice(8, 10);
                                        var dte = yyyy + mm + dd;
                                    }
                                    else if (date.length === 9) {
                                        var yyyy = date.slice(0, 4);
                                        var mm = date.slice(5, 7);
                                        if (mm.slice(1, 2) === '-') {
                                            var mm = date.slice(5, 6);
                                            mm = "0" + mm;
                                            var dd = date.slice(7, 9);
                                        }
                                        else {
                                            var mm = date.slice(5, 7);
                                            var dd = date.slice(8, 9);
                                            dd = "0" + dd;
                                        }
                                        var dte = yyyy + mm + dd;
                                    }
                                    else if (date.length === 8) {
                                        var yyyy = date.slice(0, 4);
                                        var mm = date.slice(5, 6);
                                        mm = "0" + mm;
                                        var dd = date.slice(7, 8);
                                        dd = "0" + dd;
                                        var dte = yyyy + mm + dd;
                                    }

                                    var dt1 = items.PostingDate;
                                    var dt11 = dt1.getFullYear() + '-' + Number(dt1.getMonth() + 1) + '-' + dt1.getDate();
                                    var date1 = dt11;
                                    if (date1.length === 10) {
                                        var yyyy = date.slice(0, 4);
                                        var mm = date1.slice(5, 7);
                                        var dd = date1.slice(8, 10);
                                        var dte1 = yyyy + mm + dd;
                                    }
                                    else if (date1.length === 9) {
                                        var yyyy = date1.slice(0, 4);
                                        var mm = date1.slice(5, 7);
                                        if (mm.slice(1, 2) === '-') {
                                            var mm = date1.slice(5, 6);
                                            mm = "0" + mm;
                                            var dd = date1.slice(7, 9);
                                        }
                                        else {
                                            var mm = date1.slice(5, 7);
                                            var dd = date1.slice(8, 9);
                                            dd = "0" + dd;
                                        }
                                        var dte1 = yyyy + mm + dd;
                                    }
                                    else if (date1.length === 8) {
                                        var yyyy = date1.slice(0, 4);
                                        var mm = date1.slice(5, 6);
                                        mm = "0" + mm;
                                        var dd = date1.slice(7, 8);
                                        dd = "0" + dd;
                                        var dte1 = yyyy + mm + dd;
                                    }

                                    var obj = {
                                        "suppliername": items.SupplierName,
                                        "suppliercode": items.Supplier,
                                        "Material": items.Material,
                                        "matdesc": items.ProductDescription,
                                        "vehiclenumber": items.vehical_no,
                                        "partybillnumber": items.ReferenceDocument,
                                        "partybilldate": dte,
                                        "postingdate": dte1,
                                        "plant": items.Plant,
                                        "storagelocation": items.StorageLocation,
                                        "millname": items.MilName,
                                        "lotnumber": items.lotno,
                                        "salesorder": items.SalesOrder,
                                        "batch": items.Batch,
                                        "quantitybaseunit": items.QuantityInBaseUnit,
                                        "noofbags": items.NoofBags,
                                        "noofcones": items.NoOfCones,
                                        "suppliercsp": items.SupplierCsp,
                                        "suppliercount": items.SupplierCount,
                                        "suppliercspcvper": items.Suppliercvper,
                                        "suppliercountcvper": items.SupplierCountCvPer,
                                    }
                                    aNewArr.push(obj);
                                })
                                TableModel.setProperty("/aFirstScreenTableData", aNewArr);
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

                    }


                }
            },
            GoToNextPage1: function () {
                var slection = {
                    change: false
                }
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(slection), "oSelction")

                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oSecondScreenFirstTableModel");
                this.getOwnerComponent().getModel("oSecondScreenFirstTableModel").setProperty("/aSecondScreenFirstTableData", []);
                var NextpageTableData = [];
                // var aSecondScreenArr = [];
                var aIndices = this.byId("FirstScreenTable").getSelectedIndices();
                var FirstScreenTableData = this.getView().getModel("oFirstScreenTableDataModel").getProperty("/aFirstScreenTableData");
                var oTableModel = this.getView().getModel("oFirstScreenTableDataModel");
                var aTableArr = oTableModel.getProperty("/aFirstScreenTableData");

                var TableModel = this.getOwnerComponent().getModel("oSecondScreenFirstTableModel");
                var aSecondScreenArr = TableModel.getProperty("/aSecondScreenFirstTableData");
                var arrLen = aSecondScreenArr.length;
                var oTable = this.getView().byId("FirstScreenTable");
                var aNewArr = [];
                var SecondScreenobj;
                for (var i = 0; i < aIndices.length; i++) {
                    // for (var j = 0; j < aIndices.length; j++) {
                    var SecondScreenobj = {
                        "suppliername": FirstScreenTableData[aIndices[i]].suppliername,
                        "suppliercode": FirstScreenTableData[aIndices[i]].suppliercode,
                        "Material": FirstScreenTableData[aIndices[i]].Material,
                        "matdesc": FirstScreenTableData[aIndices[i]].matdesc,
                        "vehiclenumber": FirstScreenTableData[aIndices[i]].vehiclenumber,
                        "partybillnumber": FirstScreenTableData[aIndices[i]].partybillnumber,
                        "partybilldate": FirstScreenTableData[aIndices[i]].partybilldate,
                        "postingdate": FirstScreenTableData[aIndices[i]].postingdate,
                        "plant": FirstScreenTableData[aIndices[i]].plant,
                        "storagelocation": FirstScreenTableData[aIndices[i]].storagelocation,
                        "millname": FirstScreenTableData[aIndices[i]].millname,
                        "lotnumber": FirstScreenTableData[aIndices[i]].lotnumber,
                        "batch": FirstScreenTableData[aIndices[i]].batch,
                        "salesorder": FirstScreenTableData[aIndices[i]].salesorder,
                        "quantitybaseunit": FirstScreenTableData[aIndices[i]].quantitybaseunit,
                        "noofbags": FirstScreenTableData[aIndices[i]].noofbags,
                        "noofcones": FirstScreenTableData[aIndices[i]].noofcones,
                        "suppliercsp": FirstScreenTableData[aIndices[i]].suppliercsp,
                        "suppliercount": FirstScreenTableData[aIndices[i]].suppliercount,
                        "suppliercspcvper": FirstScreenTableData[aIndices[i]].suppliercspcvper,
                        "suppliercountcvper": FirstScreenTableData[aIndices[i]].suppliercountcvper,
                    }

                    aSecondScreenArr.push(SecondScreenobj);

                    NextpageTableData.push(aTableArr[aIndices[i]]);
                    // }
                }
                if (NextpageTableData.length === 0) {
                    MessageBox.show("Choose at Least One Row", {
                        title: "Warning",
                        icon: MessageBox.Icon.ERROR
                    });
                }
                else {

                    TableModel.setProperty("/aFirstScreenTableData", aSecondScreenArr);
                    this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(SecondScreenobj), "oSecondScreenInputFieldModel")
                    this.getOwnerComponent().getModel("oSecondScreenInputFieldModel").setProperty("/Plant", FirstScreenTableData[aIndices[0]].Plant)
                    UIComponent.getRouterFor(this).navTo("yarntesting");
                }
            },
            Recbatch: function () {
                var slection = {
                    change: false
                }
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(slection), "oSelction")

                var oModel = this.getView().getModel();
                var oCommon = this.getOwnerComponent().getModel('oSelction');
                var Login = this.getView().byId("Login").getValue();
                var password = this.getView().byId("password").getValue();
                var oFilter1 = new sap.ui.model.Filter("Password", "EQ", password);
                var oFilter = new sap.ui.model.Filter("Username", "EQ", Login);
                oModel.read("/loginid", {
                    urlParameters: { "$top": "100000" },
                    filters: [oFilter, oFilter1],
                    success: function (oresponse) {
                        if (oresponse.results.length === 0) {
                            MessageBox.show("You are Not Authorized", {
                                title: "Warning!!!!!!",
                                icon: MessageBox.Icon.ERROR
                            });
                        }
                        else if (oresponse.results.length > 0) {
                            oCommon.setProperty("/change", true);
                        }
                    }.bind(this),
                    error: function (error) {
                        oBusyDialog.close();
                        MessageBox.show("You are Not Authorized", {
                            title: "Error!!!!!!",
                            icon: MessageBox.Icon.ERROR
                        });
                    }

                })

            },
            onchange: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    text: "Please wait"
                });
                oBusyDialog.open();



                var oModel = this.getView().getModel();
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oSecondScreenFirstTableModel");
                this.getOwnerComponent().getModel("oSecondScreenFirstTableModel").setProperty("/aSecondScreenFirstTableData", []);

                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oSecondScreenSecondTableModel");
                this.getOwnerComponent().getModel("oSecondScreenSecondTableModel").setProperty("/aSecondScreenSecondTableData", []);

                var TableModel = this.getOwnerComponent().getModel("oSecondScreenFirstTableModel");
                var aSecondScreenArr = TableModel.getProperty("/aSecondScreenFirstTableData");

                var TableModel1 = this.getView().getModel("oSecondScreenSecondTableModel");
                var aSecondScreenArr1 = TableModel1.getProperty("/aSecondScreenSecondTableData");

                var Plant = this.getView().byId("Plant").getValue();
                var partybillno = this.getView().byId("partybillno").getValue();
                var suppliercode = this.getView().byId("suppliercode").getValue();
                if (suppliercode === "") {
                    var oFilter1 = new sap.ui.model.Filter("Partybillnumber", "EQ", partybillno);
                    var oFilter = new sap.ui.model.Filter("Plant", "EQ", Plant);
                    var oF1 = new sap.ui.model.Filter("Partybillnumber", "EQ", partybillno);
                    oModel.read("/ChangeHeadTesting", {
                        urlParameters: { "$top": "100000" },
                        filters: [oFilter, oFilter1],
                        success: function (oresponse) {
                            if (oresponse.results.length === 0) {
                                MessageBox.show("Data Not Found......", {
                                    title: "Warning!!!!!!",
                                    icon: MessageBox.Icon.ERROR
                                });
                            }
                            else if (oresponse.results.length > 0) {
                                oModel.read("/ChangeItemTesting", {
                                    urlParameters: { "$top": "100000" },
                                    filters: [oF1],
                                    success: function (ores) {
                                        if (ores.results.length === 0) {
                                            MessageBox.show("Data Not Found......", {
                                                title: "Warning!!!!!!",
                                                icon: MessageBox.Icon.ERROR
                                            });
                                        }
                                        else if (ores.results.length > 0) {
                                            for (var i = 0; i < oresponse.results.length; i++) {
                                                var dt = oresponse.results[i].Partybilldate;
                                                var dt1 = dt.getFullYear() + '-' + Number(dt.getMonth() + 1) + '-' + dt.getDate();
                                                var date = dt1;
                                                if (date.length === 10) {
                                                    var yyyy = date.slice(0, 4);
                                                    var mm = date.slice(5, 7);
                                                    var dd = date.slice(8, 10);
                                                    var dte = yyyy + mm + dd;
                                                }
                                                else if (date.length === 9) {
                                                    var yyyy = date.slice(0, 4);
                                                    var mm = date.slice(5, 7);
                                                    if (mm.slice(1, 2) === '-') {
                                                        var mm = date.slice(5, 6);
                                                        mm = "0" + mm;
                                                        var dd = date.slice(7, 9);
                                                    }
                                                    else {
                                                        var mm = date.slice(5, 7);
                                                        var dd = date.slice(8, 9);
                                                        dd = "0" + dd;
                                                    }
                                                    var dte = yyyy + mm + dd;
                                                }
                                                else if (date.length === 8) {
                                                    var yyyy = date.slice(0, 4);
                                                    var mm = date.slice(5, 6);
                                                    mm = "0" + mm;
                                                    var dd = date.slice(7, 8);
                                                    dd = "0" + dd;
                                                    var dte = yyyy + mm + dd;
                                                }

                                                var dt1 = oresponse.results[i].Postingdate;
                                                var dt11 = dt1.getFullYear() + '-' + Number(dt1.getMonth() + 1) + '-' + dt1.getDate();
                                                var date1 = dt11;
                                                if (date1.length === 10) {
                                                    var yyyy = date.slice(0, 4);
                                                    var mm = date1.slice(5, 7);
                                                    var dd = date1.slice(8, 10);
                                                    var dte1 = yyyy + mm + dd;
                                                }
                                                else if (date1.length === 9) {
                                                    var yyyy = date1.slice(0, 4);
                                                    var mm = date1.slice(5, 7);
                                                    if (mm.slice(1, 2) === '-') {
                                                        var mm = date1.slice(5, 6);
                                                        mm = "0" + mm;
                                                        var dd = date1.slice(7, 9);
                                                    }
                                                    else {
                                                        var mm = date1.slice(5, 7);
                                                        var dd = date1.slice(8, 9);
                                                        dd = "0" + dd;
                                                    }
                                                    var dte1 = yyyy + mm + dd;
                                                }
                                                else if (date1.length === 8) {
                                                    var yyyy = date1.slice(0, 4);
                                                    var mm = date1.slice(5, 6);
                                                    mm = "0" + mm;
                                                    var dd = date1.slice(7, 8);
                                                    dd = "0" + dd;
                                                    var dte1 = yyyy + mm + dd;
                                                }


                                                var SecondScreenobj = {
                                                    "suppliername": oresponse.results[i].Suppliername,
                                                    "suppliercode": oresponse.results[i].Suppliercode,
                                                    "Material": oresponse.results[i].Material,
                                                    "matdesc": oresponse.results[i].Matdesc,
                                                    "vehiclenumber": oresponse.results[i].Vehiclenumber,
                                                    "partybillnumber": oresponse.results[i].Partybillnumber,
                                                    "partybilldate": dte,
                                                    "postingdate": dte1,
                                                    "plant": oresponse.results[i].Plant,
                                                    "storagelocation": oresponse.results[i].Stpragelocation,
                                                    "millname": oresponse.results[i].Millname,
                                                    "lotnumber": oresponse.results[i].Lotnumber,
                                                    "batch": oresponse.results[i].Batch,
                                                    "salesorder": oresponse.results[i].Salesorder,
                                                    "quantitybaseunit": oresponse.results[i].Quantitybaseunit,
                                                    "noofbags": oresponse.results[i].Noofbags,
                                                    "noofcones": oresponse.results[i].Noofcones,
                                                    "suppliercsp": oresponse.results[i].Suppliercsp,
                                                    "suppliercount": oresponse.results[i].Suppliercount,
                                                    "suppliercspcvper": oresponse.results[i].Suppliercspcvper,
                                                    "suppliercountcvper": oresponse.results[i].Suppliercountcvper,
                                                }
                                                aSecondScreenArr.push(SecondScreenobj);
                                            }
                                            TableModel.setProperty("/aSecondScreenFirstTableData", aSecondScreenArr);
                                            this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(SecondScreenobj), "oSecondScreenInputFieldModel")
                                            this.getOwnerComponent().getModel("oSecondScreenInputFieldModel").setProperty("/Plant", Plant)
                                            this.getOwnerComponent().getModel("oSecondScreenInputFieldModel").setProperty("/remark", oresponse.results[0].Remark)
                                            this.getOwnerComponent().getModel("oSecondScreenInputFieldModel").setProperty("/status", oresponse.results[0].Status)

                                            for (var i = 0; i < ores.results.length; i++) {
                                                var Second = {
                                                    "sno": ores.results[i].Sno,
                                                    "Parmeters": ores.results[i].Parmeters,
                                                    "Result": ores.results[i].Zresult

                                                }
                                                aSecondScreenArr1.push(Second);
                                            }
                                            TableModel1.setProperty("/aSecondScreenSecondTableData", aSecondScreenArr1);
                                            oBusyDialog.close();
                                            UIComponent.getRouterFor(this).navTo("yarntesting");
                                        }
                                    }.bind(this),
                                    error: function (error) {
                                        oBusyDialog.close();
                                        MessageBox.show("Data Not Found......", {
                                            title: "Error!!!!!!",
                                            icon: MessageBox.Icon.ERROR
                                        });
                                    }

                                })

                            }
                        }.bind(this),
                        error: function (error) {
                            oBusyDialog.close();
                            MessageBox.show("Data Not Found......", {
                                title: "Error!!!!!!",
                                icon: MessageBox.Icon.ERROR
                            });
                        }

                    })
                }
                else {
                    var oF1 = new sap.ui.model.Filter("Partybillnumber", "EQ", partybillno);
                    var oFilter2 = new sap.ui.model.Filter("Suppliercode", "EQ", suppliercode);
                    var oFilter1 = new sap.ui.model.Filter("Partybillnumber", "EQ", partybillno);
                    var oFilter = new sap.ui.model.Filter("Plant", "EQ", Plant);
                    oModel.read("/ChangeHeadTesting", {
                        urlParameters: { "$top": "100000" },
                        filters: [oFilter, oFilter1, oFilter2],
                        success: function (oresponse) {
                            if (oresponse.results.length === 0) {
                                MessageBox.show("Data Not Found......", {
                                    title: "Warning!!!!!!",
                                    icon: MessageBox.Icon.ERROR
                                });
                            }
                            else if (oresponse.results.length > 0) {
                                oModel.read("/ChangeItemTesting", {
                                    urlParameters: { "$top": "100000" },
                                    filters: [oF1],
                                    success: function (ores) {
                                        if (ores.results.length === 0) {
                                            MessageBox.show("Data Not Found......", {
                                                title: "Warning!!!!!!",
                                                icon: MessageBox.Icon.ERROR
                                            });
                                        }
                                        else if (ores.results.length > 0) {

                                            for (var i = 0; i < oresponse.results.length; i++) {

                                                var dt = oresponse.results[i].Partybilldate;
                                                var dt1 = dt.getFullYear() + '-' + Number(dt.getMonth() + 1) + '-' + dt.getDate();
                                                var date = dt1;
                                                if (date.length === 10) {
                                                    var yyyy = date.slice(0, 4);
                                                    var mm = date.slice(5, 7);
                                                    var dd = date.slice(8, 10);
                                                    var dte = yyyy + mm + dd;
                                                }
                                                else if (date.length === 9) {
                                                    var yyyy = date.slice(0, 4);
                                                    var mm = date.slice(5, 7);
                                                    if (mm.slice(1, 2) === '-') {
                                                        var mm = date.slice(5, 6);
                                                        mm = "0" + mm;
                                                        var dd = date.slice(7, 9);
                                                    }
                                                    else {
                                                        var mm = date.slice(5, 7);
                                                        var dd = date.slice(8, 9);
                                                        dd = "0" + dd;
                                                    }
                                                    var dte = yyyy + mm + dd;
                                                }
                                                else if (date.length === 8) {
                                                    var yyyy = date.slice(0, 4);
                                                    var mm = date.slice(5, 6);
                                                    mm = "0" + mm;
                                                    var dd = date.slice(7, 8);
                                                    dd = "0" + dd;
                                                    var dte = yyyy + mm + dd;
                                                }

                                                var dt1 = oresponse.results[i].Postingdate;
                                                var dt11 = dt1.getFullYear() + '-' + Number(dt1.getMonth() + 1) + '-' + dt1.getDate();
                                                var date1 = dt11;
                                                if (date1.length === 10) {
                                                    var yyyy = date.slice(0, 4);
                                                    var mm = date1.slice(5, 7);
                                                    var dd = date1.slice(8, 10);
                                                    var dte1 = yyyy + mm + dd;
                                                }
                                                else if (date1.length === 9) {
                                                    var yyyy = date1.slice(0, 4);
                                                    var mm = date1.slice(5, 7);
                                                    if (mm.slice(1, 2) === '-') {
                                                        var mm = date1.slice(5, 6);
                                                        mm = "0" + mm;
                                                        var dd = date1.slice(7, 9);
                                                    }
                                                    else {
                                                        var mm = date1.slice(5, 7);
                                                        var dd = date1.slice(8, 9);
                                                        dd = "0" + dd;
                                                    }
                                                    var dte1 = yyyy + mm + dd;
                                                }
                                                else if (date1.length === 8) {
                                                    var yyyy = date1.slice(0, 4);
                                                    var mm = date1.slice(5, 6);
                                                    mm = "0" + mm;
                                                    var dd = date1.slice(7, 8);
                                                    dd = "0" + dd;
                                                    var dte1 = yyyy + mm + dd;
                                                }


                                                var SecondScreenobj = {
                                                    "suppliername": oresponse.results[i].Suppliername,
                                                    "suppliercode": oresponse.results[i].Suppliercode,
                                                    "Material": oresponse.results[i].Material,
                                                    "matdesc": oresponse.results[i].Matdesc,
                                                    "vehiclenumber": oresponse.results[i].Vehiclenumber,
                                                    "partybillnumber": oresponse.results[i].Partybillnumber,
                                                    "partybilldate": dte,
                                                    "postingdate": dte1,
                                                    "plant": oresponse.results[i].Plant,
                                                    "storagelocation": oresponse.results[i].Stpragelocation,
                                                    "millname": oresponse.results[i].Millname,
                                                    "lotnumber": oresponse.results[i].Lotnumber,
                                                    "batch": oresponse.results[i].Batch,
                                                    "salesorder": oresponse.results[i].Salesorder,
                                                    "quantitybaseunit": oresponse.results[i].Quantitybaseunit,
                                                    "noofbags": oresponse.results[i].Noofbags,
                                                    "noofcones": oresponse.results[i].Noofcones,
                                                    "suppliercsp": oresponse.results[i].Suppliercsp,
                                                    "suppliercount": oresponse.results[i].Suppliercount,
                                                    "suppliercspcvper": oresponse.results[i].Suppliercspcvper,
                                                    "suppliercountcvper": oresponse.results[i].Suppliercountcvper,
                                                }
                                                aSecondScreenArr.push(SecondScreenobj);
                                            }
                                            TableModel.setProperty("/aSecondScreenFirstTableData", aSecondScreenArr);
                                            this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(SecondScreenobj), "oSecondScreenInputFieldModel")
                                            this.getOwnerComponent().getModel("oSecondScreenInputFieldModel").setProperty("/Plant", Plant)
                                            this.getOwnerComponent().getModel("oSecondScreenInputFieldModel").setProperty("/remark", oresponse.results[0].Remark)
                                            this.getOwnerComponent().getModel("oSecondScreenInputFieldModel").setProperty("/status", oresponse.results[0].Status)

                                            for (var i = 0; i < ores.results.length; i++) {
                                                var Second = {
                                                    "sno": ores.results[i].Sno,
                                                    "Parmeters": ores.results[i].Parmeters,
                                                    "Result": ores.results[i].Zresult

                                                }
                                                aSecondScreenArr1.push(Second);
                                            }
                                            TableModel1.setProperty("/aSecondScreenSecondTableData", aSecondScreenArr1);
                                            oBusyDialog.close();
                                            UIComponent.getRouterFor(this).navTo("yarntesting");
                                        }
                                    }.bind(this),
                                    error: function (error) {
                                        oBusyDialog.close();
                                        MessageBox.show("Data Not Found......", {
                                            title: "Error!!!!!!",
                                            icon: MessageBox.Icon.ERROR
                                        });
                                    }

                                })
                            }
                        }.bind(this),
                        error: function (error) {
                            oBusyDialog.close();
                            MessageBox.show("Data Not Found......", {
                                title: "Error!!!!!!",
                                icon: MessageBox.Icon.ERROR
                            });
                        }

                    })
                }

            },
        });
    });
