(function(salesforceConn, accId) {
    
    $j = jQuery.noConflict();

    //VARS
    var salesforce = {};
    var chart = {};
    var table = {};
    var value = {};
    
    var data = {};
    
    var salesQuery = {
        sObject : 'Daily_Historical_Sales__c',
        select : 'Invoice_Date__c, Fiscal_Year__c, Fiscal_Month__c, Value__c, Net_Value__c, Quantity__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Product__r.Product_Code_Name__c, Product__r.Family, Promotion__r.Name',
        where : 'Account__r.Id = ' + "'" + accId + "'",
        maxfetch : 100000
    }
        
    var forecastQuery = {
        sObject : 'Forecast2__c',
        select : 'Fiscal_Year__c, Fiscal_Month__c, Gross_Value__c, Net_Value__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Forecast_Brand__c, Forecast_Type__c',
        where : 'Account__r.Id = ' + "'" + accId + "'",
        maxfetch : 100000
    }
    
    Q.allSettled([new soql(salesQuery), new soql(forecastQuery)]).spread(function (resSales, resForecast) {
        
        data.sales = resSales.value;
        data.forecast = resForecast.value;
        
        console.log(data);
        
        grossTableChart();
        
    }).done();
        
    function grossTableChart() {
        
        var source = [
            {monthName : 'January', month : 1, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'February', month : 2, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'March', month : 3, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'April', month : 4, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'May', month : 5, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'June', month : 6, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'July', month : 7, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'August', month : 8, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'September', month : 9, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'October', month : 10, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'November', month : 11, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'December', month : 12, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0}
        ];
        
        _.each(source, function(d) {
            d.sales = d3.sum(data.sales, function(s) { 
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == 2015 ? s.Value__c : 0; 
            });
            d.budget = d3.sum(data.forecast, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == 2015 && s.Forecast_Type__c == 'Budget' ? s.Gross_Value__c : 0; 
            });
            d.vsBudget = d.sales - d.budget;
            d.target = d3.sum(data.forecast, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == 2015 && (s.Forecast_Type__c == 'Budget' || s.Forecast_Type__c == 'Target')? s.Gross_Value__c : 0;
            });
            d.vsTarget = d.sales - d.target;
            d.last = d3.sum(data.sales, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == 2014 ? s.Value__c : 0;
            });
            d.vsLast = d.sales - d.last;
        });
        
        console.log(source);
        
        var tableCols = [{"data": "monthName", "title": "Month"},
                         {"data": "sales", "title": "Gross Sales"},
                         {"data": "budget", "title": "Gross Budget"},
                         {"data": "vsBudget", "title": "vs Sales"},
                         {"data": "target", "title": "Gross Target"},
                         {"data": "vsTarget", "title": "vs Sales"},
                         {"data": "last", "title": "Last Year"},
                         {"data": "vsLast", "title": "vs Sales"}
        ];
        
        var tableColDefs = [
            {'targets' : [1,2,3,4,5,6,7], 
            'render' : function (cell, type, row, meta) {
                switch (type) {
                    case 'display':
                        return accounting.formatMoney(cell, "£", 0, ".", ",");
                        break;
                    }
                    return data;
                }
            }
        ];
                            
        var table = $j('#table-matrix').dataTable({
            'data' : source,
            'paging' : false,
            'dom' : 't',
            'columns' : tableCols,
            'columnDefs' : tableColDefs
        });
        
        var chart = c3.generate({
            bindto: '#chart-grossSales',
            data: {
                x: 'monthName',
                json: source,
                keys: {
                    x: 'month',
                    value: ['sales, budget, target, last'],
                }
            },
            axis: {
                x: {
                    type: 'category'
                }
            }
        });
    }


    function soql(query) {
            
        this.query = query;
        
        var deferred = Q.defer();
                
        var records = [];
                
        salesforceConn.sobject(this.query.sObject)
            .select(this.query.select)
            .where(this.query.where)
            .on('record', function(record) {
                records.push(record);
            })
            .on('error', function(query) {
                deferred.reject('error');
            })
            .on('end', function(err) {
                deferred.resolve(records);
            })
            .run({ autoFetch : true, maxFetch : this.query.maxFetch });
            
        return deferred.promise;
        
    }
    
    var crossfilter = function(records) {
    
        this.crossfilter = new crossfilter(records);
        this.dims = {};
        this.groups = {};
        this.values = {};
    
    }
        
    //}
        


})(conn, accId);
