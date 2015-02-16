{"filter":false,"title":"accountSales.js","tooltip":"/accountSales.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":201,"column":25},"end":{"row":201,"column":26},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":26},"end":{"row":201,"column":27},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":27},"end":{"row":201,"column":28},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":28},"end":{"row":201,"column":29},"action":"insert","lines":["D"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":29},"end":{"row":201,"column":30},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":30},"end":{"row":201,"column":31},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":31},"end":{"row":201,"column":32},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":32},"end":{"row":201,"column":33},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":33},"end":{"row":201,"column":34},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":34},"end":{"row":201,"column":35},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":205,"column":29},"end":{"row":205,"column":62},"action":"remove","lines":["sales', 'budget', 'target', 'last"]},{"start":{"row":205,"column":29},"end":{"row":205,"column":30},"action":"insert","lines":["G"]}]}],[{"group":"doc","deltas":[{"start":{"row":205,"column":30},"end":{"row":205,"column":31},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":205,"column":31},"end":{"row":205,"column":32},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":205,"column":32},"end":{"row":205,"column":33},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":205,"column":33},"end":{"row":205,"column":34},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":205,"column":34},"end":{"row":205,"column":35},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":205,"column":29},"end":{"row":205,"column":35},"action":"remove","lines":["Gross_"]},{"start":{"row":205,"column":29},"end":{"row":205,"column":43},"action":"insert","lines":["Gross_Value__c"]}]}],[{"group":"doc","deltas":[{"start":{"row":205,"column":29},"end":{"row":205,"column":35},"action":"remove","lines":["Gross_"]}]}],[{"group":"doc","deltas":[{"start":{"row":204,"column":24},"end":{"row":204,"column":29},"action":"remove","lines":["month"]},{"start":{"row":204,"column":24},"end":{"row":204,"column":39},"action":"insert","lines":["Invoice_Date__c"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":0},"end":{"row":226,"column":11},"action":"remove","lines":["        var chart = c3.generate({","            bindto: '#chart-grossSales',","            data: {","                x: 'Invoice_Date__c',","                json: source,","                keys: {","                    x: 'Invoice_Date__c',","                    value: ['Value__c'],","                },","                names: {","                    sales : '2015 Sales',","                    budget : '2015 Budget',","                    target : '2015 Target',","                    last : '2014 Sales'","                }","            },","            axis: {","                x: {","                    type: 'category'","                },","                y : {","                    tick: {","                        format: function (d) { return accounting.formatMoney(d); }","                    },","                    padding : {bottom: 0}","                }","                ","            }","        });"]},{"start":{"row":198,"column":0},"end":{"row":239,"column":11},"action":"insert","lines":["        var chart = c3.generate({","            bindto: '#chart-weekly',","            data: {","                x: 'key',","                xFormat: '%Y-%m-%d',","                json: data,","                keys: {","                    x: 'key',","                    value: ['value'],","                }","            },","            axis: {","                x: {","                    type: 'timeseries',","                    tick: {","                        format: '%Y-%b'","                    }","                }","            },","            regions: [","                {start: new Date(2009,11,15), end: new Date(2010,11,15)},","                {start: new Date(2011,11,15), end: new Date(2012,11,15)},","                {start: new Date(2013,11,15), end: new Date(2014,11,15)},","            ],","            grid: {","                x: {","                    lines: [{value: new Date(2009,11,15), text: '2010'},","                            {value: new Date(2010,11,15), text: '2011'},","                            {value: new Date(2011,11,15), text: '2012'},","                            {value: new Date(2012,11,15), text: '2013'},","                            {value: new Date(2013,11,15), text: '2014'},","                            {value: new Date(2014,11,15), text: '2015'}","                    ]","                }","            },","            subchart: {","                show: true","            },","            zoom: {","                enabled: true","            }","        });"]}]}],[{"group":"doc","deltas":[{"start":{"row":217,"column":0},"end":{"row":238,"column":13},"action":"remove","lines":["            regions: [","                {start: new Date(2009,11,15), end: new Date(2010,11,15)},","                {start: new Date(2011,11,15), end: new Date(2012,11,15)},","                {start: new Date(2013,11,15), end: new Date(2014,11,15)},","            ],","            grid: {","                x: {","                    lines: [{value: new Date(2009,11,15), text: '2010'},","                            {value: new Date(2010,11,15), text: '2011'},","                            {value: new Date(2011,11,15), text: '2012'},","                            {value: new Date(2012,11,15), text: '2013'},","                            {value: new Date(2013,11,15), text: '2014'},","                            {value: new Date(2014,11,15), text: '2015'}","                    ]","                }","            },","            subchart: {","                show: true","            },","            zoom: {","                enabled: true","            }"]}]}],[{"group":"doc","deltas":[{"start":{"row":216,"column":14},"end":{"row":217,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":216,"column":13},"end":{"row":216,"column":14},"action":"remove","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":20},"end":{"row":201,"column":23},"action":"remove","lines":["key"]},{"start":{"row":201,"column":20},"end":{"row":201,"column":21},"action":"insert","lines":["I"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":21},"end":{"row":201,"column":22},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":22},"end":{"row":201,"column":23},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":23},"end":{"row":201,"column":24},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":24},"end":{"row":201,"column":25},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":25},"end":{"row":201,"column":26},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":26},"end":{"row":201,"column":27},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":27},"end":{"row":201,"column":28},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":28},"end":{"row":201,"column":29},"action":"insert","lines":["D"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":29},"end":{"row":201,"column":30},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":30},"end":{"row":201,"column":31},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":31},"end":{"row":201,"column":32},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":32},"end":{"row":201,"column":33},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":33},"end":{"row":201,"column":34},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":201,"column":34},"end":{"row":201,"column":35},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":196,"column":11},"end":{"row":197,"column":0},"action":"insert","lines":["",""]},{"start":{"row":197,"column":0},"end":{"row":197,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":197,"column":8},"end":{"row":198,"column":0},"action":"insert","lines":["",""]},{"start":{"row":198,"column":0},"end":{"row":198,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":8},"end":{"row":198,"column":9},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":9},"end":{"row":198,"column":10},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":10},"end":{"row":198,"column":11},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":11},"end":{"row":198,"column":12},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":12},"end":{"row":198,"column":13},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":13},"end":{"row":198,"column":14},"action":"insert","lines":["D"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":14},"end":{"row":198,"column":15},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":15},"end":{"row":198,"column":16},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":16},"end":{"row":198,"column":17},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":8},"end":{"row":198,"column":9},"action":"insert","lines":["f"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":9},"end":{"row":198,"column":10},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":10},"end":{"row":198,"column":11},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":11},"end":{"row":198,"column":12},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":12},"end":{"row":198,"column":13},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":13},"end":{"row":198,"column":14},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":14},"end":{"row":198,"column":15},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":15},"end":{"row":198,"column":16},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":16},"end":{"row":198,"column":17},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":26},"end":{"row":198,"column":28},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":28},"end":{"row":198,"column":29},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":29},"end":{"row":198,"column":30},"action":"insert","lines":["{"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":30},"end":{"row":200,"column":9},"action":"insert","lines":["","            ","        }"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":30},"end":{"row":199,"column":0},"action":"insert","lines":["",""]},{"start":{"row":199,"column":0},"end":{"row":199,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":199,"column":12},"end":{"row":200,"column":0},"action":"insert","lines":["",""]},{"start":{"row":200,"column":0},"end":{"row":200,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":30},"end":{"row":199,"column":12},"action":"remove","lines":["","            "]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":30},"end":{"row":199,"column":12},"action":"remove","lines":["","            "]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":0},"end":{"row":200,"column":9},"action":"remove","lines":["        function chartData() {","            ","        }"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":0},"end":{"row":199,"column":8},"action":"remove","lines":["","        "]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":0},"end":{"row":199,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":203,"column":22},"end":{"row":203,"column":26},"action":"remove","lines":["data"]},{"start":{"row":203,"column":22},"end":{"row":203,"column":23},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":203,"column":23},"end":{"row":203,"column":24},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":203,"column":24},"end":{"row":203,"column":25},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":203,"column":25},"end":{"row":203,"column":26},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":203,"column":26},"end":{"row":203,"column":27},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":203,"column":27},"end":{"row":203,"column":28},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":206,"column":29},"end":{"row":206,"column":34},"action":"remove","lines":["value"]},{"start":{"row":206,"column":29},"end":{"row":206,"column":30},"action":"insert","lines":["V"]}]}],[{"group":"doc","deltas":[{"start":{"row":206,"column":30},"end":{"row":206,"column":31},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":206,"column":31},"end":{"row":206,"column":32},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":206,"column":32},"end":{"row":206,"column":33},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":206,"column":33},"end":{"row":206,"column":34},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":206,"column":34},"end":{"row":206,"column":35},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":206,"column":35},"end":{"row":206,"column":36},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":206,"column":36},"end":{"row":206,"column":37},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":199,"column":23},"end":{"row":199,"column":34},"action":"remove","lines":["hart-weekly"]}]}],[{"group":"doc","deltas":[{"start":{"row":199,"column":22},"end":{"row":199,"column":23},"action":"remove","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":199,"column":22},"end":{"row":199,"column":38},"action":"insert","lines":["chartWeeklySales"]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":12},"end":{"row":194,"column":23},"action":"remove","lines":["console.log"]},{"start":{"row":194,"column":12},"end":{"row":194,"column":13},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":13},"end":{"row":194,"column":14},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":14},"end":{"row":194,"column":15},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":15},"end":{"row":194,"column":16},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":16},"end":{"row":194,"column":17},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":17},"end":{"row":194,"column":18},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":18},"end":{"row":194,"column":19},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":19},"end":{"row":194,"column":20},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":20},"end":{"row":194,"column":21},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":21},"end":{"row":194,"column":22},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":22},"end":{"row":194,"column":23},"action":"insert","lines":["("]}]}],[{"group":"doc","deltas":[{"start":{"row":194,"column":23},"end":{"row":194,"column":24},"action":"remove","lines":["("]}]}],[{"group":"doc","deltas":[{"start":{"row":205,"column":24},"end":{"row":205,"column":27},"action":"remove","lines":["key"]},{"start":{"row":205,"column":24},"end":{"row":205,"column":39},"action":"insert","lines":["Invoice_Date__c"]}]}],[{"group":"doc","deltas":[{"start":{"row":178,"column":0},"end":{"row":178,"column":14},"action":"remove","lines":["        //test"]}]}],[{"group":"doc","deltas":[{"start":{"row":177,"column":10},"end":{"row":178,"column":0},"action":"remove","lines":["",""]}]}]]},"ace":{"folds":[],"scrolltop":2342,"scrollleft":0,"selection":{"start":{"row":212,"column":39},"end":{"row":212,"column":39},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":166,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1424130676565,"hash":"5ce3270a574aa2e4c28b292f16cf8a7e80c58374"}