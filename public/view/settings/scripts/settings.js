Ext.require([
    '*'
]);

$(document).ready(function () {
    $(document).on('click', '.settings', function (event) {
        $(document).find('#settingsAppender').load('view/settings/ui/settings.html #settings',
            function () { $.getScript('view/settings/scripts/settings.js') });
    });
});


$(document).on('click', '.users', function (event) {
    $(document).find('#settingsAppender').load('view/settings/ui/users.html #users')

});



$(document).on('click', '.projects', function (event) {

    $(document).find('#settingsAppender').load('view/settings/ui/projects.html #projects',function(){
        $.projectsGetter();
    })

});


/* GET */


$.projectsGetter = function () {
    $.ajax({
        url: '/projects',
        method: 'GET',
        success: function (response) {
            if (response.success) {
                console.log(response.projects);
                var append_data = "";
                $.each(response.projects, function (key, value) {
                    append_data += "<tr class='get_data'>";
                    append_data += "<td>" + value.name + "</td>";
                    append_data += "<td><button type='button' class='btn btn-sm btn-primary editprojects' data-uid='" + value._id + "'><i class='far fa-edit'></i></button>&nbsp&nbsp<button type='button' class='btn btn-sm btn-danger deleteProjects' data-uid='" + value._id + "'> <i class='fas fa-trash'></i></button></td>";
                    append_data += "<tr>";
                });

                $(document).find(".get_data").remove();
                $(".dataTables_empty").hide();
                $(document).find("#tables").append(append_data);
            }
        }
    });
}







$(document).on('click', '#checkRepo', function (event) {
    $('.repoUrl').toggle();
});

/* POST*/

$(document).on('click', '.addProject', function (event) {
    var name = $(".projectName").val();
    var language= 'test';
    var template = $('#projectTemplate').val();
    var externalRepo = 'on';
    var externalRepoURL = $('.url').val();
    var res = { name,language, template, externalRepo, externalRepoURL };
    console.log(res);


    $.ajax({
        url: '/projects',
        method: 'POST',
        data: res,
        success: function (response) {

            alert('Created new project');
            $('#addProjects').modal('toggle');
            $.projectsGetter();

        }
    });
});


$(document).ready(function () {
    $(document).on('click', '.email', function (event) {

        $(document).find('#settingsAppender').load('view/settings/ui/email.html #email')

    });
});
