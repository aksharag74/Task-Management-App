export interface Task{
    id:number;
    title:string;
    description:string;
    priority:'Low' | 'Medium' | 'High';
    dueDate:Date;
    completed:boolean;
    userId:number;
}
