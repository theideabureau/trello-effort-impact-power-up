# Effort / Impact Trello Power-Up 🚀

Version: 1.0.3

This is a Trello Power-up to add some basic Effort / Impact functionality to your cards.

The Effort / Impact scale, sometimes known by other terms, is a technique to prioritise tasks, more information about that here:

https://www.youtube.com/watch?v=ZHI-vCSX0Uo

---

#### Development  🛠

##### Build tools

The build process uses [Laravel Mix](https://laravel-mix.com/docs/4.0/basic-example), a Webpack wrapper.

To setup, run the `yarn` command.

Use the `watch`, `dev`, `prod` arguments with `yarn run __command__` to build the project.

Serving this project to Trello is performed in two different ways, one for development and one for production. No matter what option you choose, you will have to specify the URL within [Trello's Power-up admin](https://trello.com/power-ups/admin/).

##### Serving

For **development** we use [Laravel Valet](https://laravel.com/docs/5.7/valet) to share our local files to the Internet that Trello can then use, any changes are immediately reflected upon refresh. You can share your local working environment using Valet with the `valet share` command. This uses the [ngrok](https://ngrok.com) service, the free version does have limitations that may mean having to regularly update your URL withing the [Power-up admin](https://trello.com/power-ups/admin/), the paid version resolves such limitations.

For **production** we use Github Pages to serve our Power-up to Trello, to push the changes to the `gh-pages` branch, firstly install the dependancies using `yarn`, and then run `yarn run deploy` to push the changes.
