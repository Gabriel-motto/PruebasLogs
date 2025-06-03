import React, { useEffect, useState } from "react";
import type { PjData } from "./types";


// 2. Componente principal
const Datos: React.FC = () => {
  const [datosPJ, setDatosPJ] = useState<PjData[]>([]);

  useEffect(() => {
    fetch("../public/resources/local_players.json") // Debe estar en public/
      .then((res) => {
        if (!res.ok) throw new Error("Error de red");
        return res.json();
      })
      .then((data) => {
        const players = data.localPlayers;

        // 3. Transformar objeto en array tipado
        const parsed: PjData[] = Object.entries(players).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ([id, value]: [string, any]) => ({
            id,
            pjName: value.name,
            count: value.count,
          })
        );

        setDatosPJ(parsed);
      })
      .catch((err) => console.error("Error al cargar archivo:", err));
  }, []);

  console.log(datosPJ.map((a) => a.pjName))
  // 4. Mostrar la lista en pantalla
  return (
    <div className="p-4">
      <ul className="list-disc list-inside space-y-1">
        {datosPJ.map((pj) => ( pj.count > 100?
          <li key={pj.id}>
            <strong>{pj.count > 100?pj.pjName:""}</strong>
          </li> : ""
        ))}
      </ul>
    </div>
  );
};

export default Datos;
