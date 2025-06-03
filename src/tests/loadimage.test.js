it("Test connection with get api", async () => {
  const mockData = { succes: true }
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockData)
  });

  const response = await fetch('http://localhost:3000/images/test')
  const data = await response.json();

  expect(data).toEqual(mockData);
})