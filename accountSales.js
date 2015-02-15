(function(salesforceConn, accId) {
    
    $j = jQuery.noConflict();

    //VARS
    var salesforce = {};
    var chart = {};
    var table = {};
    var value = {};
    
    var data = {};
    
    var salesQuery = {
        sObject : 'Daily_Historical_Sales__c',
        select : 'Invoice_Date__c, Fiscal_Year__c, Fiscal_Month__c, Value__c, Net_Value__c, Quantity__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Product__r.Product_Code_Name__c, Product__r.Family, Promotion__r.Name',
        where : 'Account__r.Id = ' + "'" + accId + "'",
        maxfetch : 100000
    }
        
    var forecastQuery = {
        sObject : 'Forecast2__c',
        select : 'Fiscal_Year__c, Fiscal_Month__c, Gross_Value__c, Net_Value__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Forecast_Brand__c, Forecast_Type__c',
        where : 'Account__r.Id = ' + "'" + accId + "'",
        maxfetch : 100000
    }
    
    Q.allSettled([new soql(salesQuery), new soql(forecastQuery)]).spread(function (resSales, resForecast) {
        
        data.sales = resSales.value;
        data.forecast = resForecast.value;
        
        console.log(data);
        
        grossTable();
        
    }).done();
        
    function grossTable() {
        
        var source = [
            {month : 1, sales : 0, budget : 0, target : 0, last : 0},
            {month : 2, sales : 0, budget : 0, target : 0, last : 0},
            {month : 3, sales : 0, budget : 0, target : 0, last : 0},
            {month : 4, sales : 0, budget : 0, target : 0, last : 0},
            {month : 5, sales : 0, budget : 0, target : 0, last : 0},
            {month : 6, sales : 0, budget : 0, target : 0, last : 0},
            {month : 7, sales : 0, budget : 0, target : 0, last : 0},
            {month : 8, sales : 0, budget : 0, target : 0, last : 0},
            {month : 9, sales : 0, budget : 0, target : 0, last : 0},
            {month : 10, sales : 0, budget : 0, target : 0, last : 0},
            {month : 11, sales : 0, budget : 0, target : 0, last : 0},
            {month : 12, sales : 0, budget : 0, target : 0, last : 0}
        ];
        
        _.each(source, function(d) {
            d.sales = d3.sum(data.sales, function(s) { 
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == 2015 ? s.Value__c : 0; 
            });
            d.budget = d3.sum(data.forecast, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == 2015 && s.Forecast_Type__c == 'Budget' ? s.Gross_Value__c : 0; 
            });
            d.target = d3.sum(data.forecast, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == 2015 && (s.Forecast_Type__c == 'Budget' || s.Forecast_Type__c == 'Target')? s.Gross_Value__c : 0;
            });
            d.last = d3.sum(data.sales, function(s) {
                return s.Fiscal_Month__c == d.month && s.Fiscal_Year__c == 2014 ? s.Value__c : 0;
            });
        });
        
        console.log(source);
    }


    function soql(query) {
            
        this.query = query;
        
        var deferred = Q.defer();
                
        var records = [];
                
        salesforceConn.sobject(this.query.sObject)
            .select(this.query.select)
            .where(this.query.where)
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
        
    }
    
    var crossfilter = function(records) {
    
        this.crossfilter = new crossfilter(records);
        this.dims = {};
        this.groups = {};
        this.values = {};
    
    }
        
    //}
        


})(conn, accId);
