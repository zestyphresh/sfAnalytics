{"filter":false,"title":"accountSalesBeta.js","tooltip":"/accountSalesBeta.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":546,"column":4},"end":{"row":546,"column":8},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":546,"column":0},"end":{"row":546,"column":4},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":546,"column":0},"end":{"row":553,"column":11},"action":"insert","lines":["        ","        $j('#grossSales').click(function() {","            ","            var tableData = table.rows({order: \"applied\", search: \"applied\", page: \"all\"}).data().toArray()","            ","            chartUpdate(tableData, 'Value__c');","            ","        });"]}]}],[{"group":"doc","deltas":[{"start":{"row":553,"column":11},"end":{"row":554,"column":0},"action":"insert","lines":["",""]},{"start":{"row":554,"column":0},"end":{"row":554,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":554,"column":8},"end":{"row":555,"column":0},"action":"insert","lines":["",""]},{"start":{"row":555,"column":0},"end":{"row":555,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":555,"column":4},"end":{"row":555,"column":8},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":555,"column":0},"end":{"row":555,"column":4},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":555,"column":0},"end":{"row":562,"column":11},"action":"insert","lines":["        ","        $j('#grossSales').click(function() {","            ","            var tableData = table.rows({order: \"applied\", search: \"applied\", page: \"all\"}).data().toArray()","            ","            chartUpdate(tableData, 'Value__c');","            ","        });"]}]}],[{"group":"doc","deltas":[{"start":{"row":547,"column":13},"end":{"row":547,"column":18},"action":"remove","lines":["gross"]},{"start":{"row":547,"column":13},"end":{"row":547,"column":14},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":547,"column":14},"end":{"row":547,"column":15},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":547,"column":15},"end":{"row":547,"column":16},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":556,"column":13},"end":{"row":556,"column":23},"action":"remove","lines":["grossSales"]},{"start":{"row":556,"column":13},"end":{"row":556,"column":14},"action":"insert","lines":["q"]}]}],[{"group":"doc","deltas":[{"start":{"row":556,"column":14},"end":{"row":556,"column":15},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":556,"column":15},"end":{"row":556,"column":16},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":556,"column":16},"end":{"row":556,"column":17},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":556,"column":17},"end":{"row":556,"column":18},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":556,"column":18},"end":{"row":556,"column":19},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":556,"column":19},"end":{"row":556,"column":20},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":556,"column":20},"end":{"row":556,"column":21},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":551,"column":36},"end":{"row":551,"column":37},"action":"insert","lines":["N"]}]}],[{"group":"doc","deltas":[{"start":{"row":551,"column":37},"end":{"row":551,"column":38},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":551,"column":38},"end":{"row":551,"column":39},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":551,"column":39},"end":{"row":551,"column":40},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":37},"end":{"row":560,"column":41},"action":"remove","lines":["alue"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":36},"end":{"row":560,"column":37},"action":"remove","lines":["V"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":36},"end":{"row":560,"column":37},"action":"insert","lines":["Q"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":37},"end":{"row":560,"column":38},"action":"insert","lines":["U"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":38},"end":{"row":560,"column":39},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":39},"end":{"row":560,"column":40},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":40},"end":{"row":560,"column":41},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":41},"end":{"row":560,"column":42},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":42},"end":{"row":560,"column":43},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":43},"end":{"row":560,"column":44},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":560,"column":37},"end":{"row":560,"column":38},"action":"remove","lines":["U"]},{"start":{"row":560,"column":37},"end":{"row":560,"column":38},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":565,"column":0},"end":{"row":577,"column":6},"action":"remove","lines":["","","    ","    var crossfilter = function(records) {","    ","        this.crossfilter = new crossfilter(records);","        this.dims = {};","        this.groups = {};","        this.values = {};","    ","    }","    ","    */"]}]}],[{"group":"doc","deltas":[{"start":{"row":565,"column":0},"end":{"row":566,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":69,"column":56},"end":{"row":70,"column":0},"action":"insert","lines":["",""]},{"start":{"row":70,"column":0},"end":{"row":70,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":70,"column":8},"end":{"row":71,"column":0},"action":"insert","lines":["",""]},{"start":{"row":71,"column":0},"end":{"row":71,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":8},"end":{"row":71,"column":9},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":9},"end":{"row":71,"column":10},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":10},"end":{"row":71,"column":11},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":11},"end":{"row":71,"column":12},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":12},"end":{"row":71,"column":13},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":13},"end":{"row":71,"column":14},"action":"insert","lines":["P"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":14},"end":{"row":71,"column":15},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":15},"end":{"row":71,"column":16},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":16},"end":{"row":71,"column":17},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":17},"end":{"row":71,"column":18},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":18},"end":{"row":71,"column":19},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":19},"end":{"row":71,"column":20},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":20},"end":{"row":71,"column":21},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":21},"end":{"row":71,"column":22},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":22},"end":{"row":71,"column":23},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":23},"end":{"row":71,"column":24},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":24},"end":{"row":71,"column":25},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":25},"end":{"row":72,"column":0},"action":"insert","lines":["",""]},{"start":{"row":72,"column":0},"end":{"row":72,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":8},"end":{"row":72,"column":9},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":9},"end":{"row":72,"column":10},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":10},"end":{"row":72,"column":11},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":11},"end":{"row":72,"column":12},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":12},"end":{"row":72,"column":13},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":13},"end":{"row":72,"column":14},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":14},"end":{"row":72,"column":15},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":15},"end":{"row":72,"column":16},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":16},"end":{"row":72,"column":17},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":17},"end":{"row":72,"column":18},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":18},"end":{"row":72,"column":19},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":19},"end":{"row":72,"column":20},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":20},"end":{"row":72,"column":22},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":22},"end":{"row":72,"column":23},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":393,"column":5},"end":{"row":394,"column":4},"action":"remove","lines":["","    "]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":21},"end":{"row":72,"column":22},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":22},"end":{"row":72,"column":23},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":23},"end":{"row":72,"column":24},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":24},"end":{"row":72,"column":25},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":25},"end":{"row":72,"column":26},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":26},"end":{"row":72,"column":27},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":27},"end":{"row":72,"column":28},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":28},"end":{"row":72,"column":29},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":29},"end":{"row":72,"column":30},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":30},"end":{"row":72,"column":31},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":465,"column":0},"end":{"row":466,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":466,"column":0},"end":{"row":466,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":466,"column":4},"end":{"row":466,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":466,"column":8},"end":{"row":466,"column":9},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":466,"column":9},"end":{"row":466,"column":10},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":565,"column":11},"end":{"row":566,"column":0},"action":"insert","lines":["",""]},{"start":{"row":566,"column":0},"end":{"row":566,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":566,"column":8},"end":{"row":566,"column":9},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":566,"column":9},"end":{"row":566,"column":10},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":566,"column":9},"end":{"row":566,"column":10},"action":"remove","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":566,"column":8},"end":{"row":566,"column":9},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":566,"column":8},"end":{"row":566,"column":9},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":566,"column":9},"end":{"row":566,"column":10},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":445,"column":11},"end":{"row":446,"column":0},"action":"insert","lines":["",""]},{"start":{"row":446,"column":0},"end":{"row":446,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":446,"column":8},"end":{"row":447,"column":0},"action":"insert","lines":["",""]},{"start":{"row":447,"column":0},"end":{"row":447,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":447,"column":8},"end":{"row":447,"column":9},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":447,"column":9},"end":{"row":447,"column":10},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":466,"column":9},"end":{"row":467,"column":0},"action":"insert","lines":["",""]},{"start":{"row":467,"column":0},"end":{"row":467,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":467,"column":8},"end":{"row":468,"column":0},"action":"insert","lines":["",""]},{"start":{"row":468,"column":0},"end":{"row":468,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":468,"column":8},"end":{"row":468,"column":9},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":468,"column":9},"end":{"row":468,"column":10},"action":"insert","lines":["*"]}]}]]},"ace":{"folds":[],"scrolltop":6000,"scrollleft":0,"selection":{"start":{"row":457,"column":12},"end":{"row":457,"column":12},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":427,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1425373071581,"hash":"c3b2b8f076f720e505274a2581c1bf4fa7a173ce"}