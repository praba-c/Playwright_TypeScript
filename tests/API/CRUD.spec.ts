import { test, request, expect } from "@playwright/test";

let apiContext: any;
let bookingId: string;
let authToken: string;

test.describe('test1', async () => {

    test.beforeAll('POST', async ({ playwright }) => {
        apiContext = await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com',
            ignoreHTTPSErrors: true
        });
    })

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
        const body = await response.json();
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
})
