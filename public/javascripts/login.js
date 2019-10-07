Ext.require([
    '*'
]);

Ext.Loader.onReady(function() {

    Ext.select(".login").on('click',function(){

        var username = $('.username').val()
        var password = $('.password').val();
        var data = {username,password};
        var jsonData = JSON.stringify(data);

        Ext.Ajax.request({
            url : '/login',
            method : 'POST',
            jsonData : jsonData,
            success: function(response, action) {
                var obj = Ext.decode(response.responseText);
                if(obj.error == null){
                   // console.log(response);
                   window.location.href=obj.redirect;
                }
                else{
                    Ext.get("error").update(obj.error);
                }
            },
            failure: function(response, action) {
            }
        });
        
    });


// simple.render(bd);
// var allFields = simple.form.getFields();
// var username = Ext.util.Cookies.get("username");
// if (username == null){
//     allFields.getAt(0).focus();
// }
// else{
//     allFields.getAt(0).setValue(username);
//     allFields.getAt(1).focus();
// }

});


