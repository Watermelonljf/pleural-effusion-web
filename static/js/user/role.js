/**
 * Created by ljianf on 2018/3/21.
 */
layui.use('table',function () {
    var table = layui.table;
    table.render({
        elem: '#datagrid',
        skin:'row',
        /*url:'',
        method:'post',*/
        loading: true,
        text: {
            none: '暂无相关数据'
        },
        page: true,
        method: 'post',
        where: {},
        request: {
            pageName: 'pageIndex', //页码的参数名称，默认：page
            limitName: 'pageSize'
        },
        cellMinWidth: 80,
        cols: [[
            {type: 'number', title: '序号', templet: '#indexTpl', sort: true},
            {field: 'role', title: '角色名',align:'center'},
            {field: 'resource', title: '权限规则',align:'center'},
            {field: 'description', title: '描述',align:'center'},
            {field: 'available', title: '状态',align:'center'}
        ]],
        data:[{"role":"超级管理员",resource:"boom","description":"fasdf",available:"dfsa"}]
    });
});