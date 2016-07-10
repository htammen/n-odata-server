/**
 * Created by helmut on 10.07.16.
 */

/** Interface for return value of method commons.getRequestModelClass */
export interface RequestModelClass {
	foreignKeyFilter?: any;
	modelClass: LoopbackModelClass;
	requestId?: any;
}
