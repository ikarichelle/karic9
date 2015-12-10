$(document).ready(function() {
    
    getCarMakes();
    
    $('#makes').change(function() {
        getCarModels($(this).val());
    });
    
    $('#models').change(function() {
        getCarEngines($('#makes').val(), $(this).val());
    });
    
    var name = "";
    var zipcode = "";
    
    $('.ajax-fun').submit(function(event) {
        event.preventDefault();
        
        name = $('#name').val();
        zipcode = $('#zipcode').val();
        
        var allthere = validate(event);
        var bestMode = ($('#best-phone').prop('checked')) ? 'phone' : 'email';
    
        var data = {
            action: 'save',
            make: $('#makes').val(),
            model: $('#models').val(),
            engine: $('#engines').val(),
            name: name,
            phone: $('#phone').val(),
            email: $('#email').val(),
            zipcode: zipcode,
            best: bestMode,
        };
        
        $.ajax({
            url: 'handler.php',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                console.log(textStatus);
                
                getGeoCode(data.zipcode);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error!');
                console.log(textStatus);
                console.log(errorThrown);
                //do something here on error
            }
        });
        
    });
    
    
    
    function getCarMakes()
    {
        $.ajax({
            url: 'handler.php',
            type: 'POST',
            data: {
                action: 'makes',
            },
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                
                var makes = '<option value="">Choose Make...</option>';
                
                $.each(data, function(i, item) {
                    makes += '<option value="' + data[i][0] + '">' + data[i][1] + '</option>';
                });
                
                $('#makes').html(makes);
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error!');
                console.log(textStatus);
                console.log(errorThrown);
                //do something here on error
            }
        });
    }
    
    function getCarModels(makeId)
    {
        $.ajax({
            url: 'handler.php',
            type: 'POST',
            data: {
                action: 'models',
                make: makeId,
            },
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                
                var models = '<option value="">Choose Model...</option>';
                
                $.each(data, function(i, item) {
                    models += '<option value="' + data[i][0] + '">' + data[i][1] + '</option>';
                });
                
                $('#models').prop("disabled", false);
                $('#models').html(models);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error!');
                console.log(textStatus);
                console.log(errorThrown);
                //do something here on error
            }
        });
    }
    
    function getCarEngines(makeId, modelId)
    {
        console.log("Make ID:");
        console.log(makeId);
        
        console.log("Model ID:");
        console.log(modelId);
        
        $.ajax({
            url: 'handler.php',
            type: 'POST',
            data: {
                action: 'engines',
                make: makeId,
                model: modelId,
            },
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                
                var models = '<option value="">Choose Engine...</option>';
                
                $.each(data, function(i, item) {
                    models += '<option value="' + data[i][0] + '">' + data[i][1] + '</option>';
                });
                
                $('#engines').prop("disabled", false);
                $('#engines').html(models);
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error!');
                console.log(textStatus);
                console.log(errorThrown);
                //do something here on error
            }
        });
    }
    
     function validate(event)
    {
        if ($('#makes').val().length === 0) {
            $('.error').hide();
            $('.error.make').show();
            return false;    
        }
        
        if ($('#models').val().length === 0) {
            $('.error').hide();
            $('.error.model').show();
            return false;    
        }
        
        if ($('#engines').val().length === 0) {
            $('.error').hide();
            $('.error.engine').show();
            return false;    
        }
        
        if ($('#name').val().length === 0) {
            $('.error').hide();
            $('.error.name').show();
            return false;    
        }
        
        if ($('#phone').val().length === 0) {
            $('.error').hide();
            $('.error.phone').show();
            return false;    
        }
        
        if ($('#email').val().length === 0) {
            $('.error').hide();
            $('.error.email').show();
            return false;    
        } else if (!emailValid($('#email').val())) {
            $('.error').hide();
            $('.error.notvalid').show();
            return false;
        }
        
        if ($('#zipcode').val().length === 0) {
            $('.error').hide();
            $('.error.zipcode').show();
            return false;    
        }
        
        return true;
    }
    
    function emailValid(email)
    {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(email);
    };
    
    function getGeoCode(zipcode)
    {
        var data = {
            action: 'geocode',
            zipcode: zipcode,
        };
        
        $.ajax({
            url: 'handler.php',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                
                var greeting = "Thank you " + name + "!";
                var zipState = "Here are the closest car dealerships to your " + zipcode + " zipcode.";
                var list = "";
                
                $.each(data, function(key, value) {
                    list += "<ul class='dealer'>";
                    list += "<li class='name'>"+ value.details.name +"</li>";
                    list += "<li class='addy'>"+ value.details.address + "</li>";
                    list += "<li class='phone'>" + value.details.phone + "</li>";
                    list += "<li class='url'><a href='" + value.details.url + "' target='_blank'>" + value.details.url + "</a></li>";
                    list += "<li class='rating'>Rating: " + value.details.rating + "</li>";
                    list += "</ul>";
                });
                
                $('.ajax-fun').hide();
                $('h1.greeting').html(greeting).show();
                $('h2.zip-statement').html(zipState).show();
                $('.list').html(list).show();
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error!');
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
    
});