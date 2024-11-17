type DatabaseEntry = { 
    id: number; 
    name: string; 
    age: number; 
  };
  
  const LOCAL_STORAGE_KEY = 'database';
  
  export function readDatabase(): DatabaseEntry[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  
  export function writeDatabase(data: DatabaseEntry[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
  
  export function addData(newEntry: DatabaseEntry): void {
    const database = readDatabase();
    database.push(newEntry);
    writeDatabase(database);
  }
  