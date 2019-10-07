Ext.require([
    '*'
]);

Ext.Loader.onReady(function () {


    /**
     * @todo SELECT DROPDOWN IN HEADER
     */

    /**
     * GETTING SSH KEY
     */
    $('.sshlink').click(function () {
        $.ajax({
            url: "/users/sshkey",
            method: "GET",
            success: function (response) {
                if (response.error != null) {
                    alert('Error', response.error);
                }
                else {
                    // window.down("#sshKey").setValue(obj.sshKey);
                    $('.sshkey').val(response.sshKey);
                }
            }
        });
    });
    /**
     * Enable Remote Repo
     */
    $('.enablessh').click(function () {
        var sshKey = $('.sshkey').val();
        var jsonData = JSON.stringify({ sshKey }.sshKey);
        $.ajax({
            url: 'users/sshkey',
            method: 'POST',
            jsonData: jsonData,
            success: function (response) {
                if (response.error != "") {
                    alert(response.error);
                    $('#sshview').modal('toggle');
                }
                else {
                    alert("Remote Repo Enabled");
                }
            }
        });
    });

    /**
     * LOGOUT BUTTON
     */

    $('.logout').click(function () {
        if (confirm("Are you sure you want to logout? Please note that all unsaved changes will be lost.")) {
            Ext.util.Cookies.set("sessionid", "");
            window.location.reload(true);
        }
    });

    /**
     * TABS (EXECUTION,TEST CASES,SCRIPTS,SETTINGS)
     */

    /**
     * EXECUTION
     */

    $.loadExecution = function (count) {
        if (count == 0) {

            $("#pageAppender").load("view/execution/ui/execution.html #execution", function () {
                $.getScript('view/execution/scripts/execution.js');
            });

            $.execution_script_load_count++;
        }
        else {
            $("#pageAppender").load("view/execution/ui/execution.html #execution");
        }
    }

    /**
     * SETTINGS
     */
    $.loadSettings = function (count) {
        if (count == 0) {

            $("#pageAppender").load("view/settings/ui/settings.html #settings", function () {
                $.getScript('view/settings/scripts/settings.js');
            });

            $.settings_script_load_count++;
        }
        else {
            $("#pageAppender").load("view/settings/ui/settings.html #settings");
        }
    }

    /**
     * execution button click event
     */
    $.execution_script_load_count = 0;
    $(document).on('click', '.execution', function (event) {

        $('#pageAppender').empty();
        $.loadExecution($.execution_script_load_count);

    });


    /**
     * settings button click event
     */
    $.settings_script_load_count = 0;
    $(document).on('click', '.settings', function (event) {
        $('#pageAppender').empty();
        $.loadSettings($.settings_script_load_count);
    });

});