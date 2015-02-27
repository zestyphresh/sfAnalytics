var SOQL = (function(conn) {
    
    var module = function () {};

    module.multipart = function(query) {
            
        this.query = query;
        
        var deferred = Q.defer();
                
        var records = [];
                
        conn.sobject(this.query.sObject)
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
    
    return module;
    
}(conn))
