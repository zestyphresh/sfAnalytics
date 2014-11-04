(function(conn) {
    
    $j = jQuery.noConflict();
    
    var dims = {}, groups = {};
    var data = crossfilter();
    
    fetch()
        .then(function(result) { 
            
            data.add(result);
            dims.dummy = data.dimension(function(d) { return 'all'; });
            dims.subSector = data.dimension(function(d) { return d.subSector; });
            groups.dummy = dims.dummy.group().reduce(reduceAdd, reduceSubtract, reduceInitialise);
            groups.subSector = dims.subSector.group().reduce(reduceAdd, reduceSubtract, reduceInitialise);
            createTable('tableytd', groups.subSector.all(), groups.dummy.all()[0]);
            
        })
        .done()
        
    fetch2()
        .then(function(result) { 
            
            data.add(result);
            dims.dummy = data.dimension(function(d) { return 'all'; });
            dims.subSector = data.dimension(function(d) { return d.subSector; });
            groups.dummy = dims.dummy.group().reduce(reduceAdd, reduceSubtract, reduceInitialise);
            groups.subSector = dims.subSector.group().reduce(reduceAdd, reduceSubtract, reduceInitialise);
            createTable('tablelp', groups.subSector.all(), groups.dummy.all()[0]);
            
        })
        .done()
  
    function fetch() {
        
        console.log('fetch');

        var deferred = Q.defer();
        
        var records = [];

        conn.sobject("Account")
            .select("Sub_Sector__c, Sales_Year_To_Date__c, Budget_Year_To_Date__c, Target_Year_To_Date__c, Sales_Previous_Year_To_Date__c")
            .where("Sub_Sector__c IN ('Commercial', 'Hardware Wholesale', 'Independent Hardware Retailers', 'Independent Merchants', 'Independent Retail Showrooms'," +
                   "'Independent Web Sales', 'Ireland', 'National Merchant Groups', 'Trade Distributor')")
            .on('record', function(record) {
                records.push({
                    'subSector' : record.Sub_Sector__c,
                    'netSales' : record.Sales_Year_To_Date__c,
                    'budget' : record.Budget_Year_To_Date__c,
                    'target' : record.Target_Year_To_Date__c,
                    'last' : record.Sales_Previous_Year_To_Date__c
                });
            })
            .on('error', function(query) {
                deferred.reject('error');
            })
            .on('end', function(err) {
                deferred.resolve(records);
            })
            .run({ autoFetch : true, maxFetch : 15000 });

        return deferred.promise;

    }
    
    function fetch2() {
        
        console.log('fetch');

        var deferred = Q.defer();
        
        var records = [];

        conn.sobject("Account")
            .select("Sub_Sector__c, Sales_Last_Period__c, Budget_Last_Period__c, Target_Last_Period__c, Sales_Previous_Year_Last_Period__c")
            .where("Sub_Sector__c IN ('Commercial', 'Hardware Wholesale', 'Independent Hardware Retailers', 'Independent Merchants', 'Independent Retail Showrooms'," +
                   "'Independent Web Sales', 'Ireland', 'National Merchant Groups', 'Trade Distributor')")
            .on('record', function(record) {
                records.push({
                    'subSector' : record.Sub_Sector__c,
                    'netSales' : record.Sales_Last_Period__c,
                    'budget' : record.Budget_Last_Period__c,
                    'target' : record.Target_Last_Period__c,
                    'last' : record.Sales_Previous_Year_Last_Period__c
                });
            })
            .on('error', function(query) {
                deferred.reject('error');
            })
            .on('end', function(err) {
                deferred.resolve(records);
            })
            .run({ autoFetch : true, maxFetch : 15000 });

        return deferred.promise;

    }
    
                //Grouping Products By Sub Sector
            function reduceAdd(p, v) {
                
                p.count++;
                p.netSales += v.netSales;
                p.budget += v.budget;
                p.target += v.target;
                p.last += v.last;
                
                p.vsBudget = p.netSales - p.budget;
                p.vsTarget = p.netSales - p.target;
                
                p.varBudget = p.netSales === 0 ? 0 : p.vsBudget / p.netSales;
                p.varTarget = p.netSales === 0 ? 0 : p.vsTarget / p.netSales;
                p.varLast = p.netSales === 0 ? 0 : (p.netSales - p.last) / p.netSales;
                
                return p;
                
            }
            
            function reduceSubtract(p, v) {
                
                p.count--;
                p.netSales -= v.netSales;
                p.budget -= v.budget;
                p.target -= v.target;
                p.last -= v.last;
                
                p.vsBudget = p.netSales - p.budget;
                p.vsTarget = p.netSales - p.target;
                
                p.varBudget = p.netSales === 0 ? 0 : p.vsBudget / p.netSales;
                p.varTarget = p.netSales === 0 ? 0 : p.vsTarget / p.netSales;
                p.varLast = p.netSales === 0 ? 0 : (p.netSales - p.last) / p.netSales;
                
                return p;
                
            }
            
            function reduceInitialise() {
                return {'count' : 0, 'netSales' : 0, 'budget' : 0, 'vsBudget': 0, 'varBudget': 0, 'target': 0, 
                        'vsTarget' : 0, 'varTarget': 0, 'last': 0, 'varlast': 0};
            }
    
    function createTable(id, data, total) {

        var _columns = [{"data": "key", "title": "Sub Sector"},
                        {"data": "value.netSales", "title": "Net Sales"}, 
                        {"data": "value.budget", "title": "Budget"},                
                        {"data": "value.vsBudget", "title": "Var £"},                    
                        {"data": "value.varBudget", "title": "Var %"},                
                        {"data": "value.target", "title": "Target"},                      
                        {"data": "value.vsTarget", "title": "Var £"},        
                        {"data": "value.varTarget", "title": "Var %"},
                        {"data": "value.last", "title": "Last Year"},                      
                        {"data": "value.varLast", "title": "Var %"},   
        ];

        var table = $j('#' + id).DataTable({
            'data' : data,
            'paging' : false,
            'info' : false, 
            'searching' : false,
            'orderable' : false,
            'columns' : _columns,
            'columnDefs' : [{ 
                                'targets' : [1,2,3,5,6,8], 
                                'render' : function ( data, type, row, meta ) {
                                    switch (type) {
                                        case 'display':
                                            return accounting.formatMoney(data, "£", 0, ".", ",");
                                            break;
                                    }

                                    return data;
                                },
                                'className' : 'text-right'
                            },
                            { 
                                'targets' : [4,7,9], 
                                'render' : function ( data, type, row, meta ) {
                                    switch (type) {
                                        case 'display':
                                            return accounting.formatNumber(data*100, 0, ",") + "%";
                                            break;
                                    }

                                    return data;
                                },
                                'className' : 'text-right'
                            }
            ],
            'footerCallback' : function (tfoot, data, start, end, display) {
                var api = this.api();

                $j(api.column(0).footer()).html('Total');
                $j(api.column(1).footer()).html(accounting.formatMoney(total.value.netSales, "£", 0, ".", ","));
                $j(api.column(2).footer()).html(accounting.formatMoney(total.value.budget, "£", 0, ".", ","));              
                $j(api.column(3).footer()).html(accounting.formatMoney(total.value.vsBudget, "£", 0, ".", ","));
                $j(api.column(4).footer()).html(accounting.formatNumber(total.value.varBudget*100, 0, ",") + "%");
                $j(api.column(5).footer()).html(accounting.formatMoney(total.value.target, "£", 0, ".", ","));
                $j(api.column(6).footer()).html(accounting.formatMoney(total.value.vsTarget, "£", 0, ".", ","));
                $j(api.column(7).footer()).html(accounting.formatNumber(total.value.varTarget*100, 0, ",") + "%");
                $j(api.column(8).footer()).html(accounting.formatMoney(total.value.last, "£", 0, ".", ","));
                $j(api.column(9).footer()).html(accounting.formatNumber(total.value.varLast*100, 0, ",") + "%");
            }
        });
    }

})(conn);