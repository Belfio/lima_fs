"use strict";

const Constants = require("./util/Constants");

module.exports = {
  Client: require("./Client"),
  puppeteer: require("puppeteer"),
  chromium: require("@sparticuz/chromium"),

  version: require("./package.json").version,

  // Structures
  Chat: require("./structures/Chat"),
  PrivateChat: require("./structures/PrivateChat"),
  GroupChat: require("./structures/GroupChat"),
  Message: require("./structures/Message"),
  MessageMedia: require("./structures/MessageMedia"),
  Contact: require("./structures/Contact"),
  PrivateContact: require("./structures/PrivateContact"),
  BusinessContact: require("./structures/BusinessContact"),
  ClientInfo: require("./structures/ClientInfo"),
  Location: require("./structures/Location"),
  ProductMetadata: require("./structures/ProductMetadata"),
  List: require("./structures/List"),
  Buttons: require("./structures/Buttons"),

  // Auth Strategies
  NoAuth: require("./authStrategies/NoAuth"),
  LocalAuth: require("./authStrategies/LocalAuth"),
  RemoteAuth: require("./authStrategies/RemoteAuth"),
  LegacySessionAuth: require("./authStrategies/LegacySessionAuth"),

  ...Constants,
};
