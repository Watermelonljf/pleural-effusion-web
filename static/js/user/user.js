/**
 * Created by ljianf on 2018/3/21.
 */
layui.use(['table','util','layer'],function () {
    var table= layui.table;
    var $ = layui.$;
    table.render({
        elem: '#datagrid',
        url:'http://127.0.0.1:9094/user-platform/user/list',
        method:'get',
        loading: true,
        text: {
            none: '暂无相关数据'
        },
        page: true,
        where: {},
        request: {
            pageName: 'pageIndex', //页码的参数名称，默认：page
            limitName: 'pageSize'
        },
        cellMinWidth: 80,
        cols: [[
            {type:'checkbox'},
            {type: 'numbers', title: '序号', templet: '#indexTpl',width:70,align:'center'},
            {field: 'username', title: '用户名',align:'center',event:'updateRole'},
            {field: 'age', title: '年龄',width:60,align:'center'},
            {field: 'sex', title: '性别',width:60,align:'center'},
            {field: 'telphone', title: '联系方式',align:'center'},
            {field: 'email', title: '邮箱',width:170,align:'center'},
            {field: 'roleId', title: '角色',width:60,align:'center',event:'updateRole'},
            {field: 'locked', title: '锁定',width:60,align:'center',event:'updateState'},
            {field: 'isActive', title: '激活',width:60,align:'center'},
            {field: 'available', title: '有效用户',width:100,align:'center',event:'updateAvailable'},
            {field: 'createTime', title: '创建时间',align:'center',templet: "<div>{{layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</div>"},
            {field: 'updateTime', title: '更新时间',align:'center',templet: "<div>{{layui.util.toDateString(d.updateTime, 'yyyy-MM-dd HH:mm:ss')}}</div>"},
            {fixed: 'right', width:100, title: '操作', align:'center', toolbar: '#barDemo'}
            ]],
    });

    //监听单元格事件
    table.on('tool(datagrid)', function(obj){
        var data = obj.data;
        if(obj.event === 'updateDesc'){
            layer.prompt({
                formType: 2
                ,title: '修改 角色 为 ['+ data.role +'] 的描述信息'
                ,value: data.description
            }, function(value, index){
                layer.close(index);


                obj.data.description=value;
                //更新数据库
                User.updateUser(obj.data);
                //同步更新表格和缓存对应的值
                obj.update({
                    description: value
                });
            });
        }else if(obj.event === 'updateRole'){
                layer.prompt({
                    formType: 2
                    ,title: '修改 角色 为 ['+ data.role +'] 的角色名字'
                    ,value: data.role
                }, function(value, index){
                    layer.close(index);
                    obj.data.role=value;
                    User.updateRole(obj.data);
                    //同步更新表格和缓存对应的值
                    obj.update({
                        role: value
                    });
                });
        }else if(obj.event === 'updateState'){
            layer.prompt({
                formType: 2
                ,title: '修改 角色 为 ['+ data.role +'] 的状态'
                ,value: data.available
            }, function(value, index){
                layer.close(index);
                //同步更新表格和缓存对应的值
                obj.data.available=value;
                User.updateUser(obj.data);
                obj.update({
                    available: value
                });

            });
        } else if(obj.event === 'del'){
            layer.confirm('真的删除这条数据吗？', function(index){
                var id=[];
                id.push(obj.data.id);
                User.batchDel(id);
                layer.close(index);
            });
        }
    });

    //按钮绑定事件
    active = {
        batchDel: function(){ //获取选中数据
            var checkStatus = table.checkStatus('datagrid')
                ,data = checkStatus.data;
            if(data.length==0){
                layer.alert("请选择需要删除的记录！");
                return;
            }

            layer.confirm('真的删除这些数据吗？', function(index){
                var ids = new Array();
                for(var i=0;i<data.length;i++){
                    ids.push(data[i].id);
                }
                User.batchDel(ids)
                layer.close(index);
            });
        },
        addUser:function(){
            var w = ($(window).width() * 0.45);
            var h = ($(window).height() * 0.6);
            layer.open({
                type: 2,
                area: [w + 'px', h + 'px'],
                fix: false, //不固定
                maxmin: true,
                shadeClose: true,
                shade: 0.4,
                title: '添加角色',
                content: '../../../pages/user/addUser.html',
                end: function(index, layero){
                    table.reload("datagrid");
                    return false;
                }
            });
        }
    };

    $('.weadmin-block .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    var User={

        updateUser:function(data){
            Tool.send({
                url:'http://127.0.0.1:9094/user-platform/role/update',
                data:{id:data.id,role:data.role,description:data.description,available:data.available},
                type:'post',
                dataType:'json',
                async:true,
                success:function(result){
                    if(result.type=='SUCCESS'){
                        layer.msg('修改角色成功！', {
                            offset: '15px'
                            , icon: 1
                            , time: 1000
                        }, function () {
                            table.reload("datagrid");
                        });
                    }else{
                        layer.msg('修改角色失败！', {
                            offset: '15px'
                            , icon: 1
                            , time: 1000
                        }, function () {
                            table.reload("datagrid");
                        });
                    }
                }
            });
        },


        batchDel:function(data){
            Tool.send({
                url:'http://127.0.0.1:9094/user-platform/user/delete',
                data:{idsJson:JSON.stringify(data)},
                type:'post',
                dataType:'json',
                async:true,
                success:function(result){
                    if(result.type=='SUCCESS'){
                        layer.msg('删除用户成功！', {
                            offset: '15px'
                            , icon: 1
                            , time: 1000
                        }, function () {
                            table.reload("datagrid");
                        });
                    }else{
                        layer.msg('删除用户失败！', {
                            offset: '15px'
                            , icon: 1
                            , time: 1000
                        }, function () {
                            table.reload("datagrid");
                        });
                    }
                }
            });
        }

    }
});

