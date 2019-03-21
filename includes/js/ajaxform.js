$(function() {
    forms = ["#contactForm", "#contactForm1"];

    for( var idx in forms){
        $( forms[idx] ).submit(function(event) {
            event.preventDefault();
            form_callback(this);
        });
    }

    function form_callback(formContact) {
        formId = '#' + formContact.id;
        formContact = $(formContact);
        var formData = formContact.serialize();
        $.ajax({
                type: formContact.attr('method'),
                url: formContact.attr('action'),
                data: formData,
                dataType: 'json',
                beforeSend: function() {
                    formContact.find('.alert-box').remove();
                    formContact.find('.global-errors').remove();
                    formContact.find('[type="submit"]').attr('disabled', 'disabled');
                }
            })
            .done(function(response){
                formContact.find('[type="submit"]').removeAttr('disabled');
                if (response.status === false) {
                    process_errors(formContact, response.errors);
                    if(response._token) {
                        addToken(response._token);
                    }
                    } else if(response.status === true)
                {
                    $('#successMsg').modal('show');
                    $('.form-control').val('');
                }
                else {
                    if (response.status == 'redirect') {
                        window.location.href = response.redirect;
                    } else {
                        if (response.status == 'data') {
                            formContact.html($(response.data));
                        }
                    }
                }
            })
            .fail(function(response){
                formContact.find('[type="submit"]').removeAttr('disabled');

                $('#failMsg').modal('show');

            });

        return false;
    }


    function process_errors(formContact, errors)
    {
        if (errors.global !== null && (errors.global).length !== 0 ){

            $(formId + ' .input-fields').before($("<div></div>").addClass('alert-box global-errors'));
            var globalErrorContainer = $(formId + " .alert-box.global-errors");
            var globalErrorUl = $("<ul class='error-center'></ul>");
            globalErrorContainer.append(globalErrorUl);
            for (var i in errors.global){
                $(formId + " ul.error-center").append("<li>" + errors.global[i] + "</li>");
            }
        }

        for (var field_id in errors.fields) {

            var fieldAlertContainer = $("<div></div>").addClass('alert-box');
            var fieldAlertUl = $("<ul class='error-left'></ul>");
            var zz = formContact.find('#' + field_id);
            if (zz.length > 0) {
                fieldAlertUl.append("<li>" + errors.fields[field_id] + "</li>");
                fieldAlertContainer.append(fieldAlertUl);
                zz.after(
                    fieldAlertContainer
                );
            }
        }
    }
    function addToken(token){
        for(var i in forms){
            $(forms[i] + ' #contact__token').attr("value", token);
        }
    }

});