(function(conn, product) {
    
    $j = jQuery.noConflict();
    
     //PRIVATE VARS
    var _data = crossfilter();
            
    //PUBLIC VARS   
    var dims = {}, groups = {};
    var charts = {}, tables = {};
    var values = {};
    
    getData()
        .then(function(result) { 
            
            console.log(result);
            
            _data.add(result);
            
            dims.dummy = _data.dimension(function(d) { return 'all'; });
            dims.year = _data.dimension(function(d) { return d.Fiscal_Year__c; });
            dims.month = _data.dimension(function(d) { return moment(d.Fiscal_Year__c + '-' + d.Fiscal_Month__c, 'YYYY-M'); })
            
            //groups.salespersonValue = dims.salesperson.group().reduceSum(function(d) { return d.Value__c.toFixed(0); });
            //groups.weeklyValue = dims.week.group().reduceSum(function(d) { return d.Value__c.toFixed(0); });
            groups.monthlySales = dims.month.group().reduceSum(function(d) { return d.Value__c.toFixed(0); });
            groups.yearlySales = dims.year.group().reduce(yearlySalesMatrix.reduceAdd, yearlySalesMatrix.reduceSubract, yearlySalesMatrix.reduceInit);
            
            //values.sales = dims.dummy.group().reduceSum(function(d) { return d.Value__c; });
            //values.volume = dims.dummy.group().reduceSum(function(d) { return d.Quantity__c; });

            //values.totalSales();
            //values.totalVolumes();
            //charts.salesperson();
            charts.monthly2();
            tables.yearlySales();
            

        })
        .done();

    charts.monthly2 = function() {
        
        var data = _.sortBy(groups.monthlySales.orderNatural().top(Infinity), function(d) { return d.key.toDate(); });
        //var data = groups.monthlySales.orderNatural().top(Infinity);
        
        _.each(data, function(d) { d.key = d.key.format('YYYY-MM-DD'); });
        
        console.log(data);

        var chart = c3.generate({
            bindto: '#chart-weekly',
            data: {
                x: 'key',
                xFormat: '%Y-%m-%d',
                json: data,
                keys: {
                    x: 'key',
                    value: ['value'],
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            },
            regions: [
                {start: new Date(2009,11,15), end: new Date(2010,11,15)},
                {start: new Date(2011,11,15), end: new Date(2012,11,15)},
                {start: new Date(2013,11,15), end: new Date(2014,11,15)},
            ],
            grid: {
                x: {
                    lines: [{value: new Date(2009,11,15), text: '2010'},
                            {value: new Date(2010,11,15), text: '2011'},
                            {value: new Date(2011,11,15), text: '2012'},
                            {value: new Date(2012,11,15), text: '2013'},
                            {value: new Date(2013,11,15), text: '2014'},
                            {value: new Date(2014,11,15), text: '2015'}
                    ]
                }
            },
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            }
        });
        
    };
    
    
    tables.yearlySales = function() {
        
        var data = _.sortBy(groups.yearlySales.top(Infinity), function(d) { return d.key; });
        console.log(data);
      
        var _columns = [{"data": "key", "title": "Year"},
                        {"data": "value.ytdQty", "title": "YTD Quantity"},
                        {"data": "value.ytdVal", "title": "YTD Value"},
                        {"data": "value.fullQty", "title": "Full Year Quantity"}, 
                        {"data": "value.fullVal", "title": "Full Year Value"}
        ];
        
        var _columnDefs = [{    'targets' : [1,3], 
                                'render' : function ( data, type, row, meta ) {
                                    switch (type) {
                                        case 'display':
                                            return accounting.formatNumber(data);
                                            break;
                                    }
                                    return data;
                                }
                            },
                            {    'targets' : [2,4], 
                                'render' : function ( data, type, row, meta ) {
                                    switch (type) {
                                        case 'display':
                                            return accounting.formatMoney(data, "£", 0, ",", ".");
                                            break;
                                    }
                                    return data;
                                },
                            }
        ]
                            
        var table = $j('#table-matrix').dataTable({
            'data' : data,
            'paging' : false,
            'order': [[0, 'asc' ]],
            'dom' : 'ftip',
            'columns' : _columns,
            'columnDefs' : _columnDefs
        });
        
    };

    var yearlySalesMatrix = {
        
        reduceAdd : function (p, v) {

            p.count++;
            p.ytdQty += p.Fiscal_Year_To_Date__c ? v.Quantity__c : 0;
            p.ytdVal += p.Fiscal_Year_To_Date__c ? v.Value__c : 0;
            p.fullQty += v.Quantity__c;
            p.fullVal += v.Value__c;
            return p;
                
        },
        
        reduceSubtract : function (p, v) {
                
            p.count--;
            p.ytdQty -= p.Fiscal_Year_To_Date__c ? v.Quantity__c : 0;
            p.ytdVal -= p.Fiscal_Year_To_Date__c ? v.Value__c : 0;
            p.fullQty -= v.Quantity__c;
            p.fullVal -= v.Value__c;
            return p;
                
        },
            
        reduceInit : function () {
            return { count : 0, ytdVal : 0, ytdQty : 0, fullVal : 0, fullQty : 0};
        }
        
    };   
        
    function getData() {

        var deferred = Q.defer();
        
        var records = [];

        conn.sobject("Daily_Historical_Sales__c")
            .select("Account__r.Name, Is_Fiscal_Year_To_Date__c, Fiscal_Year__c, Fiscal_Month__c, Quantity__c, Value__c")
            .where("Product__r.Id = " + "'" + product + "'")
            .on('record', function(record) {
                records.push(record);
            })
            .on('error', function(query) {
                deferred.reject('error');
            })
            .on('end', function(err) {
                deferred.resolve(records);
            })
            .run({ autoFetch : true, maxFetch : 10000 });

        return deferred.promise;

    }

})(conn, product);
