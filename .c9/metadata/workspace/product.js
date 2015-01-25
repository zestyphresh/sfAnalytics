{"filter":false,"title":"product.js","tooltip":"/product.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":170,"column":25},"end":{"row":170,"column":26},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":26},"end":{"row":170,"column":27},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":27},"end":{"row":170,"column":28},"action":"insert","lines":["F"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":28},"end":{"row":170,"column":29},"action":"insert","lines":["Y"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":29},"end":{"row":170,"column":30},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":30},"end":{"row":170,"column":31},"action":"insert","lines":["Y"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":31},"end":{"row":170,"column":32},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":32},"end":{"row":170,"column":33},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":33},"end":{"row":170,"column":34},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":33},"end":{"row":170,"column":34},"action":"remove","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":32},"end":{"row":170,"column":33},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":31},"end":{"row":170,"column":32},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":30},"end":{"row":170,"column":31},"action":"remove","lines":["Y"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":29},"end":{"row":170,"column":30},"action":"remove","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":28},"end":{"row":170,"column":29},"action":"remove","lines":["Y"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":27},"end":{"row":170,"column":28},"action":"remove","lines":["F"]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":26},"end":{"row":170,"column":27},"action":"remove","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":170,"column":25},"end":{"row":170,"column":26},"action":"remove","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":171,"column":27},"end":{"row":171,"column":35},"action":"remove","lines":["Quantity"]},{"start":{"row":171,"column":27},"end":{"row":171,"column":28},"action":"insert","lines":["V"]}]}],[{"group":"doc","deltas":[{"start":{"row":171,"column":28},"end":{"row":171,"column":29},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":171,"column":29},"end":{"row":171,"column":30},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":171,"column":30},"end":{"row":171,"column":31},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":171,"column":31},"end":{"row":171,"column":32},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":178,"column":0},"end":{"row":181,"column":21},"action":"remove","lines":["            p.count--;","            p.total -= v.Quantity__c;","            p[v.Salesperson__r.Name.replace(/\\s/g, \"\")] -= v.Quantity__c;","            return p;"]},{"start":{"row":178,"column":0},"end":{"row":183,"column":21},"action":"insert","lines":["            p.count++;","            p.ytdQty += p.FY_Year_To_Date__c ? v.Quantity__c : 0;","            p.ytdVal += p.FY_Year_To_Date__c ? v.Value__c : 0;","            p.fullQty += v.Quantity__c;","            p.fullVal += v.Value__c;","            return p;"]}]}],[{"group":"doc","deltas":[{"start":{"row":178,"column":19},"end":{"row":178,"column":20},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":178,"column":19},"end":{"row":178,"column":20},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":178,"column":19},"end":{"row":178,"column":20},"action":"insert","lines":["-"]}]}],[{"group":"doc","deltas":[{"start":{"row":178,"column":20},"end":{"row":178,"column":21},"action":"insert","lines":["-"]}]}],[{"group":"doc","deltas":[{"start":{"row":179,"column":21},"end":{"row":179,"column":22},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":179,"column":21},"end":{"row":179,"column":22},"action":"insert","lines":["-"]}]}],[{"group":"doc","deltas":[{"start":{"row":180,"column":21},"end":{"row":180,"column":22},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":180,"column":21},"end":{"row":180,"column":22},"action":"insert","lines":["-"]}]}],[{"group":"doc","deltas":[{"start":{"row":181,"column":22},"end":{"row":181,"column":23},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":181,"column":22},"end":{"row":181,"column":23},"action":"insert","lines":["-"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":22},"end":{"row":182,"column":23},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":22},"end":{"row":182,"column":23},"action":"insert","lines":["-"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":20},"end":{"row":201,"column":32},"action":"remove","lines":["Promotion__r"]},{"start":{"row":201,"column":20},"end":{"row":201,"column":21},"action":"insert","lines":["P"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":21},"end":{"row":201,"column":22},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":22},"end":{"row":201,"column":23},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":23},"end":{"row":201,"column":24},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":24},"end":{"row":201,"column":25},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":25},"end":{"row":201,"column":26},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":26},"end":{"row":201,"column":27},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":27},"end":{"row":201,"column":28},"action":"insert","lines":["2"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":44},"end":{"row":201,"column":49},"action":"remove","lines":["promo"]},{"start":{"row":201,"column":44},"end":{"row":201,"column":45},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":45},"end":{"row":201,"column":46},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":46},"end":{"row":201,"column":47},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":47},"end":{"row":201,"column":48},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":48},"end":{"row":201,"column":49},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":49},"end":{"row":201,"column":50},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":50},"end":{"row":201,"column":51},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":0},"end":{"row":53,"column":6},"action":"remove","lines":["        ","    values.totalSales = function() {","        ","        var data = dims.dummy.group().reduceSum(function(d) { return d.Value__c; }).top(1)[0];","        console.log(data);","        ","        $j('#headline-value').text(accounting.formatMoney(data.value, \"£\", 0, \",\", \".\"));","        ","    };","    ","    values.totalVolumes = function() {","        ","        var data = dims.dummy.group().reduceSum(function(d) { return d.Quantity__c; }).top(1)[0];","        console.log(data);","        ","        $j('#headline-volume').text(accounting.formatNumber(data.value, 0, \",\", \".\"));","        ","    };"]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":0},"end":{"row":37,"column":8},"action":"remove","lines":["","        "]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":12},"end":{"row":24,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":13},"end":{"row":24,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":12},"end":{"row":25,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":13},"end":{"row":25,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":58},"end":{"row":22,"column":65},"action":"remove","lines":["product"]},{"start":{"row":22,"column":58},"end":{"row":22,"column":59},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":59},"end":{"row":22,"column":60},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":60},"end":{"row":22,"column":61},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":61},"end":{"row":22,"column":62},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":62},"end":{"row":22,"column":63},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":63},"end":{"row":22,"column":64},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":64},"end":{"row":22,"column":65},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":65},"end":{"row":22,"column":66},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":66},"end":{"row":22,"column":67},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":67},"end":{"row":22,"column":68},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":68},"end":{"row":22,"column":69},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":87},"end":{"row":22,"column":94},"action":"remove","lines":["product"]},{"start":{"row":22,"column":87},"end":{"row":22,"column":98},"action":"insert","lines":["yearlySales"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":120},"end":{"row":22,"column":127},"action":"remove","lines":["product"]},{"start":{"row":22,"column":120},"end":{"row":22,"column":131},"action":"insert","lines":["yearlySales"]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":12},"end":{"row":27,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":13},"end":{"row":27,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":28,"column":12},"end":{"row":28,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":28,"column":13},"end":{"row":28,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":12},"end":{"row":31,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":13},"end":{"row":31,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":12},"end":{"row":30,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":13},"end":{"row":30,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":29,"column":12},"end":{"row":29,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":29,"column":13},"end":{"row":29,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":33},"end":{"row":14,"column":0},"action":"insert","lines":["",""]},{"start":{"row":14,"column":0},"end":{"row":14,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":14,"column":12},"end":{"row":15,"column":0},"action":"insert","lines":["",""]},{"start":{"row":15,"column":0},"end":{"row":15,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":12},"end":{"row":15,"column":13},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":13},"end":{"row":15,"column":14},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":14},"end":{"row":15,"column":15},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":15},"end":{"row":15,"column":16},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":16},"end":{"row":15,"column":17},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":17},"end":{"row":15,"column":18},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":18},"end":{"row":15,"column":19},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":19},"end":{"row":15,"column":20},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":20},"end":{"row":15,"column":21},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":21},"end":{"row":15,"column":22},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":22},"end":{"row":15,"column":23},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":23},"end":{"row":15,"column":25},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":24},"end":{"row":15,"column":25},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":25},"end":{"row":15,"column":26},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":26},"end":{"row":15,"column":27},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":27},"end":{"row":15,"column":28},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":28},"end":{"row":15,"column":29},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":29},"end":{"row":15,"column":30},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":31},"end":{"row":15,"column":32},"action":"insert","lines":[";"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":15,"column":32},"end":{"row":15,"column":32},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1422186689345,"hash":"1d58ee545d6444524b0b50a4b790131d987ab611"}