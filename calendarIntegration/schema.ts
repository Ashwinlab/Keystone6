import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { Lists } from '.keystone/types';
export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.author', many: true }),
    },
    ui: {
      listView: {
        initialColumns: ['name', 'posts'],
      },
    },
  }),
  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        ui: {
          displayMode: 'segmented-control',
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
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),

      tags: relationship({
        ref: 'Tag.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
    },
  }),  Calendar: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true } }),
      content: text(),
      publishDate: timestamp(),
    },
    // hooks: {
      // validateInput: async ({ operation, resolvedData, addValidationError, context }) => {
      //   let keystoneemail=resolvedData.email,keystonecontent=resolvedData.content,keystoneDate=resolvedData.publishDate,keystoneName=resolvedData.name;
      //     if (operation === 'create') {
          //  const {google} = require('googleapis');

// Provide the required configuration
// const CREDENTIALS = {type: "service_account",project_id: "calendarapi-350511",private_key_id: "fcf4d55426ddf1a17d668e5194fc2a6c851cc00d",private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDrpAuIelduGqr\nI+bNCgEoesLqkHAywpnk2QcUnGDEUkrHNMMaI8SGmW0SjFt9hqZhYDEOKZyfyZZm\nJpvkCEyN6F/BBtij42i9W9u5A8M66N7v7o0ld6d4IUi0rLAJ6f0SV1BCox17Gy+C\ntFhZ/6G7VWqtfMvemqiMUtScsR62puahMG+svuW80F3NbB1U3IFwQEjBhRTsy47F\nWpQDo8tneyMbKVpKHotIulZkQTgi6UsnqkO7VeTR2jJsAxYzRRDwMmUhMhjbjwWr\nQs1/VFb2YuTnTcEmRJ1hT7cm47N4vV1iPG1TcD+b145GrQfcKVCSe/fxBl1pzk4C\neyZw7JLXAgMBAAECggEAPyNiDiCPBdhtQo8w91OVEBScM8crDJXRxg9ow3O5nV7Y\nFfKmSRblYHC8ytFS6+u4X48EBQfUK5KF3qvyfN9YpCkoTEYDPM4xi3fKK6ZVJfrh\nhBU6oa478Pz8Up+tpWVEbNiTYwzyhDg/WjMKlu9upd1nsFamCUtpuu03AN/9gv1C\ngk4aH5FXuqql2OXiBJb5moEWEBgr7Xad/kmdcyVISMqBHZkrZ3pmYJIYBYY5N7aT\nGFbjXmD5J2YdnyDG0Yv1zp5Zc2sPXAORdL9rjM+LmTtS3MV7ETiTLxAEFeCpfyah\nwRyE2k1rh150WBqEK6Jj4wfpGTELJB8bx3klXxcYwQKBgQDvvX9aQEux1mljeqCk\nkUUCnS5RG3bQKLtnbIWEBusDFmYg+0ByjM1jxMZYBC0A1LcK9ypLiroK6mmo8NGM\nfdFK6t6+imA2JDo3EsgPGSRJrhGESU9HN/3AxQAmeJZhv2wWlbsNLYnvCZm8Vsh/\n8nnOm5CO01q0peTFoRAQG3ZnUQKBgQDQ9Bm5tdIZud7ljfMSjo3bQBdcJBRes7aG\ncXYUXEe3alm5juWf2CvR/BckqPrt2Fsi1SuLK1m7cKlNowS4lJxJ/yzDsg2JPM3g\nY1isSQvyJ6sJHJLOAz/PnOCb6rQVzMhqd5aiew1Y9qbC0lfHlxbs8WCZHb3QjoU4\nl8nkxIsdpwKBgQDq6VsVuzSwoHEKCgnI15OweQX+cZPdalwffoXhlcnIb7VJEgjX\ndcJ3xUO40Par/sMRGpm2BcxAj+tSoA4kxNBEwZnbSMn3o03r0xp3OOKG0+rUHeVx\n2pppvl9kUvq/8wrdon/z7LBgqp6ansq+HIFggqyGVvFlW7ysLiMINXCy0QKBgELa\nVoC8U4Q3m8EGMYb2ZRyI3PB1+q5yASvykTziaW+dbyeXOJBzsVF1vlHUXrRKTJ5Q\nZaYZMJRv7zsPtSr5ISfrpH7YMMx/z77DClPU6yWG24oGwlF3aKscHiDEbumqo1Ss\n/lzt0c9s2t3qPnt1M7iLYcSbZ2easbTxm36+A2RxAoGAUDnjiIR0vaFyYxIqfjqv\n7EFWj1E79eIbnEXa7zB1j+ceJiBZznO7aneWj7H08oT9rUa91hjsB4JZmqEjk4mF\n1qAz/Ds03PRp2e+L+nIISnWbwBFUjofhl/tZGRTWui4Ykh1EAVhERxmt0uGclstl\n7eMWSQO7rQ4/gTuzz1KXD2w=\n-----END PRIVATE KEY-----\n"};
// const calendarId = 'calendar-key@calendarapi-350511.iam.gserviceaccount.com';

// // Google calendar API settings
// const SCOPES = 'https://www.googleapis.com/auth/calendar';
// const calendar = google.calendar({version : "v3"});

// const auth = new google.auth.JWT(
//     CREDENTIALS.client_email,
//     null,
//     CREDENTIALS.private_key,
//     SCOPES
// );

// Your TIMEOFFSET Offset
// const TIMEOFFSET = '+05:30';

// // Get date-time string for calender
// // const dateTimeForCalander = () => {

// //     let date = new Date();

// //     let year = date.getFullYear();
// //     let month = date.getMonth() + 1;
// //     if (month < 10) {
// //         month = `0${month}`;
// //     }
// //     let day = date.getDate();
// //     if (day < 10) {
// //         day = `0${day}`;
// //     }
// //     let hour = date.getHours();
// //     if (hour < 10) {
// //         hour = `0${hour}`;
// //     }
// //     let minute = date.getMinutes();
// //     if (minute < 10) {
// //         minute = `0${minute}`;
// //     }

// //     let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

// //     let event = new Date(Date.parse(newDateTime));

// //     let startDate = event;
// //     // Delay in end time is 1
// //     let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

// //     return {
// //         'start': startDate,
// //         'end': endDate
// //     }
// // };

// // Insert new event to Google Calendar
// const insertEvent = async (event) => {

//     try {
//         let response = await calendar.events.insert({
//             auth: auth,
//             calendarId: calendarId,
//             resource: event
//         });
    
//         if (response['status'] == 200 && response['statusText'] === 'OK') {
//             return 1;
//         } else {
//             return 0;
//         }
//     } catch (error) {
//         console.log(`Error at insertEvent --> ${error}`);
//         return 0;
//     }
// };

// let dateTime = dateTimeForCalander();

// // // Event for Google Calendar
// let event = {
//     'summary': `This is the summary.`,
//     'description': `This is the description.`,
//     'start': {
//         'dateTime': dateTime['start'],
//         'timeZone': 'Asia/Kolkata'
//     },
//     'end': {
//         'dateTime': dateTime['end'],
//         'timeZone': 'Asia/Kolkata'
//     }
// }

// insertEvent(event)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
        //   }
        // }
  }),
  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),
};
