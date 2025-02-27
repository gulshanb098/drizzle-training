import { count, eq, isNull } from "drizzle-orm";
import { db } from "../db";
import { designations, employees } from "../db/schema";

export const assessment = async () => {
  // Write a query to insert into the designations table
  await db.insert(designations).values({
    title: "Software Engineer",
  });

  // Write a query to insert into employees table
  const newEmployees = [
    {
      name: "Gulshan",
      designationId: 1,
      email: "gulshan@gmail.com",
      phone: "7979098766",
    },
    {
      name: "Pruthvi",
      designationId: 1,
      email: "pruthvi@gmail.com",
      phone: "8979098766",
    },
    {
      name: "Vinay",
      designationId: 3,
      email: "vinay@gmail.com",
      phone: "9979098766",
    },
  ];
  await db
    .insert(employees)
    .values(newEmployees)
    .returning({ id: employees.id });

  // Write a query to fetch all employees along with their designation names
  const employeesWithDesignation = await db
    .select({
      name: employees.name,
      designation: designations.title,
      email: employees.email,
      phone: employees.phone,
    })
    .from(employees)
    .innerJoin(designations, eq(employees.designationId, designations.id));

  console.log("employeesWithDesignation -> ", employeesWithDesignation);

  // Write a query to update the designation of a specific employee.
  const updateEmpDesignation = await db
    .update(employees)
    .set({ designationId: 2 })
    .where(eq(employees.id, 1))
    .returning();

  console.log("updateEmpDesignation: ", updateEmpDesignation[0]);

  // Write a query to delete an employee by their ID
  const deletedEmp = await db
    .delete(employees)
    .where(eq(employees.id, 1))
    .returning();

  console.log("deletedEmp: ", deletedEmp[0]);

  // Write a query to fetch all employees with a specific designation
  const empByDesignation = await db
    .select({
      name: employees.name,
      designation: designations.title,
      email: employees.email,
      phone: employees.phone,
    })
    .from(employees)
    .innerJoin(designations, eq(employees.designationId, designations.id))
    .where(eq(designations.title, "Software Engineer"));

  console.log("empByDesignation: ", empByDesignation);

  // Write a query to count the number of employees under each designation
  const countEmpByDesignation = await db
    .select({
      designationName: designations.title,
      totalEmployees: count(employees.id),
    })
    .from(employees)
    .innerJoin(designations, eq(employees.designationId, designations.id))
    .groupBy(designations.id);

  console.log("countEmpByDesignation: ", countEmpByDesignation);

  // Write a query to return a list of designations that have no employees assigned.
  const unusedDesignations = await db
    .select({ name: designations.title })
    .from(designations)
    .leftJoin(employees, eq(designations.id, employees.designationId))
    .where(isNull(employees.id));

  console.log(
    "unusedDesignations -> ",
    unusedDesignations.map((e) => e.name)
  );
};
