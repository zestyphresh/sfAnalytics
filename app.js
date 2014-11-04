(function(conn) {
    
    $j = jQuery.noConflict();
    
    var dims = {}, groups = {};
    var data = crossfilter();
    
    fetch()
        .then(function(result) { 
            
            console.log(result);
            data.add(result);
            dims.subSector = data.dimension(function(d) { return d.subSector; });
            groups.subSector = dims.subSector.group().reduce(reduceAddBySubSector, reduceSubtractBySubSector, reduceInitialiseBySubSector);
            console.log(groups.subSector.all());
            
            //Grouping Products By Sub Sector
            function reduceAddBySubSector(p, v) {
                
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
            
            function reduceSubtractBySubSector(p, v) {
                
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
            
            function reduceInitialiseBySubSector() {
                return {'count' : 0, 'netSales' : 0, 'budget' : 0, 'vsBudget': 0, 'varBudget': 0, 'target': 0, 
                        'vsTarget' : 0, 'varTarget': 0, 'last': 0, 'varlast': 0};
            }
            
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

})(conn);