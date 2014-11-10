(function(conn, projectId) {
    
    $j = jQuery.noConflict();
    
    getData()
        .then(function(result) { 
            
            createTable('codes', result);
            
        })
        .done()
        
    function getData() {

        var deferred = Q.defer();
        
        var records = [];

        conn.sobject("Product2")
            .select("Part_Code__c, Name, Retail_Barcode__c, Retail_Barcode_Format__c, Retail_Barcode_Number__c, Inner_Transit_Barcode__c, Inner_Transit_Barcode_Format__c, Inner_Transit_Barcode_Number__c, " +
                     "Outer_Transit_Barcode__c, Outer_Transit_Barcode_Format__c, Outer_Transit_Barcode_Number__c")
            .where("Project__c = " + "'" + projectId + "'")
            .on('record', function(record) {
                records.push(record);
            })
            .on('error', function(query) {
                deferred.reject('error');
            })
            .on('end', function(err) {
                deferred.resolve(records);
            })
            .run({ autoFetch : true, maxFetch : 100 });

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

        var table = $j('#' + id).DataTable({
            'data' : data,
            'paging' : false,
            'info' : false, 
            'searching' : false,
            'orderable' : false,
            'columns' : _columns,
            'columnDefs' : [
            ],
            'footerCallback' : function (tfoot, data, start, end, display) {
            }
        });
    }

})(conn, projectId);