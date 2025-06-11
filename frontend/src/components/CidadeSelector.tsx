import styled from "styled-components";
import { useCenso } from "../context/CensoContext";

const cidades = [
  "Campinas",
  "Jacareí",
  "São José dos Campos",
  "Sorocaba",
  "Ribeirão Preto",
  "São José do Rio Preto",
  "Piracicaba",
];

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 8px;
  padding: 0.5rem;
  z-index: 1000;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
`;

export function CidadeSelector() {
  const { cidadeSelecionada, selecionarCidade } = useCenso();

  return (
    <Container>
      <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>Cidades:</div>
      {cidades.map((cidade) => (
        <div
          key={cidade}
          style={{
            fontWeight: cidade === cidadeSelecionada ? "bold" : "normal",
            cursor: "pointer",
          }}
          onClick={() => selecionarCidade(cidade)}
        >
          {cidade}
        </div>
      ))}
    </Container>
  );
}
