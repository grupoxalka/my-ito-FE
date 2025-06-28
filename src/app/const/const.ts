import { ModalType } from "../enums/ModalType";

export const INPUT_TYPES = {
    EMAIL: 'email',
    TEL: 'tel',
    PASSWORD: 'password'
};

export const USER_TYPES = [
    {
        KEY: 'student',
        LABEL: 'Estudiantes',
        COUNTER: 23
    },
    {
        KEY: 'professor',
        LABEL: 'Profesores',
        COUNTER: 9999
    },
    {
        KEY: 'administrative',
        LABEL: 'Administrativos',
        COUNTER: 9999
    },
]

export const LAST_TOOLS = [
    {
        KEY: 1,
        PATH: 'add-announcement',
        TITLE: 'crear aviso',
        SUBTITLE: 'estudiantes'
    },
    {
        KEY: 2,
        PATH: 'add-report',
        TITLE: 'reporte',
        SUBTITLE: 'descargar'
    },
    {
        KEY: 3,
        PATH: 'add-user',
        TITLE: 'añadir',
        SUBTITLE: 'usuario'
    },
]

export const MODAL_CONTENT =  [
    {
        type: ModalType.DELETE,
        icon: "delete-warning",
        altIcon: "Bote de basura",
        title: "Confirma que deseas eliminar este elemento",
        confirmButton: "Eliminar",
        closeButton: "Cancelar",
        redBG: true
    },
    {
        type: ModalType.WARNING,
        icon: "exit-warning",
        altIcon: "Advertencia",
        title: "Estás a punto de salir sin haber guardado los cambios realizados ¿Deseas continuar?",
        confirmButton: "Volver",
        closeButton: "Salir",
        redBG: false
    }
]

/*export const API_URL = "http://ec2-3-134-107-248.us-east-2.compute.amazonaws.com/ito";*/
export const API_URL = 'https://api.gpiconta.com/ito';
export const TOKEN_KEY = 'token'; 