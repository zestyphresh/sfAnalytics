(function(salesforceConn, accId) {
    
    $j = jQuery.noConflict();
    
    //VARS
    var salesforce = {};
    var chart = {};
    var table = {};
    var value = {};
    
    Q.all(utils.get.call(sales), utils.get.call(forecast)).then(function(resSales, resForecast) {
        
        utils.init.apply(sales, resSales);
        utils.init.apply(forecast, resForecast);

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
        }

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
        }

    }

    //Common Functions
    var utils = {};
    
    utils.get = function() {
        
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
            
    };
    
    utils.init = function(result) {
        
        this.crossfilter.records.add(result); 
        
    };
        


})(conn, accId);
