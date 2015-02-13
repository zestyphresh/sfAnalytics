(function(salesforceConn, accId) {
    
    $j = jQuery.noConflict();

    //VARS
    var salesforce = {};
    var chart = {};
    var table = {};
    var value = {};
    
    var salesQuery = {
        sObject : 'Daily_Historical_Sales__c',
        select : 'Invoice_Date__c, Fiscal_Year__c, Fiscal_Month__c, Value__c, Net_Value__c, Quantity__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Product__r.Product_Code_Name__c, Product__r.Family, Promotion__r.Name',
        where : 'Account__r.Id = ' + "'" + accId + "'",
        maxfetch : 100000
    }
        
    var forecastQuery = {
        sObject : 'Forecast2__c',
        select : 'Fiscal_Year__c, Fiscal_Month__c, Value__c, Net_Value__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Forecast_Brand__c, Forecast_Type__c"',
        where : 'Account__r.Id = ' + "'" + accId + "'",
        maxfetch : 100000
    }
        
    Q.all( new soql(salesQuery), new soql(forecastQuery) ).then(function(resSales, resForecast) {
        
        console.log(resSales, resForecast);
        
        //init.apply(sales, resSales);
        //init.apply(forecast, resForecast);

    }).done();

    //var utils = function() {
        
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
    
        var init = function(result) {
        
            this.crossfilter.records.add(result); 
        
        }
        
    //}
        


})(conn, accId);
