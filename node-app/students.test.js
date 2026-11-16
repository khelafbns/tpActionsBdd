const { createClient, addStudent, getStudent, averageGrade } = require("./students");

let client;

beforeAll(async () => {
  client = createClient();
  await client.connect();
});

afterAll(async () => {
  await client.end();
});

beforeEach(async () => {
  await client.query("TRUNCATE students RESTART IDENTITY");
});

test("ajouter un étudiant puis le relire", async () => {
  const id = await addStudent(client, "Amel", 15);
  const student = await getStudent(client, id);
  expect(student.name).toBe("Amel");
  expect(student.grade).toBe(15);
});

test("lire un étudiant inexistant", async () => {
  expect(await getStudent(client, 999)).toBeNull();
});

test("moyenne des notes", async () => {
  await addStudent(client, "Amel", 10);
  await addStudent(client, "Karim", 14);
  expect(await averageGrade(client)).toBe(12);
});
