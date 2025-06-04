// import type React from 'react'
// import './App.css'
// import localPlayersData from "../public/resources/local_players.json";
// import  type{  PjData } from './types';




// const App: React.FC = () => {

//   const datosPJ: PjData[] = Object.entries(localPlayersData.localPlayers).map(
//     ([id, value]) => ({
//       id,
//       pjName: value.name,
//       count: value.count,
//     })
//   );




//   return (
//     <div className="content">
//       <ul>
//         {datosPJ.map((pj) => (
//           <li key={pj.id}>
//             {pj.pjName} - {pj.count}
//           </li>
//         ))}
//       </ul>

//     </div>
//   )
// }

// //si le quitas eso no pone nada obvio

// export default App


import React, { useState, useRef } from 'react';
import './App.css';
import type { PjData } from './types';
import carpeta from '../public/resources/carpeta.txt'


const useCarpetaSeleccionada = () => {
  const [nombreCarpeta, setNombreCarpeta] = useState<string>("");
  const [archivos, setArchivos] = useState<File[]>([]);
  const [datosPJ, setDatosPJ] = useState<PjData[]>([]);

  const handleFolderSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const primerArchivo = files[0];
    const rutaRelativa = primerArchivo.webkitRelativePath;
    console.log(rutaRelativa)
    const carpeta = rutaRelativa.split("/")[0];
    setNombreCarpeta(carpeta);

    const archivosArray = Array.from(files);
    setArchivos(archivosArray);

    const archivoJSON = archivosArray.find(file =>
      file.webkitRelativePath.endsWith("local_players.json")
    );

    if (!archivoJSON) {
      alert("No se encontró el archivo local_players.json");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const contenido = event.target?.result as string;
        const data = JSON.parse(contenido);

        if (!data.localPlayers) {
          throw new Error("No se encontró la propiedad 'localPlayers'");
        }

        const parsedData: PjData[] = Object.entries(data.localPlayers).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ([id, value]: [string, any]) => ({
            id,
            pjName: value.name,
            count: value.count,
          })
        );

        setDatosPJ(parsedData);
      } catch (err) {
        alert("Error al leer el archivo JSON");
        console.error(err);
      }
    };

    reader.readAsText(archivoJSON);
  };

  return { nombreCarpeta, archivos, datosPJ, handleFolderSelection };
};

const rutaCarpeta = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [nombreCarpeta, setNombreCarpeta] = useState<string>("");
  try {
    
    // const contenido = fs.readFileSync(carpeta, 'utf8').trim; // 👈 Lee el archivo como texto
    // console.log('Contenido del archivo:', contenido);
    // console.log(contenido)
    // setNombreCarpeta(contenido)
    return nombreCarpeta
  } catch (error) {
    return "sin ruta"
    console.error('Error al leer el archivo:', error);
  }

}


const App: React.FC = () => {
  const { datosPJ, handleFolderSelection } = useCarpetaSeleccionada();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

    console.log(rutaCarpeta())


  return (
    <div className="content">
      <button onClick={handleButtonClick}>Seleccionar Carpeta</button>
      <input
        ref={inputRef}
        type="file"
        webkitdirectory="true"
        multiple
        hidden
        onChange={handleFolderSelection}
      />
      <ul>
        {datosPJ.map((pj) => (
          <li key={pj.id}>
            {pj.pjName} - {pj.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

