(function(conn) {
    
    $j = jQuery.noConflict();
    
    var dims = {}, groups = {};
    var data = crossfilter();
    
    fetch().then(function(result) { console.log('result'); }).done()
  
    function fetch() {
        
        console.log('fetch');

        var deferred = Q.defer();
        
        var records = [];
        
        conn.sobject("Account")
            .select('Sales_Year_To_Date__c, Budget_Year_To_Date__c, Target_Year_To_Date__c, Sales_Previous_Year_To_Date__c')
            .where('Sub_Sector__c = Commercial')
            .execute({ autoFetch : true, maxFetch : 15000 }, function(err, records) {
                console.log(records);
            });
        
        conn.query('SELECT Name, Parent_Name__c, Group_Name__c, Budget_Owner__c, Sales_Year_To_Date__c, Budget_Year_To_Date__c, Target_Year_To_Date__c FROM Account')
            .on('record', function(record) {
                records.push(record);
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