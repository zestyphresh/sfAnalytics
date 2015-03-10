(function(accId, accType, soql) {
    
    $j = jQuery.noConflict();
        
    var thisYear = 2015,
        lastYear = 2014;
    
    //load tabs
    $j( "#tabs" ).responsiveTabs();
    
    var orgId = '00Db0000000ZVQP';
    
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
    
    var data = {};
    
    var fiscal = {};

    Q.allSettled([new soql.multipart(salesQuery), new soql.multipart(forecastQuery), new soql.multipart(dateQuery)]).spread(function (resSales, resForecast, resDate) {

        data.sales = resSales.value;
        data.forecast = resForecast.value;
        fiscal = resDate.value[0];

        start = performance.now();
        var salesByMonth2015 = salesByMonth(data.sales, 2015);
        var salesByMonth2014 = salesByMonth(data.sales, 2014);
        var forecastByMonth2015 = forecastByMonth(data.sales, 2015);
        var summaryByMonth = dataSummaryByMonth(salesByMonth2015, salesByMonth2014, forecastByMonth2015);
        var summaryByPeriod =  dataSummaryByPeriod(salesSummary);
        end = performance.now();
        console.log(end - start);
        
        //tabGrossSummary
        summarySalesChart('#grossSummaryCurrentChart', summaryByPeriod.currentPeriod, false);
        summarySalesChart('#grossSummaryLastChart', summaryByPeriod.lastPeriod, false);
        summarySalesChart('#grossSummaryYearChart', summaryByPeriod.yearToDate, false);
        summarySalesChart('#grossSummaryFullChart', summaryByPeriod.fullYear, false);
        periodSummaryTable('#grossSummaryTable', summaryByPeriod);

        //tabNetSummary
        summarySalesChart('#netSummaryCurrentChart', summaryByPeriod.currentPeriod, true);
        summarySalesChart('#netSummaryLastChart', summaryByPeriod.lastPeriod, true);
        summarySalesChart('#netSummaryYearChart', summaryByPeriod.yearToDate, true);
        summarySalesChart('#netSummaryFullChart', summaryByPeriod.fullYear, true);
        periodSummaryTable('#netSummaryTable', summaryByPeriod);
        
        //tabGrossByMonth
        monthlySalesChart('#grossByMonthChart', summaryByMonth, false);
        monthlySalesTable('#grossByMonthTable', summaryByMonth, false);
        
        //tabNetByMonth
        monthlySalesChart('#netByMonthChart', summaryByMonth, true);
        monthlySalesTable('#netByMonthTable', summaryByMonth, true);
        
        //tabProductSales
        productSales(data.sales);
        
        
    }).done();
    
    var salesByMonth = function(data, year) {
        
        return _.chain(data)
            .filter(function(d) { return d.Fiscal_Year__c == year; })
            .groupBy(function(d) { return d.Fiscal_Month__c; })
            .mapValues(function(d) {
                
                return _.reduce(d, function(result, value) {
                    
                    result.grossCredits += value.Gross_Credits__c;
                    result.grossDespatches += value.Gross_Despatches__c;
                    result.grossSales += value.Value__c;
                    result.netSales += value.Net_Value__c;
                    
                    return result;
                    
                }, { grossCredits : 0, grossDespatches : 0, grossSales : 0, netSales : 0 });
                
            })
            .value();
            
    };
    
    var forecastByMonth = function(data, year) {
        
        return _.chain(data)
            .filter(function(d) { return d.Fiscal_Year__c == year; })
            .groupBy(function(d) { return d.Fiscal_Month__c; })
            .mapValues(function(d) {
                
                return _.reduce(d, function(result, value) {
                    
                    switch (value.Forecast_Type__c) {
                        case 'Budget' :
                            result.grossBudget += value.Gross_Value__c;
                            result.netBudget += value.Net_Value__c;
                            result.grossTarget += value.Gross_Value__c;
                            result.netTarget += value.Net_Value__c;
                            break;
                        case 'Target' :
                            result.grossTarget += value.Gross_Value__c;
                            result.netTarget += value.Net_Value__c;
                            break;
                    }

                    return result;
                    
                }, { grossBudget : 0, netBudget : 0, grossTarget : 0, netTarget : 0 });
                
            })
            .value();
            
    };
    
    function dataSummaryByMonth(salesCurrent, salesPrevious, forecastCurrent) {
        
        var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        var result = [];
        
        _.each(months, function(m) {
            var result = {
                monthName : monthNames[m-1], 
                month : m, 
                grossCredits : (typeof salesCurrent[m] === 'undefined' ? 0 : salesCurrent[m].grossCredits), 
                grossDespatches : (typeof salesCurrent[m] === 'undefined' ? 0 : salesCurrent[m].grossDespatches), 
                grossSales : (typeof salesCurrent[m] === 'undefined' ? 0 : salesCurrent[m].grossSales), 
                grossBudget : (typeof forecastCurrent[m] === 'undefined' ? 0 : forecastCurrent[m].grossBudget), 
                grossTarget : (typeof forecastCurrent[m] === 'undefined' ? 0 : forecastCurrent[m].grossTarget), 
                grossLast : (typeof salesPrevious[m] === 'undefined' ? 0 : salesPrevious[m].grossSales), 
                netSales : (typeof salesCurrent[m] === 'undefined' ? 0 : salesCurrent[m].netSales), 
                netBudget : (typeof forecastCurrent[m] === 'undefined' ? 0 : forecastCurrent[m].netBudget),
                netTarget : (typeof forecastCurrent[m] === 'undefined' ? 0 : forecastCurrent[m].netTarget),
                netLast : (typeof salesPrevious[m] === 'undefined' ? 0 : salesPrevious[m].netSales)
            };
            
            result.grossBudgetVsSales = result.grossSales - result.grossBudget;
            result.grossTargetVsSales = result.grossSales - result.grossTarget;
            result.grossLastVsSales = result.grossSales - result.grossLast;
            result.netBudgetVsSales = result.netSales - result.netBudget;
            result.netTargetVsSales = result.netSales - result.netTarget; 
            result.netLastVsSales = result.netSales - result.netLast;
        });
        
        return result;
    }
    
    
    function dataSummaryByPeriod(dataSummaryByMonth) {
        
        function sumPeriod(period, data, comparator) {
            
            var sum = _.chain(data)
                .filter(function(d) { return comparator(d.month); })
                .reduce(function(result, value) {

                    result.grossCredits += value.grossCredits;
                    result.grossDespatches += value.grossDespatches; 
                    result.grossSales += value.grossSales;
                    result.grossBudget += value.grossBudget; 
                    result.grossTarget += value.grossTarget; 
                    result.grossLast += value.grossLast;
                    result.netSales += value.netSales;
                    result.netBudget += value.netBudget;
                    result.netTarget += value.netTarget;
                    result.netLast += value.netLast;
                    result.grossBudgetVsSales = result.grossSales - result.grossBudget;
                    result.grossTargetVsSales = result.grossSales - result.grossTarget;
                    result.grossLastVsSales = result.grossSales - result.grossLast;
                    result.netBudgetVsSales = result.netSales - result.netBudget;
                    result.netTargetVsSales = result.netSales - result.netTarget; 
                    result.netLastVsSales = result.netSales - result.netLast;

                    return result;
                    
                },{ grossCredits : 0, grossDespatches : 0, grossSales : 0, 
                    grossBudget : 0, grossTarget : 0, grossLast : 0, 
                    netSales : 0, netBudget : 0, netTarget : 0, netLast : 0,
                    grossBudgetVsSales : 0, grossTargetVsSales : 0,
                    grossLastVsSales : 0, netBudgetVsSales : 0,
                    netTargetVsSales : 0, netLastVsSales : 0
                })
                .value();
                
            sum.period = period; 

            return sum;
            
        };
        
        var periods = {};
        periods.currentPeriod = sumPeriod('Current Period', dataSummaryByMonth, function(month) { return month == fiscal.PeriodNum__c; });
        periods.lastPeriod = sumPeriod('Last Period', dataSummaryByMonth, function(month) { return month == fiscal.PeriodNum__c - 1; });
        periods.yearToDate = sumPeriod('Year To Date', dataSummaryByMonth, function(month) { return month == fiscal.PeriodNum__c; });
        periods.fullYear = sumPeriod('Full Year', dataSummaryByMonth, function(month) { return true; });
        
        return periods;
        
    }

    //NEED TO UPDATE CHARTDATA FUNCTION BEFORE IT WILL WORK AGAIN
    var summarySalesChart = function(selector, data, isNet) {
        
        var chartData = [
            {type : 'Sales', value : isNet ? data.netSales : data.grossSales},
            {type : 'Budget', value : isNet ? data.netBudget : data.grossBudget},
            {type : 'Target', value : isNet ? data.netTarget : data.grossTarget},
            {type : 'Last', value : isNet ? data.netLast : data.grossLast}
        ];
        
        //console.log('FUNCTION summarySalesChart', data, chartData);
        
        var chart = c3.generate({
            bindto : selector,
            size : {
                width : $j(selector).actual('width'),
                height : 320
            },
            data : {
                x: 'type',
                json: data,
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
        
        chart.flush();
        
    }
        
    var summarySalesTable = function(selector, data, isNet) {
        
        //convert period data into an Array of objects, is there a better way of flattening?
        var tableData = [];
        tableData.push(data.currentPeriod);
        tableData.push(data.lastPeriod);
        tableData.push(data.yearToDate);
        tableData.push(data.fullYear);

        var tableCols = [
            {data : "period", title : "Period"},
            {data : "grossCredits", title : "Credits"},
            {data : "grossDespatches", title : "Despatches"},
            {data : isNet ? 'netSales' : 'grossSales', title : "Sales"},
            {data : isNet ? 'netBudget' : 'grossBudget', title : "Budget"},
            {data : isNet ? 'netBudgetVsSales' : 'grossBudgetVsSales', title : "vs Sales"},
            {data : isNet ? 'netTarget' : 'grossTarget', title : "Target"},
            {data : isNet ? 'netTargetVsSales' : 'grossTargetVsSales', title : "vs Sales"},
            {data : isNet ? 'netLast' : 'grossLast', title : "Last Year"},
            {data : isNet ? 'netLastVsSales' : 'grossLastVsSales', title : "vs Sales"}
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
    
    var monthlySalesTable = function(selector, data, isNet) {
        
        var tableCols = [
            {data : "monthName", title : "Month"},
            {data : "grossCredits", title : "Credits"},
            {data : "grossDespatches", title : "Despatches"},
            {data : isNet ? 'netSales' : 'grossSales', title : "Sales"},
            {data : isNet ? 'netBudget' : 'grossBudget', title : "Budget"},
            {data : isNet ? 'netBudgetVsSales' : 'grossBudgetVsSales', title : "vs Sales"},
            {data : isNet ? 'netTarget' : 'grossTarget', title : "Target"},
            {data : isNet ? 'netTargetVsSales' : 'grossTargetVsSales', title : "vs Sales"},
            {data : isNet ? 'netLast' : 'grossLast', title : "Last Year"},
            {data : isNet ? 'netLastVsSales' : 'grossLastVsSales', title : "vs Sales"}
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
    
    var monthlySalesChart = function(selector, data, isNet) {
        
        var values = isNet ? ['grossSales', 'grossBudget', 'grossTarget', 'grossLast'] : ['netSales', 'netBudget', 'netTarget', 'netLast'];
        
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
                    value: values,
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
                    budget : '#F5A631',
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

    };
    
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
                        return typeof cell === 'undefined' ? '' : cell;
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
            'columnDefs' : tableColDefs
        });
        
        var showValue = 'Value__c';

        var chartData = function(data) {
        
            var chartData = d3.nest()
                .key(function(d) { return d.Invoice_Date__c.slice(0,-2) + '01'; })
                .rollup(function(d) { return d3.sum(d, function(i) { return i[showValue]; }); })
                .entries(data);

            return chartData;
            
        };
        
        var ticks = [];
        for (var i = 0; i <= 71; i++) {
            ticks.push(moment('2010-01-01').add(i, 'months').format('YYYY-MM-DD'));
        }

        var chart = c3.generate({
            bindto: '#chartWeeklySales',
            size : {
                width : $j('#chartWeeklySales').actual('width'),
                height : 320
            },
            data: {
                x: 'key',
                xFormat: '%Y-%m-%d',
                json: chartData(tableData),
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
        
        var chartUpdate = function(data) {
            
            chart.load({
                x: 'key',
                json: chartData(data),
                keys: {
                    x: 'key',
                    value: ['values'],
                },
                type : 'bar'
            });
            
        };
        
        table.on('search.dt', function (e, settings) {
            
            var tableData = table.rows({order: "applied", search: "applied", page: "all"}).data().toArray();
            
            chartUpdate(tableData);

        });
        
        $j('.chartWeeklySalesValue').click(function() {

            var tableData = table.rows({order: "applied", search: "applied", page: "all"}).data().toArray();

            switch ($j(this).data('show')) {
                case 'gross':
                    showValue = 'Value__c';
                    break;
                case 'net':
                    showValue = 'Net_Value__c';
                    break;    
                case 'quantity':
                    showValue = 'Quantity__c';
                    break;
            }
            
            chartUpdate(tableData);
            
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
    };
    
})(accId, accType, SOQL);