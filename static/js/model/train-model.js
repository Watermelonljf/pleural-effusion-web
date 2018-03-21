layui.use('table', function () {
    var table = layui.table;

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
        //url: 'http://www.layui.com/demo/table/user/',
       /* error:function(e){
            layui.msg(e);
        },*/
        cellMinWidth: 80,//全局定义常规单元格的最小宽度，layui 2.2.1 新增
        cols: [[ //标题栏
            {field: 'id', title: 'ID', width: 80, sort: true}
            , {field: 'username', title: '用户名', width: 120}
            , {field: 'email', title: '邮箱', minWidth: 150}
            , {field: 'sign', title: '签名', minWidth: 160}
            , {field: 'sex', title: '性别', width: 80}
            , {field: 'city', title: '城市', width: 100}
            , {field: 'experience', title: '积分', width: 80}
        ]]
        , data: [{
            "id": "10001"
            , "username": "杜甫"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "116"
            , "ip": "192.168.0.8"
            , "logins": "108"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10002"
            , "username": "李白"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "12"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
            , "LAY_CHECKED": true
        }, {
            "id": "10003"
            , "username": "王勃"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "65"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10004"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "666"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10005"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "86"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10006"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "12"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10007"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "16"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10008"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "106"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        },{
            "id": "10008"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "106"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        },{
            "id": "10008"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "106"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        },{
            "id": "10008"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "106"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        },{
            "id": "10008"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "106"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        },{
            "id": "10008"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "106"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }],

        done: function (res, curr, count) {
            console.log(res);
            console.log(count);
            console.log(curr);
        }
    });
});