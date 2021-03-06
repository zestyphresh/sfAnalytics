(function(conn, projectId, swf) {
    
    $j = jQuery.noConflict();
    
    getData()
        .then(function(result) { 
            
            console.log(result);
            
            createTable('codes', result);
            
        })
        .done();
        
    function getData() {

        var deferred = Q.defer();
        
        var records = [];

        conn.sobject("Product2")
            .select("Part_Code__c, Long_Name__c, Name, Retail_Barcode__c, Retail_Barcode_Format__c, Retail_Barcode_Number__c, Inner_Transit_Barcode__c, Inner_Transit_Barcode_Format__c, Inner_Transit_Barcode_Number__c, " +
                    "Inner_Transit_Quantity__c, Outer_Transit_Barcode__c, Outer_Transit_Barcode_Format__c, Outer_Transit_Barcode_Number__c, Outer_Transit_Quantity__c, " +
                    "Vendor__r.Vendor_Code_And_Name__c, Family, Mkt_Group__c, Retail_Packaging_Brand__c, Commodity_Code__c")
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
        
        _.each(data, function(d) {
            
            d.Retail_Barcode__c = d.Retail_Barcode__c ? "P" : "O";
            d.Inner_Transit_Barcode__c = d.Inner_Transit_Barcode__c ? "P" : "O";
            d.Outer_Transit_Barcode__c = d.Outer_Transit_Barcode__c ? "P" : "O";
            
        });

        var _columns = [{"data": "Part_Code__c", "title": "Code"},
                        {"data": "Long_Name__c", "title": "Description"},
                        {"data": "Name", "title": "QAD Description"}, 
                        {"data": "Retail_Barcode__c", "title": "Retail Barcode Required"},                
                        {"data": "Retail_Barcode_Format__c", "title": "Retail Barcode Format"},                    
                        {"data": "Retail_Barcode_Number__c", "title": "Retail Barcode Number"},                
                        {"data": "Inner_Transit_Barcode__c", "title": "Inner Transit Barcode Required"},                      
                        {"data": "Inner_Transit_Barcode_Format__c", "title": "Inner Transit Barcode Format"},        
                        {"data": "Inner_Transit_Barcode_Number__c", "title": "Inner Transit Barcode Number"},
                        {"data": "Outer_Transit_Barcode__c", "title": "Outer Transit Barcode Required"},                      
                        {"data": "Outer_Transit_Barcode_Format__c", "title": "Outer Transit Barcode Format"},        
                        {"data": "Outer_Transit_Barcode_Number__c", "title": "Outer Transit Barcode Number"},
                        {"data": "Inner_Transit_Quantity__c", "title": "Inner Transit Quantity"},
                        {"data": "Outer_Transit_Quantity__c", "title": "Outer Transit Quantity"},
                        {"data": "Family", "title": "Design Group"},
                        {"data": "Mkt_Group__c", "title": "Market Group"},
                        {"data": "Vendor__r.Vendor_Code_And_Name__c", "title": "Vendor"},
                        {"data": "Retail_Packaging_Brand__c", "title": "Brand"},
                        {"data": "Commodity_Code__c", "title": "Commodity Code"}
        ];

        var table = $j('#' + id).dataTable({
            'data' : data,
            'paging' : false,
            'dom': 'lt<"clear">T',
            'tableTools': {
                "aButtons": [
                    "xls",
                    {
                        "sExtends": "copy",
                        "bHeader": false
                    }
                ],
                'sSwfPath': swf
            },
            'columns' : _columns,
        });

    }

})(conn, projectId, tableToolsSwf);
