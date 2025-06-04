// import React, { useState } from "react";


// export const useCarpetaSeleccionada = () => {
//   const [nombreCarpeta, setNombreCarpeta] = useState<string>("");

//   const handleFolderSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     const primerArchivo = files[0];
//     const rutaRelativa = primerArchivo.webkitRelativePath;
//     const carpeta = rutaRelativa.split("/")[0];

//     setNombreCarpeta(carpeta);
//     console.log("Nombre de la carpeta seleccionada:", carpeta);
//   };

//   return { nombreCarpeta, handleFolderSelection };
// };

// export default useCarpetaSeleccionada