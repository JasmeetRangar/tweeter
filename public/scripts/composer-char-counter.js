
$(document).ready(function() {
  const inputBox = $( "#tweet-text" );
  inputBox.on("input", function (event) {
    let counter = 140 - this.value.length;
     $(this).parent().children().children(".counter").val(counter);
     if (counter < 0) {
      $(this).parent().children().children(".counter").css( "color", "red");
     } else {
      $(this).parent().children().children(".counter").css( "color", "black");
     }
  });
  
});
