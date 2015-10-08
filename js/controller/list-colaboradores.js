configBootstrapTable();

function fotoFormatter(value, row, index) {
	if(value != null && value != "") {
		if(window.location.hostname == "localhost")
			value = value.replace("/home/consorciointermultip/public_html/files/docs/", "../sig-backoffice-files/");
		else
			value = value.replace("/home/consorciointermultip/public_html/", "");
	}
	else if(row.flg_sexo == "M")
		value = "img/av1.png";
	else if(row.flg_sexo == "F")
		value = "img/av6.png";
	else
		value = "img/logo_intermultiplas.jpg";

	return (value != null && value != "") ? '<img src="'+ value +'" class="img-profile-table">' : '';
}

function editFormater(value, row, index) {
	return [
        '<a class="btn btn-xs btn-warning" href="form-new-colaborador?cod_colaborador='+ row.cod_colaborador +'">',
        	'<i class="fa fa-edit"></i> Visualizar Cadastro',
        '</a>'
    ].join('');
}

app.controller('ListColaboradoresCtrl', function($scope, $http){

});