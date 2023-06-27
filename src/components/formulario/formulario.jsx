import React, { useState } from "react";
import Simulador from "../simulador/simulador";
import InputMask from "react-input-mask";

function Formulario() {
  const [simuladorAtivo, setSimuladorAtivo] = useState(false);
  const [prazo, setPrazo] = useState("");
  const [pagas, setPagas] = useState("");
  const [vlparc, setParc] = useState("");
  const [vlempres, setEmpres] = useState("");

  const handleSimular = () => {
    setSimuladorAtivo(true);
  };

  const handlePrazoChange = (e) => {
    setPrazo(parseFloat(e.target.value));
  };

  const handlePagasChange = (e) => {
    setPagas(parseFloat(e.target.value));
  };


  const formatCurrency = (value) => {
    // Remove todos os caracteres que não sejam dígitos ou ponto
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Verifica se o valor está no formato "x.xxx,xx"
    const hasDecimal = numericValue.indexOf(",") !== -1;

    // Formata o valor com separador de milhar e vírgula decimal
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: hasDecimal ? 2 : 0,
      maximumFractionDigits: 2,
    }).format(parseFloat(numericValue));

    return formattedValue;
  };

  const handleParcChange = (e) => {
    setParc(e.target.value)
  };

  const handleEmpresChange = (e) => {
    setEmpres(e.target.value)
  };
  
  
  
  
  return (
    <>
      <div className="container mt-5">
      <div className="row justify-content-center">
      <div className="col-10">
        <div className="row align-items-center">
          <div className="col-sm-2 text-start">
            <img
              src="https://uploaddeimagens.com.br/images/004/519/847/original/LOGO_VIEIRA_AZUL-SEM_FUNDO.png?1687776645"
              alt="Logo Vieiratech"
              style={{margin: 0,
                padding: 0,
                width: 130,
                height: 30}}
            />
            
          </div>
          <div className="col-sm-9 text-center">
            <h1>Simulador de Proposta - INBURSA</h1>
          </div>
        </div>
      </div>
    </div>
  <br />

        <form className="row align-items-end justify-content-center gy-2">
          <div className="col-sm-6">
            <label htmlFor="prazo" className="form-label">
              Prazo inicial
            </label>
            <input
              type="number"
              name="prazo"
              placeholder="Digite o prazo total"
              className="form-control bg-dark text-white"
              value={prazo}
              onChange={handlePrazoChange}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="parc-pagas" className="form-label">
              Parcelas Pagas
            </label>
            <input
              type="number"
              name="parc-pagas"
              placeholder="Digite a quantidade de pagas"
              className="form-control bg-dark text-white"
              value={pagas}
              onChange={handlePagasChange}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="vl-parcela" className="form-label">
              Valor Parcela
            </label>
            <input
              type="text"
              name="vl-parcela"
              placeholder="Ex.: 380,00"
              className="form-control bg-dark text-white"
              value={vlparc.replace(",",".")} // Substituir vírgula por ponto
              onChange={handleParcChange}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="vl-emprestimo" className="form-label">
              Valor Empréstimo
            </label>
            <input
              type="text"
              name="vl-emprestimo"
              placeholder="Ex.: 15.000,00"
              className="form-control bg-dark text-white"
              value={vlempres.replace(",",".")}
              onChange={handleEmpresChange}
            />
          </div>
        </form>

        <div className="row justify-content-center mt-4">
          <div className="col-sm-6 text-center">
            <input
              type="submit"
              name="submit"
              className="btn btn-success"
              value="Simular"
              onClick={handleSimular}
            />
          </div>
          <div className="col-sm-6 text-center">
            <input
              type="submit"
              name="reset"
              className="btn btn-danger"
              value="Reset"
              onClick={() => window.location.reload()}
            />
          </div>
        </div>

        {simuladorAtivo && (
          <Simulador
            simulador={simuladorAtivo}
            prazo={prazo}
            pagas={pagas}
            vlparc={vlparc}
            vlempres={vlempres}
          />
        )}
      </div>
      <br /><br />
      <footer className="text-center"><b>Vieiratech2023</b> &#169; André Felipe | SysAnd v1.0.2506</footer>
      <br />
    </>
  );
}

export default Formulario;
