[![Contributors][contributors-shield]][contributors-url]
[![Discord][discord-shield]][discord-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Build][build-shield]][build-url]

<br />
<p align="center">
  <a href="https://github.com/BrazeDev/Metal">
    <img src="meta/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Metal (the backend bit!)</h3>

  <p align="center">
    A 'fork' of solder, without the painful setup!
    <br />
    <a href="https://github.com/BrazeDev/Metal/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/BrazeDev/Metal/issues">Report Bug</a>
    ·
    <a href="https://github.com/BrazeDev/Metal/issues">Request Feature</a>
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
  </ol>
</details>

## About The Project

More readme will be added later, this is temporary to make the repo look nice :)

## Usage

Metal uses docker to make deployment simpler, and to let you get to a working state with less hassle. To run Metal with the frontend, check the [Main Repository](https://github.com/BrazeDev/Braze). However, if you're a 'docker-phobe', it should work just fine outside of docker.

### Docker

Before running Metal, download yourself a copy of `braze.config.js` from the root of the repo and pore over the options to make sure everything looks right - for the database section, you'll want to leave the host as "mysql" unless you plan on using a different MySQL server.

After that, clone the repo and check out `docker-compose.yml` and change `/braze.config.js` at the beginning of the volume definition to the location of your own config file, in addition to this, make sure to correct the port definition if you changed the port in the config file. To make sure you're safe, it's also a good idea to change the `MYSQL_PASSWORD` to something long and complex (I'd recommend leaving the `MYSQL_RANDOM_ROOT_PASSWORD` set to true).

Once you've done that, you can run the command `docker-compose up -d` and after a short wait, Metal will be up and running!

### No Docker

Without docker, there's a little bit more to be done. Firstly, you'll need to get a MySQL database running - we prefer 8.0, but it's up to you! You'll also need to modify the provided `braze.config.js` to suit your needs (along with telling it about your database). After that, running `npm install` will make sure all of the dependencies are satisfied, and `npm start` will start up the server.

[contributors-shield]: https://img.shields.io/github/contributors/thatsimplekid/Braze.svg?style=for-the-badge
[contributors-url]: https://github.com/thatsimplekid/Braze/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/thatsimplekid/Braze.svg?style=for-the-badge
[forks-url]: https://github.com/thatsimplekid/Braze/network/members
[stars-shield]: https://img.shields.io/github/stars/thatsimplekid/Braze.svg?style=for-the-badge
[stars-url]: https://github.com/thatsimplekid/Braze/stargazers
[issues-shield]: https://img.shields.io/github/issues/thatsimplekid/Braze.svg?style=for-the-badge
[issues-url]: https://github.com/thatsimplekid/Braze/issues
[license-shield]: https://img.shields.io/github/license/thatsimplekid/Braze.svg?style=for-the-badge
[license-url]: https://github.com/thatsimplekid/Braze/blob/master/LICENSE
[discord-shield]: https://img.shields.io/discord/810632951993597952?style=for-the-badge
[discord-url]: https://discord.gg/u7wG9ZSNRn
[build-shield]: https://img.shields.io/drone/build/thatsimplekid/Braze?server=https%3A%2F%2Fdrone.thatsimplekid.com&style=for-the-badge
[build-url]: https://drone.thatsimplekid.com/thatsimplekid/Braze/
[product-screenshot]: meta/screenshot.png
