'use strict';

// const db = require('../database');
const plugins = require('../plugins');

module.exports = function (Posts) {
    Posts.react = async function (pid, uid) {
        return await toggleReaction('bookmark', pid, uid);
    };

    Posts.unreact = async function (pid, uid) {
        return await toggleReaction('unbookmark', pid, uid);
    };

    async function toggleReaction(type, pid, uid) {
        if (parseInt(uid, 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }

        const isReacting = true;

        const [postData] = await Promise.all([
            Posts.getPostFields(pid, ['pid', 'uid', 'reactions']),
        ]);
        
        console.log('setting post fields!');
        console.log(`postData: ${postData}`)
        await Posts.setPostField(pid, 'reactions', postData.reactions + 1);

        plugins.hooks.fire(`action:post.react`, {
            pid: pid,
            uid: uid,
            owner: postData.uid,
            current: 'reacted',
        });


        return {
            post: postData,
            isReacted: isReacting,
        };
    }
};