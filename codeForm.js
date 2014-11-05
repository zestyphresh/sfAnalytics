(function(conn, projectId) {
    
    $j = jQuery.noConflict();
    
    getData()
        .then(function(result) { 
            
            console.log(result);
            
        })
        .done()
        
    function getData() {
        
        console.log(projectId);

        var deferred = Q.defer();
        
        var records = [];

        conn.sobject("Product2")
            .select("Part_Code__c, Name, Retail_Barcode__c, Retail_Barcode_Format__c, Retail_Barcode_Number__c, Inner Transit_Barcode__c, Inner Transit_Barcode_Format__c, Inner Transit_Barcode_Number__c, " +
                     "Outer Transit_Barcode__c, Outer Transit_Barcode_Format__c, Outer Transit_Barcode_Number__c")
            .where("Project__c = " + projectId)
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

    function createTable(id, data, total) {

        var _columns = [{"data": "key", "title": "Sub Sector"},
                        {"data": "value.netSales", "title": "Net Sales"}, 
                        {"data": "value.budget", "title": "Budget"},                
                        {"data": "value.vsBudget", "title": "Var £"},                    
                        {"data": "value.varBudget", "title": "Var %"},                
                        {"data": "value.target", "title": "Target"},                      
                        {"data": "value.vsTarget", "title": "Var £"},        
                        {"data": "value.varTarget", "title": "Var %"},
                        {"data": "value.last", "title": "Last Year"},                      
                        {"data": "value.varLast", "title": "Var %"},   
        ];

        var table = $j('#' + id).DataTable({
            'data' : data,
            'paging' : false,
            'info' : false, 
            'searching' : false,
            'orderable' : false,
            'columns' : _columns,
            'columnDefs' : [{ 
                                'targets' : [1,2,3,5,6,8], 
                                'render' : function ( data, type, row, meta ) {
                                    switch (type) {
                                        case 'display':
                                            return accounting.formatMoney(data, "£", 0, ",", ".");
                                            break;
                                    }

                                    return data;
                                },
                                'className' : 'text-right'
                            },
                            { 
                                'targets' : [4,7,9], 
                                'render' : function ( data, type, row, meta ) {
                                    switch (type) {
                                        case 'display':
                                            return accounting.formatNumber(data*100, 0, ",") + "%";
                                            break;
                                    }

                                    return data;
                                },
                                'className' : 'text-right'
                            }
            ],
            'footerCallback' : function (tfoot, data, start, end, display) {
                var api = this.api();

                $j(api.column(0).footer()).html('Total');
                $j(api.column(1).footer()).html(accounting.formatMoney(total.value.netSales, "£", 0, ".", ","));
                $j(api.column(2).footer()).html(accounting.formatMoney(total.value.budget, "£", 0, ".", ","));              
                $j(api.column(3).footer()).html(accounting.formatMoney(total.value.vsBudget, "£", 0, ".", ","));
                $j(api.column(4).footer()).html(accounting.formatNumber(total.value.varBudget*100, 0, ",") + "%");
                $j(api.column(5).footer()).html(accounting.formatMoney(total.value.target, "£", 0, ".", ","));
                $j(api.column(6).footer()).html(accounting.formatMoney(total.value.vsTarget, "£", 0, ".", ","));
                $j(api.column(7).footer()).html(accounting.formatNumber(total.value.varTarget*100, 0, ",") + "%");
                $j(api.column(8).footer()).html(accounting.formatMoney(total.value.last, "£", 0, ".", ","));
                $j(api.column(9).footer()).html(accounting.formatNumber(total.value.varLast*100, 0, ",") + "%");
            }
        });
    }

})(conn, projectId);