(function(conn, projectId) {
    
    $j = jQuery.noConflict();
    
    getData()
        .then(function(result) { 
            
            console.log(result);
            
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

        var table = $j('#' + id).dataTable({
            'data' : data,
            'paging' : false,
            "scrollX": true,
            'columns' : _columns,
            'columnDefs' : [
                { "width": "9%", "targets": [0,1,2,3,4,5,6,7,8,9,10] }
            ],
        });
    }

})(conn, projectId);

        // var table = $j('#' + id).dataTable({
        //     'data' : data,
        //     "autoWidth": false,
        //     'paging' : false,
        //     'info' : false,
        //     "scrollY": "600px",
        //     "scrollX": "100%",
        //     "scrollCollapse": true,
        //     'searching' : false,
        //     'orderable' : false,
        //     'dom': 'T<"clear">lfrtip',
        //     'tableTools': {
        //         'sSwfPath': "{!URLFOR($Resource.js_datatables, 'datatables/1.10.4/extensions/TableTools/swf/copy_csv_xls_pdf.swf')}"
        //     },
        //     'columns' : _columns,
        //     'columnDefs' : [
        //         { "width": "9%", "targets": [0,1,2,3,4,5,6,7,8,9,10] }
        //     ],
        //     'footerCallback' : function (tfoot, data, start, end, display) {
        //     }
        // });