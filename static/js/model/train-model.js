layui.use(['table','form'], function () {
    var $=layui.$;
    var table = layui.table;
    var form = layui.form;

    table.render({
        elem: '#datagrid',
        even:true,
        loading:true,
        text: {
            none: {
                none: '暂无相关数据'
            } //在data，返回数据字段为空数组是显示,默认：无数据。注：该属性为 layui 2.2.5 开始新增
        },
        page: true,
        method: 'get',
        where: {},//接口的其他请求数据
        request: {
            pageName: 'pageIndex', //页码的参数名称，默认：page
            limitName: 'pageSize' //每页数据量的参数
        },
        url: 'http://127.0.0.1:9094/train-model/model/get/trainData',
        cellMinWidth:160,
        cols: [[ //标题栏
            {type: 'numbers', title: '序号', templet: '#indexTpl',width:70,align:'center'}
            , {field: 'height', title: '身高cm',align:'center'}
            , {field: 'weight', title: '体重kg', align:'center'}
            , {field: 'diabetes', title: '糖尿病', align:'center'}
            , {field: 'temperature', title: '体温摄氏度', align:'center'}
            , {field: 'gender', title: '性别', align:'center'}
            , {field: 'age', title: '年龄', align:'center'}
            , {field: 'whiteCell', title: '白细胞X10^9/L', align:'center'}
            , {field: 'neutrophils', title: '中性粒细胞百分数', align:'center'}
            , {field: 'acidGranulocyte', title: '酸性粒细胞百分数',align:'center'}
            , {field: 'alkalineGranulocyte', title: '碱性粒百分数', align:'center'}
            , {field: 'monocyte', title: '单核百分数', align:'center'}
            , {field: 'lymphocyte', title: '淋巴百分数', align:'center'}
            , {field: 'acidGranulocyteAbs', title: '酸性绝对值X10^9/L	',align:'center'}
            , {field: 'neutrophilsAbs', title: '中性粒绝对值X10^9/L', align:'center'}
            , {field: 'monocyteAbs', title: '单核绝对值X10^9/L',align:'center'}
            , {field: 'lymphocyteAbs', title: '淋巴绝对值X10^9/L', align:'center'}
            , {field: 'alkalineGranulocyteAbs', title: '碱性绝对值X10^9/L', align:'center'}
            , {field: 'redBloodCell', title: '红细胞X10^12/L', align:'center'}
            , {field: 'hemoglobin', title: '血红蛋白g/L', align:'center'}
            , {field: 'hematocrit', title: '红细胞压积L/L', align:'center'}
            , {field: 'avgRedBloodCell', title: '平均红细胞体积fl', align:'center'}
            , {field: 'avgHemoglobinAmount', title: '平均血红蛋白量pg', align:'center'}
            , {field: 'avgHemoglobinConcentration', title: '平均血红蛋白浓度g/L', align:'center'}
            , {field: 'rbcWidth', title: 'RBC体积分布宽度%', align:'center'}
            , {field: 'rbcSd', title: 'RBC体积分布SD值fl', align:'center'}
            , {field: 'platelet', title: '血小板X10^9/L', align:'center'}
            , {field: 'plateletAggregation', title: '血小板压积L/L', align:'center'}
            , {field: 'avgPlateletVolume', title: '平均血小板体积fl', align:'center'}
            , {field: 'avgPlateletSd', title: '血小板分布SD值fl', align:'center'}
            , {field: 'bigPlateletRatio', title: '大型血小板比率', align:'center'}
            , {field: 'result', title: '是否胸腔积液', align:'center'}
        ]],

        done: function (res, curr, count) {
            console.log(res);
            console.log(count);
            console.log(curr);
        }
    });

    form.on('submit(sreach)',function(obj){
        var field = obj.field;
        Tool.send({
            url:'http://127.0.0.1:9094/train-model/model/train',
            data:field,
            type:'post',
            dataType:'json',
            success:function(res){
                if(res.type=='SUCCESS'){
                    layer.msg('已启动训练，即将前往数据监控页面！', {
                        offset: '15px'
                        , icon: 1
                        , time: 1000
                    }, function () {
                      window.parent.Index.openTrainWacht();
                        //location.href
                    });
                }
                console.log(res);
            }
        })
        return false;
    })
});