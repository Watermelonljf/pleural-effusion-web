/**
 * Created by ljianf on 2018/3/30.
 */
String.prototype.endWith=function(endStr){
    var d=this.length-endStr.length;
    return (d>=0&&this.lastIndexOf(endStr)==d)
}
layui.config({
    base: './lib/layui/' //静态资源所在路径
}).extend({
    index: './lib/index' //主入口模块
}).use(['index', 'user'], function(){
    var $ = layui.$
        ,setter = layui.setter
        ,admin = layui.admin
        ,form = layui.form
        ,router = layui.router();

    form.render();
    form.verify({
        pass: [/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/, '密码须含有数字,大小写字母且长度为6到16位。']
        ,content: function(value){
            layedit.sync(editIndex);
        }
    });

    //提交
    form.on('submit(LAY-user-reg-submit)', function(obj){
        var field = obj.field;

        //确认密码
        if(field.password !== field.repass){
            return layer.msg('两次密码输入不一致');
        }

        $.ajax({
            url:'http://localhost:9094/user-platform/user/register',
            data:field,
            type:'post',
            dataType:'json',
            success:function(res){
                if(res.type=='SUCCESS'){
                    if(field.email.endWith("163.com")){
                        window.open("http://mail.163.com");
                    }else if(field.email.endWith("qq.com")){
                        window.open("http://mail.qq.com");
                    }
                }
                console.log(res);
            }
        });
        return false;
    });
});