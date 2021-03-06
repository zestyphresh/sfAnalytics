(function(accId, accType, soql, parentName, groupName) {
    
    $j = jQuery.noConflict();
        
    var thisYear = 2015,
        lastYear = 2014,
        orgId = '00Db0000000ZVQP';
    
    //LOAD TABS
    $j( "#tabs" ).responsiveTabs();
    
    
    //QUERY PARAMETERS
    var query = {};
    
    var whereAccount = {
        branch : 'Account__r.Id = ' + "'" + accId + "'",
        parent : 'Account__r.Parent_Name__c = ' + "'" + parentName + "'",
        group : 'Account__r.Group_Name__c = ' + "'" + groupName + "'"
    };
    
    var wherePeriod = {
        current : 'Is_Fiscal_Current_Period__c = True',
        last : 'Is_Fiscal_Last_Period__c = True',
        ytd : 'Is_Fiscal_Year_To_Date__c = True',
        full : ''
    };
    
    query.sales = function(year, period) {
        
        var result = {};
        
        result.sObject = 'Daily_Historical_Sales__c';
        result.select = 'SUM(Gross_Credits__c) grossCredits, SUM(Gross_Despatches__c) grossDespatches, SUM(Value__c) grossValue, SUM(Net_Value__c) netValue';
        result.where = whereAccount[accType.toLowerCase()] + ' ' + 'Fiscal_Year__c = ' + year + ' ' + wherePeriod[period];
        
        return result;
        
    };
    
    query.forecast = function(year, period) {
        
        var result = {};
        
        result.sObject = 'Daily_Historical_Sales__c';
        result.select = 'SUM(Gross_Value__c) grossValue, SUM(Net_Value__c) netValue';
        result.where = whereAccount[accType.toLowerCase()] + ' ' + 'Fiscal_Year__c = ' + year + ' ' + wherePeriod[period];
        
        return result;
        
    };
    

    query.sales.currentPeriod = _.extend({}, query.sales.template, { where : whereClause[accType] + ' ' + 'Is_Fiscal_Current_Period__c = True, Fiscal_Year__c = 2015' });

    query.sales.lastperiod = {
        sObject : 'Daily_Historical_Sales__c',
        select : 'SUM(Gross_Credits__c) grossCredits, SUM(Gross_Despatches__c) grossDespatches, SUM(Value__c) grossValue, SUM(Net_Value__c) netValue',
        where : whereClause[accType],
        maxfetch : 100000
    };
        
    query.forecast = {
        sObject : 'Forecast2__c',
        select : 'Fiscal_Year__c, Fiscal_Month__c, Gross_Value__c, Net_Value__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Forecast_Brand__c, Forecast_Type__c',
        where : whereClause[accType],
        maxfetch : 100000
    };
    
    query.date = {
        sObject : 'FY_Settings__c',
        select : 'PeriodNum__c, PeriodYear__c',
        where : 'SetupOwnerId = ' + "'" + orgId + "'",
        maxfetch : 10
    };
    
    //GET DATA AND RETURN PROMISES - SO EVERYTHING IN HERE
    var data = {},
        fiscal = {};

    Q.allSettled([new soql.multipart(query.sales), new soql.multipart(query.forecast), new soql.multipart(query.date)]).spread(function (resSales, resForecast, resDate) {
        
        console.log('START - Return Promises');

        data.sales = resSales.value;
        data.forecast = resForecast.value;
        fiscal = resDate.value[0];

        start = performance.now();
        var salesByMonth2015 = salesByMonth(data.sales, 2015);
        var salesByMonth2014 = salesByMonth(data.sales, 2014);
        var forecastByMonth2015 = forecastByMonth(data.forecast, 2015);
        var summaryByMonth = dataSummaryByMonth(salesByMonth2015, salesByMonth2014, forecastByMonth2015);
        console.log("SUMMARY BY MONTH", summaryByMonth);
        var summaryByPeriod =  dataSummaryByPeriod(summaryByMonth);
        end = performance.now();
        console.log(end - start);
        
        //tabGrossSummary
        summarySalesChart('#grossSummaryCurrentChart', summaryByPeriod.currentPeriod, false);
        summarySalesChart('#grossSummaryLastChart', summaryByPeriod.lastPeriod, false);
        summarySalesChart('#grossSummaryYearChart', summaryByPeriod.yearToDate, false);
        summarySalesChart('#grossSummaryFullChart', summaryByPeriod.fullYear, false);
        summarySalesTable('#grossSummaryTable', summaryByPeriod, false);

        //tabNetSummary
        summarySalesChart('#netSummaryCurrentChart', summaryByPeriod.currentPeriod, true);
        summarySalesChart('#netSummaryLastChart', summaryByPeriod.lastPeriod, true);
        summarySalesChart('#netSummaryYearChart', summaryByPeriod.yearToDate, true);
        summarySalesChart('#netSummaryFullChart', summaryByPeriod.fullYear, true);
        summarySalesTable('#netSummaryTable', summaryByPeriod, true);
        
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
        
        console.log('START - FUNCTION - salesByMonth');
        
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
        
        console.log('START - FUNCTION - forecastByMonth');
        
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
        
        console.log('START - FUNCTION - dataSummaryByMonth');
        
        var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        var result = [];
        
        _.each(months, function(m) {
            var month = {
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
            
            month.grossBudgetVsSales = month.grossSales - month.grossBudget;
            month.grossTargetVsSales = month.grossSales - month.grossTarget;
            month.grossLastVsSales = month.grossSales - month.grossLast;
            month.netBudgetVsSales = month.netSales - month.netBudget;
            month.netTargetVsSales = month.netSales - month.netTarget; 
            month.netLastVsSales = month.netSales - month.netLast;
            
            result.push(month);
        });
        
        return result;
    }
    
    
    function dataSummaryByPeriod(data) {
        
        console.log('START - FUNCTION - dataSummaryByPeriod');
        
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
            
        }
        
        var periods = {};
        
        periods.currentPeriod = sumPeriod('Current Period', data, function(month) { return month == fiscal.PeriodNum__c; });
        periods.lastPeriod = sumPeriod('Last Period', data, function(month) { return month == fiscal.PeriodNum__c - 1; });
        periods.yearToDate = sumPeriod('Year To Date', data, function(month) { return month < fiscal.PeriodNum__c; });
        periods.fullYear = sumPeriod('Full Year', data, function(month) { return true; });
        
        return periods;
        
    }

    var summarySalesChart = function(selector, data, isNet) {
        
        console.log('START - FUNCTION - summarySalesChart');
        
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
        
        chart.flush();
        
    }
        
    var summarySalesTable = function(selector, data, isNet) {
        
        console.log('START - FUNCTION - summarySalesTable');
        
        //convert period data into an Array of objects, is there a better way of flattening?
        var tableData = [];
        tableData.push(data.currentPeriod);
        tableData.push(data.lastPeriod);
        tableData.push(data.yearToDate);
        tableData.push(data.fullYear);

        var tableCols = [
            {data : "period", title : "Period"},
            {data : isNet ? 0 : "grossCredits", title : "Credits"},
            {data : isNet ? 0 : "grossDespatches", title : "Despatches"},
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
        
    };
    
    var monthlySalesTable = function(selector, data, isNet) {
        
        console.log('START - FUNCTION - monthlySalesTable');
        
        var tableCols = [
            {data : "monthName", title : "Month"},
            {data : isNet ? 0 : 'grossCredits', title : "Credits"},
            {data : isNet ? 0 : "grossDespatches", title : "Despatches"},
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
        
    };
    
    var monthlySalesChart = function(selector, data, isNet) {
        
        console.log('START - FUNCTION - monthlySalesChart');
        
        var chartData = [];
        
        _.each(data, function(d) {
        
            var result = {};
            result.monthName = d.monthName;
            result.sales = isNet ? d.netSales : d.grossSales;
            result.budget = isNet ? d.netBudget : d.grossBudget;
            result.target = isNet ? d.netTarget : d.grossTarget;
            result.last = isNet ? d.netLast : d.grossLast;
            chartData.push(result);
            
        });

        var chart = c3.generate({
            bindto: selector,
            size : {
                width : $j(selector).actual('width'),
                height : 320
            },
            data: {
                x: 'monthName',
                json: chartData,
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
        
        chart.flush();
        
    };
    
    function productSales(data) {
        
        console.log('START - FUNCTION - productSales');
        
        //TABLE
        var tableData = _.sortBy(data, function(d) {
            return moment(d.Invoice_Date__c).toDate();
        });
        
        var tableCols = [{data : "Invoice_Date__c", title: "Invoice Date"},
                         {data : "Product__r.Family", title: "Category", "defaultContent" : "N/A"},
                         {data : "Product__r.Part_Code__c", title: "Product Code", "defaultContent" : "N/A"},
                         {data : "Product__r.Name", title: "Product Name", "defaultContent" : "N/A"},
                         {data : "Quantity__c", title: "Quantity    "},
                         {data : "Value__c", title: "Gross Value    "},
                         {data : "Gross_Sales_Price_Per_Item__c", title: "Gross Sales Price Per Item    "},
                         {data : "Promotion__r.Name", title: "Promotion", "defaultContent" : "N/A"}
        ];
        
        var tableColDefs = [
            {
                'targets' : [5,6], 
                'render' : function (cell, type, row, meta) {
                    switch (type) {
                        case 'display':
                            return accounting.formatMoney(cell, "£", 2, ",", ".");
                        }
                        return cell;
                }
            },
            {
                'targets' : [4], 
                'render' : function (cell, type, row, meta) {
                    switch (type) {
                        case 'display':
                            return accounting.formatNumber(cell);
                        }
                        return cell;
                }
            },
            {
                'targets' : [4,5,6,7], 
                'className': 'dt-right'
            }
        ];
        
        var table = $j('#table-productSales').DataTable({
            'data' : tableData,
            'paging' : true,
            'ordering' : true,
            "order": [[0,'desc']],
            'dom' : 'pt',
            'columns' : tableCols,
            'columnDefs' : tableColDefs
        });
        
        //Adds search boxes to each column
        $j('#table-productSales tfoot th').each( function () {
            var title = $j('#example thead th').eq( $j(this).index() ).text();
            $j(this).html( '<input type="text" placeholder="Search '+title+'" />' );
        });

        //Updates table when using the column search boxes
        table.columns().eq(0).each( function (colIdx) {
            $j( 'input', table.column(colIdx).footer()).on('keyup change', function () {
                table
                    .column(colIdx)
                    .search(this.value)
                    .draw();
            });
        });

        //CHART MONTHLY
        
        var showValue = 'Value__c';
        
        var showValueTextBox = {
            Value__c : 'Gross Value',
            Net_Value__c : 'Net Value',
            Quantity__c : 'Quantity'
        }
        
        var chartShowing = function() {
            $j('#productChartSelectedData').text('Showing : ' + showValueTextBox[showValue]);
        };
        
        chartShowing();

        var chartData = function(data, granularity) {
            
            console.log('START - FUNCTION - chartData');
            
            var keys = {
                monthly : function(d) { return d.Invoice_Date__c.slice(0,-2) + '01'; },
                weekly : function(d) { return moment(d.Invoice_Date__c).weekday(0).format('YYYY-MM-DD'); },
                daily : function(d) { return d.Invoice_Date__c; } 
            };
            
            var chartData = d3.nest()
                .key(function(d) { return keys[granularity](d); })
                .rollup(function(d) { return d3.sum(d, function(i) { return i[showValue]; }); })
                .entries(data);

            return chartData;
            
        };
        
        var ticks = [];
        for (var i = 0; i <= 23; i++) {
            ticks.push(moment('2014-01-01').add(i, 'months').format('YYYY-MM-DD'));
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
                json: chartData(tableData, 'monthly'),
                keys: {
                    x: 'key',
                    value: ['values'],
                },
                names : {
                    values : 'Value/Quantity'
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
                    min : new Date(2013,11,1),
                    max : new Date(2016,01,1),
                    padding: {
                        left: 0,
                        right: 0
                    }
                },
                y : {
                    tick: {
                        format: function (d) { return accounting.formatNumber(d, 0, ','); }
                    },
                    padding : {bottom: 0},
                    min : 0
                }
            },
            grid: {
                x: {
                    lines: [{value: new Date(2013,11,15), text: '2014'},
                            {value: new Date(2014,11,15), text: '2015'},
                    ]
                }
            },
            tooltip : {
                format : {
                    title : function (x) { return moment(x).format('MMMM YYYY'); }
                }
            }
        });
        
        var chartUpdate = function(data) {
            
            chart.load({
                x: 'key',
                json: chartData(data, 'monthly'),
                keys: {
                    x: 'key',
                    value: ['values'],
                },
                type : 'bar'
            });
            
            chartShowing();
            
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
            
            chartUpdate(tableData, 'monthly');
            
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
    
})(accId, accType, SOQL, accParent, accGroup);