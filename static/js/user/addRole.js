/**
 * Created by Watermelon_R on 2018/4/9.
 */
layui.use(['form', 'jquery', 'element'], function () {
    var form = layui.form;
    var $ = layui.$;
    var element = layui.element;
    form.render(null, "component-form-element");
    Tool.send({
        url: 'http://127.0.0.1:9094/user-platform/resource/list/all',
        data: {},
        async: false,
        type: 'get',
        success: function (result) {
            var html = template('resources', result);
            $("#resource-list").html(html);
            form.render('checkbox');
        }
    });

    form.on('submit(component-form-element)', function (data) {
        var res = [];
        var newData = {};
        newData.description = data.field.description;
        newData.role = data.field.role;
        var checks = $("#resource-list input");
        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                res.push(checks[i].name);
            }
        }

        newData.resource = JSON.stringify(res);
        var available = $("#available");
        newData.available = 0
        if (available[0].checked) {
            newData.available = 1
        }

        Tool.send({
            url: 'http://127.0.0.1:9094/user-platform/role/save',
            data: newData,
            async: false,
            type: 'post',
            success: function (result) {
                if (result.type === 'SUCCESS') {
                    layer.msg('添加角色成功！', {
                        offset: '15px'
                        , icon: 1
                        , time: 1000
                    }, function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    });

                } else {
                    layer.msg('添加角色失败！', {
                        offset: '15px'
                        , icon: 1
                        , time: 1000
                    }, function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    });
                }
            }
        });
        return false;
    })


})