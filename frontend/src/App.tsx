import Mapa from "./components/Mapa";
import { CidadeSelector } from "./components/CidadeSelector";
import { CensoProvider } from "./context/CensoContext";

export default function App() {
  return (
    <CensoProvider>
      <CidadeSelector />
      <Mapa />
    </CensoProvider>
  );
}
