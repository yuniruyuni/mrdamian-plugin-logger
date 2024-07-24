import fs from "node:fs/promises";
import path from "node:path";
import type { Component, ComponentConfig, Field } from "mrdamian-plugin";

type LoggerConfig = ComponentConfig & {
	args: {
		path: string;
		output: Field;
	};
};

export default class Logger implements Component<LoggerConfig> {
	public async process(config: LoggerConfig): Promise<Field> {
		const file = config.args.path;
		const dir = path.dirname(file);

		await fs.mkdir(dir, { recursive: true });
		await fs.appendFile(file, `${JSON.stringify(config.args.output)}\n`);

		return undefined;
	}
}
