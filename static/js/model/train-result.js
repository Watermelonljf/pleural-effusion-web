/**
 * Created by Watermelon_R on 2018/4/10.
 */
/*$(function () {
 var has_had_focus = false;
 var pipe = function (el_name, send) {
 var div = $(el_name + ' div');
 var inp = $(el_name + ' input');
 var form = $(el_name + ' form');

 var print = function (m, p) {
 p = (p === undefined) ? '' : JSON.stringify(p);
 div.append($("<code>").text(m + ' ' + p));
 div.scrollTop(div.scrollTop() + 10000);
 };

 return print;
 };

 var print_first = pipe('#first', function (data) {
 });

 if (location.search == '?ws') {
 var ws = new WebSocket('ws://123.207.231.196:15674/ws');
 } else {
 var ws = new SockJS('http://123.207.231.196:15674/stomp');
 }

 // Init Client
 var client = Stomp.over(ws);

 // SockJS does not support heart-beat: disable heart-beats
 client.heartbeat.outgoing = 0;
 client.heartbeat.incoming = 0;
 client.debug = pipe('#second');

 // Declare on_connect
 var on_connect = function (x) {
 /!* client.subscribe("/queue/train_data_queue", function(d) {
 print_first(d.body);
 });*!/
 client.subscribe("/exchange/fanoutExchange/train_data", function (d) {
 print_first(d.body);
 });


 };

 // Declare on_error
 var on_error = function () {
 console.log('error');
 };

 // Conect to RabbitMQ
 client.connect('cs', '123456', on_connect, on_error, '/');
 $('#first input').focus(function () {
 if (!has_had_focus) {
 has_had_focus = true;
 $(this).val("");
 }
 });

 })*/

layui.use(['jquery'], function () {
    window.reload();
    var Train = {

        resultCharts: null,

        //初始化图标
        initCharts: function () {
            Train.resultCharts = echarts.init($("#main")[0]);
            Train.resultCharts.setOption(Train.option);
        },

        //更新图表
        update: function (data) {
            var result = JSON.parse(data);
            console.log(result);
            Train.resultCharts.setOption({
                xAxis:{
                    data:result.gens
                },
                series: [
                    {
                        data: result.accs
                    },
                    {
                        data: result.avgs
                    }]
            })
        },

        option: {
            title: {
                text: '训练监控图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['精确度', '平均精确度']
            },
            grid: {
                left: '0%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                name:'迭代次数',
                nameLocation:'end',
                type: 'category',
                boundaryGap: false,
                data: null,
            },
            yAxis: {
                name: '精度',
                nameLocation:'end',
                splitNumber:5,
                min:0,
                max:1,
                type: 'value'
            },
            series: [
                {
                    name: '精确度',
                    type: 'line',
                    data: null
                },
                {
                    name: '平均精确度',
                    type: 'line',
                    data: null
                }
            ]
        }
    };
    window.onresize = function () {
        //重置容器高宽
        Train.resultCharts.resize();
    };
    var MqListener = {
        client: null,
        print_first: null, //打印方法
        has_had_focus: false,
        pipe: function (el_name, send) {
            var div = $(el_name + ' div');

            var print = function (m, p) {
                p = (p === undefined) ? '' : JSON.stringify(p);
                div.append($("<p>").text(m + ' ' + p).css('width','100%'));
                div.scrollTop(div.scrollTop() + 10000);
            };

            return print;
        },

        // 定义连接 on_connect
        on_connect: function (x) {
            client.subscribe("/exchange/fanoutExchange/train_data", function (d) {
                MqListener.print_first(d.body);
                Train.update(d.body);
            });
        },

        // 错误回调
        on_error: function () {
            console.log('error');
        },

        initListener: function () {
            MqListener.print_first = MqListener.pipe('#first', function (data) {
            })
            if (location.search == '?ws') {
                var ws = new WebSocket('ws://localhost:15674/ws');
            } else {
                var ws = new SockJS('http://localhost:15674/stomp');
            }

            // Init Client
            client = Stomp.over(ws);

            // SockJS does not support heart-beat: disable heart-beats
            client.heartbeat.outgoing = 0;
            client.heartbeat.incoming = 0;
            client.debug = MqListener.pipe('#second');
            // Conect to RabbitMQ
            client.connect('localhost', 'localhost', MqListener.on_connect, MqListener.on_error, '/');
        },

        /*  $('#first input').focus(function () {
         if (!has_had_focus) {
         has_had_focus = true;
         $(this).val("");
         }*/
    };
    $ = layui.$;
    Train.initCharts();
    MqListener.initListener();
});


