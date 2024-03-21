# Explanation of New Features, User Testing

**In this file, provide a detailed outline of how to use and user test your new feature(s)**

We have implemented 2 features: one frontend change (NodeBB Dark Mode) and one backend change (ability to react using emojis). Currently the emoji reactions are in the proof-of-concept stage (only one happy-face reaction is currently available), we assert without loss of generality that our changes could be used to introduce an _arbitrary_ number of emoji reactions.

To test darkmode as a user, build and start NodeBB on your local machine. On the top-center of the page, there is a button with text "Darkmode". Clicking this button results in the background turning darker and the text turning lighter -- verify that this is the case. Furthermore, try navigating to different pages via the icons on the top navigation bar. You should observe that the darkmode setting persists, until you either log in/out or refresh the page.

To test the emoji reaction, navigate to any post first (e.g. via the 'recent' tab). If no posts exist yet make one. After navigating to this post, on the right side of the screen there is a smiley-face icon underneath the up/down voting icons. Click this smiley face, and refresh the page to see the number of reactions increase by 1.

# Automated Testing

**You should also provide a link/description of where your added automated tests can be found, along with a description of what is being tested and why you believe the tests are sufficient for covering the changes that you have made**

First we note that, because darkmode was strictly a front-end feature implemented by altering tpl/less files, we felt that a set of tests on this feature was poorly-motivated in the context of writing mocha tests on JS code, and so we did not test this feature.

Secondly, our tests for the emoji reactions can be found in test/posts.js, starting on line 164. The two major areas of functionality that we test are that (1) users who are not logged in cannot react (get an error message) and (2) hitting the emoji button once causes the counter associated with number of reactions to increase by 1. We felt that these tests were sufficient because they cover the 2 major points of interest for the features: We want to make sure that only users who are logged in can use this reaction system, and we also want to make sure that the emoji button works at all, e.g. it actually increments something.
