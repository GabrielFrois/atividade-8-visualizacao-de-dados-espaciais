import { MapContainer, TileLayer, GeoJSON, useMap, useMapEvents } from "react-leaflet";
import { useCenso } from "../context/CensoContext";
import { getSetorByPoint } from "../api/censoService";
import { useEffect, useMemo, useState } from "react";
import * as wellknown from "wellknown";
import L from "leaflet";
import { InfoBox } from "./InfoBox";

// Ajusta a visão do mapa com base nos polígonos carregados
function AjustarVisaoPoligonos({ features }: { features: any[] }) {
  const map = useMap();

  useEffect(() => {
    const layerGroup = L.geoJSON({ type: "FeatureCollection", features });
    const bounds = layerGroup.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [features, map]);

  return null;
}

export default function Mapa() {
  const { setores } = useCenso();
  const [info, setInfo] = useState<any>(null);
  const [setorSelecionadoIndex, setSetorSelecionadoIndex] = useState<number | null>(null);

  // Transforma setores (WKT) em GeoJSON válidos
  const geojsonFeatures = useMemo(() => {
    return setores
      .map((s, i) => {
        try {
          const parsed = wellknown.parse(s.geom);
          if (parsed?.type === "Polygon" || parsed?.type === "MultiPolygon") {
            return {
              type: "Feature",
              geometry: parsed,
              properties: { id: i }, // Identificador para destaque
            };
          }
        } catch (err) {
          console.error("Erro ao converter WKT:", err);
        }
        return null;
      })
      .filter((f) => f !== null);
  }, [setores]);

  if (!geojsonFeatures.length) return <div>Carregando setores...</div>;

  return (
    <MapContainer
      center={[-23.3, -46.3]}
      zoom={8}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON
        key={`geojson-${geojsonFeatures.length}-${setorSelecionadoIndex ?? 'none'}`}
        data={{ type: "FeatureCollection", features: geojsonFeatures }}
        style={(feature) => {
          const isSelected = feature?.properties?.id === setorSelecionadoIndex;
          return {
            color: isSelected ? "red" : "#0078FF",
            weight: isSelected ? 3 : 1,
            fillOpacity: 0.3,
          };
        }}
        eventHandlers={{
          click: async (e) => {
            const latlng = e.latlng;
            const res = await getSetorByPoint(latlng.lng, latlng.lat);
            setInfo(res);

            // Identifica o feature clicado
            const layer = e.propagatedFrom;
            const featureId = layer?.feature?.properties?.id;
            if (featureId !== undefined) {
              setSetorSelecionadoIndex(featureId);
            }
          },
        }}
      />

      <AjustarVisaoPoligonos features={geojsonFeatures} />

      {info && <InfoBox info={info} />}
    </MapContainer>
  );
}
