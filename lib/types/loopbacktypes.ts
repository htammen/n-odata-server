import * as express from "express";

/** Interface for loopback application */
export interface LoopbackApp {
	models: any;
	remotes: Function;
}

/** Interface for loopback filter definition */
export interface LoopbackFilter {
	fields?: any,
		include?: any,
		limit?: number,
		order?: Array<any>,
		skip?: number,
		where?: any
}

/** Settings of a LoopbackModel definition */
export interface LoopbackModelDefinitionSettings {
	acls: Array<any>,
	base: string,
	idInjection: boolean,
	methods: Object,
	persistUndefinedAsNull: boolean,
	plural: string,
	relations: Object,
	strict: boolean,
	validateUpsert: boolean,
	validations: Array<any>
}

/** Inteface for a single relation definition inside the LoopbackModelDefinitionSettings */
export interface LoopbackModelDefinitionSettingsRelation {
	foreignKey: string,
	model: string,
	type: string
}

/** Definition of a Loopback model class */
export interface LoopbackModelDefinition {
	_ids: Array<Object>,
	name: string,
	properties: Object,
	rawProperties: Object,
	settings: LoopbackModelDefinitionSettings
}

/** Interface for loopback relation definition */
export interface LoopbackRelationDefinition {
	embed: boolean,
	type: string,
	keyFrom: string,
	keyTo: string,
	modelFrom: LoopbackModelClass,
	modelTo: LoopbackModelClass,
	multiple: boolean,
	name: string,
	options: Object,
	polymorphic: any,
	properties: Object,
	scope: any
}

export interface LoopbackModelClass {
	relations: any,
	name: string,
	definition: any,
	modelName: string,
	pluralModelName: string,

	forEachProperty: Function,
	getIdName: Function,
	updateAll: Function,
	findById: Function,
	count: Function,
	find: Function,
	create: Function
}

export interface LoopbackModelProperty {
	deprecated?: boolean,
	generated?: boolean,
	type?: {
		name: string
	},
	id: string
}

export interface LoopbackRequest extends express.Request {
	accessToken?: any
}
