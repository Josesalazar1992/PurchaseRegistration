type DatabaseEntry = { 
    id: number; 
    name: string; 
    age: number; 
  };
  
  const fs = require('fs');
  const filePath = './data.json';
  
  // Función para leer la base de datos
  function readDatabase(): DatabaseEntry[] {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as DatabaseEntry[];
  }
  
  // Función para escribir en la base de datos
  function writeDatabase(data: DatabaseEntry[]): void {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
  
  // Función para agregar datos
  function addData(newEntry: DatabaseEntry): void {
      const database = readDatabase();
      database.push(newEntry);
      writeDatabase(database);
  }
  
  // Ejemplo de uso
  const newEntry: DatabaseEntry = { id: 1, name: "John Doe", age: 30 };
  addData(newEntry);
  
  console.log("Dato agregado correctamente.");
  