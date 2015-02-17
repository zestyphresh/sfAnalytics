{"filter":false,"title":"accountSales.js","tooltip":"/accountSales.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":218,"column":34},"end":{"row":218,"column":35},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":12},"end":{"row":193,"column":15},"action":"insert","lines":["// "]},{"start":{"row":194,"column":12},"end":{"row":194,"column":15},"action":"insert","lines":["// "]},{"start":{"row":195,"column":12},"end":{"row":195,"column":15},"action":"insert","lines":["// "]},{"start":{"row":196,"column":12},"end":{"row":196,"column":15},"action":"insert","lines":["// "]},{"start":{"row":197,"column":12},"end":{"row":197,"column":15},"action":"insert","lines":["// "]},{"start":{"row":198,"column":12},"end":{"row":198,"column":15},"action":"insert","lines":["// "]},{"start":{"row":199,"column":12},"end":{"row":199,"column":15},"action":"insert","lines":["// "]}]}],[{"group":"doc","deltas":[{"start":{"row":191,"column":37},"end":{"row":192,"column":0},"action":"insert","lines":["",""]},{"start":{"row":192,"column":0},"end":{"row":192,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":192,"column":12},"end":{"row":193,"column":0},"action":"insert","lines":["",""]},{"start":{"row":193,"column":0},"end":{"row":193,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":12},"end":{"row":193,"column":13},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":13},"end":{"row":193,"column":14},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":14},"end":{"row":193,"column":15},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":15},"end":{"row":193,"column":16},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":16},"end":{"row":193,"column":17},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":17},"end":{"row":193,"column":18},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":18},"end":{"row":193,"column":19},"action":"insert","lines":["C"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":19},"end":{"row":193,"column":20},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":20},"end":{"row":193,"column":21},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":21},"end":{"row":193,"column":22},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":22},"end":{"row":193,"column":23},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":23},"end":{"row":193,"column":25},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":24},"end":{"row":193,"column":114},"action":"insert","lines":["chartData(table.rows({order: \"applied\", search: \"applied\", page: \"all\"}).data().toArray())"]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":115},"end":{"row":193,"column":116},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":218,"column":0},"end":{"row":220,"column":38},"action":"remove","lines":["        createChart();","        ","        function createChart(source) {"]}]}],[{"group":"doc","deltas":[{"start":{"row":218,"column":0},"end":{"row":219,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":245,"column":0},"end":{"row":245,"column":9},"action":"remove","lines":["        }"]}]}],[{"group":"doc","deltas":[{"start":{"row":244,"column":15},"end":{"row":245,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":193,"column":12},"end":{"row":193,"column":116},"action":"remove","lines":["createChart(chartData(table.rows({order: \"applied\", search: \"applied\", page: \"all\"}).data().toArray()));"]},{"start":{"row":193,"column":12},"end":{"row":217,"column":15},"action":"insert","lines":["var chart = c3.generate({","                bindto: '#chartWeeklySales',","                data: {","                    x: 'key',","                    xFormat: '%Y-%m-%d',","                    json: chartData(source),","                    keys: {","                        x: 'key',","                        value: ['values'],","                    },","                    type : 'bar'","                },","                axis: {","                    x: {","                        type: 'timeseries',","                        tick: {","                            format: '%Y-%b'","                        },","                        extent: ['2010-01-01', '2015-12-01']","                    }","                },","                bar: {","                    zerobased: true","                }","            });"]}]}],[{"group":"doc","deltas":[{"start":{"row":198,"column":36},"end":{"row":198,"column":42},"action":"remove","lines":["source"]},{"start":{"row":198,"column":36},"end":{"row":198,"column":115},"action":"insert","lines":["table.rows({order: \"applied\", search: \"applied\", page: \"all\"}).data().toArray()"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":55},"end":{"row":211,"column":58},"action":"remove","lines":["-01"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":41},"end":{"row":211,"column":44},"action":"remove","lines":["-01"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":0},"end":{"row":211,"column":54},"action":"remove","lines":["                        extent: ['2010-01', '2015-12']"]}]}],[{"group":"doc","deltas":[{"start":{"row":210,"column":26},"end":{"row":211,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":210,"column":25},"end":{"row":210,"column":26},"action":"remove","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":213,"column":0},"end":{"row":215,"column":17},"action":"remove","lines":["                bar: {","                    zerobased: true","                }"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":18},"end":{"row":213,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":17},"end":{"row":212,"column":18},"action":"remove","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":21},"end":{"row":211,"column":22},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":22},"end":{"row":212,"column":0},"action":"insert","lines":["",""]},{"start":{"row":212,"column":0},"end":{"row":212,"column":20},"action":"insert","lines":["                    "]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":20},"end":{"row":217,"column":17},"action":"insert","lines":["                y : {","                    tick: {","                        format: function (d) { return accounting.formatMoney(d); }","                    },","                    padding : {bottom: 0}","                }"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":34},"end":{"row":212,"column":35},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":33},"end":{"row":212,"column":34},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":32},"end":{"row":212,"column":33},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":28},"end":{"row":212,"column":32},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":24},"end":{"row":212,"column":28},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":20},"end":{"row":212,"column":24},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":20},"end":{"row":212,"column":21},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":213,"column":0},"end":{"row":213,"column":4},"action":"insert","lines":["    "]},{"start":{"row":214,"column":0},"end":{"row":214,"column":4},"action":"insert","lines":["    "]},{"start":{"row":215,"column":0},"end":{"row":215,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":216,"column":20},"end":{"row":216,"column":24},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":217,"column":16},"end":{"row":217,"column":20},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":210,"column":25},"end":{"row":210,"column":26},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":210,"column":26},"end":{"row":211,"column":0},"action":"insert","lines":["",""]},{"start":{"row":211,"column":0},"end":{"row":211,"column":24},"action":"insert","lines":["                        "]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":24},"end":{"row":211,"column":25},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":25},"end":{"row":211,"column":26},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":26},"end":{"row":211,"column":27},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":27},"end":{"row":211,"column":28},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":28},"end":{"row":211,"column":29},"action":"insert","lines":[":"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":29},"end":{"row":211,"column":30},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":30},"end":{"row":211,"column":31},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":31},"end":{"row":211,"column":32},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":32},"end":{"row":211,"column":33},"action":"insert","lines":["w"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":33},"end":{"row":211,"column":34},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":34},"end":{"row":211,"column":35},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":35},"end":{"row":211,"column":36},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":36},"end":{"row":211,"column":37},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":37},"end":{"row":211,"column":38},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":38},"end":{"row":211,"column":40},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":39},"end":{"row":211,"column":40},"action":"insert","lines":["2"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":40},"end":{"row":211,"column":41},"action":"insert","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":41},"end":{"row":211,"column":42},"action":"insert","lines":["1"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":42},"end":{"row":211,"column":43},"action":"insert","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":43},"end":{"row":211,"column":44},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":44},"end":{"row":211,"column":45},"action":"insert","lines":["1"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":45},"end":{"row":211,"column":46},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":46},"end":{"row":211,"column":47},"action":"insert","lines":["1"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":44},"end":{"row":211,"column":45},"action":"remove","lines":["1"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":44},"end":{"row":211,"column":45},"action":"insert","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":48},"end":{"row":211,"column":49},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":48},"end":{"row":211,"column":49},"action":"remove","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":48},"end":{"row":211,"column":49},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":211,"column":49},"end":{"row":212,"column":0},"action":"insert","lines":["",""]},{"start":{"row":212,"column":0},"end":{"row":212,"column":24},"action":"insert","lines":["                        "]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":24},"end":{"row":212,"column":49},"action":"insert","lines":["min : new date(2010,0,1),"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":48},"end":{"row":212,"column":49},"action":"remove","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":26},"end":{"row":212,"column":27},"action":"remove","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":25},"end":{"row":212,"column":26},"action":"remove","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":25},"end":{"row":212,"column":26},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":26},"end":{"row":212,"column":27},"action":"insert","lines":["x"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":42},"end":{"row":212,"column":43},"action":"remove","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":42},"end":{"row":212,"column":43},"action":"insert","lines":["5"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":42},"end":{"row":212,"column":43},"action":"remove","lines":["5"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":42},"end":{"row":212,"column":43},"action":"insert","lines":["5"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":44},"end":{"row":212,"column":45},"action":"remove","lines":["0"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":44},"end":{"row":212,"column":45},"action":"insert","lines":["1"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":45},"end":{"row":212,"column":46},"action":"insert","lines":["2"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":45},"end":{"row":212,"column":46},"action":"remove","lines":["2"]}]}],[{"group":"doc","deltas":[{"start":{"row":212,"column":45},"end":{"row":212,"column":46},"action":"insert","lines":["1"]}]}],[{"group":"doc","deltas":[{"start":{"row":260,"column":0},"end":{"row":271,"column":17},"action":"remove","lines":["                axis: {","                    x: {","                        type: 'timeseries',","                        tick: {","                            format: '%Y-%b'","                        },","                        extent: ['2010-01-01', '2015-12-01']","                    }","                },","                bar: {","                    zerobased: true","                }"]},{"start":{"row":260,"column":0},"end":{"row":274,"column":21},"action":"insert","lines":["                axis: {","                    x: {","                        type: 'timeseries',","                        tick: {","                            format: '%Y-%b'","                        },","                        min : new date(2010,0,1),","                        max : new date(2015,11,1)","                    },","                    y : {","                        tick: {","                            format: function (d) { return accounting.formatMoney(d); }","                        },","                        padding : {bottom: 0}","                    }"]}]}],[{"group":"doc","deltas":[{"start":{"row":274,"column":21},"end":{"row":275,"column":0},"action":"insert","lines":["",""]},{"start":{"row":275,"column":0},"end":{"row":275,"column":20},"action":"insert","lines":["                    "]}]}],[{"group":"doc","deltas":[{"start":{"row":275,"column":16},"end":{"row":275,"column":20},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":275,"column":16},"end":{"row":275,"column":17},"action":"insert","lines":["}"]}]}],[{"group":"doc","deltas":[{"start":{"row":266,"column":34},"end":{"row":266,"column":35},"action":"remove","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":266,"column":34},"end":{"row":266,"column":35},"action":"insert","lines":["D"]}]}],[{"group":"doc","deltas":[{"start":{"row":266,"column":34},"end":{"row":266,"column":38},"action":"remove","lines":["Date"]},{"start":{"row":266,"column":34},"end":{"row":266,"column":38},"action":"insert","lines":["Date"]}]}],[{"group":"doc","deltas":[{"start":{"row":267,"column":34},"end":{"row":267,"column":35},"action":"remove","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":267,"column":34},"end":{"row":267,"column":35},"action":"insert","lines":["D"]}]}],[{"group":"doc","deltas":[{"start":{"row":267,"column":34},"end":{"row":267,"column":38},"action":"remove","lines":["Date"]},{"start":{"row":267,"column":34},"end":{"row":267,"column":38},"action":"insert","lines":["Date"]}]}]]},"ace":{"folds":[],"scrolltop":3180,"scrollleft":0,"selection":{"start":{"row":264,"column":35},"end":{"row":264,"column":35},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":226,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1424190591537,"hash":"dca3703c617e2561452e1cadec554e73ea3049be"}