(function(conn, promo) {
    
    $j = jQuery.noConflict();
    
     //PRIVATE VARS
    var _data = crossfilter();
            
    //PUBLIC VARS   
    var dims = {}, groups = {};
    
    getData()
        .then(function(result) { 
            
            _data.add(result);
            
            dims.salesperson = _data.dimension(function(d) { return d.Salesperson__r.Name; });
            dims.week = _data.dimension(function(d) { return moment(d.Invoice_Date__c).startOf('week').format('YYYY-MM-DD'); });
            
            groups.salespersonValue = dims.salesperson.group().reduceSum(function(d) { return d.Value__c; });
            
            console.log(groups.salespersonValue.all());
            
        })
        .done();
        
    function getData() {

        var deferred = Q.defer();
        
        var records = [];

        conn.sobject("Daily_Historical_Sales__c")
            .select("Salesperson__r.Name, Account__r.Name, Quantity__c, Value__c, Invoice_Date__c, Product__r.Product_Code_Name__c")
            .where("Promotion__r.Id = " + "'" + promo + "'")
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
            'dom': 'lt<"clear">T',
            'tableTools': {
                "aButtons": [
                    "copy",
                    "xls",
                ],
                'sSwfPath': swf
            },
            'columns' : _columns,
        });

    }

})(conn, promo);
