import { createContext, useContext, useState, useEffect } from "react";
import { getSetores } from "../api/censoService";

interface Setor {
  geom: string;
}

interface Centroid {
  latitude: number;
  longitude: number;
}

interface CensoContextType {
  cidadeSelecionada: string;
  setores: Setor[];
  centro: Centroid | null;
  selecionarCidade: (cidade: string) => void;
}

const CensoContext = createContext<CensoContextType>({} as CensoContextType);

export const useCenso = () => useContext(CensoContext);

export const CensoProvider = ({ children }: { children: React.ReactNode }) => {
  const [cidadeSelecionada, setCidadeSelecionada] = useState("Jacareí");
  const [setores, setSetores] = useState<Setor[]>([]);
  const [centro, setCentro] = useState<Centroid | null>(null);

  useEffect(() => {
    getSetores(cidadeSelecionada).then(({ polygons, centroid }) => {
      setSetores(polygons);
      setCentro(centroid);
    });
  }, [cidadeSelecionada]);

  const selecionarCidade = (cidade: string) => setCidadeSelecionada(cidade);

  return (
    <CensoContext.Provider value={{ cidadeSelecionada, setores, centro, selecionarCidade }}>
      {children}
    </CensoContext.Provider>
  );
};
