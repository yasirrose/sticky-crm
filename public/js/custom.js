function changeType(){
var type = $("#password").attr('type');
switch (type) {
    case 'password':
    {
        $("#password").attr('type', 'text');
        $(".type-text").show();
        $(".type-pass").hide();
        return;
    }
    case 'text':
    {
        $("#password").attr('type', 'password');
        $(".type-text").hide();
        $(".type-pass").show();
        return;
        }
    }

}
function changeTypeConfirm(){
    var type = $("#password-confirm").attr('type');
    switch (type) {
        case 'password':
        {
            $("#password-confirm").attr('type', 'text');
            $(".type-text-confirm").show();
            $(".type-pass-confirm").hide();
            return;
        }
        case 'text':
        {
            $("#password-confirm").attr('type', 'password');
            $(".type-text-confirm").hide();
            $(".type-pass-confirm").show();
            return;
            }
        }
    
    }
