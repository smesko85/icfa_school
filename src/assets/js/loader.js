var title = document.title;
var regex = /Travel.*/;
if(regex.test(title)){
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/travel.js';
    document.head.appendChild(script);
} 

regex = /Registration.*/;
if(regex.test(title)){
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/jquery.form.min.js';
    document.head.appendChild(script);

    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/jquery.validate.min.js';
    document.head.appendChild(script);    

    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/mailchimp.js';
    document.head.appendChild(script);    
} 