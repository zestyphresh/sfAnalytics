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
            dims.year = _data.dimension(function(d) { return d.FY_Year__c; });
            dims.month = _data.dimension(function(d) { return moment({year : d.FY_Year__c, month : d.FY_Month_Num__c, day : 1}); })
            
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
        
        _.each(data, function(d) { 
            console.log(d.key);
            d.key = d.key.format('YYYY-MM-DD'); 
            console.log(d.key);
        });
        
        data.splice(-1,1);
        
        console.log(data);
        
        //console.log(data2);

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
                {start: new Date(2010,1,1), end: new Date(2010,12,31)},
                {start: new Date(2012,1,1), end: new Date(2012,12,31)},
                {start: new Date(2014,1,1), end: new Date(2014,12,31)},
            ]
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
            p.ytdQty += p.FY_Year_To_Date__c ? v.Quantity__c : 0;
            p.ytdVal += p.FY_Year_To_Date__c ? v.Value__c : 0;
            p.fullQty += v.Quantity__c;
            p.fullVal += v.Value__c;
            return p;
                
        },
        
        reduceSubtract : function (p, v) {
                
            p.count--;
            p.ytdQty -= p.FY_Year_To_Date__c ? v.Quantity__c : 0;
            p.ytdVal -= p.FY_Year_To_Date__c ? v.Value__c : 0;
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
            .select("Account__r.Name, FY_Is_Year_To_Date__c, FY_Year__c, FY_Month_Num__c, Quantity__c, Value__c")
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
