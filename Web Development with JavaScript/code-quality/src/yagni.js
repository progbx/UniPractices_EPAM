// yagni.js
export function searchEmployees(employees, search) {
  return employees.filter(employee => employee.name.toLowerCase().includes(search.toLowerCase()));
}
