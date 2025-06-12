export default function generateID(): number {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const uniqueID = timestamp + randomNum;
    return uniqueID;
}