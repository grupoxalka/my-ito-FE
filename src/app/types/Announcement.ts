export default interface Announcement {
    id?: string;
    tittle: string;
    createdAt: string;
    updatedAt?: string;
    status: boolean;
    sentTo?: string;
    sentDate?: string;
    message: string;

}