# Welcome to the Braze contributing guide <!-- omit in toc -->

Thank you for your interest in contributing to our project! :sparkles:

When contributing to this repository, please first discuss the change you wish
to make via issue, email, or any other method with the owners of this 
repository before making a change.

Please note we have a code of conduct, please follow it in all your
interactions with the project.

## Building / Testing

The following commands will clone this repo, and download all dependencies
```bash
$ git clone git@github.com/BrazeDev/Metal      # for SSH or:
$ git clone https://github.com/BrazeDev/Metal  # for HTTPS
$ cd Metal
$ npm i -g yarn
$ yarn install
```

Our CI will run the following on new commits, so make sure they pass before you
submit a PR, or it will be rejected.
```bash
$ ts-standard
$ eslint
$ tsc --resolveJsonModule
$ cross-env NODE_ENV=test mocha
$ cross-env NODE_ENV=test nyc mocha
```

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the
   layer when doing a build - honor the .gitignore!
2. Ensure all tests are passing, coverage is at least 90%, and all validation is successful
3. Update the README.md with details of changes to the interface, this includes
   new environment variables, exposed ports, useful file locations and 
   container parameters.
4. Increase the version numbers in any examples files and the README.md to the
   new version that this Pull Request would represent. The versioning scheme we
   use is [SemVer](http://semver.org/).
5. Make sure commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
6. The pull request will be merged after review by the repository owner(s)

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
out community a harassment-free experience for everyone, regardless of any
defining personal features.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and beliefs
* Gracefully accepting constructive criticism
* Focusing on what is best for the community/project
* Showing empathy and a sense of humility

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting, this is a source repo - not your friends' group chat

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at abuse@braze.dev. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/