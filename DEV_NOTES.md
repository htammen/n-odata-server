# Developer Notes
This is a documentation for developers who are members of the development team. It describes our internal process of developing
this software.

## Git
This project is located on [github.com](https://github.com/htammen/n-odata-server).
During development we use [git-flow](https://github.com/nvie/gitflow), a well proven workflow for git development. This means
we normally develop in the 'develop' branch. If we implement special features we create git-flow features and when we want to
create a release we create git-flow release. As soon as the release has been tested we finish the release and publish it to npmjs.com.
The first step is done via git-flow again, the publishing step is done manually via `npm publish`.

Here you fund a good quickstart for [git-flow](http://danielkummer.github.io/git-flow-cheatsheet/index.html)

To get started with git-flow you have to install it (see link above). Many tools and IDEs support git-flow. E.g. SourceTree supports it
very well and there is also a good plugin for IntelliJ Idea, WebStorm, PHPStorm, ...

## Issue Management
For Issue Management we use [zube.io](https://zube.io). Zube perfectly interacts with github repositories.

You get invited to this as soon as you confirmed you confirmed you collaboration to
github.

In zube we
* manage our backlog
* create and manage our sprints
* manage our issues
* document the development

## TypeScript in instead of plain JavaScript
JavaScript is of course a very good and flexible programming language. But if you have to realize larger projects this flexibility often
makes development very hard and obscure (this is not only our experience but also from slightly bigger companies like Google and Micorosoft).
Therefore we decided to use TypeScript as development language. This language offers the flexibility of JavaScript and gives guidance
and type safety like strictly typed languages do. In the end this TypeScript code is transpiled to JavaScript that can be run by node or in a browser.

With our github project we deliver everything you need for developing with TypeScript. But before you can start developing you have to do
execute the following steps.

* Clone repository from github
* cd into the cloned directory
* run `npm install` to install all the npm packages into the local `node_modules` folder
* run `typings install` to install the needed TypeScript type definitions into the `typings` folder
* run `tsc -w` to start the TypeScript watch task that automatically transpiles TypeScripts *.ts files into *.js files in the background.

Many IDE support TypeScript. You can of cause also use the functionality of your IDE to transpile you ts files.

## Create Release Notes
The release notes are created from Github issues using a ruby tool called [github-changelog-generator](https://github.com/skywinder/github-changelog-generator)
This tool has to be installed locally (see project docu). Additionally a github token should be generated and set as environment variable *CHANGELOG_GITHUB_TOKEN*,
e.g. with `export CHANGELOG_GITHUB_TOKEN="«your-40-digit-github-token»"`

*There is also a quite promising [node project](https://github.com/conventional-changelog/conventional-changelog-cli) that needs a more configuration.
Maybe we'll choose that in the future*

### Release Notes creation process
To create the release notes follow these steps. You can run the steps several times without any problem.

- cd into the project directory
- open file `.github_changelog_generator`
- adjust the parameter `future-release` to the new release number
- run the command `npm run relnotes`
- commit the created `CHANGELOG.md` file

