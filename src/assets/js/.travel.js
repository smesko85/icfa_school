var jqueryLoaded=jQuery;
if(jqueryLoaded=true){
    jQuery(document).ready(function($){
        var directions = $('#coming-to-serbia-by-plane ~ h4');
        directions.next().hide();
        directions.click(function(){$(this).next().slideToggle("");});

    })

}