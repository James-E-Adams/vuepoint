export namespace JamesPoint {
	//For handling the security-type objects
	export interface Security {
	    bid: Number;
	    ask: Number;
	    code: string;
	}

	export class StandardSecurity implements Security {

	    bid: Number;
	    ask: Number;
	    code: string;
	    holdings: Number; 
	}

	export class ActionSecurity implements Security {
	    bid: Number;
	    ask: Number;
	    code: string;
	    action: string;

	    constructor(bid:number, ask: number, code: string, action: string) {
	        this.bid = bid;
	        this.ask = ask;
	        this.code=code;
	        this.action = action;
	    }
	}

	export class IncomingSecurity {
	    bid: number;
	    ask: number;
	    code: string;
	}
}