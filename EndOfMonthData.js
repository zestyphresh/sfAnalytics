(function(soql) {
    
    $j = jQuery.noConflict();
        
    var thisYear = 2015,
        lastYear = 2014;
    
    var orgId = '00Db0000000ZVQP';

    var accountQuery = {
        sObject : 'Account',
        select : 'Id, Owner.Name, Account_Code__c, Name, Parent_Name__c, Group_Name__c, Sub_Sector__c, NMBS_Member__c',
        where : 'Sector__c != ' + "'" + 'Other' + "'",
        maxfetch : 20000
    };
    
    var salesQuery = {
        sObject : 'Daily_Historical_Sales__c',
        select : 'Account__r.Id, Fiscal_Year__c, Net_Value__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c',
        where : 'Fiscal_Year__c >= 2014',
        maxfetch : 200000
    };
        
    var forecastQuery = {
        sObject : 'Forecast2__c',
        select : 'Account__r.Id, Fiscal_Year__c, Net_Value__c, Is_Fiscal_Year_To_Date__c, Is_Fiscal_Last_Period__c, Forecast_Type__c',
        where : 'Fiscal_Year__c = 2015',
        maxfetch : 200000
    };
    
    var dateQuery = {
        sObject : 'FY_Settings__c',
        select : 'PeriodNum__c, PeriodYear__c',
        where : 'SetupOwnerId = ' + "'" + orgId + "'",
        maxfetch : 10
    };

    Q.allSettled([new soql.multipart(accountQuery), new soql.multipart(salesQuery), new soql.multipart(forecastQuery), new soql.multipart(dateQuery)]).spread(function (resAccount, resSales, resForecast, resDate) {
        
        var result = resAccount.value;
        var sales = resSales.value;
        var forecast = resForecast.value;
        var fiscal = resDate.value[0];
        
        _.each(result, function(acc) {

            acc.sales = d3.sum(sales, function(s) { return s.Account__r.Id == acc.Id && s.Fiscal_Year__c == 2015 && s.Is_Fiscal_Year_To_Date__c == true ? s.Net_Value__c : 0; })
            acc.last = d3.sum(sales, function(s) { return s.Account__r.Id == acc.Id && s.Fiscal_Year__c == 2014 && s.Is_Fiscal_Year_To_Date__c == true ? s.Net_Value__c : 0; })
            acc.budget = d3.sum(forecast, function(s) { return s.Account__r.Id == acc.Id && s.Fiscal_Year__c == 2015 && s.Is_Fiscal_Year_To_Date__c == true && s.Forecast_Type__c == 'Budget' ? s.Net_Value__c : 0; })
            acc.target = d3.sum(forecast, function(s) { return s.Account__r.Id == acc.Id && s.Fiscal_Year__c == 2015 && s.Is_Fiscal_Year_To_Date__c == true && (s.Forecast_Type__c == 'Budget' || s.Forecast_Type__c == 'Target') ? s.Net_Value__c : 0; })
            
            acc.salesL = d3.sum(sales, function(s) { return s.Account__r.Id == acc.Id && s.Fiscal_Year__c == 2015 && s.Is_Fiscal_Last_Period__c == true ? s.Net_Value__c : 0; })
            acc.lastL = d3.sum(sales, function(s) { return s.Account__r.Id == acc.Id && s.Fiscal_Year__c == 2014 && s.Is_Fiscal_Last_Period__c == true ? s.Net_Value__c : 0; })
            acc.budgetL = d3.sum(forecast, function(s) { return s.Account__r.Id == acc.Id && s.Fiscal_Year__c == 2015 && s.Is_Fiscal_Last_Period__c == true && s.Forecast_Type__c == 'Budget' ? s.Net_Value__c : 0; })
            acc.targetL = d3.sum(forecast, function(s) { return s.Account__r.Id == acc.Id && s.Fiscal_Year__c == 2015 && s.Is_Fiscal_Last_Period__c == true && (s.Forecast_Type__c == 'Budget' || s.Forecast_Type__c == 'Target') ? s.Net_Value__c : 0; })
        
        })

        var tableCols = [
            {"data": "Id", "title": "Id"},
            {"data": "Owner.Name", "title": "Owner"},
            {"data": "Account_Code__c", "title": "Code"},
            {"data": "Name", "title": "Name"},
            {"data": "Parent_Name__c", "title": "Parent"},
            {"data": "Group_Name__c", "title": "Group"},
            {"data": "Sub_Sector__c", "title": "Sector"},
            {"data": "sales", "title": "Sales"},
            {"data": "budget", "title": "Budget"},
            {"data": "target", "title": "Target"},
            {"data": "last", "title": "Last"},
            {"data": "salesL", "title": "SalesL"},
            {"data": "budgetL", "title": "BudgetL"},
            {"data": "targetL", "title": "TargetL"},
            {"data": "lastL", "title": "LastL"},
            {"data": "NMBS_Member__c", "title": "NMBS"}
        ];
        
        var table = $j('#table').dataTable({
            'data' : result,
            'paging' : false,
            'ordering' : false,
            "order": [],
            'dom' : 't',
            'columns' : tableCols
        });
        
    }).done();

})(SOQL);