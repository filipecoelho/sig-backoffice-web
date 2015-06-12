<!--Custom Toolbar-->
<!--===================================================-->
<div class="panel" ng-controller="ListEmpresasCtrl">
	<div class="panel-heading">
		<h3 class="panel-title">Listagem de Empresas</h3>
	</div>
	<div class="panel-body">
		<table id="demo-custom-toolbar" class="demo-add-niftycheck" 
			data-toggle="table"
			data-url="http://localhost/sig-backoffice-api/empresas.json"
			data-search="true"
			data-show-refresh="true"
			data-show-toggle="true"
			data-show-columns="true"
			data-page-list="[5, 10, 20]"
			data-page-size="5"
			data-pagination="true"
			data-side-pagination="server"
			data-show-pagination-switch="true">
			<thead>
				<tr>
					<th data-visible="true" data-sortable="true" data-field="num_cnpj">CNPJ</th>
					<th data-visible="true" data-sortable="true" data-field="nme_razao_social">Razão Social</th>
					<th data-visible="true" data-sortable="true" data-field="nme_fantasia">Nome Fantasia</th>
					<th data-visible="false" data-sortable="true" data-field="num_inscricao_estadual">I.E.</th>
					<th data-visible="true" data-sortable="true" data-field="dsc_endereco">Endereço</th>
					<th data-visible="true" data-sortable="true" data-field="nme_bairro">Bairro</th>
					<th data-visible="true" data-sortable="true" data-field="num_cep">CEP</th>
					<th data-visible="true" data-sortable="true" data-field="nme_cidade">Cidade</th>
					<th data-visible="true" data-sortable="true" data-field="sgl_estado">UF</th>

				</tr>
			</thead>
		</table>
	</div>
</div>
<!--===================================================-->