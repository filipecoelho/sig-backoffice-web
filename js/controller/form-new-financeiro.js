$("#modalItems").on("hidden.bs.modal", function(e){
	$('#mytable').bootstrapTable('destroy');
});

app.controller('CadastroFinanceiroCtrl', function($scope, $http, UserSrvc){
	$scope.colaborador = UserSrvc.getUserLogged();
	$scope.lancamentoFinanceiro = {
		favorecido: {},
		favorecidos: [],
		titularMovimento: {},
		titularesMovimento: [],
		anexos: [],
		cod_tipo_lancamento: 2,
		tipoLancamento: "Despesa",
		abrirLancamento: false
	};
	$scope.favorecido = "";
	$scope.titularMovimento = "";
	$scope.planosConta = [];
	$scope.contratos = [];

	// Modal control
	$scope.tmpModal = {};
	var modalTablesColumns = {
		"empresas": [
			{
				field: 'nme_fantasia',
				title: 'Nome Fantasia'
			},
			{
				field: 'flg_ativo',
				title: 'Ativo?',
				formatter: ativoFormatter
			}
		],

		"colaboradores": [
			{
				field: 'nme_colaborador',
				title: 'Nome Colaborador'
			},
			{
				field: 'flg_ativo',
				title: 'Ativo?',
				formatter: ativoFormatter
			}
		],
		"terceiros": [
			{
				field: 'nme_terceiro',
				title: 'Nome Terceiro'
			}
		]
	};

	$scope.abreModal = function(type) {
		var rota = "";
		var obj = "";

		if(type == "FAVORECIDO"){
			rota = $scope.favorecido;
			obj = "favorecido";
		}
		else if(type == "TITULAR_MOVIMENTO"){
			rota = $scope.titularMovimento;
			obj = "titularMovimento";
		}

		$("#modalItemsLabel").text("LISTAGEM DE " + rota.replace("-"," de ").toUpperCase());
		$("#modalItems").modal("show");
		$('#mytable').bootstrapTable({
			url: baseUrlApi() + rota +".json",
			search: true,
			showRefresh: true,
			showToggle: true,
			showColumns: true,
			pageList: "[5, 10, 20, 50, 100, All]",
			pageSize: "5",
			pagination: true,
			sidePagination: "server",
			showPaginationSwitch: true,
			columns: modalTablesColumns[rota],
			onClickRow: function(row, $element) {
				$scope.lancamentoFinanceiro[obj].data = row;
				$scope.lancamentoFinanceiro[obj].type = rota;
				$scope.lancamentoFinanceiro[obj].label = $element.find("td").text();
				$scope.$apply();
				$('#mytable').bootstrapTable('destroy');
				$("#modalItems").modal("hide");
			}
		});
	}

	$scope.addItemTabela = function(object) {
		var objectToAdd = {};

		if(object == 'favorecidos') {
			objectToAdd = {
				data: {},
				label: "",
				dsc_observacao_adicional: "",
				vlr_correspondente: 0,
				flg_removido: false
			};
		}
		else if(object == 'anexos') {
			objectToAdd = {
				nme_anexo: "",
				dsc_observacoes_anexo: "",
				pth_anexo: "",
				dsc_tipo_anexo: "",
				flg_removido: false
			};
		}

		$scope.lancamentoFinanceiro[object].push(objectToAdd);
	}

	$scope.desabilitaItem = function(item) {
		item.flg_removido = true;
	}

	$scope.saveRecords = function() {
		var postData = angular.copy($scope.lancamentoFinanceiro);
		postData.dta_emissao 		= ($scope.lancamentoFinanceiro.dta_emissao != "") ? moment($scope.lancamentoFinanceiro.dta_emissao, "DD/MM/YYYY").format("YYYY-MM-DD") : "";
		postData.dta_competencia 	= ($scope.lancamentoFinanceiro.dta_competencia != "") ? moment($scope.lancamentoFinanceiro.dta_competencia, "DD/MM/YYYY").format("YYYY-MM-DD") : "";
		postData.dta_vencimento 	= ($scope.lancamentoFinanceiro.dta_vencimento != "") ? moment($scope.lancamentoFinanceiro.dta_vencimento, "DD/MM/YYYY").format("YYYY-MM-DD") : "";
		postData.dta_pagamento 		= ($scope.lancamentoFinanceiro.dta_pagamento != "") ? moment($scope.lancamentoFinanceiro.dta_pagamento, "DD/MM/YYYY").format("YYYY-MM-DD") : "";

		// remove as mensagens de erro dos campos obrigatórios
		/*$('[data-toggle="tooltip"]').removeAttr("data-toggle").removeAttr("data-placement").removeAttr("title").removeAttr("data-original-title");
		$(".element-group").removeClass("has-error");
		$("table thead").css("background-color","none").css("color","#515151");
		$(".form-fields span").css("background-color", "#fafafa").css("border-color","#CDD6E1").css("color","#515151");*/

		console.log(postData);

		$http.post(baseUrlApi()+'lancamento-financeiro', postData)
			.success(function(message, status, headers, config){
				// Do somethin else
				console.log(message);
			})
			.error(function(message, status, headers, config){ // se a API retornar algum erro
				if(status == 406){ // Not-Acceptable (Campos inválidos)
					showNotification("Atenção!", "Alguns campos obrigatórios não foram preenchidos.", null, 'page', status);
					// percorre a lista de campos devolvidos da API
					/*$.each(message, function(index, value) {
						// seleciona os elemento HTML de acordo com o campo mencionado
						var element = ($("[ng-model='lancamentoFinanceiro."+ index +"']").length > 0) ? $("[ng-model='lancamentoFinanceiro."+ index +"']") : $("[name='"+ index +"']");

						if(element.is("table")) // tratamento exclusivo para tabelas
				    		$(element).find("thead").css("background-color","#A94442").css("color","#FFFFFF");
				    	else if(element.is("span")) // tratamento exclusivo para spans
				    		$(element).css("border-color","#A94442").css("color","#A94442");
				    	else if(typeof(element.attr('flow-btn')) != "undefined")
				    		element = $(element).closest("span").css("background-color","#A94442").css("border-color","#A94442").css("color","#FFFFFF");

				    	// coloca a mensagem de erro no elemento HTML selecionado
			    		element.attr("data-toggle","tooltip").attr("data-placement","top").attr("title", value).attr("data-original-title", value);
			    		element.closest(".element-group").addClass("has-error");
					});*/

					// inicializa o tooltip para exibir o erro ao passar o mouse sobre o elemento HTML
					// $('[data-toggle="tooltip"]').tooltip();
				}
				else {
					showNotification(null, message, null, 'page', status);
				}
			});
	}

	function loadPlanoContas() {
		$http.get(baseUrlApi()+'plano-contas')
			.success(function(items){
				$scope.planosConta = items;
			});
	}

	function loadOrigens() {
		$http.get(baseUrlApi()+'origens?nolimit=1&cod_empreendimento='+$scope.colaborador.user.cod_empreendimento)
			.success(function(items){
				$scope.contratos = items.rows;
			});
	}

	loadPlanoContas();
	loadOrigens();
});