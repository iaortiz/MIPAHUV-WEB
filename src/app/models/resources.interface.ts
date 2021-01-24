export interface Resource {
    id?: string;
    name: string;
    category: string;
    subject: string;
    createdAt: Date;
    description?: string;
    source: string;
}