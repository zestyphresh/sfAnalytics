(function(accId, accType, soql) {
    
    $j = jQuery.noConflict();
        
    var thisYear = 2015,
        lastYear = 2014;
    
    //load tabs
    $j( "#tabs" ).responsiveTabs();
    
    var orgId = '00Db0000000ZVQP';

    var data = {};
    
    var salesQuery = {
        sObject : 'Daily_Historical_Sales__c',
        select : 'Invoice_Date__c, Fiscal_Year__c, Fiscal_Month__c, Gross_Credits__c, Gross_Despatches__c, Value__c, Gross_Sales_Price_Per_Item__c, Net_Value__c, Quantity__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Product__r.Part_Code__c, Product__r.Name, Product__r.Product_Code_Name__c, Product__r.Family, Promotion__r.Name',
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

    Q.allSettled([new soql.multipart(salesQuery), new soql.multipart(forecastQuery), new soql.multipart(dateQuery)]).spread(function (resSales, resForecast, resDate) {

        data.sales = resSales.value;
        data.forecast = resForecast.value;
        data.fiscal = resDate.value[0];
        
        var grossSales = salesByMonthGross();
        var netSales = salesByMonthNet();
        var grossPeriodSales = salesByPeriod(grossSales);
        var netPeriodSales = salesByPeriod(netSales);
        
        console.log(grossSales, netSales);
        console.log(grossPeriodSales, netPeriodSales);
        
        //tabGrossSummary
        summarySalesChart('#grossSummaryCurrentChart', grossPeriodSales.currentPeriod);
        summarySalesChart('#grossSummaryLastChart', grossPeriodSales.lastPeriod);
        summarySalesChart('#grossSummaryYearChart', grossPeriodSales.yearToDate);
        summarySalesChart('#grossSummaryFullChart', grossPeriodSales.fullYear);
        periodSummaryTable('#grossSummaryTable', grossPeriodSales);
        
        //tanNetSUmmary
        summarySalesChart('#netSummaryCurrentChart', netPeriodSales.currentPeriod);
        summarySalesChart('#netSummaryLastChart', netPeriodSales.lastPeriod);
        summarySalesChart('#netSummaryYearChart', netPeriodSales.yearToDate);
        summarySalesChart('#netSummaryFullChart', netPeriodSales.fullYear);
        periodSummaryTable('#netSummaryTable', netPeriodSales);
        
        //tabGrossByMonth
        monthlySalesChart('#grossByMonthChart', grossSales);
        monthlySalesTable('#grossByMonthTable', grossSales);
        
        //tabNetByMonth
        monthlySalesChart('#netByMonthChart', netSales);
        monthlySalesTable('#netByMonthTable', netSales);
        
        //tabProductSales
        productSales(data.sales);
        

        
    }).done();

    var dataTemplatebyMonth = [
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
        
    var salesByMonthGross = function() {
        
        var result = _.cloneDeep(dataTemplatebyMonth);

        _.each(result, function(d) {
            d.credits = d3.sum(data.sales, function(s) { 
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == thisYear ? s.Gross_Credits__c : 0; 
            });
            d.despatches = d3.sum(data.sales, function(s) { 
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == thisYear ? s.Gross_Despatches__c : 0; 
            });
            d.sales = d3.sum(data.sales, function(s) { 
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == thisYear ? s.Value__c : 0; 
            });
            d.budget = d3.sum(data.forecast, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == thisYear && s.Forecast_Type__c == 'Budget' ? s.Gross_Value__c : 0; 
            });
            d.target = d3.sum(data.forecast, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == thisYear && (s.Forecast_Type__c == 'Budget' || s.Forecast_Type__c == 'Target')? s.Gross_Value__c : 0;
            });
            d.last = d3.sum(data.sales, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == lastYear ? s.Value__c : 0;
            });
            d.vsBudget = d.sales - d.budget;
            d.vsTarget = d.sales - d.target;
            d.vsLast = d.sales - d.last;
        });
        
        return result;
        
    };
    
    var salesByMonthNet = function() {
        
        var result = _.cloneDeep(dataTemplatebyMonth);

        _.each(result, function(d) {
            d.credits = 0;
            d.despatches = 0;
            d.sales = d3.sum(data.sales, function(s) { 
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == thisYear ? s.Net_Value__c : 0; 
            });
            d.budget = d3.sum(data.forecast, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == thisYear && s.Forecast_Type__c == 'Budget' ? s.Net_Value__c : 0; 
            });
            d.target = d3.sum(data.forecast, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == thisYear && (s.Forecast_Type__c == 'Budget' || s.Forecast_Type__c == 'Target')? s.Net_Value__c : 0;
            });
            d.last = d3.sum(data.sales, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == lastYear ? s.Net_Value__c : 0;
            });
            d.vsBudget = d.sales - d.budget;
            d.vsTarget = d.sales - d.target;
            d.vsLast = d.sales - d.last;
        });
        
        return result;
        
    };
    
    var salesByPeriod = function(source) {
        
        //console.log('FUNCTION salesByPeriod', source);
        
        var result = {};
        
        //These functions can probably be shortened - d3.sum maybe doesn't lend itself when reuse is necessary
        function summaryDataTemplate(period, data, comp) {
            
            //console.log('FUNCTION salesByPeriod summaryDataTemplate', period, data, comp);
            
            this.period = period;
            this.credits = d3.sum(data, function(d) { return comp(d.month) ? d.credits : 0; }); 
            this.despatches = d3.sum(data, function(d) {return comp(d.month) ? d.despatches : 0; });
            this.sales = d3.sum(data, function(d) {return comp(d.month) ? d.sales : 0; });
            this.budget = d3.sum(data, function(d) {return comp(d.month) ? d.budget : 0; }); 
            this.target = d3.sum(data, function(d) {return comp(d.month) ? d.target : 0; }); 
            this.last = d3.sum(data, function(d) {return comp(d.month) ? d.last : 0; });
            this.vsBudget = this.sales - this.budget;
            this.vsTarget = this.sales - this.target; 
            this.vsLast = this.sales - this.last;
        }
        
        result.yearToDate = new summaryDataTemplate('Year To Date', source, function(month) { return month < data.fiscal.PeriodNum__c; });
        result.lastPeriod = new summaryDataTemplate('Last Period', source, function(month) { return month == data.fiscal.PeriodNum__c - 1; });
        result.currentPeriod = new summaryDataTemplate('Current Period', source, function(month) { return month == data.fiscal.PeriodNum__c; });
        result.fullYear = new summaryDataTemplate('Full Year', source, function(month) { return true; });
        
        return result;
        
    };
    
    var summarySalesChart = function(selector, data) {
        
        //console.log(data);
        
        var chartData = [
            {type : 'Sales', value : data.sales},
            {type : 'Budget', value : data.budget},
            {type : 'Target', value : data.target},
            {type : 'Last', value : data.last}
        ];
        
        //console.log('FUNCTION summarySalesChart', data, chartData);
        
        c3.generate({
            bindto : selector,
            size : {
                width : $j(selector).actual('width'),
                height : 320
            },
            data : {
                x: 'type',
                json: chartData,
                keys: {
                    x : 'type',
                    value: ['value']
                },
                type: 'bar',
                labels: {
                    format: function (v, id) {return accounting.formatMoney(v);}
                },
                color: function (color, d) { 
                    
                    //console.log('FUNCTION summarySalesChart chart.color', color, d);
                    
                    switch (d.x) {
                        case 0 : return '#6C95BF';
                        case 1 : return '#F5A631';
                        case 2 : return '#C9297A';
                        case 3 : return '#639D00';
                        default : return '#AAAAAA';
                    }
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
            },
            legend: {
                hide: true
            }
        });
        
    }
        
    var periodSummaryTable = function(selector, data) {
        
        var tableData = [];
        tableData.push(data.currentPeriod);
        tableData.push(data.lastPeriod);
        tableData.push(data.yearToDate);
        tableData.push(data.fullYear);
        
        console.log(tableData);

        var tableCols = [
            {"data": "period", "title": "Period"},
            {"data": "credits", "title": "Credits"},
            {"data": "despatches", "title": "Despatches"},
            {"data": "sales", "title": "Sales"},
            {"data": "budget", "title": "Budget"},
            {"data": "vsBudget", "title": "vs Sales"},
            {"data": "target", "title": "Target"},
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
            {'targets': [2,3,5,7,9],
            'className': 'dt-right'},
            {'targets': [1,4,6,8],
            'className': 'dt-right borderLeft'}
        ];
                            
        var table = $j(selector).dataTable({
            'data' : tableData,
            'paging' : false,
            'ordering' : false,
            "order": [],
            'dom' : 't',
            'columns' : tableCols,
            'columnDefs' : tableColDefs
        });
        
    }
    
    var monthlySalesTable = function(selector, data) {
        
        var tableCols = [{"data": "monthName", "title": "Month"},
                         {"data": "credits", "title": "Credits"},
                         {"data": "despatches", "title": "Despatches"},
                         {"data": "sales", "title": "Sales"},
                         {"data": "budget", "title": "Budget"},
                         {"data": "vsBudget", "title": "vs Sales"},
                         {"data": "target", "title": "Target"},
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
            {'targets': [2,3,5,7,9],
            'className': 'dt-right'},
            {'targets': [1,4,6,8],
            'className': 'dt-right borderLeft'}
        ];
                            
        var table = $j(selector).dataTable({
            'data' : data,
            'paging' : false,
            'ordering' : false,
            "order": [],
            'dom' : 't',
            'columns' : tableCols,
            'columnDefs' : tableColDefs
        });
        
    }
    
    var monthlySalesChart = function(selector, data) {
        
        c3.generate({
            bindto: selector,
            size : {
                width : $j(selector).actual('width'),
                height : 320
            },
            data: {
                x: 'monthName',
                json: data,
                keys: {
                    x: 'monthName',
                    value: ['sales', 'target', 'budget', 'last'],
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
                },
                colors: {
                    sales : '#91BDEB',
                    target : '#C9297A',
                    last : '#4E7B00'
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

    }
    
    function productSales(data) {
        
        var tableData = _.sortBy(data, function(d) {
            return moment(d.Invoice_Date__c).toDate();
        });
        
        var tableCols = [{"data": "Invoice_Date__c", "title": "Invoice Date"},
                         {"data": "Product__r.Family", "title": "Category"},
                         {"data": "Product__r.Part_Code__c", "title": "Product Code"},
                         {"data": "Product__r.Name", "title": "Product Name"},
                         {"data": "Quantity__c", "title": "Quantity"},
                         {"data": "Value__c", "title": "Gross Value"},
                         {"data": "Gross_Sales_Price_Per_Item__c", "title": "Sales Price Per Item"},
                         {"data": "Promotion__r.Name", "title": "Promotion"}
        ];
        
        var tableColDefs = [
            {'targets' : [4,5,6], 
            'render' : function (cell, type, row, meta) {
                switch (type) {
                    case 'display':
                        return accounting.formatMoney(cell);
                    }
                    return data;
                }
            },
            {'targets' : [7], 
            'render' : function (cell, type, row, meta) {
                switch (type) {
                    case 'display':
                        return cell == null ? '': cell;
                    }
                    return data;
                }
            },
            {'targets': [4,5,6],
            'className': 'dt-right'}
        ];
        
        var table = $j('#table-productSales').DataTable({
            'data' : tableData,
            'paging' : true,
            'ordering' : true,
            "order": [[0,'desc']],
            'dom' : 'ftp',
            'columns' : tableCols,
            //'columnDefs' : tableColDefs
        });

        var chartData = function(data, value) {
        
            var chartData = d3.nest()
                .key(function(d) { return d.Invoice_Date__c.slice(0,-2) + '01'; })
                .rollup(function(d) { return d3.sum(d, function(i) { return i[value]; }); })
                .entries(data);

            return chartData;
            
        }
        
        var ticks = [];
        for (i=0;i<=71;i++) {
            ticks.push(moment('2010-01-01').add(i, 'months').format('YYYY-MM-DD'));
        }


        var chart = c3.generate({
            bindto: '#chartWeeklySales',
            data: {
                x: 'key',
                xFormat: '%Y-%m-%d',
                json: chartData(tableData, 'Value__c'),
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
                        format : function (e) { return moment(e).format('MMM').slice(0, 1); },
                        fit : true,
                        culling : false,
                        values : ticks
                    },
                    min : new Date(2009,11,1),
                    max : new Date(2016,01,1),
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
            },
            grid: {
                x: {
                    lines: [{value: new Date(2010,11,15), text: '2010'},
                            {value: new Date(2011,11,15), text: '2011'},
                            {value: new Date(2012,11,15), text: '2012'},
                            {value: new Date(2013,11,15), text: '2013'},
                            {value: new Date(2014,11,15), text: '2014'},
                            {value: new Date(2015,11,15), text: '2015'},
                    ]
                }
            },
            bar: {
                width: 8
            }
        });
        
        var chartUpdate = function(data, value) {
            
            chart.load({
                x: 'key',
                json: chartData(data, value),
                keys: {
                    x: 'key',
                    value: ['values'],
                },
                type : 'bar'
            })
            
        }

        table.on('search.dt', function (e, settings) {
            
            var tableData = table.rows({order: "applied", search: "applied", page: "all"}).data().toArray()
            
            chartUpdate(tableData, 'Value__c');

        });
        
        $j('#grossSales').click(function() {
            
            var tableData = table.rows({order: "applied", search: "applied", page: "all"}).data().toArray()
            
            chartUpdate(tableData, 'Value__c');
            
        });
        
        
        $j('#netSales').click(function() {
            
            var tableData = table.rows({order: "applied", search: "applied", page: "all"}).data().toArray()
            
            chartUpdate(tableData, 'Net_Value__c');
            
        });
        
        
        $j('#quantity').click(function() {
            
            var tableData = table.rows({order: "applied", search: "applied", page: "all"}).data().toArray()
            
            chartUpdate(tableData, 'Quantity__c');
            
        });
    
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
    
})(accId, accType, SOQL);