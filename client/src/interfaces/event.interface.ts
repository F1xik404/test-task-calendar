export interface Event {
    id: number;
    name: string;
    date: Date;
    time: string;
    description: string;
    priority: "low" | "medium" | "high";
}