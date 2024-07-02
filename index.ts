import fs from "node:fs/promises";
import path from "node:path";
import { Component, type ComponentConfig, type Field } from "mrdamian-plugin";

type LoggerConfig = ComponentConfig & {
	args: {
		path: string;
		output: Field;
	};
};

export default class Logger extends Component<LoggerConfig> {
	public async process(config: LoggerConfig): Promise<Field> {
		const file = config.args.path;
		const dir = path.dirname(file);

		await fs.mkdir(dir, { recursive: true });
		await fs.appendFile(file, `${JSON.stringify(config.args.output)}\n`);

		return undefined;
	}
}
