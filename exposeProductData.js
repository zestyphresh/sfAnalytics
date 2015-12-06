(function(soql, projectId) {
    
    $j = jQuery.noConflict();
        
    var orgId = '00Db0000000ZVQP';
        
        //QUERY PARAMETERS
        var query = {};
        
        query.products = {
            sObject : 'Product2',
            select : 'Part_Code__c, Name, Long_Description__c, Vendor__r.Vendor_Name__c, Customer_Code_1_Type__c, Customer_Code_1__c, Customer_Code_2_Type__c, Customer_Code_2__c, Customer_Code_3_Type__c, Customer_Code_3__c, Commodity_Code__c, Instructions__c, Instructions_Format__c, Instructions_Reference__c',
            where : 'Project__r.Id = ' + "'" + projectId + "'",
            maxfetch : 50000
        };
            
        //GET DATA AND RETURN PROMISES - SO EVERYTHING IN HERE
        var data = {};
    
        Q.allSettled([new soql.multipart(query.products)]).spread(function(products) {
            
            console.log('START - Return Promises');
    
            data.products = products.value;

            console.log('PRODUCT RECORDS', data.products.length);
            
            var processedData = tableData(data.products);

            productTable('#product-table', processedData);

        }).done();
        
        var tableData = function(data) {
            
            var results = [];
            
            _.each(data, function() {
                
                var product = {
                    
                    productCode : data.Part_Code__c,
                    qadDescription : data.Name,
                    longDescription : data.Long_Description__c,
                    vendor : data.Vendor__r.Vendor_Name__c,
                    customerCode1 : data.Customer_Code_1_Type__c + ' : ' + data.Customer_Code_1__c,
                    customerCode2 : data.Customer_Code_2_Type__c + ' : ' + data.Customer_Code_2__c,
                    customerCode3 : data.Customer_Code_3_Type__c + ' : ' + data.Customer_Code_3__c,
                    commodityCode : data.Commodity_Code__c,
                    instructions : data.Instructions__c,
                    instructionsFormat : data.Instructions_Format__c,
                    instructionsReference : data.Instructions_Reference__c
                    
                }
                
                results.push(product);   
            
            })
            
            return results;
            
        };
    
        var productTable = function(selector, data) {
            
            console.log('START - FUNCTION - productTable');
            
            var tableCols = [
                {data : 'productCode', title : "Code"},
                {data : 'qadDescription', title : "QAD Desc."},
                {data : 'longDescription', title : "Long Desc."},
                {data : 'vendor', title : "Customer Codes"},
                {data : 'customerCode1', title : "Budget"},
                {data : 'customerCode2', title : "vs Sales"},
                {data : 'customerCode3', title : "Target"},
                {data : 'instructions', title : "vs Sales"},
                {data : 'instructionsFormat', title : "Last Year"},
                {data : 'instructionsReference', title : "vs Sales"}
            ];
            
            var table = $j(selector).dataTable({
                'data' : data,
                'paging' : false,
                'ordering' : false,
                "order": [],
                'dom' : 't',
                'columns' : tableCols
            });
            
        };

})(SOQL, projectId);