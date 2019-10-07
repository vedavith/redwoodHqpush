
Ext.require([
    '*'
])

$(document).ready(function () {


    $(document).on('click', '.machines', function (event) {

        $(document).find('#executionAppender').load('view/execution/ui/machines.html #machineLoader', function () {
            $('.UpdateDataDiv').hide();
            $.machinesGetter();
        });
    });



    $.machinesGetter = function () {
        $.ajax({
            url: '/machines',
            method: 'GET',
            success: function (response) {
                if (response.success) {
                    var append_data = "";
                    $.each(response.machines, function (key, value) {
                        append_data += "<tr class='get_data'>";
                        append_data += "<td><a href='javascript:vncToMachine(\"" + value.host + "\",\"" + value.vncport + "\")'>" + value.host + "</a></td>";
                        append_data += "<td>" + value.port + "</td>";
                        append_data += "<td>" + value.vncport + "</td>";
                        append_data += "<td>" + value.maxThreads + "</td>";
                        append_data += "<td>" + value.tags + "</td>";
                        append_data += "<td>" + value.roles + "</td>";
                        append_data += "<td>" + value.description + "</td>";
                        append_data += "<td><button type='button' class='btn btn-sm btn-primary editHost' data-uid='" + value._id + "'><i class='far fa-edit'></i></button>&nbsp&nbsp<button type='button' class='btn btn-sm btn-danger deleteHost' data-uid='" + value._id + "'> <i class='fas fa-trash'></i> </button></td>";
                        append_data += "<tr>";
                    });

                    $(document).find(".get_data").remove();
                    $(".dataTables_empty").hide();
                    $(document).find("#tables").append(append_data);
                }
            }
        });
    }


    /**
     * PUT CALLER
     */
    $.machinesPut = function (uid, dataObject) {
        return $.ajax({
            url: "machines/" + uid,
            method: 'PUT',
            data: dataObject,
        });
    }



    /**
     * @todo POST
     */


    $(document).on('click', '.addHost', function (event) {
        var roles = $(".roles").val();
        var host = $('.hostname').val();
        var vncport = $('.vncport').val();
        var machineVars = [null];
        var port = $('.port').val();
        var maxThreads = $('.maxthreads').val();
        var description = $('.description').val();
        var macAddress = null;
        var state = null;
        var takenThreads = "0";

        var dataObject = { roles, host, vncport, machineVars, port, maxThreads, description, macAddress, state, takenThreads };

        $.ajax({
            url: '/machines',
            method: 'POST',
            data: dataObject,
            success: function (response) {
                alert('Created New Machine');
                $('#addMachine').modal('toggle');
                $.machinesGetter();
            }
        });
    });


    /**
     * @todo PUT 
     */

    $.getUid = undefined;
    $(document).on('click', '.editHost', function () {
        var uid = $(this).data('uid');
        $.ajax({
            url: "/machines/" + uid,
            method: 'GET',
            success: function (response) {

                $('.InsertDataDiv').hide();
                $('.UpdateDataDiv').show();

                var data = response.machines[0];

                $('.roles').val(data.roles);
                $('.hostname').val(data.host);
                $('.vncport').val(data.vncport);
                $('.port').val(data.port);
                $('.maxthreads').val(data.maxThreads);
                $('.description').val(data.description);
                $.getUid = uid;
                $('#addMachine').modal('toggle');
            }
        });
    });

    $(document).on('click', '.updateHost', function (event) {
        var uid = $.getUid;
        var roles = $(".roles").val();
        var host = $('.hostname').val();
        var vncport = $('.vncport').val();
        var machineVars = [null];
        var port = $('.port').val();
        var maxThreads = $('.maxthreads').val();
        var description = $('.description').val();
        var macAddress = null;
        var state = null;
        var takenThreads = "0";

        var dataObject = { roles, host, vncport, machineVars, port, maxThreads, description, macAddress, state, takenThreads };
        var result = $.machinesPut(uid, dataObject);
        result.done(function (response) {
            alert('updated');
            $.machinesGetter();
            $('#addMachine').modal('toggle');
        });
    });


    /**
     * DELETE MACHINE
     */
    $(document).on('click', '.deleteHost', function (event) {
        if (confirm("Are you sure to delete this ?")) {
            var uid = $(this).data('uid');
            $.ajax({
                url: "machines/" + uid,
                method: 'DELETE',
                success: function (response) {
                    alert("Machine Deleted");
                    $.machinesGetter();
                }
            });
        }
    });

    //END OF MACHINES
    /*************************************************************************************************************/

    //VARIABLES
    /**************************************************************************************************************** */

    $(document).on('click', '.variables', function (event) {
        $(document).find('#executionAppender').load('view/execution/ui/variables.html #variableLoader', function () {
            $('.UpdateVariableDiv').hide();
            $.variableData();
        });
    });

    /**
    * @todo GET
    * GET CALLER FOR VARIABLES
    */
    $.variableData = function () {
        $.ajax({
            url: '/variables',
            method: 'GET',
            success: function (response) {
                //console.log(response);
                if (response.success) {
                    var append_data = "";
                    $.each(response.variables, function (key, data) {
                        var value = undefined
                        if (data.value.toString() == "<NULL>") {
                            value = "<code> NULL </code>";
                        }
                        else {
                            value = data.value;
                        }

                        var flagger = undefined;

                        if (data.taskVar == "true") {
                            flagger = "checked='checked'";
                        }
                        else {
                            flagger = null;
                        }

                        append_data += "<tr class='get_data'>";
                        append_data += "<td><input type='checkbox' style='zoom:200% !important' " + flagger + " disabled></td>"
                        append_data += "<td>" + data.tag.join(',') + "</td>";
                        append_data += "<td>" + data.name + "</td>";
                        append_data += "<td>" + value + "</td>";
                        append_data += "<td>" + data.possibleValues.join(',') + "</td>";
                        append_data += "<td><button type='button' class='btn btn-sm btn-primary editVariables' data-uid='" + data._id + "'><i class='far fa-edit'></i></button>&nbsp&nbsp<button type='button' class='btn btn-sm btn-danger deleteVariables' data-uid='" + data._id + "'> <i class='fas fa-trash'></i></button></td>";
                        append_data += "</tr>";
                    });

                    $(document).find(".get_data").remove();
                    $(".dataTables_empty").hide();
                    $(document).find("#tables").append(append_data);
                }
            }
        });
    }

    /**
     * @TODO POST
     * POST CALLER FOR VARIABLES
     */

    $.variablesPost = function (dataObject) {
        return $.ajax({
            url: '/variables',
            method: 'POST',
            data: dataObject
        });
    }

    /**
     * @TODO PUT
     * PUT CALLER FOR VARIABLES
     */

    $.variablePut = function (uid, dataObject) {
        return $.ajax({
            url: '/variables/' + uid,
            method: 'PUT',
            data: dataObject
        });
    }

    /**
     * @TODO DELETE
     * DELETE FOR VARIABLES
     */

    $.variableDelete = function (uid) {
        return $.ajax({
            url: '/variables/' + uid,
            method: 'DELETE',
        });
    }

    /**
    * @TODO GET
    * GET FOR VARIABLES
    */
    $.variablesGet = function (uid) {
        return $.ajax({
            url: '/variables/' + uid,
            method: 'GET'
        });
    }

    //POST VARIABLES DATA

    $(document).on('click', '.addVariables', function (event) {
        var taskVar = undefined;

        var tag = [$('.tags').val()];
        var name = $('.name').val();
        var value = $('.value').val();

        if ($('.taskVars').is(':checked')) {
            taskVar = new Boolean(JSON.parse("true"));
        }
        else {
            taskVar = new Boolean(JSON.parse("false"));
        }

        var possibleValues = $('.possibleValues').val();
        possibleValues = possibleValues.split(",");
        var project = Ext.util.Cookies.get("project");

        var dataObject = { tag, name, value, taskVar, possibleValues, project };
        console.log(dataObject);

        var ajaxReturn = $.variablesPost(dataObject);

        ajaxReturn.done(function (response) {
            if (response.success) {
                alert('Created Variables');
                $('#addvariable').modal('toggle');
                $.variableData();
            }
        }).fail(function (response) {
            console.error(response);
        });

    });


    //DELETE VARIABLES DATA

    $(document).on('click', '.deleteVariables', function (event) {
        if (confirm("Are you sure to delete ?")) {
            var uid = $(this).data('uid');
            var ajaxResult = $.variableDelete(uid);
            ajaxResult.done(function (response) {
                if (response.success) {
                    alert("Variable Deleted.");
                    $.variableData();
                }
            }).fail(function (response) {
                console.log(response);
            });
        }
    });

    $.getUid = undefined;
    //GET AND PUT DATA
    $(document).on('click', '.editVariables', function (event) {
        //@todo:get data on id and populate in modal
        var uid = $(this).data('uid');
        var ajaxResult = $.variablesGet(uid);

        ajaxResult.done(function (response) {

            console.log(response);

            $('.InsertVariableDiv').hide();
            $('.UpdateVariableDiv').show();

            if (response.success) {
                var data = response.variables[0];
                if (data.taskVar) {
                    $('.taskVars').prop("checked", true);
                }
                else {
                    $('.taskVars').prop("checked", false);
                }

                $('.tags').val(data.tag);
                $('.name').val(data.name);
                $('.value').val(data.value);
                $('.possibleValues').val(data.possibleValues);
            }

            $.getUid = uid;

            $('#addvariable').modal('toggle');
        }).fail(function (response) {
            console.error(response);
        });

    });

    $(document).on('click', '.updateVariables', function (event) {
        //@todo:put form data back to the database

        var taskVar = undefined;

        var tag = [$('.tags').val()];
        var name = $('.name').val();
        var value = $('.value').val();

        if ($('.taskVars').is(':checked')) {
            taskVar = new Boolean(JSON.parse("true"));
        }
        else {
            taskVar = new Boolean(JSON.parse("false"));
        }

        var possibleValues = $('.possibleValues').val();
        possibleValues = possibleValues.split(",");
        var project = Ext.util.Cookies.get("project");

        var dataObject = { tag, name, value, taskVar, possibleValues, project };

        var ajaxResult = $.variablePut($.getUid, dataObject);
        ajaxResult.done(function (response) {
            if (response.success) {
                alert('Variables Updated');

                //get updated data
                $.variableData();

                //reset modal
                $('#addvariable').modal('toggle');
                $('.InsertVariableDiv').show();
                $('.UpdateVariableDiv').hide();

                //reset data
                $('.taskVars').prop("checked", false);
                $('.tags').val("");
                $('.name').val("");
                $('.value').val("");
                $('.possibleValues').val("");

            }
        }).fali(function (response) {
            console.error(response);
        });

    });

    //END OF VARIABLES
    /*****************************************************************************************/

    //START OF TESTSETS
    /*****************************************************************************************/

    $(document).on('click', '.testsets', function (event) {
        $(document).find('#executionAppender').load('view/execution/ui/testsets.html #testsetLoader', function () {
            $.testSetsData();
        });
    });

    $.testSetsData = function(){
        $.ajax({
            url: "/testsets",
            method: "GET",
            success : function(response){
                if(response.success)
                {
                    
                    var dataSetsArrayStore = new Array();
                    var dataArray = [];


                    var append_data = "";
                    var data = response.testsets;

                    for(var i = 0; i <= data.length - 1;)
                    {
                        Object.entries(data[i]).forEach(([key,value]) => {
                            dataArray[key] = value;
                        });

                        dataSetsArrayStore.push(dataArray);
                        i++;
                    }
                    console.info(dataSetsArrayStore);
                }
            },
            error : function(response){
                console.error(response);
            }
        });
    }

    //END OF TESTSETS
    /******************************************************************************************/

});