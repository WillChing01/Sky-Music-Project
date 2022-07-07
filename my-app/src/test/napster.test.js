const header = {headers: {apikey: 'NzQ2YmQ5NmUtODM2MS00ZDg2LTg4NzMtZGE0ZDExZmViN2U3'}};

it("successfully connects to api", async () => {
    const res = await fetch('https://api.napster.com//v2.2/albums/top', header);
    expect(res.status).toEqual(200);
});

it("returns sensible results", async () => {
    const res = await fetch('https://api.napster.com//v2.2/albums/top?limit=5', header);
    const data = await res.json();
    expect(data.albums.length).toEqual(5);
});