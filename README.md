# Airbnb - Booking Web appp

Hey! 
I started this project from a YouTube video on how to make a simple crud app using the MERN stack. I added a lot of features after that. 
[Youtube video](https://youtu.be/MpQbwtSiZ7E?si=SC6H27P5fohiFi1w)

<h3>
<img src="https://github.com/Meetjain1/wanderlust/assets/133582566/1ee5934a-27be-4502-a7bf-e6a8c78fe5a3" width="35" height="35" style="max-width: 100%;"> Some Cool features are:
</h3>
- User authentication.
- Infinite Scroll and complex query.
- Third party services for image storage (cloudinary)
- Map view where you can see the nearby available places of yours.
- Booking the place.
- Typescript is used for better type safety.
<h3>
<img src="https://github.com/user-attachments/assets/4e1250df-4c49-48c5-80f5-9797d3e73170" width="35" height="35" style="max-width: 100%;"> Installation
</h3>

To Start the Backend

```bash
cd ./api
npm install
mv .env.sample .env
npx tsc -b 
node dist/index.js
```
To start the frontend

```bash
cd ./client
npm install

mv .env.sample .env
npm run dev
```
<h3>
<img src="https://github.com/user-attachments/assets/e9ad9181-81f2-43ea-97d6-6dea009acfa1" width="35" height="35" style="max-width: 100%;"> Contributing
</h3>

Interested in contributing to this project? That's awesome! Here are a few issues you can help with:

- **User Logout on Refresh:** Resolve the issue where users are logged out upon refreshing the website.
- **TypeScript Enhancements:** Improve TypeScript usage by eliminating the use of `any`.
- **React Query Integration:** Implement React Query for efficient data caching.
- **Custom API Class:** Develop a custom API class to handle responses and errors more effectively.
- **Cron Job for Bookings:** Create a cron job to automatically set the "active" field to false on booking documents.
- **User-Friendly Place Filter:** Make the place filter more intuitive and human-readable.
- **Place Analytics:** Add analytics features to track and display data on places.
- **Booking Requests:** Implement a feature where users receive notifications if someone wants to book a place.

Before submitting a pull request, please ensure that proper linting is done to maintain code quality.

Feel free to fork the repository, and if you like the project, don't forget to give it a star!

