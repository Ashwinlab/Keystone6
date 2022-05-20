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
      calendar: relationship({ ref: 'Calendar.posts', many: false }),
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
  }),
  Calendar: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
      content: text(),
      publishDate: timestamp(),
      posts: relationship({ ref: 'Post.calendar', many: true }),
    },
    hooks: {
      validateInput: async ({ operation, resolvedData, addValidationError, context }) => {
          if (operation === 'create') {
            let keystoneemail=resolvedData.email,keystonecontent=resolvedData.content,keystoneDate=resolvedData.publishDate,keystoneName=resolvedData.name;
          console.log(keystonecontent,keystoneemail,keystoneDate)
           console.log('Calendar is Created');

          var outlook = require('node-outlook');
          
          const newEvent = {
            subject: 'Calendar Invite',
            body: {
              contentType: 'HTML',
              content: keystonecontent
            },
            start: {
                dateTime: keystoneDate,
                timeZone: 'Pacific Standard Time'
            },
            end: {
                dateTime: '+30:00',
                timeZone: 'Pacific Standard Time'
            },
            location: {
                displayName: 'Admin'
            },
            attendees: [
              {
                emailAddress: {
                  address: 'ashwinlamblabs@outlook.com',
                  name: keystoneName
                },
                type: 'required'
              }
            ],
          };
          var outlookClient = new outlook.Microsoft.OutlookServices.Client('https://outlook.office.com/api/v2.0',authHelper.getAccessTokenFn('https://outlook.office.com/', session));

          let createEventParameters = {
            token: outlookClient,
            event: newEvent
        }
        insertEvent(event)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

        // outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0');
        // // Set the anchor mailbox to the user's SMTP address
        // outlook.base.setAnchorMailbox('ashwin.lablambworks@outlook.com');

        // outlook.calendar.createEvent(createEventParameters, function (error, event) {
        //     if(error) {
        //         console.log(error);                 
        //     } else {
        //         console.log(event);                         
        //     }
        // })
      }
}}
  }),
  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: 'Post.tags'||'Post.calendar', many: true }),
        },
  }),
};

