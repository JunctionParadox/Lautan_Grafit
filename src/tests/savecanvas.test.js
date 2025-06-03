/*describe("Kill yourself", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })
}) */

it("Test connection with post api", async () => {
  const mockData = { succes: true }
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockData)
  });

  const response = await fetch('http://localhost:3000/images/test', {
    method: "POST"
  })
  const data = await response.json();

  expect(data).toEqual(mockData);
})