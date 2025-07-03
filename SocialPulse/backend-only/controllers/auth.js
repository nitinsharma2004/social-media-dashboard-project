import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { oauth2Client } from "../utils/googleConfig.js";
import { google } from "googleapis";
import axios from 'axios';

dotenv.config();

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;


export const signup = async (req, res, next) => {
  const { email } = req.body
  if (!email) {
    return res.status(401).send({ message: "Missing email." });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "Email is already in use."
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });

    newUser.save().then((user) => {
      const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "9999 years" });
      res.status(200).json({ token, user });
    }).catch((err) => {
      next(err);
    });
  } catch (err) {
    res.status(500).send("internal server error");
  }
}
export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.userEmail });
    if (!user) {
      res.status(401).send("User not found");
    }
    const validPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      res.status(401).send("Wrong password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "9999 years" });
    res.status(200).json({ token, user });

  } catch (err) {
    res.status(500).send("internal server error");
  }
}

export const googlesignin = (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/yt-analytics.readonly'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes
  });
  console.log(url);
  res.redirect(url);
};

export const googlecallback = async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();

    const redirectUrl = `http://localhost:5173/loginGoogle?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}&name=${encodeURIComponent(userInfo.name)}`;
    res.redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OAuth failed' });
  }
};


export const youtubeanalytics = async (req, res) => {
  const accessToken = req.headers['googletoken'];
  const refreshToken = req.headers['googlerefrestoken'];

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ error: 'Access or refresh token missing' });
  }

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken
  });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials);

    const today = new Date();

    const formatDate = (date) => date.toISOString().split('T')[0];

    const startDate = '2024-01-01';
    const endDate = formatDate(today);
    const youtubeAnalytics = google.youtubeAnalytics({ version: 'v2', auth: oauth2Client });

    const analyticsResult = await youtubeAnalytics.reports.query({
      ids: 'channel==MINE',
      startDate,
      endDate,
      metrics: 'views,likes,dislikes,comments,estimatedMinutesWatched,averageViewDuration,subscribersGained,subscribersLost',
      dimensions: 'day',
      sort: 'day'
    });

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const channelResponse = await youtube.channels.list({
      part: 'statistics',
      mine: true
    });

    const stats = channelResponse.data.items[0].statistics;
    const channelData = {
      totalSubscribers: stats.subscriberCount,
      totalViews: stats.viewCount,
      totalVideos: stats.videoCount,
    };

    const combinedResult = {
      access_token: credentials.access_token,
      analytics: analyticsResult.data,
      channelStats: channelData
    };
    res.status(200).json(combinedResult);
  } catch (err) {
    console.error("YouTube API error:", err);
    res.status(500).json({ error: 'Failed to fetch YouTube analytics or channel stats' });
  }
};


export const facebooksignin = (req, res) => {
  try {
    const scope = [
      "email",
      "public_profile",
    ];

    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope.join(",")}&response_type=code`;
    res.redirect(authUrl);
  } catch (e) {
    res.status(500).send({ message: "error" });
  }
};


export const facebookcallback = async (req, res) => {
  const { code } = req.query;
  try {
    const tokenRes = await axios.get(
      `https://graph.facebook.com/v18.0/oauth/access_token`, {
      params: {
        client_id: FACEBOOK_APP_ID,
        client_secret: FACEBOOK_APP_SECRET,
        redirect_uri: REDIRECT_URI,
        code
      }
    });

    const access_token = tokenRes.data.access_token;
    const redirect_url = `http://localhost:5173/loginFacebook?access_token=${access_token}`;
    res.redirect(redirect_url);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Auth failed");
  }
};

export const facebookanalytics = async (req, res) => {
  const { access_token } = req.query;
  try {
    const userRes = await axios.get(`https://graph.facebook.com/me`, {
      params: {
        access_token,
        fields: "id,name,email,picture.width(200).height(200)"
      }
    });

    const user = userRes.data;

    const postsRes = await axios.get(`https://graph.facebook.com/me/feed`, {
      params: {
        access_token,
        fields: "id,message,created_time,likes.summary(true),comments.summary(true)",
        since: "2021-01-01",
        until: "2023-12-31",
      }
    });

    const posts = postsRes.data.data;

    res.status(200).json({
      user
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Auth failed");
  }
};




export const updateprofiledata = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;
    const user = User.findOne({ _id: userId });
    if (!user) {
      res.status(401).send("user not found");
    }

    const changedata = await User.findByIdAndUpdate(
      userId,
      { $set: { name: name, email: email } },
      { new: true }
    );

    res.status(200).send({ changedata });

  } catch (e) {
    console.error(err.response?.data || err.message);
    res.status(500).send("internal server error");
  }
};


export const updateprofile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(401).send("No image uploaded");
    }
    const base64Image = req.file.buffer.toString("base64");
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(401).send("User not found");
    }

    const changedata = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          image: `data:${req.file.mimetype};base64,${base64Image}`,
        },
      },
      { new: true }
    );
    res.status(200).send({ changedata });
  } catch (err) {
    console.error(err);
    res.status(500).send("Auth failed");
  }
};



export const updatepassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(401).send("user not found");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);
    const changedata = await User.findByIdAndUpdate(
      userId,
      { $set: { password: hashpassword } },
      { new: true }
    );
    res.status(200).send({ changedata });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Auth failed");
  }
};



export const deleteaccount = async (req, res) => {

  const userId = req.user.id;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(401).send("user not found");
    }
    await User.findByIdAndDelete(
      userId
    );
    res.status(200).send("user deleted successfully");
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.status(500).send("Auth failed");
  }
};