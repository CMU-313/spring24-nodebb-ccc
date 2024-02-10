'use strict';

const meta = require('../meta');
const db = require('../database');
const flags = require('../flags');
const user = require('../user');
const topics = require('../topics');
const plugins = require('../plugins');
const privileges = require('../privileges');
const translator = require('../translator');

module.exports = function (Posts) {
    Posts.react = async function (pid, uid) {
      if (meta.config['reputation:disabled']) {
          throw new Error('[[error:reputation-system-disabled]]');
      }
      const canUpvote = await privileges.posts.can('posts:upvote', pid, uid);
      if (!canUpvote) {
          throw new Error('[[error:no-privileges]]');
      }

      if (voteInProgress(pid, uid)) {
          throw new Error('[[error:already-voting-for-this-post]]');
      }
      putVoteInProgress(pid, uid);

      try {
          return await toggleVote('upvote', pid, uid);
      } finally {
          clearVoteProgress(pid, uid);
      }
    };
};
