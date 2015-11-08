# n-odata-server, The node OData server for the loopback framework

This project has been started to develop an [OData](http://www.odata.org/) server for node.js.
There are already some solutions at npm. These did not fulfill our requirements which are

* Support for several backend systems (databases)
* Support for local file system database (light weight)
* Support for nearly the complete OData API

## OData
OData is a protocol for standardized access to [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) webservices. It initially
was developed by Microsoft as Open Source project. Not very much later SAP jumped onto the train. At the moment primarily Microsoft and SAP work on the [specification](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=odata) under the hood of OASIS.
Since it's early days in 2009 a lot of other companies have committed their strategy to OData or at least support OData.
To name a few there are IBM, Salesforce, Red Hat, CA, Citrix.
If you are totally new to OData this [presentation](http://de.slideshare.net/metadaddy/odata-a-standard-api-for-data-access)
might give you a quick inside into it.

### OData versions
In the meantime the current version of Odata is 4.0. We will try to primarily support this version of OData. But
because there are to us very important frontend frameworks like SAPUI5/OpenUI5 that still work on older versions we
will also have these in mind at any time.

### OData formats
The OData specification suggests to support [Atom](http://docs.oasis-open.org/odata/odata-atom-format/v4.0/odata-atom-format-v4.0.html)
as well as [JSON](http://docs.oasis-open.org/odata/odata-json-format/v4.0/odata-json-format-v4.0.html).
One of these formats must be supported. We will probably only support the JSON format as it is much more lightweight and
therefore easier to implement.

## Loopback
This project relies on and requires [Loopback](http://loopback.io/) a very mature node.js framework for
development of database independent node.js web applications. Our project extends this framework
with the ability to expose it's data via OData. Loopback already exposes the data via a proprietary RESTful API. If you are fine with this just use it. But if you want to base your projects on standards user OData and our loopback add-on.

## Current state of the project
__At the moment we are at the absolute beginning. Either contribute to the project, be patient or have a look for the other solutions at the market.__

If you want to contribute send us an [email](mailto:h.tammen@tammen-it-solutions.de) to `h.tammen@tammen-it-solutions.de`. We are collaborating via a [Slack Team](https://slack.com/) and will invite you to this as soon as we receive a request for contribution.

We have currently implemented some very basic OData functionality that allows you to use some basic CRUD operations on your data. We try to implement some more useful functionality soon.
