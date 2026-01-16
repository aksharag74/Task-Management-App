export interface Task{
    id:number;
    title:string;
    description:string;
    completed:boolean;
    priority:'Low' | 'Medium' | 'High';
    dueDate:Date;
    createdAt:string;
    updatedAt:string;
    userId:number;
}
