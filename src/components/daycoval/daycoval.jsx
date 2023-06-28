import React from "react";

function calcularTaxaJuros(prazo, valorParcela, valorFinanciado) {
  const precisao = 0.000001; // Precisão desejada
  let taxaMin = 0;
  let taxaMax = 1;
  let taxa = (taxaMin + taxaMax) / 2;
  let iteracoes = 0;

  while (iteracoes < 100) {
    const q0 =
      ((1 - Math.pow(1 + taxa, -prazo)) / taxa) * valorParcela -
      valorFinanciado;
    const diferenca = q0;

    if (Math.abs(diferenca) < precisao) {
      // O valor calculado está próximo o suficiente do valor desejado
      return taxa * 100;
    }

    if (diferenca > 0) {
      taxaMin = taxa;
    } else {
      taxaMax = taxa;
    }

    taxa = (taxaMin + taxaMax) / 2;
    iteracoes++;
  }

  // Não foi possível calcular a taxa de juros
  console.log("Não foi possível calcular a taxa de juros.");
  return taxa * 100; // Retorna o valor calculado, mesmo que seja negativo
}

function calcularValorPresente(taxa, parcRestantes, vlparc) {
  taxa = taxa / 100; // Converter a taxa de juros de porcentagem para decimal
  const VP =
    (Math.abs(vlparc) * (1 - Math.pow(1 + taxa, -parcRestantes))) / taxa;
  return VP;
}

function pgto(taxa, numeroPeriodos, valorPresente) {
  const taxaDecimal = taxa / 100; // Converter a taxa de juros de porcentagem para decimal
  const prestacao =
    (valorPresente * taxaDecimal) /
    (1 - Math.pow(1 + taxaDecimal, -numeroPeriodos));
  return prestacao;
}

function Simulador(props) {
  const prazo = parseFloat(props.prazo);
  const pagas = parseFloat(props.pagas);
  const vlparc = parseFloat(props.vlparc.replace(",", "."));
  const vlempres = parseFloat(props.vlempres.replace(",", "."));

  const taxa = calcularTaxaJuros(prazo, vlparc, vlempres);

  const vp = calcularValorPresente(taxa, prazo - pagas, vlparc);
  const taxa2 = 1.72; // Taxa de juros em formato decimal
  const taxa3 = 1.54; // Taxa de juros em formato decimal
  const taxa4 = 1.58; // Taxa de juros em formato decimal
  const parcelasRestantes = prazo - pagas; // Número de parcelas restantes
  const saldoDevedor = vp; // Saldo devedor

  const valorPrestacao = pgto(taxa2, parcelasRestantes, saldoDevedor);
  const valorPrestacao2 = pgto(taxa3, parcelasRestantes, saldoDevedor);
  const valorPrestacao3 = pgto(taxa4, parcelasRestantes, saldoDevedor);

  const economiaMensal = vlparc - valorPrestacao;
  const economiaTotal = economiaMensal * parcelasRestantes;
  
  const economiaMensal2 = vlparc - valorPrestacao2;
  const economiaTotal2 = economiaMensal2 * parcelasRestantes;
  
  const economiaMensal3 = vlparc - valorPrestacao3;
  const economiaTotal3 = economiaMensal3 * parcelasRestantes;

  return (
    <>
      <br />
      <br />

      <div className="container">
        <div className="row text-center">
          <h1>Simulação - INBURSA</h1>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  {/* <th scope="col">Título</th> */}
                  <th scope="col" colSpan="2" className="text-center">
                    Simulado na 1,72%
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th>Parcelas Restantes</th>
                  <th>{prazo - pagas}</th>
                </tr>
                <tr>
                  <th>Taxa Atual do Contrato</th>
                  <th>{taxa.toFixed(2)}%</th>
                </tr>
                <tr>
                  <th>Saldo Devedor Aproximado</th>
                  <th>
                    {vp.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                </tr>
                <tr>
                  <th>Nova Taxa de Juros</th>
                  <th>1,72%</th>
                </tr>
                <tr>
                  <th>Novo Valor de Parcela (Aproximado)</th>
                  <th>
                    {valorPrestacao.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table table-secondary table-striped">
              <thead>
                <tr>
                  {/* <th scope="col">Economia</th> */}
                  <th scope="col" colSpan="2" className="text-center">Simulação de Economia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Economia Mensal</th>
                  <th>
                    {economiaMensal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                </tr>
                <tr>
                  <th>Economia Total</th>
                  <th>
                    {economiaTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Tabela 1,54 */}
        <div className="row">
          <div className="col-6">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  {/* <th scope="col">Título</th> */}
                  <th scope="col" colSpan="2" className="text-center">
                    Simulado na 1,54%
                  </th>
                </tr>
              </thead>

              <tbody>
                
                <tr>
                  <th>Nova Taxa de Juros</th>
                  <th>1,54%</th>
                </tr>
                <tr>
                  <th>Novo Valor de Parcela (Aproximado)</th>
                  <th>
                    {valorPrestacao2.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table table-secondary table-striped">
              <thead>
                <tr>
                  {/* <th scope="col">Economia</th> */}
                  <th scope="col" colSpan="2" className="text-center">Simulação de Economia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Economia Mensal</th>
                  <th>
                    {economiaMensal2.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                </tr>
                <tr>
                  <th>Economia Total</th>
                  <th>
                    {economiaTotal2.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Tabela 1,58 */}
        <div className="row">
          <div className="col-6">
            {/* <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Título</th>
                  <th scope="col" colSpan="2" className="text-center">
                    Simulado na 1,58%
                  </th>
                </tr>
              </thead>

              <tbody>
                
                <tr>
                  <th>Nova Taxa de Juros</th>
                  <th>1,58%</th>
                </tr>
                <tr>
                  <th>Novo Valor de Parcela (Aproximado)</th>
                  <th>
                    {valorPrestacao3.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table table-secondary table-striped">
              <thead>
                <tr>
                  <th scope="col">Economia</th> 
                  <th scope="col" colSpan="2" className="text-center">Simulação de Economia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Economia Mensal</th>
                  <th>
                    {economiaMensal3.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                </tr>
                <tr>
                  <th>Economia Total</th>
                  <th>
                    {economiaTotal3.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Simulador;
