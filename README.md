# n-odata-server, The node OData server for the loopback framework

This project has been started to develop an [OData](http://www.odata.org/) server for node.js.
There are already some solutions at npm. These did not fulfill our requirements which are

* Support for several backend systems (databases)
* Support for local file system database (light weight)
* Support for nearly the complete OData API

## Current state of the project
__At the moment we are in an early state. Even though we are working hard we need some more time to have a version that
supports most of the OData specification.
If you need a solution that supports all or allmost all OData features either contribute to the project,
be patient or have a look for the other solutions at the market.__

If you want to contribute send us an email to [`h.tammen@tammen-it-solutions.de`](mailto:h.tammen@tammen-it-solutions.de).
We are collaborating via a [Slack Team](https://slack.com/) and will invite you to this as soon as we receive a request for contribution.
We manage our tasks via [Trello](https://trello.com). We will also authorize you to our Trello board if you want to contribute to the project.

We have currently implemented some very basic OData functionality (see below) that allows you to use some basic CRUD operations on your data. We try to implement some more useful functionality soon.

## Background

### OData
OData is a protocol for standardized access to [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) webservices. It initially
was developed by Microsoft as Open Source project. Not very much later SAP jumped onto the train. At the moment primarily Microsoft and SAP work on the [specification](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=odata) under the hood of OASIS.
Since it's early days in 2009 a lot of other companies have committed their strategy to OData or at least support OData.
To name a few there are IBM, Salesforce, Red Hat, CA, Citrix.
If you are totally new to OData this [presentation](http://de.slideshare.net/metadaddy/odata-a-standard-api-for-data-access)
might give you a quick inside into it.

#### OData versions
In the meantime the current version of Odata is 4.0. We will try to primarily support this version of OData. But
because there are to us very important frontend frameworks like SAPUI5/OpenUI5 that still work on older versions we
will also have these in mind at any time.

#### OData formats
The OData specification suggests to support [Atom](http://docs.oasis-open.org/odata/odata-atom-format/v4.0/odata-atom-format-v4.0.html)
as well as [JSON](http://docs.oasis-open.org/odata/odata-json-format/v4.0/odata-json-format-v4.0.html).
One of these formats must be supported. We will probably only support the JSON format as it is much more lightweight and
therefore easier to implement.

### Loopback
This project relies on and requires [Loopback](http://loopback.io/) a very mature node.js framework for
development of database independent node.js web applications. Our project extends this framework
with the ability to expose it's data via OData. Loopback already exposes the data via a proprietary RESTful API. If you are fine with this just use it. But if you want to base your projects on standards user OData and our loopback add-on.

## Usage
### Prerequisites
This component is not usable out of the box. You already need to have a loopback application. You can thent add this
component to the existing application. See [here](http://loopback.io/getting-started/) for details on installing and
creating a loopback application.

### Installation
Install the component like any other node package with npm

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`npm install n-odata-server --save`

### Activation
To use this loopback component you have to activate it in the file
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`server/component-config.json`

of your project. Add the following line to this file

```
  "n-odata-server": {
    "path": "/odata/*"
  }
```
If you are not happy with the prefix `odata` you can of course use another one. Just exchange `odata` with you prefix
e.g. `myservice`. Then your requests to the odata service have to start with `/myservice/`.

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
Currently very basic requests for the following http verbs are supported

* `GET`: Get all records of an entityset or a single record
* `POST`: Create a new entry in your database
* `DELETE`: Delete an entry from your database
* `PATCH`: Update an entry in your database
* `MERGE`: Update an entry in your database (to be OData V2.0 compatible)
* `PUT`: Update an entry in your database

If you are not familiar with OData request have a look at the above mentioned OData resources.


## License
This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
