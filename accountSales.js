(function(salesforceConn, accId) {
    
    $j = jQuery.noConflict();
    
    //VARS
    var salesforce = {};
    var chart = {};
    var table = {};
    var value = {};
    
    Q.all(sales.getRecords(), forecast.getRecords()).then(function(resSales, resForecast) {
        
        sales.loadRecords(resSales);
        forecast.loadRecords(resSales);

        value.totalSales();
        value.totalVolumes();
        chart.salesperson();
        chart.weekly();
        table.product();

    }).done();
    
    var sales = {
        
        query : {
            sObject : 'Daily_Historical_Sales__c',
            select : 'Invoice_Date__c, Fiscal_Year__c, Fiscal_Month__c, Value__c, Net_Value__c, Quantity__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Product__r.Product_Code_Name__c, Product__r.Family, Promotion__r.Name',
            where : 'Account__r.Id = ' + "'" + accId + "'",
            maxfetch : 100000
        },
        
        crossfilter : {
            records : crossfilter(),
            dims : {},
            groups : {},
            value : {},
        },
        
        getRecords : _.bind(utils.get, this),
        
        loadRecords : _.bind(utils.init, this)
        
    }
    
    var forecast = {
        
        query : {
            sObject : 'Forecast2__c',
            select : 'Fiscal_Year__c, Fiscal_Month__c, Value__c, Net_Value__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Forecast_Brand__c, Forecast_Type__c"',
            where : 'Account__r.Id = ' + "'" + accId + "'",
            maxfetch : 100000
        },
        
        crossfilter : {
            records : crossfilter(),
            dims : {},
            groups : {},
            value : {},
        },
        
        getRecords : _.bind(utils.get, this),
        
        loadRecords : _.bind(utils.init, this)
        
    }
    
    
    
    
    
    
    
    
    
    
    
    
    value.totalSales = function() {
        
        var data = dims.dummy.group().reduceSum(function(d) { return d.Value__c; }).top(1)[0];
        console.log(data);
        
        $j('#headline-value').text(accounting.formatMoney(data.value, "£", 0, ",", "."));
        
    };
    
    value.totalVolumes = function() {
        
        var data = dims.dummy.group().reduceSum(function(d) { return d.Quantity__c; }).top(1)[0];
        console.log(data);
        
        $j('#headline-volume').text(accounting.formatNumber(data.value, 0, ",", "."));
        
    };
        
    chart.salesperson = function() {
        
        var data = _.sortBy(groups.salespersonValue.top(Infinity), function(d) { return d.value; });
        console.log(data);

        var chart = d4.charts.row()
            .outerHeight($j('#chart-salesperson').height())
            .outerWidth($j('#chart-salesperson').width())
            .margin({ top: 10, right: 50, bottom: 20, left: 140 })
            .x(function(x){
                x.key('value');
            })
            .y(function(y){
                y.key('key');
            })
            .valueKey('value')
            .mixout(['xAxis'])
            .using('barLabels', function(labels) {
                labels.text(function(d) {
                    return accounting.formatMoney(d.value, "£", 0, ",", ".")
                })
            })
        ;

        d3.select('#chart-salesperson')
            .datum(data)
            .call(chart)
        ;

    };
    
    chart.weekly = function() {
        
        var data = _.sortBy(groups.weeklyValue.orderNatural().top(Infinity), function(d) { return d.key.toDate(); });
        
        
        _.each(data, function(d) { d.key = d.key.format('MMM DD'); });
        
        console.log(data);

        var chart = d4.charts.column()
            .outerHeight($j('#chart-weekly').height())
            .outerWidth($j('#chart-weekly').width())
            .margin({ top: 10, right: 10, bottom: 20, left: 20 })
            .x(function(x){
                x.key('key');
            })
            .y(function(y){
                y.key('value');
            })
            .valueKey('value')
            .mixout('yAxis')
            .using('barLabels', function(labels) {
                labels.text(function(d) {
                    return accounting.formatMoney(d.value, "£", 0, ",", ".")
                })
            })
        ;
        
        var datum = [{ key: 'sales', values: data }]
        
        d3.select('#chart-weekly')
            .datum(data)
            .call(chart)
        ;
           
    };
    
    table.product = function() {
        
        var data = _.sortBy(groups.productMatrix.top(Infinity), function(d) { return d.value.total; });
        console.log(data);
      
        var _columns = [{"data": "key", "title": "Product"},
                        {"data": "value.total", "title": "Total"},
                        {"data": "value.SteveGent", "title": "SG"},
                        {"data": "value.MarkPugh", "title": "MP"}, 
                        {"data": "value.BrianMurphy", "title": "BM"},                
                        {"data": "value.StevenHooper", "title": "SH"},                    
                        {"data": "value.TracyBoorman", "title": "TB"},                
                        {"data": "value.PhilLacy", "title": "PL"},                      
                        {"data": "value.BrianRobertson", "title": "BR"},        
                        {"data": "value.NorrieCurrie", "title": "NC"},
                        {"data": "value.MatthewKettleborough", "title": "MK"}
        ];

        var table = $j('#table-matrix').dataTable({
            'data' : data,
            'paging' : true,
            'order': [[ 1, 'desc' ]],
            'dom' : 'ftip',
            'columns' : _columns,
            'columnDefs' : [
                { "width": "40%", "targets": 0 }
            ]
        });
        
    };

    cf.reduce = {};
    cf.reduce.productMatrix = {
        
        reduceAdd : function (p, v) {

            p.count++;
            p.total += v.Quantity__c;
            p[v.Salesperson__r.Name.replace(/\s/g, "")] += v.Quantity__c;
            return p;
                
        },
        
        reduceSubtract : function (p, v) {
                
            p.count--;
            p.total -= v.Quantity__c;
            p[v.Salesperson__r.Name.replace(/\s/g, "")] -= v.Quantity__c;
            return p;
                
        },
            
        reduceInit : function () {
            return {'count' : 0, 'total' : 0, 'SteveGent' : 0, 'MarkPugh' : 0, 'BrianMurphy': 0, 'StevenHooper': 0, 'TracyBoorman': 0, 
                    'PhilLacy' : 0, 'BrianRobertson': 0, 'NorrieCurrie': 0, 'MatthewKettleborough': 0};
        }
    };   
    
    
    //Common Functions
    var utils = {};
    
    utils.get = function() {
        
        var deferred = Q.defer();
            
        var records = [];
            
        salesforceConn.sobject(this.query.sObject)
            .select(thisquery..select)
            .where(thisquery..where)
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
            
    };
    
    utils.init = function(result) {
        
        this.crossfilter.records.add(result); 
        
    };
        


})(conn, promo);
