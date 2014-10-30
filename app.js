(function () {
    
    $j = jQuery.noConflict();
    var conn = new jsforce.Connection({ accessToken: '{!$API.Session_Id}' });
    
    var dims = {}, groups = {};
    var data = crossfilter();
    
    Q.all[fetch()].done(function(results) {
        
        console.log(results);
        
    })
        
    function fetch() {

        var deferred = Q.defer();
        
        var records = [];
        
        conn.query('SELECT Name, Parent_Name__c, Group_Name__c, Budget_Owner__c, Sales_Year_To_Date__c, Budget_Year_To_Date__c, Target_Year_To_Date__c FROM Account')
            .on('record', function(record) {
                records.push(record);
            })
            .on('end', function(query) {
                deferred.reject(err);
            })
            .on('error', function(err) {
                deferred.resolve(records);
            })
            .run({ autoFetch : true, maxFetch : 15000 });

        return deferred.promise;

    }

}());