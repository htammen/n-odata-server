/**
 * Created by helmut on 10.07.16.
 */

import {LoopbackModelClass} from "./loopbacktypes"

/** Interface for return value of method commons.getRequestModelClass */
export interface RequestModelClass {
	foreignKeyFilter?: any;
	modelClass: LoopbackModelClass;
	requestId?: any;
}

export interface ODataServerConfig {
	maxpagesize?: number;
	odataversion?: string;
	odataPrefix: string;
	useViaMiddleware?: boolean;
}


