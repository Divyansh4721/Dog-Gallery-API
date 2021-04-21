
let dropdown = $("#doglists");
let allowSubmit = true;

dropdown.change(function () {
  allowSubmit = true;
});
$.get('https://dog.ceo/api/breeds/list/all',function (data){
  let a=data;
  for (let i = 0; i < Object.keys(a.message).length; i++) {
    $("#doglists").append('<option value="'+Object.keys(a.message)[i]+'">'+Object.keys(a.message)[i]+'</option>');
  }
})
$('#doglists').change(function () {
  $.get('https://dog.ceo/api/breed/'+$("#doglists").val()+'/list',function (data){
    let a=data;
    if(a.message.length!=0){
      if ($("#dogsublists").length>0) {
        $("#dogsublists")[0].innerHTML='';
        for (let i = 0; i < a.message.length; i++) {
          $("#dogsublists").append('<option value="'+a.message[i]+'">'+a.message[i]+'</option>');
        }
      }
      else {
        let data='<select id="dogsublists"></select>';
        $('#doglists').after(data);
        for (let i = 0; i < a.message.length; i++) {
          $("#dogsublists").append('<option value="'+a.message[i]+'">'+a.message[i]+'</option>');
        }
      }
    }
    else {
      if ($("#dogsublists").length>0) {
        $("#dogsublists").remove();
      }
    }
  });
});
$("#button").click(function() {
  if(allowSubmit==true){
    $('#center').empty();
    let data='';
    if ($("#dogsublists").val()) {
      data='https://dog.ceo/api/breed/'+$("#doglists").val()+'/'+$("#dogsublists").val()+'/images';
    }
    else {
      data='https://dog.ceo/api/breed/'+$("#doglists").val()+'/images';
    }
    $.get(data,function(image) {
      for (var i = 0; i < image.message.length; i++) {
        $('#center').append('<img src="'+image.message[i]+'">');
      }
    });
    allowSubmit=false;
  }
});
