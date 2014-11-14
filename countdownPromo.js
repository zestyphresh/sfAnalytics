(function(conn, promo) {
    
    $j = jQuery.noConflict();
    
     //PRIVATE VARS
    var _data = crossfilter();
            
    //PUBLIC VARS   
    var dims = {}, groups = {};
    var charts = {};
    
    getData()
        .then(function(result) { 
            
            _data.add(result);
            
            dims.salesperson = _data.dimension(function(d) { return d.Salesperson__r.Name; });
            dims.week = _data.dimension(function(d) { return moment(d.Invoice_Date__c).startOf('week').format('YYYY-MM-DD'); });
            dims.product = _data.dimension(function(d) { return d.Product__r.Product_Code_Name__c; });
            
            groups.salespersonValue = dims.salesperson.group().reduceSum(function(d) { return d.Value__c; });
            groups.weekValue = dims.salesperson.group().reduceSum(function(d) { return d.Value__c; });
            groups.productMatrix = dims.product.group().reduce(productMatrix.reduceAdd, productMatrix.reduceSubract, productMatrix.reduceInit);
            
            console.log(groups);

            charts.salesperson().draw();
            charts.weekly().draw();

        })
        .done();
        
    charts.salesperson = function() {
        
        $j('#container').append('<div id="chartSalesperson" />');
        
        var svg = dimple.newSvg('#chartSalesperson', '100%', '100%');
            
        var chart = new dimple.chart(svg, groups.salespersonValue.all()).setMargins('120px', '30px', '30px', '30px');
        
        var xAxis = chart.addMeasureAxis('x', 'value');
            xAxis.title = 'Gross Value (£)';
            xAxis.ticks = 5;
            xAxis.tickFormat = '0,f'; 
                        
        var yAxis = chart.addCategoryAxis('y', 'key');
            yAxis.title = null;
            yAxis.addOrderRule('grossValue'); 
        
        var series = chart.addSeries(null, dimple.plot.bar);
            
        series.getTooltipText = function (e) {
            return ['Total Value - ' + numeral(e.cx).format('$0,0')];
        };
        
        function draw() { chart.draw(); }
        
        return { draw : draw };
        
    };
    
    charts.weekly = function() {
        
        $j('#container').append('<div id="chartWeekly" />');
        
        var svg = dimple.newSvg('#chartWeekly', '100%', '100%');
            
        var chart = new dimple.chart(svg, groups.weekValue.all()).setMargins('50px', '30px', '60px', '30px');
        
        var xAxis = chart.addTimeAxis('x', 'key', '%Y-%m-%d', '%Y-%m-%d');
            xAxis.timePeriod = d3.time.weeks;
            xAxis.timeInterval = 1;
                        
        var yAxis = chart.addMeasureAxis('x', 'value');
            yAxis.title = 'Gross Value (£)';
        
        var series = chart.addSeries(null, dimple.plot.bar);
            
        series.getTooltipText = function (e) {
            return ['Total Value - ' + numeral(e.cx).format('$0,0')];
        };
        
        function draw() { chart.draw(); }
        
        return { draw : draw };
        
    };

    var productMatrix = {
        
        reduceAdd : function (p, v) {
                
            p.count++;
            p[v.Salesperson__r.Name] += v.Quantity__c;
            return p;
                
        },
        
        reduceSubtract : function (p, v) {
                
            p.count--;
            p[v.Salesperson__r.Name] -= v.Quantity__c;
            return p;
                
        },
            
        reduceInit : function () {
            return {'count' : 0, 'Steve Gent' : 0, 'Mark Pugh' : 0, 'Brian Murphy': 0, 'Steven Hooper': 0, 'Tracy Boorman': 0, 
                    'Phil Lacy' : 0, 'Brian Robertson': 0, 'Norrie Currie': 0, 'Matthew Kettleborough': 0};
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
            .run({ autoFetch : true, maxFetch : 5000 });

        return deferred.promise;

    }

    function createTable(id, data) {

        var _columns = [{"data": "Part_Code__c", "title": "Code"},
                        {"data": "Name", "title": "QAD Description"}, 
                        {"data": "Retail_Barcode__c", "title": "Retail Barcode Required"},                
                        {"data": "Retail_Barcode_Format__c", "title": "Retail Barcode Format"},                    
                        {"data": "Retail_Barcode_Number__c", "title": "Retail Barcode Number"},                
                        {"data": "Inner_Transit_Barcode__c", "title": "Inner Transit Barcode Required"},                      
                        {"data": "Inner_Transit_Barcode_Format__c", "title": "Inner Transit Barcode Format"},        
                        {"data": "Inner_Transit_Barcode_Number__c", "title": "Inner Transit Barcode Number"},
                        {"data": "Outer_Transit_Barcode__c", "title": "Outer Transit Barcode Required"},                      
                        {"data": "Outer_Transit_Barcode_Format__c", "title": "Outer Transit Barcode Format"},        
                        {"data": "Outer_Transit_Barcode_Number__c", "title": "Outer Transit Barcode Number"}
        ];

        var table = $j('#' + id).dataTable({
            'data' : data,
            'paging' : false,
            'dom': 'lt<"clear">T',
            'tableTools': {
                "aButtons": [
                    "copy",
                    "xls",
                ],
                'sSwfPath': swf
            },
            'columns' : _columns,
        });

    }

})(conn, promo);
