export default interface User {
    id: number;
    name: string;
    paternalSurname?: string;
    maternalSurname?: string;
    email: string;
    phone?: string;
    role: string;
    createdAt: string;
    notes?: string;

}