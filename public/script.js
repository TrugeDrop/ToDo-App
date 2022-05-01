$(document).ready(function () {
			
		 $('#addBtn').click(function(){
			$.ajax('/ekle', 
			{
			  type: 'POST',
  			  data: { msg: $('#msgInput').val() },
  			  success: function (data,status,xhr){
					$('#msgs').append(`<li id="${data._id}" class="list-group-item">${data.msg} <button onclick="delMsg('${data._id}')" class="delBtn" style="float: right;">Delete</button></li>`);
					document.getElementById("msgInput").value = "";
				},
				error: function (jqXhr, textStatus, errorMessage) {
					$('#msgs').append('Error: ' + errorMessage);
				}
			});
		 });

        });
        
        function delMsg(id){
          $.ajax('/sil', {
            type: 'POST',
            data: { id: id },
            success: function(data, status, xhr){
              if(data.status == "success"){
                document.getElementById(id).remove();
              }else if(data.status == "err"){
                alert("Error!")
              }
            },
            error: function(jqXhr, textStatus, errorMessage){
              alert("Error!")
            }
          });
        }
