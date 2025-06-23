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

export const MODAL_CONTENT = [
    {
        ID: 1,
        ICON: "delete-warning",
        ALT_ICON: "Bote de basura",
        TITLE: "Confirma que deseas eliminar este elemento",
        ACTION_BUTTON: "Eliminar",
        CLOSE_BUTTON: "Cancelar",
        RED_BG: true
    },
    {
        ID: 2,
        ICON: "exit-warning",
        ALT_ICON: "Advertencia",
        TITLE: "Estás a punto de salir sin haber guardado los cambios realizados ¿Deseas continuar?",
        ACTION_BUTTON: "Volver",
        CLOSE_BUTTON: "Salir",
        RED_BG: false
    }
]

export const BORRADOR_STATUS: string = 'BORRADOR';
export const ENVIADO_STATUS: string = 'ENVIADO';
export const API_URL = "https://api.gpiconta.com/ito";