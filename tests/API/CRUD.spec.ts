import { test, request, expect } from "@playwright/test";

let apiContext: any;
let bookingId: string;
let authToken: string;

test.describe('test1', async () => {

    test.beforeAll('POST', async () => {
        apiContext = await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com',
            ignoreHTTPSErrors: true
        });
    });

    test('POST', async () => {
        const response = await apiContext.post('/booking', {
            data: {
                "firstname": "Roronoa",
                "lastname": "Zoro",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                additionalneeds: 'Swords'
            }
        });
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('bookingid');
        bookingId = body.bookingid;
    });

    test('GET_TOKEN', async () => {

        const tokenResponse = await apiContext.post('/auth', {
            headers: { 'Content-Type': 'application/json' },
            data: {
                "username": "admin",
                "password": "password123"
            }
        });
        expect(tokenResponse.status()).toBe(200);
        const authBody = await tokenResponse.json();
        authToken = authBody.token;
    });

    test('GET', async () => {
        
        const response = await apiContext.get(`/booking/${bookingId}`);
        expect(response.status()).toBe(200);
    });

    test('PARTIAL_UPDATE', async () => {
        const response = await apiContext.patch(`/booking/${bookingId}`, {
            headers: { 'Cookie': `token=${authToken}`, 'Content-Type': 'application/json' },
            data: {
                'additionalneeds': 'Three Swords'
            }
        });
        const body = await response.json();
        console.log(body.additionalneeds);
    });

    test('DELETE', async () => {
        const response = await apiContext.delete(`/booking/${bookingId}`, {
            headers: { 'Cookie': `token=${authToken}` }
        });
        expect(response.status()).toBe(201);
    });
});

test('Intercept request using page.route', async ({ page }) => {
//Intercept all calls to "jsonplaceholder.typicode.com/posts/1"
  await page.route('**/posts/1', async route => {
    // Fulfill with a mocked response
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        userId: 999,
        id: 1,
        title: 'Intercepted Title',
        body: 'This is a mocked response instead of real API data!'
      })
    });
  });

  // Navigate to a site that triggers the API call
  //await page.goto('https://jsonplaceholder.typicode.com/');

  // Make a fetch request inside the page to trigger interception
  const data = await page.evaluate(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    return res.json();
  });

  console.log(data); // Will show our mocked JSON instead of real API
  //expect(data.title).toBe('Intercepted Title');
});

