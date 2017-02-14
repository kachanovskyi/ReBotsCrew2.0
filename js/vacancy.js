var validateApplyForm = function() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if( document.applyForm.Name.value == "" ) {
        customAlert("Please provide your name", 2);
        document.applyForm.Name.focus();
        return false;
    }

    if( document.applyForm.Email.value == "" )
        if(!re.test(document.applyForm.Email.value)) {
            customAlert("Please provide correct e-mail", 2);
            document.applyForm.Email.focus();
            return false;
        }

    if( document.applyForm.Project.value == "" ) {
        customAlert("Please provide project description", 2);
        document.applyForm.Project.focus();
        return false;
    }

    document.applyForm.submit();
};
