(function(salesforceConn, accId) {
    
    $j = jQuery.noConflict();
    
    //VARS
    var salesforce = {};
    var data = {};
    var chart = {};
    var table = {};
    var value = {};
    
    salesforce.getSales().then(function(result) { 
            
        cf.init(result);
            
        value.totalSales();
        value.totalVolumes();
        chart.salesperson();
        chart.weekly();
        table.product();

    }).done();
        
    salesforce.getSales = function() {
        
        var deferred = Q.defer();
        
        var records = [];
        
        salesforceConn.sobject("Daily_Historical_Sales__c")
            .select("Invoice_Date__c, Value__c, Quantity__c, FY_Year__c, FY_Month_Num__c, FY_Is_Year_To_Date__c, Product__r.Product_Code_Name__c, Product__r.Family, Promotion__r.Name")
            .where("Account__r.Id = " + "'" + accId + "'")
            .on('record', function(record) {
                records.push(record);
            })
            .on('error', function(query) {
                deferred.reject('error');
            })
            .on('end', function(err) {
                deferred.resolve(records);
            })
            .run({ autoFetch : true, maxFetch : 50000 });
            
        return deferred.promise;
        
    }
    
    data.sales = {};
    data.sales.init = function(records) {
        
        var _this = data.sales;
        
        _this.cf = crossfilter();
        
        _this.cf.add(records);
        
        _this.dim = {};
        _this.dim.dummy = _this.cf.dimension(function(d) { return 'all'; });
        _this.dim.salesperson = _this.cf.data.dimension(function(d) { return d.Salesperson__r.Name; });
        _this.dim.week = _this.cf.data.dimension(function(d) { return moment(d.Invoice_Date__c).startOf('week'); });
        _this.dim.product = _this.cf.data.dimension(function(d) { return d.Product__r.Product_Code_Name__c; });
        
        _this.group = {};    
        _this.group.salespersonValue = _this.dim.salesperson.group().reduceSum(function(d) { return d.Value__c.toFixed(0); });
        _this.group.weeklyValue = _this.dim.week.group().reduceSum(function(d) { return d.Value__c.toFixed(0); });
        _this.group.productMatrix = _this.dim.product.group().reduce(cf.reduce.productMatrix.reduceAdd, cf.reduce.productMatrix.reduceSubract, cf.reduce.productMatrix.reduceInit);
        
        _this.value = {};    
        _this.value.sales = _this.dim.dummy.group().reduceSum(function(d) { return d.Value__c; });
        _this.value.volume = _this.dim.dummy.group().reduceSum(function(d) { return d.Quantity__c; });
        
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
        


})(conn, promo);
