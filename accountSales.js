(function(salesforceConn, accId) {
    
    $j = jQuery.noConflict();
    
    //load tabs
    $j( "#tabs" ).responsiveTabs();
    
    var orgId = '00Db0000000ZVQP';

    var data = {};
    
    var salesQuery = {
        sObject : 'Daily_Historical_Sales__c',
        select : 'Invoice_Date__c, Fiscal_Year__c, Fiscal_Month__c, Gross_Credits__c, Gross_Despatches__c, Value__c, Net_Value__c, Quantity__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Product__r.Part_Code__c, Product__r.Name, Product__r.Product_Code_Name__c, Product__r.Family, Promotion__r.Name',
        where : 'Account__r.Id = ' + "'" + accId + "'",
        maxfetch : 100000
    };
        
    var forecastQuery = {
        sObject : 'Forecast2__c',
        select : 'Fiscal_Year__c, Fiscal_Month__c, Gross_Value__c, Net_Value__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Forecast_Brand__c, Forecast_Type__c',
        where : 'Account__r.Id = ' + "'" + accId + "'",
        maxfetch : 100000
    };
    
    var dateQuery = {
        sObject : 'FY_Settings__c',
        select : 'PeriodNum__c, PeriodYear__c',
        where : 'SetupOwnerId = ' + "'" + orgId + "'",
        maxfetch : 10
    };
    
    Q.allSettled([new soql(salesQuery), new soql(forecastQuery), new soql(dateQuery)]).spread(function (resSales, resForecast, resDate) {

        data.sales = resSales.value;
        data.forecast = resForecast.value;
        data.fiscal = resDate.value[0];
        
        createGrossSummary();
        
        productSales();
        
    }).done();
        
    
        
    function createGrossSummary() {
        
        var source = [
            {monthName : 'January', month : 1, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'February', month : 2, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'March', month : 3, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'April', month : 4, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'May', month : 5, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'June', month : 6, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'July', month : 7, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'August', month : 8, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'September', month : 9, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'October', month : 10, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'November', month : 11, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0},
            {monthName : 'December', month : 12, credits : 0, despatches : 0, sales : 0, budget : 0, vsBudget : 0, target : 0, vsTarget : 0, last : 0, vsLast : 0}
        ];

        _.each(source, function(d) {
            d.credits = d3.sum(data.sales, function(s) { 
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == 2015 ? s.Gross_Credits__c : 0; 
            });
            d.despatches = d3.sum(data.sales, function(s) { 
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == 2015 ? s.Gross_Despatches__c : 0; 
            });
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
        
        var yearToDate = [
            {type : 'Credits', value : d3.sum(source, function(s) {return s.month < data.fiscal.PeriodNum__c ? s.credits : 0; })}, 
            {type : 'Despatches', value : d3.sum(source, function(s) {return s.month < data.fiscal.PeriodNum__c ? s.despatches : 0; })}, 
            {type : 'Sales', value : d3.sum(source, function(s) {return s.month < data.fiscal.PeriodNum__c ? s.sales : 0; })}, 
            {type : 'Budget', value : d3.sum(source, function(s) {return s.month < data.fiscal.PeriodNum__c ? s.budget : 0; })}, 
            {type : 'Target', value : d3.sum(source, function(s) {return s.month < data.fiscal.PeriodNum__c ? s.target : 0; })}, 
            {type : 'Last', value : d3.sum(source, function(s) {return s.month < data.fiscal.PeriodNum__c ? s.last : 0; })}
        ];
        
        //yearToDate.vsBudget = yearToDate.sales - yearToDate.budget;
        //yearToDate.vsTarget = yearToDate.sales - yearToDate.target; 
        //yearToDate.vsLast = yearToDate.sales - yearToDate.last;
        
        console.log(yearToDate);
        
        var fullYear = {
            credits : d3.sum(source, function(s) { return s.credits; }), 
            despatches : d3.sum(source, function(s) { return s.despatches; }), 
            sales : d3.sum(source, function(s) { return s.sales; }), 
            budget : d3.sum(source, function(s) { return s.budget; }), 
            target : d3.sum(source, function(s) { return s.target; }), 
            last : d3.sum(source, function(s) { return s.last; }), 
        };
        
        fullYear.vsBudget = fullYear.sales - fullYear.budget;
        fullYear.vsTarget = fullYear.sales - fullYear.target; 
        fullYear.vsLast = fullYear.sales - fullYear.last;
        
        var ytdchart = c3.generate({
            bindto: '#ytd-summary-chart',
            data: {
                x: 'type',
                json: yearToDate,
                keys: {
                    x : 'type',
                    value: ['value']
                },
                type: 'bar',
                labels: {
                    format: function (v, id) {return accounting.formatMoney(v);}
                }
            },
            axis: {
                rotated: false,
                x: {
                    type: 'category',
                },
                y : {
                    tick: {
                        format: function (d) { return accounting.formatMoney(d); }
                    },
                    padding : {bottom: 0}
                }
                
            },
            interaction: {
                enabled: false
            }
        });
        
        var tableCols = [{"data": "monthName", "title": "Month"},
                         {"data": "credits", "title": "Gross Credits"},
                         {"data": "despatches", "title": "Gross Despatches"},
                         {"data": "sales", "title": "Gross Sales"},
                         {"data": "budget", "title": "Gross Budget"},
                         {"data": "vsBudget", "title": "vs Sales"},
                         {"data": "target", "title": "Gross Target"},
                         {"data": "vsTarget", "title": "vs Sales"},
                         {"data": "last", "title": "Last Year"},
                         {"data": "vsLast", "title": "vs Sales"}
        ];
        
        var tableColDefs = [
            {'targets' : [1,2,3,4,5,6,7,8,9], 
            'render' : function (cell, type, row, meta) {
                switch (type) {
                    case 'display':
                        return accounting.formatMoney(cell);
                        break;
                    }
                    return data;
                }
            },
            {'targets': [1,2,3,4,5,6,7,8,9],
            'className': 'dt-right'},
            {'targets': [1,4,6,8],
            'className': 'borderLeft'}
        ];
                            
        var table = $j('#table-matrix').dataTable({
            'data' : source,
            'paging' : false,
            'ordering' : false,
            "order": [],
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
                    x: 'monthName',
                    value: ['sales', 'budget', 'target', 'last'],
                },
                names: {
                    sales : '2015 Sales',
                    budget : '2015 Budget',
                    target : '2015 Target',
                    last : '2014 Sales'
                },
                types: {
                    sales : 'bar',
                    budget : 'line',
                    target : 'line',
                    last : 'line'
                }
            },
            axis: {
                x: {
                    type: 'category'
                },
                y : {
                    tick: {
                        format: function (d) { return accounting.formatMoney(d); }
                    },
                    padding : {bottom: 0}
                }
                
            }
        });
        
        $j( window ).resize(function() { chart.resize(); });
        
    }
    
    function productSales() {
        
        var source = _.sortBy(data.sales, function(d) {
            return moment(d.Invoice_Date__c).toDate();
        });
        
        console.log(source);

        var tableCols = [{"data": "Invoice_Date__c", "title": "Invoice Date"},
                         {"data": "Product__r.Family", "title": "Category"},
                         {"data": "Product__r.Part_Code__c", "title": "Product Code"},
                         {"data": "Product__r.Name", "title": "Product Name"},
                         {"data": "Quantity__c", "title": "Quantity"},
                         {"data": "Value__c", "title": "Gross Value"}
        ];
        
        var tableColDefs = [
            {'targets' : [5], 
            'render' : function (cell, type, row, meta) {
                switch (type) {
                    case 'display':
                        return accounting.formatMoney(cell);
                        break;
                    }
                    return data;
                }
            },
            {'targets': [4,5],
            'className': 'dt-right'}
        ];
                            
        var table = $j('#table-productSales').DataTable({
            'data' : source,
            'paging' : true,
            'ordering' : true,
            "order": [[0,'desc']],
            'dom' : 'ftp',
            'columns' : tableCols,
            'columnDefs' : tableColDefs
        });
        
        table.on('search.dt', function (e, settings) {
            
            //table.rows({order: "applied", search: "applied", page: "all"}).data().toArray()
            
            generateChart(table.rows({order: "applied", search: "applied", page: "all"}).data().toArray());
            
        });
        
        generateChart(source);
        
        function chartData(data) {
        
            var chartData = d3.nest()
                .key(function(d) { return d.Invoice_Date__c.slice(0,-2) + '01'; })
                .rollup(function(d) { return d3.sum(d, function(i) { return i.Value__c; }); })
                .entries(data);
            
            console.log(chartData);
            
            return chartData;
            
        }  
        
        function generateChart(data) {
        
            //update above event as data should be specified in object json ; , keys 
            var chart = c3.generate({
                bindto: '#chartWeeklySales',
                data: {
                    x: 'key',
                    xFormat: '%Y-%m-%d',
                    json: chartData(data),
                    keys: {
                        x: 'key',
                        value: ['values'],
                    },
                    type : 'bar'
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            //format : '%b'
                            format : function (e) { return moment(e).format('MMM').slice(0, 1); },
                            culling : false
                        },
                        min : new Date(2010,0,1),
                        max : new Date(2015,11,1),
                        padding: {
                            left: 0,
                            right: 0
                        }
                    },
                    y : {
                        tick: {
                            format: function (d) { return accounting.formatMoney(d); }
                        },
                        padding : {bottom: 0},
                        min : 0
                    }
                }
            });
            
            chart.flush();
        
        }
    
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

    accounting.settings = {
    	currency: {
    		symbol : "£",   // default currency symbol is '$'
    		format: {
            	pos : "%s%v",
            	neg : "-%s%v",
            	zero: "%s0"
            },
    		decimal : ".",
    		thousand: ",",
    		precision : 0
    	},
    	number: {
    		precision : 0,
    		thousand: ",",
    		decimal : "."
    	}
    }
    
})(conn, accId);