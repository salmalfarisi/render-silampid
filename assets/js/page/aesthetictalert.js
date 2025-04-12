"use strict";

function loadimagepopup(target)
{
	swal({
	  // title: 'Sweet!',
	  // text: 'Modal with a custom image.',
	  icon: target,
	  imageWidth: 600,
	  imageHeight: 600,
	  imageAlt: 'Custom image',
	  buttons:false,
	})
}

function updatevalidasiwarga(geturl, getresult)
{
	var object = {};
	object['title'] = (getresult == "setuju" ? "Apakah anda yakin": "Validasi Akun ditolak ?");
	object['buttons'] = true;
	if(getresult == "ditolak")
	{
		object['content'] = {
			element: 'input',
			attributes: {
				placeholder: 'Isikan alasan penolakan',
				type: 'text'
			}
		};
	}
	
	object['icon'] = (getresult == "setuju" ? "warning": "error");
	
	swal(object).then((data) => {
		if(getresult == "ditolak" && data.length == parseInt('0'))
		{
			alert('Harap untuk membuat alasan terlebih dahulu');
		}
		else if((getresult == "ditolak" && data.length != parseInt('0')) || (getresult == "setuju"))
		{
			$.ajax({
				url:geturl,
				type:"POST",
				data:
				{
					alasan:(getresult == "ditolak" ? data : "complete")
				},
				processData:true,
				success:function(data)
				{
					location.reload();
				}
			});
		}
	});
}

function penolakansecarageneralrt(geturl, getresult, targetdb)
{
	var object = {};
	
	if(getresult == "ditolak")
	{
		object['title'] = "Alasan ditolak ?";
	}
	else
	{
		var title = 'Setujui Pengajuan Surat';
		switch (targetdb) 
		{
			case "domisili":
			{
				title = title + " Domisili";
				break;
			}
			case "ektp":
			{
				title = title + " E-KTP";
				break;
			}
			case "suratkematian":
			{
				title = title + " Kematian";
				break;
			}
			case "aktalahir":
			{
				title = title + " Akta Lahir";
				break;
			}
		}
		
		object['title'] = title;
	}
	object['buttons'] = true;
	if(getresult == "ditolak")
	{
		object['content'] = {
			element: 'input',
			attributes: {
				placeholder: 'Isikan alasan penolakan',
				type: 'text'
			}
		};
	}
	
	object['icon'] = (getresult == "diproses" ? "warning": "error");
	object['closeOnClickOutside'] = false;
	
	swal(object).then((data) => {
		if(getresult == "ditolak" && data.length == parseInt('0'))
		{
			alert('Harap untuk membuat alasan terlebih dahulu');
		}
		else if((getresult == "ditolak" && data.length != parseInt('0')) || (getresult == "diproses" && data == true))
		{
			$.ajax({
				url:geturl,
				type:"POST",
				data:
				{
					result:getresult,
					alasan:data,
					target:targetdb
				},
				processData:true,
				success:function(data)
				{
					location.reload();
				}
			});
		}
	});
}

function setconfirmgeneral(url)
{
	swal({
	  title: 'Apakah anda yakin ?',
	  icon: 'warning',
	  buttons: true,
	  dangerMode: true,
	})
	.then((result) => {
	  if (result == true) {
		window.location = url;
	  }
	});
}

$("#swal-5").click(function() {

  swal({
    title: 'Validasi Akun ditolak ?',
    content: {
    element: 'input',
    attributes: {
        placeholder: 'Isikan alasan penolakan',
        type: 'text',
      },
    },
    icon: 'error',
  }).then((data) => {
    swal('Hello, ' + data + '!');
  });
    
});