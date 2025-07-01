export default interface Announcement {
    id?: string;
    tittle: string;
    name: string;
    createdAt: string;
    status: boolean;
    updatedAt?: string;
    sentTo?: string;
    sentDate?: string;

}