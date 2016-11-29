# n-odata-server, The node OData server for the loopback framework

This project has been started to develop an [OData](http://www.odata.org/) server for node.js.
There are already some solutions at npm. These did not fulfill our requirements which are

* Support for several backend systems (databases)
* Support for local file system database (light weight)
* Support for nearly the complete OData API

## Background

### OData
OData is a protocol for standardized access to [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) webservices. It initially
was developed by Microsoft as Open Source project. Not very much later SAP jumped onto the train. At the moment primarily Microsoft and SAP work on the [specification](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=odata) under the hood of OASIS.
Since it's early days in 2009 a lot of other companies have committed their strategy to OData or at least support OData.
To name a few there are IBM, Salesforce, Red Hat, CA, Citrix.
If you are totally new to OData this [presentation](http://de.slideshare.net/metadaddy/odata-a-standard-api-for-data-access)
might give you a quick inside into it.

#### OData versions
In the meantime the current version of Odata is 4.0. We will try to support this version. But
because we primarily are interested in using our server with the frontend framework SAPUI5/OpenUI5 which still works
on V2 we will support version 2.0 at first.

#### OData formats
The OData specification suggests to support [Atom](http://docs.oasis-open.org/odata/odata-atom-format/v4.0/odata-atom-format-v4.0.html)
as well as [JSON](http://docs.oasis-open.org/odata/odata-json-format/v4.0/odata-json-format-v4.0.html).
One of these formats must be supported. We will __probably only support the JSON format__ as it is much more lightweight and
therefore easier to implement.

### Loopback
This project relies on and requires [Loopback](http://loopback.io/) a very mature node.js framework for
development of database independent node.js web applications. Our project extends this framework
with the ability to expose it's data via OData. Loopback already exposes the data via a proprietary RESTful API. If you are fine with this just use it.
But if you want to base your projects on standards use OData and our loopback add-on.

## Usage
### Prerequisites
This component is not usable out of the box. You already need to have a loopback application. You can thent add this
component to the existing application. Look [here](http://loopback.io/getting-started/) for details on installing and
creating a loopback application.

### Installation
Install the component like any other node package with npm

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`npm install n-odata-server --save`

### Activation
To use this loopback component you have to activate it in the file
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`server/component-config.json`

of your project. Add the following lines to this file

```
  "n-odata-server": {
    "path": "/odata/*",
    "odataversion": "2",
    "useViaMiddleware": true
  }
```
The line `"odataversion": "2"` means that the server works with OData V2. We highly recommend to use this version at the
moment.

Additionally you have to add route handling information to the file  
`server/middleware.json`  
An example of the configuration you see here:
```
{
  "initial:before": {
    "loopback#favicon": {}
  },
  "initial": {
    "compression": {},
    "cors": {
      "params": {
        "origin": true,
        "credentials": true,
        "maxAge": 86400
      }
    }
  },
  "session": {},
  "auth": {},
  "parse": {},
	"routes": {
		"n-odata-server#odata": {
			"paths": [
				"/odata/*"
			]
		},
		"loopback#rest": {
			"paths": [
				"${restApiRoot}"
			]
		}
	},
  "files": {
    "loopback#static": {
      "params": "$!../client"
    }
  },
  "final": {
    "loopback#urlNotFound": {}
  },
  "final:after": {
    "loopback#errorHandler": {}
  }
}

```
With this configuration you can use the `odata` prefix to execute OData calls and the `api` prefix (loopback default) to execute standard restful json calls.
If you are not happy with the prefix `odata` you can of course use another one. Just exchange `odata` with your prefix in the `paths` array.
e.g. `myservice`. Then your requests to the odata service have to start with `/myservice/`.

See express documentation for more details on defining routes.


### Firing OData requests
To fire your OData request simply start your server application with

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`node .`

go to your browser and enter

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`http://0.0.0.0:3000/odata/`

This will return the OData service document from which you can see which collections / entitysets are available in
your OData server.

```
{
  "@odata.context": "http://0.0.0.0:3000/odata/$metadata",
  "value": [
    {
      "name": "people",
      "url": "people"
    }
  ]
}
```
In my case there is `people` entityset. When firing the URL

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`http://0.0.0.0:3000/odata/people`

I get the data for this collection

```
{
  "value": [
    {
      "firstname": "Helmut",
      "lastname": "Tammen",
      "id": 2
    },
    {
      "firstname": "Franz",
      "lastname": "Frosch",
      "gender": "male",
      "age": 65,
      "id": 3
    },
    {
      "firstname": "Mary",
      "lastname": "Friday",
      "gender": "female",
      "age": 10,
      "id": 4
    },
    {
      "firstname": "Johannes",
      "lastname": "Hamel",
      "id": 8
    }
  ]
}
```

### Supported requests
Currently basic requests for the following http verbs are supported

* `GET`: Get all records of an entityset or a single record
* `POST`: Create a new entry in your database
* `DELETE`: Delete an entry from your database
* `PATCH`: Update an entry in your database
* `MERGE`: Update an entry in your database (to be OData V2.0 compatible)
* `PUT`: Update an entry in your database

If you encounter a lack in the implementation this is either not implemented yet or you found an error.
In both cases you have the following opportunities

* fork the repo, fix the problem and raise a pull request so that we can take it over into the master branch of our project
* create an issue on Github
* wait until we came to the same error/lack and fixed it.

If you are not familiar with OData request have a look at the above mentioned OData resources.

### OData restrictions
Currently we don't support

* Batch requests. You have to configure your frontend to not using these. In SAPUI5 / OpenUI5 this can be done by setting a
flag
* Atom / XML request. As mentioned above we only support JSON.

### Authentication and Authorization
n-odata-server leverages the authentication and authorization mechanisms supplied by loopback. 
We have provided a [wiki page](https://github.com/htammen/n-odata-server/wiki/authorization) to help you get started easily with this topic.

### Logging
We use [log4js](https://github.com/nomiddlename/log4js-node) for internal logging purposes.
Per default we log to the console and to a file named `n_odata_server.log` that is created in the root directory of your
development project.
The default logging configuration is quite verbose. If you don't want to see that much information you can adjust it.
Create a file named `n_odata_server_log.json` in the root directory of your project and configure your logging preferences.
See the log4js documentation for more details.
Following you see the default configuration that is used if the above mentioned file does not exist.
```
{
	"appenders": [
		{ "type": "console" },
		{
			"type": "file",
			"filename": "n_odata_server.log",
			"maxLogSize": 1048576
		}
	],
	"replaceConsole": true,

	"levels": {
		"[all]": "TRACE"
	}
}
```

## Documentation
To read more about the n-odata-server you should have a look at the [wiki](https://github.com/htammen/n-odata-server/wiki) or you can have a
look at this [presentation](http://prezi.com/dznggtj0zjlo/?utm_campaign=share&utm_medium=copy) for a not very technical overview

## Tutorials
Have a look at our [wiki page](https://github.com/htammen/n-odata-server/wiki) for tutorials that demonstrate the usage of n-odata-server.

## Current state of the project
__Even though we are working hard we need some more time to have a version that
supports most of the OData specification.
Please stay tuned or contribute to the project if you want quicker results.__

We have currently implemented some but not all OData functionality (see below). You should be able to use most of the basic CRUD operations
on your data. We try to implement some more useful functionality as soon as possible. Additionally we make currently available functionality
more stable every day.

### Release Notes
To see what's implemented yet have a look at our [release notes](CHANGELOG.md)

## Contribute
If you want to contribute send us an email to [`h.tammen@tammen-it-solutions.de`](mailto:h.tammen@tammen-it-solutions.de).
We are collaborating / communication via [Slack](https://slack.com/) and will invite you to our team as soon as we receive a request for contribution.
We manage our tasks via [zube.io](https://zube.io). We will also authorize you to our zube scrum board if you want to contribute to the project.

You can also have a look at the [DEV_NOTES.md](DEV_NOTES.md) file to get more details about our development process.



## License
This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.


