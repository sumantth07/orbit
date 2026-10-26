import Dexie,{Table} from 'dexie';import {format} from 'date-fns';
export type Task={id?:number;title:string;description:string;dueDate:string|null;priority:'Low'|'Medium'|'High';category:string;completedAt:number|null;focus:boolean;subtasks:{t:string;d:boolean}[];createdAt:number;updatedAt:number};
export type Routine={id?:number;title:string;category:string;minutes:number|null;time:string|null;active:boolean;createdAt:number};
export type Completion={id?:number;routineId:number;localDate:string;completedAt:number};
export type Ev={id?:number;title:string;date:string;start:string|null;end:string|null;allDay:boolean;description:string};
export type Review={localDate:string;wentWell:string;improve:string;tomorrow:string};
export type Session={id?:number;localDate:string;minutes:number;taskId:number|null};
export type Settings={weekStart:0|1;work:number;rest:number;categories:string[]};
export const DEFAULTS:Settings={weekStart:1,work:25,rest:5,categories:['College','Coding','Personal','Health','Projects']};
class DB extends Dexie{tasks!:Table<Task,number>;routines!:Table<Routine,number>;completions!:Table<Completion,number>;events!:Table<Ev,number>;reviews!:Table<Review,string>;sessions!:Table<Session,number>;meta!:Table<{key:string;value:any},string>;
constructor(){super('orbit');this.version(1).stores({tasks:'++id,dueDate,completedAt',routines:'++id,active',completions:'++id,[routineId+localDate],localDate',events:'++id,date',reviews:'localDate',sessions:'++id,localDate',meta:'key'})}}
export const db=new DB();
export const iso=(d:Date)=>format(d,'yyyy-MM-dd');
export async function exportAll(){const o:any={app:'orbit',version:1};for(const t of db.tables)o[t.name]=await t.toArray();return JSON.stringify(o)}
export async function importAll(json:string){const o=JSON.parse(json);if(o.app!=='orbit')throw new Error('Not an ORBIT export');await db.transaction('rw',db.tables,async()=>{for(const t of db.tables){await t.clear();if(o[t.name])await t.bulkAdd(o[t.name])}})}
