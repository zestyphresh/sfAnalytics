(function(conn, promo) {
    
    $j = jQuery.noConflict();
    
     //PRIVATE VARS
    var _data = crossfilter();
            
    //PUBLIC VARS   
    var dims = {}, groups = {};
    var charts = {}, tables = {};
    var values = {};
    
    getData()
        .then(function(result) { 
            
            _data.add(result);
            
            dims.dummy = _data.dimension(function(d) { return 'all'; });
            dims.salesperson = _data.dimension(function(d) { return d.Salesperson__r.Name; });
            dims.week = _data.dimension(function(d) { return moment(d.Invoice_Date__c).startOf('week'); });
            dims.product = _data.dimension(function(d) { return d.Product__r.Product_Code_Name__c; });
            
            groups.salespersonValue = dims.salesperson.group().reduceSum(function(d) { return d.Value__c.toFixed(0); });
            groups.weeklyValue = dims.week.group().reduceSum(function(d) { return d.Value__c.toFixed(0); });
            groups.productMatrix = dims.product.group().reduce(productMatrix.reduceAdd, productMatrix.reduceSubract, productMatrix.reduceInit);
            
            values.sales = dims.dummy.group().reduceSum(function(d) { return d.Value__c; });
            values.volume = dims.dummy.group().reduceSum(function(d) { return d.Quantity__c; });

            values.totalSales();
            values.totalVolumes();
            charts.salesperson();
            charts.weekly();
            tables.product();
            

        })
        .done();
        
    values.totalSales = function() {
        
        var data = dims.dummy.group().reduceSum(function(d) { return d.Value__c; }).top(1)[0];
        console.log(data);
        
        $j('#headline-value').text(accounting.formatMoney(data.value, "£", 0, ",", "."));
        
    };
    
    values.totalVolumes = function() {
        
        var data = dims.dummy.group().reduceSum(function(d) { return d.Quantity__c; }).top(1)[0];
        console.log(data);
        
        $j('#headline-volume').text(accounting.formatNumber(data.value, 0, ",", "."));
        
    };
        
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
        ;
        
        var datum = [{ key: 'sales', values: data }]
        
        d3.select('#chart-weekly')
            .datum(data)
            .call(chart)
        ;
           
    };
    
    tables.product = function() {
        
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

    var productMatrix = {
        
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
        
    function getData() {

        var deferred = Q.defer();
        
        var records = [];

        conn.sobject("Daily_Historical_Sales__c")
            .select("Salesperson__r.Name, Account__r.Name, Quantity__c, Value__c, Invoice_Date__c, Product__r.Product_Code_Name__c")
            .where("Promotion__r.Id = " + "'" + promo + "'")
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

})(conn, promo);
