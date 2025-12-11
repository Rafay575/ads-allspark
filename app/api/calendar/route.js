import { google } from 'googleapis';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

const calendar = google.calendar('v3');

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { accessToken } = session;
  const { summary, description, startDate, endDate } = req.body;  // Get event details from request body

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const event = {
    summary: summary,
    description: description,
    start: {
      dateTime: startDate, // e.g. '2025-12-25T10:00:00-07:00'
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: endDate, // e.g. '2025-12-25T12:00:00-07:00'
      timeZone: 'America/Los_Angeles',
    },
  };

  try {
    const response = await calendar.events.insert({
      auth,
      calendarId: 'primary',
      resource: event,
    });

    res.status(200).json({ message: 'Event created successfully', event: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Error creating event'});
  }
}
