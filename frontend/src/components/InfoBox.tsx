import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  max-width: 300px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
  z-index: 1000;
`;

interface InfoBoxProps {
  info: {
    cd_setor: string;
    nm_mun: string;
    situacao: string;
    area_km2: number;
  };
}

export function InfoBox({ info }: InfoBoxProps) {
  return (
    <Container>
      <div><strong>Cód. Setor:</strong> {info.cd_setor}</div>
      <div><strong>Município:</strong> {info.nm_mun}</div>
      <div><strong>Situação:</strong> {info.situacao}</div>
      <div><strong>Área:</strong> {Number(info.area_km2).toFixed(3)} km²</div>
    </Container>
  );
}
