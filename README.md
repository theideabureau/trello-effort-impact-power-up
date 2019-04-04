# Effort / Impact Trello Power-Up 🚀

This is a Trello Power-up to add some basic Effort / Impact type information to your cards.

Effort / Impact scale, sometimes known as other terms, is a technique to prioritise tasks, more information about that here:

https://www.youtube.com/watch?v=ZHI-vCSX0Uo

---

#### Development  🛠

There are (currently) no build processes needed to compile this project, simply make changes to the various files and save.

Serving this project to Trello is performed in two different ways, one for development and one for production. No matter what option you choose, you will have to specify the URL within [Trello's Power-up admin](https://trello.com/power-ups/admin/).

For **development** we use [Laravel's Valet](https://laravel.com/docs/5.7/valet) service to share our local files to the Internet that Trello can then use, any changes are immediately reflected upon refresh. You can share your local working environment using Valet with the `valet share` command. This uses the [ngrok](https://ngrok.com) service, the free version does have limitations that may mean having to regularly update your Power-up URL, the paid version does not have such limitations.

For **production** we use Github Pages to serve our Power-up to Trello, to push the changes to the `gh-pages` branch, firstly install the dependancies using `yarn`, and then run `yarn run deploy` to push the changes.
