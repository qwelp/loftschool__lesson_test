$(document).ready(function(){
    module.ready();
});
var module = (function() {
    var funcCheck = function(elem) {
        var block = elem.closest(".course__item"),
            items = $(".course__item"),
            checkbox = block.find(".course__item_check");

        elem.addClass("course__item_label_active");

        if(checkbox.is(':checked')){
            block.find(".course__item_label_text").addClass("course__item_label_check");
            block.find(".course__item_wrap").addClass("course__item_row_active");
            setTimeout(function() {
                block.fadeOut(function(){
                    block.remove();
                    if(items.length == 1) {
                        $(".course__check").css("display", "table");
                        $(".course__wrap").css("display", "none");
                    }
                });
            });
        }
    };

    return {
        ready: function() {
            $("body").on("click", ".course__item_label", function(e){
                funcCheck($(this));
            });
        }
    };
}());