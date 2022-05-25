import { list } from "@keystone-6/core";
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";

// import { calendar_v3, google } from 'googleapis';
// import { OAuth2Client, Credentials } from 'google-auth-library';
// import Calendar = calendar_v3.Calendar;
// // import Schema$Event = calendar_v3.Schema$Event;

// const auth: OAuth2Client = new google.auth.OAuth2(...);
// const calendar: Calendar = google.calendar({ version: 'v3', auth });
// const schemaEvent: Schema$Event = (await calendar.events.get({ calendarId, eventId })).data;

export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: "Post.author", many: true }),
    },
    ui: {
      listView: {
        initialColumns: ["name", "posts"],
      },
    },
  }),
  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
        ],
        defaultValue: "draft",
        ui: {
          displayMode: "segmented-control",
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineCreate: { fields: ["name", "email"] },
        },
      }),
    },
  }),
  Calendar: list({
    fields: {
      name: text({
        validation: { isRequired: true },
        label: "Enter the reciver name",
      }),
      publishDate: timestamp(),
    },
    hooks: {
      afterOperation: ({ operation, item }) => {
        if (operation === "create") {
          console.log(
            `New event  Name: ${item.name}, Date: ${item.publishDate?.getHours}`
          );
          // const { google } = require("googleapis");
          require("dotenv").config();

          const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
          const calendarId = process.env.CALENDAR_ID;

          const SCOPES = "https://www.googleapis.com/auth/calendar";
          const calendar = google.calendar({ version: "v3" });

          const auth = new google.auth.JWT(
            CREDENTIALS.client_email,
            null,
            CREDENTIALS.private_key,
            SCOPES
          );

          // Your TIMEOFFSET Offset
          const TIMEOFFSET = "+05:30";

          // Get date-time string for calender
          const dateTimeForCalander = () => {
            let date = new Date();

            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            if (month < 10) {
              month = `0${month}`;
            }
            let day = date.getDate();
            if (day < 10) {
              day = `0${day}`;
            }
            let hour = date.getHours();
            if (hour < 10) {
              hour = `0${hour}`;
            }
            let minute = date.getMinutes();
            if (minute < 10) {
              minute = `0${minute}`;
            }

            let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

            let event = new Date(Date.parse(newDateTime));

            let startDate = event;
            // Delay in end time is 1
            let endDate = new Date(
              new Date(startDate).setHours(startDate.getHours() + 1)
            );

            return {
              start: startDate,
              end: endDate,
            };
          };

          // Insert new event to Google Calendar
          const insertEvent = async (event) => {
            try {
              let response = await calendar.events.insert({
                auth: auth,
                calendarId: calendarId,
                resource: event,
              });

              if (
                response["status"] == 200 &&
                response["statusText"] === "OK"
              ) {
                return 1;
              } else {
                return 0;
              }
            } catch (error) {
              console.log(`Error at insertEvent --> ${error}`);
              return 0;
            }
          };

          let dateTime = dateTimeForCalander();

          // // Event for Google Calendar
          let event = {
            summary: `This is the summary.`,
            description: `This is the description.`,
            start: {
              dateTime: dateTime["start"],
              timeZone: "Asia/Kolkata",
            },
            end: {
              dateTime: dateTime["end"],
              timeZone: "Asia/Kolkata",
            },
          };

          insertEvent(event)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
  }),
};
