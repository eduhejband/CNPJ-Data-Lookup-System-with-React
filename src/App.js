import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function SearchCNPJ() {
  const [cnpj, setCnpj] = useState('');
  const [result, setResult] = useState([]);
  const [showResults, setShowResults] = useState(false);


function handleSubmit(e) {
  e.preventDefault();
  if (!cnpj) {
    alert("Por favor, insira um CNPJ antes de consultar.");
    return;
  }

  axios
    .get(`https://minhareceita.org/cnpj/${cnpj}`)
    .then(response => {
      setResult(response.data);
      setShowResults(true);
    }).catch(error => {
      if(error.response.status === 400){
        alert("CNPJ digitado não existe!");
        setShowResults(false);
      }else{
        console.log(error);
      }
    });
  }

function handleReset() {
  setCnpj('');
  setResult([]);
  setShowResults(false);
}


return (
  <form onSubmit={handleSubmit}>
    
    <div className={`inicio ${showResults ? 'inicio-reduced' : ''}`}>

    <h1 className={`titulo ${showResults ? 'titulo-reduced' : ''}`}> Consulta do Cadastro Nacional de Pessoas Jurídicas </h1>
    <input
      className={`input ${showResults ? 'input-reduced' : ''}`}
      type="text"
      placeholder="Digite o CNPJ"
      value={cnpj}
      onChange={e => setCnpj(e.target.value)}
    />
    <button type="submit" className={`button ${showResults ? 'button-reduced' : ''}`}>Consultar</button>

    </div>

    { showResults ? 
      <div className="App" key={result?.cnpj}>
    <h1>Informações Principais </h1>

    <table>
      <tr>
      <td>CNPJ informado</td>
      <td>{result?.cnpj || 'Não se aplica'}</td>
    </tr>
  <tr>
    <td>Razão social</td>
    <td>{result?.razao_social || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Nome fantasia</td>
    <td>{result?.nome_fantasia || 'Não se aplica'}</td>
  </tr>


  <tr>
    <td>Natureza jurídica</td>
    <td>{result?.natureza_juridica || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Data de início</td>
    <td>{result?.data_inicio_atividade || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Data da situação cadastral</td>
    <td>{result?.data_situacao_cadastral || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Descrição da situação sadastral</td>
    <td>{result?.descricao_situacao_cadastral || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Porte</td>
    <td>{result?.porte || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Capital social declarada</td>
    <td>{result?.capital_social || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Motivo da situação cadastral</td>
    <td>{result?.motivo_situacao_cadastral || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Descrição se é matriz ou filial</td>
    <td>{result?.descricao_identificador_matriz_filial || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Motivo de situação cadastral</td>
    <td>{result?.descricao_motivo_situacao_cadastral || 'Não se aplica'}</td>
  </tr>
</table>

    <h1>Endereço</h1>

  <table>
  <tr>
    <td>Estado</td>
    <td>{result?.uf || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Bairro</td>
    <td>{result?.bairro || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Município</td>
    <td>{result?.municipio || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>CEP</td>
    <td>{result?.cep || 'Não se aplica'}</td>
  </tr>
  
  <tr>
    <td>Tipo de logradouro</td>
    <td>{result?.descricao_tipo_de_logradouro || 'Não se aplica'}</td>
  </tr>
  
  <tr>
    <td>Logradouro</td>
    <td>{result?.logradouro || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Número</td>
    <td>{result?.numero || 'Não se aplica'}</td>
  </tr>
  <tr>
    <td>Complemento</td>
    <td>{result?.complemento || 'Não se aplica'}</td>
  </tr>
</table>
      
      
     
<h1>Informações dos Sócios</h1>      

  {result?.qsa?.map((qsa) => {
    return <p key={qsa.nome_socio}>
    <table>
      <tr key={qsa.nome_socio}>
        <td>Nome</td>
        <td>{qsa.nome_socio || 'Não se aplica'}</td>
      </tr>

      <tr>
        <td>Idade</td>
        <td>{qsa.faixa_etaria || 'Não se aplica'}</td>
      </tr>
      <tr>
        <td>Qualificação</td>
        <td>{qsa.qualificacao_socio || 'Não se aplica'}</td>
      </tr>
      <tr>
        <td>Data de entrada</td>
        <td>{qsa.data_entrada_sociedade || 'Não se aplica'}</td>
      </tr>
      <tr>
        <td>Qualificação de representante legal</td>
        <td>{qsa.qualificacao_representante_legal || 'Não se aplica'}</td>
      </tr>
    </table>
  </p>
  })}



<h1>Principal Ramo de Atuação</h1>          
<table>
<tr>
    <td>{result?.cnae_fiscal_descricao || 'Não se aplica'}</td>
</tr>
</table>

<h1>Ramos Secundários de Atuação</h1>   
      {result?.cnaes_secundarios?.map((cnaes_secundarios) => {
        return <p key={cnaes_secundarios.codigo}>
          <table>
            <tr key={cnaes_secundarios.codigo}>
              <td>{cnaes_secundarios.descricao || 'Não se aplica'}</td>
            </tr>
          </table>
          </p>
  })}
   
  </div>
  : null}

{ showResults ? <button className="button2" onClick={handleReset}>Voltar</button> : null }
  </form>
  );
}

export default SearchCNPJ;
