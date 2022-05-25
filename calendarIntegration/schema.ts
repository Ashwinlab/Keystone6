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
import { google } from 'googleapis';
require("dotenv").config();


const createEvent = (name,date) => {
  console.log(name);
  console.log(" in createEvent");
  const CREDENTIALS = {"type": "service_account","project_id": "react-firebase-ae08b","private_key_id": "20274f9ab7580dfd2b5df2779c45bcf05c39d48e","private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7sUZbEmeRuzzk\nPr4dRzpHzZmwbK13N5vtJRKCNsB4boM3Yhapgf6HhInwlx4l/G/VRLbIkzYii7VD\noStR4g+ZqVMd4hL4GE9MicDrH7N4CT+Cp3XUuPBf5A4rVEnywsTWfXYQJrhfBoFw\nriQgNIOBw6DCwMUMZ2QIS6XNzkTXh1RgcbnQ5uYDwQ1w3JNTsISjS5ZMY84+ZEmo\njhaJ0PNEILkaJmlxmRxm9hBfQCI0e/KEr9KkI48HobCLNNi3pT6G7KBB5tA2LZtx\nCKAlekP1j6bfe6gwbgNa9HIxBHtFirU71ViBpv5okaGXaT5xb7+9cp/W9WE3HOxm\nPQ2TgW/5AgMBAAECggEAIfoOrixX/tfaB0h7YnHzMS3dKUSXJ0p0Cdso7VULhRGe\nY894IkHTyYT68ohsrvwyY3VPsGIDzf+j9eTuYmGNqOev0exLukkuS8DxIS8pLizg\naB639CTxcK5oSTw2McHD378w+O4FeMBE/NitVf4jo0E+cBr04NCzmVPWZTn2mNxJ\nVTqxWs9Rz7HEOaBbRUIKY9Uf1I2Qu7Rb9XVJgpsg7iyrMfrtgjeGmVzg5QUNrHFp\nuM0D89HQ25alo6m78tqSbuR1x7VxgWoaZqCfpJ3gKe8fN+mgn/aYURh/jKLih8/f\n9GG6g49AMqqpFvg6uGanW5s2JerDK0nFcXSsC/d3HQKBgQDtCP6HVTR4yHx6jF53\nFXpbWHwxf+WSbDeIefSl99Fqsx/vDhT7KGMry6ZY9ns5aZdxh8t+uhlZk7vLx8y2\n2eVIofA+5qQtG1v864ioHpqgGcn/sQP3JHoT24DuXC5ZY/Q3ZG9dw20ofO+mxm8c\nf8R3rpVmm4pgKnU+EMWk69lehQKBgQDKtaIr4rPrGmF8MGXm0shRqEE7bea8ncOy\na8Yn94bSzjf76rdTRw65p4qZIbO5Mjq40TORmtdyhB6TMiZHN2bpTIQAd1LQ9jg5\nCfrD7RkN0U+rkmv2hCUVvypOrPdsk2U489GHNNjcx1tyB0cIn9ok39aLg07iuxRS\nq2kUq0VH5QKBgQDF/dtNg7heo2iGnLVTVxdrMZAbcK98DPSeBPB7qXK9Y33rGqIf\n4G5l6Ke8a7YmELM1W6543k3KawJUh0HSAlPoxYt9nv3Hx7CgpMTzWQzjamc2MtAT\nId7us00QzOLSPBGEK1pywYhuZ11uuxWYgojDR4r3uDhvd0eTXkMZLP/WWQKBgDec\nKpg1gjw+KX5DXME9FB1qtjKSjNkzwqsg6+StADy2vB8NHivnc3+1Gc22tDJbOEbZ\nhXctbmuJGUYyXNPuu/nGtvPVyE9xLK1hMn0rf1MOF/gunBWt3OqhXf7lbp9HtF4y\nbUnVUqUGv+yBWJhiGhtBmP7/D9Ydko63XYWBEumNAoGBAMKgyuDa0M7fNGBI54NU\nAgwJLFRqwvYrX1XpwoHsBv6rPWuW4g0H8Dag3nDUbFs/EsW8mvyeE6EnI1z0gN+3\nXOVHWW373Te53jDxktNZUxJFghkHwm1Vvu9QmywsCnKMVY9/J+01b2WKlHNelmy5\ntBtGYZvuhBGTljGSxZEPB4aq\n-----END PRIVATE KEY-----\n","client_email": "calender-key@react-firebase-ae08b.iam.gserviceaccount.com","client_id": "103859256163981386532","auth_uri": "https://accounts.google.com/o/oauth2/auth","token_uri": "https://oauth2.googleapis.com/token",  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/calender-key%40react-firebase-ae08b.iam.gserviceaccount.com"};
  const SCOPES = 'https://www.googleapis.com/auth/calendar';
  const calendarId = 'pggnpkpbpc79rcv10bkb62qieg@group.calendar.google.com';
  
  const calendar = google.calendar({ version: "v3" });
  
  const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
  );
  

  let endDate = new Date(new Date(date).setHours(date.getHours()+1));

  const insertEvent = async (event:any) => {
    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};
  
  let event = {
    'summary': name,
    'description': "",
    'start': {
        'dateTime': date,
        'timeZone': 'Asia/Kolkata'
    },
    'end': {
        'dateTime': endDate,
        'timeZone': 'Asia/Kolkata'
    }
  };

  insertEvent(event)
    .then((res) => {
        console.log(`------>`,res);
    })
    .catch((err) => {
        console.log(err);
    });
  
}

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
      Date: timestamp(),
    },
    hooks: {
      afterOperation: ({ operation, item }) => {
        if (operation === "create") {
          // console.log(item.Date);
          createEvent(item.name,item.Date);
        }
      },
    },
  }),
};
