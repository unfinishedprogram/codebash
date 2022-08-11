type LogLevel = 
	"error" |
	"warn" |
	"info" |
	"log" // Default

interface LogOptions {
	level?:LogLevel;	
}

const time = () => {
	const date = new Date();
	const [h, m, s] = [date.getHours().toString().padStart(2, "0"), date.getMinutes(),date.getSeconds()];
	return `${h}:${m}:${s}`
}
export abstract class Logger {
	private static levels = {
		error: {
			fg:"white",
			bg:"red"
		},
		warn: {
			fg:"white",
			bg:"orange"
		},
		info: {
			fg:"white",
			bg:"purple"
		},
		log: {
			fg:"black",
			bg:"white"
		}
	}

	private static style = {
		date:"color:blue;"
	}

	private static prefix(level:keyof typeof Logger.levels):[string, string] {
		return [
			`[${time()}] : %c ${level.toUpperCase()} `,
			`background:${Logger.levels[level].bg}; 
			 color:${Logger.levels[level].fg}; 
			 font-weight:bold;
			 border-radius:3px;
			 padding:2px;`
		]
	}

	public static log(content:any, options?:LogOptions){
		const level = options?.level || "log";
		console[level](...Logger.prefix(level), content)
	}
	public static warn(content:any) {
		console.warn(...Logger.prefix("warn"), content)
	}
	public static error(content:any) {
		console.error(...Logger.prefix("error"), content)
	}
	public static info(content:any) {
		console.info(...Logger.prefix("info"), content)
	}
}

const log = Logger.log;
export default log;