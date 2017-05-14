function show(){
	console.log(1)
	$('.diogo').css({display:'block'})
}
function hide(){
	console.log(1)
	$('.diogo').css({display:'none'})
}

function sub(){
	if(!$('#phone').val()){
		$('#zs').html('请输入手机号')
	}
}