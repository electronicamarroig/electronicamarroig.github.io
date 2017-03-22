contactForm = {

    message : "",

    init: function ()
    {
        $('#enviar').click(function(event) {
            event.preventDefault();

            contactForm.prepare();

            if (contactForm.isValid())
            {
                contactForm.send();
            }
            else
            {
                contactForm.show(contactForm.message, 'error');
            }
        });
    },

    isValid : function ()
    {
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;

        email = $('#femail').val().trim();
        if ($('#fname').val().trim() === "")
        {
            contactForm.message = "Por favor, indica tu nombre.";
            return false;
        }
        else if (email === "" || !re.test(email))
        {
            contactForm.message = "Por favor, indica un email válido.";
            return false;
        }
        else if ($('#fcomment').val().trim() === "")
        {
            contactForm.message = "¿No nos vas a preguntarnos nada?";
            return false;
        }

        contactForm.message = "";
        return true;
    },

    send: function ()
    {
        $.ajax({
            type: 'POST',
            url: $('#contactform').attr('action'),
            data: $('#contactform').serialize(),
            dataType: "json",
            success: function(data)
            {
                contactForm.show(data.message, data.status);
            }
        });
    },

    prepare: function ()
    {
        $('#loading').show();
        $('#result').empty();
    },

    show: function (message, status)
    {
        var type = (status === 'ok') ? 'success' : 'warning';

        $('#loading').hide();
        
        $('#result').html(
            '<div data-alert class="alert-box ' + type + '">' +
                message +
            '<a href="#" class="close">&times;</a></div>'
        );
        $('#result').foundation('alert');
    }
}

