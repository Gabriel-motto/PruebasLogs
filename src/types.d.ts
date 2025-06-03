/**
 * Archivo para almacenar los direfentes tipos de props a ultilizar durante el desarrollo
 */

// Datos a recoger
export interface FetchedData {
    idPj: string
    raid: string
    guardian: string
    completed: boolean
}

// Datos a mostrar
export interface ToShowData {
    pjName: string
    raidName: string
    guardianName: string
}

export interface PjData {
    id : string
    pjName : string
    count :number
}

