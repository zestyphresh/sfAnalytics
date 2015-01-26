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
            
            //groups.salespersonValue = dims.salesperson.group().reduceSum(function(d) { return d.Value__c.toFixed(0); });
            //groups.weeklyValue = dims.week.group().reduceSum(function(d) { return d.Value__c.toFixed(0); });
            groups.yearlySales = dims.year.group().reduce(yearlySalesMatrix.reduceAdd, yearlySalesMatrix.reduceSubract, yearlySalesMatrix.reduceInit);
            
            //values.sales = dims.dummy.group().reduceSum(function(d) { return d.Value__c; });
            //values.volume = dims.dummy.group().reduceSum(function(d) { return d.Quantity__c; });

            //values.totalSales();
            //values.totalVolumes();
            //charts.salesperson();
            //charts.weekly();
            tables.yearlySales();
            

        })
        .done();

    charts.salesperson = function() {
        
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
    
    charts.weekly = function() {
        
        var data = _.sortBy(groups.weeklyValue.orderNatural().top(Infinity), function(d) { return d.key.toDate(); });
        
        
        _.each(data, function(d) { d.key = d.key.format('MMM DD'); });
        
        console.log(data);

        //var minDate = moment(_.min(data, 'key').key).subtract(7, 'days').toDate();
        //var maxDate = moment(_.max(data, 'key').key).add(7, 'days').toDate();
        
        var chart = d4.charts.column()
            .outerHeight($j('#chart-weekly').height())
            .outerWidth($j('#chart-weekly').width())
            .margin({ top: 10, right: 10, bottom: 20, left: 20 })
            .x(function(x){
                //x.scale('time');
                //x.min(minDate);
                //x.max(maxDate)
                x.key('key');
            })
            .y(function(y){
                y.key('value');
            })
            .valueKey('value')
            //.using('yAxis', function(axis) {
            //    axis.ticks(d3.time.weeks, 1); 
            //})
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
    
    tables.yearlySales = function() {
        
        var data = _.sortBy(groups.yearlySales.top(Infinity), function(d) { return d.key; });
        console.log(data);
      
        var _columns = [{"data": "key", "title": "Year"},
                        {"data": "value.ytdQty", "title": "YTD Quantity"},
                        {"data": "value.ytdVal", "title": "YTD Value"},
                        {"data": "value.fullQty", "title": "Full Year Quantity"}, 
                        {"data": "value.fullVal", "title": "Full Year Value"}

        ];

        var table = $j('#table-matrix').dataTable({
            'data' : data,
            'paging' : false,
            'order': [[0, 'asc' ]],
            'dom' : 'ftip',
            'columns' : _columns,
            'columnDefs' : [
                { "width": "40%", "targets": 0 }
            ]
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
