"use strict";

// const db = require('../database');
const plugins = require("../plugins");

module.exports = function (Posts) {
    Posts.react = async function (pid, uid) {
        if (isNaN(pid)) {
            // Checking that PID is an integer
            throw new Error("pid should be an int");
        }
        if (pid == null) {
            // Checking that PID should not be null
            throw new Error("pid should not be null");
        }
        if (isNaN(uid)) {
            // Checking that UID is an integer
            throw new Error("uid should be an int");
        }
        if (uid == null) {
            // Checking that UID should not be null
            throw new Error("uid should not be null");
        }
        return await toggleReaction("bookmark", pid, uid);
    };

    Posts.unreact = async function (pid, uid) {
        if (isNaN(pid)) {
            // Checking that PID is an integer
            throw new Error("pid should be an int");
        }
        if (pid == null) {
            // Checking that PID should not be null
            throw new Error("pid should not be null");
        }
        if (isNaN(uid)) {
            // Checking that UID is an integer
            throw new Error("uid should be an int");
        }
        if (uid == null) {
            // Checking that UID should not be null
            throw new Error("uid should not be null");
        }
        return await toggleReaction("unbookmark", pid, uid);
    };

    async function toggleReaction(type, pid, uid) {
        if (isNaN(pid)) {
            // Checking that PID is an integer
            throw new Error("pid should be an int");
        }
        if (pid == null) {
            // Checking that PID should not be null
            throw new Error("pid should not be null");
        }
        if (isNaN(uid)) {
            // Checking that UID is an integer
            throw new Error("uid should be an int");
        }
        if (uid == null) {
            // Checking that UID should not be null
            throw new Error("uid should not be null");
        }
        if (parseInt(uid, 10) <= 0) {
            throw new Error("[[error:not-logged-in]]");
        }

        const isReacting = true;

        const [postData] = await Promise.all([
            Posts.getPostFields(pid, ["pid", "uid", "reactions"]),
        ]);
        console.log("setting post fields!");
        console.log(`postData: ${postData}`);
        await Posts.setPostField(pid, "reactions", postData.reactions + 1);
        postData.reactions += 1; // Was postData.reactions + 1

        plugins.hooks.fire(`action:post.react`, {
            pid: pid,
            uid: uid,
            owner: postData.uid,
            current: "reactions",
        });

        return {
            post: postData,
            isReacted: isReacting,
        };
    }
};
