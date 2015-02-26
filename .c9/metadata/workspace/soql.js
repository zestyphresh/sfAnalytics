{"filter":false,"title":"soql.js","tooltip":"/soql.js","undoManager":{"mark":3,"position":3,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":22,"column":5},"action":"insert","lines":["(function() {","","    accounting.settings = {","    \tcurrency: {","    \t\tsymbol : \"£\",","    \t\tdecimal : \".\",","    \t\tthousand : \",\",","    \t\tprecision : 0","    \t},","    \tnumber: {","    \t\tprecision : 0,","    \t\tthousand : \",\",","    \t\tdecimal : \".\"","    \t}","    };","    ","    accounting.settings.currency.format = {","    \tpos : '%s%v',","    \tneg : '-%s%v',","    \tzero : '%s%v'","    };","    ","})();"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":0},"end":{"row":20,"column":6},"action":"remove","lines":["    accounting.settings = {","    \tcurrency: {","    \t\tsymbol : \"£\",","    \t\tdecimal : \".\",","    \t\tthousand : \",\",","    \t\tprecision : 0","    \t},","    \tnumber: {","    \t\tprecision : 0,","    \t\tthousand : \",\",","    \t\tdecimal : \".\"","    \t}","    };","    ","    accounting.settings.currency.format = {","    \tpos : '%s%v',","    \tneg : '-%s%v',","    \tzero : '%s%v'","    };"]},{"start":{"row":2,"column":0},"end":{"row":26,"column":5},"action":"insert","lines":["    function soql(query) {","            ","        this.query = query;","        ","        var deferred = Q.defer();","                ","        var records = [];","                ","        salesforceConn.sobject(this.query.sObject)","            .select(this.query.select)","            .where(this.query.where)","            .on('record', function(record) {","                records.push(record);","            })","            .on('error', function(query) {","                deferred.reject('error');","            })","            .on('end', function(err) {","                deferred.resolve(records);","            })","            .run({ autoFetch : true, maxFetch : this.query.maxFetch });","            ","        return deferred.promise;","        ","    }"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":0,"column":13},"action":"remove","lines":["(function() {"]}]}],[{"group":"doc","deltas":[{"start":{"row":28,"column":0},"end":{"row":28,"column":5},"action":"remove","lines":["})();"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":18,"column":14},"end":{"row":18,"column":14},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1424983849430,"hash":"665c9cbbfa023ee6fb43907140dc6f4a6a29c455"}