import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeParameters,
	INodeType,
	INodeTypeDescription,
	NodeParameterValue,
} from 'n8n-workflow';


export class Switch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Switch',
		name: 'switch',
		icon: 'fa:map-signs',
		group: ['transform'],
		version: 1,
		description: 'Route items depending on defined expression or rules.',
		defaults: {
			name: 'Switch',
			color: '#506000',
		},
		inputs: ['main'],
		outputs: ['main', 'main', 'main', 'main'],
		outputNames: ['0', '1', '2', '3'],
		properties: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{
						name: 'Expression',
						value: 'expression',
						description: 'Expression decides how to route data.',
					},
					{
						name: 'Rules',
						value: 'rules',
						description: 'Rules decide how to route data.',
					},
				],
				default: 'rules',
				description: 'How data should be routed.',
			},


			// ----------------------------------
			//         mode:expression
			// ----------------------------------
			{
				displayName: 'Output',
				name: 'output',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 3,
				},
				displayOptions: {
					show: {
						mode: [
							'expression',
						],
					},
				},
				default: 0,
				description: 'The index of output to which to send data to.',
			},


			// ----------------------------------
			//         mode:rules
			// ----------------------------------
			{
				displayName: 'Data Type',
				name: 'dataType',
				type: 'options',
				displayOptions: {
					show: {
						mode: [
							'rules',
						],
					},
				},
				options: [
					{
						name: 'Boolean',
						value: 'boolean',
					},
					{
						name: 'Number',
						value: 'number',
					},
					{
						name: 'String',
						value: 'string',
					},
				],
				default: 'number',
				description: 'The type of data to route on.',
			},

			// ----------------------------------
			//         dataType:boolean
			// ----------------------------------
			{
				displayName: 'Value 1',
				name: 'value1',
				type: 'boolean',
				displayOptions: {
					show: {
						dataType: [
							'boolean',
						],
						mode: [
							'rules',
						],
					},
				},
				default: false,
				description: 'The value to compare with the second one.',
			},
			{
				displayName: 'Routing Rules',
				name: 'rules',
				placeholder: 'Add Routing Rule',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						dataType: [
							'boolean',
						],
						mode: [
							'rules',
						],
					},
				},
				description: 'The routing rules.',
				default: {},
				options: [
					{
						name: 'rules',
						displayName: 'Boolean',
						values: [
							{
								displayName: 'Operation',
								name: 'operation',
								type: 'options',
								options: [
									{
										name: 'Equal',
										value: 'equal',
									},
									{
										name: 'Not Equal',
										value: 'notEqual',
									},
								],
								default: 'equal',
								description: 'Operation to decide where the the data should be mapped to.',
							},
							{
								displayName: 'Value 2',
								name: 'value2',
								type: 'boolean',
								default: false,
								description: 'The value to compare with the first one.',
							},
							{
								displayName: 'Output',
								name: 'output',
								type: 'number',
								typeOptions: {
									minValue: 0,
									maxValue: 3,
								},
								default: 0,
								description: 'The index of output to which to send data to if rule matches.',
							},
						],
					},
				],
			},

			// ----------------------------------
			//         dataType:number
			// ----------------------------------
			{
				displayName: 'Value 1',
				name: 'value1',
				type: 'number',
				displayOptions: {
					show: {
						dataType: [
							'number',
						],
						mode: [
							'rules',
						],
					},
				},
				default: 0,
				description: 'The value to compare with the second one.',
			},
			{
				displayName: 'Routing Rules',
				name: 'rules',
				placeholder: 'Add Routing Rule',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						dataType: [
							'number',
						],
						mode: [
							'rules',
						],
					},
				},
				description: 'The routing rules.',
				default: {},
				options: [
					{
						name: 'rules',
						displayName: 'Numbers',
						values: [
							{
								displayName: 'Operation',
								name: 'operation',
								type: 'options',
								options: [
									{
										name: 'Smaller',
										value: 'smaller',
									},
									{
										name: 'Smaller Equal',
										value: 'smallerEqual',
									},
									{
										name: 'Equal',
										value: 'equal',
									},
									{
										name: 'Not Equal',
										value: 'notEqual',
									},
									{
										name: 'Larger',
										value: 'larger',
									},
									{
										name: 'Larger Equal',
										value: 'largerEqual',
									},
								],
								default: 'smaller',
								description: 'Operation to decide where the the data should be mapped to.',
							},
							{
								displayName: 'Value 2',
								name: 'value2',
								type: 'number',
								default: 0,
								description: 'The value to compare with the first one.',
							},
							{
								displayName: 'Output',
								name: 'output',
								type: 'number',
								typeOptions: {
									minValue: 0,
									maxValue: 3,
								},
								default: 0,
								description: 'The index of output to which to send data to if rule matches.',
							},
						],
					},
				],
			},

			// ----------------------------------
			//         dataType:string
			// ----------------------------------
			{
				displayName: 'Value 1',
				name: 'value1',
				type: 'string',
				displayOptions: {
					show: {
						dataType: [
							'string',
						],
						mode: [
							'rules',
						],
					},
				},
				default: '',
				description: 'The value to compare with the second one.',
			},
			{
				displayName: 'Routing Rules',
				name: 'rules',
				placeholder: 'Add Routing Rule',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						dataType: [
							'string',
						],
						mode: [
							'rules',
						],
					},
				},
				description: 'The routing rules.',
				default: {},
				options: [
					{
						name: 'rules',
						displayName: 'Strings',
						values: [
							{
								displayName: 'Operation',
								name: 'operation',
								type: 'options',
								options: [
									{
										name: 'Contains',
										value: 'contains',
									},
									{
										name: 'Equal',
										value: 'equal',
									},
									{
										name: 'Not Contains',
										value: 'notContains',
									},
									{
										name: 'Not Equal',
										value: 'notEqual',
									},
									{
										name: 'Regex',
										value: 'regex',
									},
								],
								default: 'equal',
								description: 'Operation to decide where the the data should be mapped to.',
							},
							{
								displayName: 'Value 2',
								name: 'value2',
								type: 'string',
								displayOptions: {
									hide: {
										operation: [
											'regex',
										],
									},
								},
								default: '',
								description: 'The value to compare with the first one.',
							},
							{
								displayName: 'Regex',
								name: 'value2',
								type: 'string',
								displayOptions: {
									show: {
										operation: [
											'regex',
										],
									},
								},
								default: '',
								placeholder: '/text/i',
								description: 'The regex which has to match.',
							},
							{
								displayName: 'Output',
								name: 'output',
								type: 'number',
								typeOptions: {
									minValue: 0,
									maxValue: 3,
								},
								default: 0,
								description: 'The index of output to which to send data to if rule matches.',
							},
						],
					},
				],
			},


			{
				displayName: 'Fallback Output',
				name: 'fallbackOutput',
				type: 'options',
				displayOptions: {
					show: {
						mode: [
							'rules',
						],
					},
				},
				options: [
					{
						name: 'None',
						value: -1,
					},
					{
						name: '0',
						value: 0,
					},
					{
						name: '1',
						value: 1,
					},
					{
						name: '2',
						value: 2,
					},
					{
						name: '3',
						value: 3,
					},
				],
				default: -1,
				description: 'The output to which to route all items which do not match any of the rules.',
			},

		],
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[][] = [
			[],
			[],
			[],
			[],
		];

		const items = this.getInputData();

		let compareOperationResult: boolean;
		let item: INodeExecutionData;
		let mode: string;
		let outputIndex: number;
		let ruleData: INodeParameters;
		let value1: NodeParameterValue;

		// The compare operations
		const compareOperationFunctions: {
			[key: string]: (value1: NodeParameterValue, value2: NodeParameterValue) => boolean;
		} = {
			contains: (value1: NodeParameterValue, value2: NodeParameterValue) => value1.toString().includes(value2.toString()),
			notContains: (value1: NodeParameterValue, value2: NodeParameterValue) => !value1.toString().includes(value2.toString()),
			equal: (value1: NodeParameterValue, value2: NodeParameterValue) => value1 === value2,
			notEqual: (value1: NodeParameterValue, value2: NodeParameterValue) => value1 !== value2,
			larger: (value1: NodeParameterValue, value2: NodeParameterValue) => value1 > value2,
			largerEqual: (value1: NodeParameterValue, value2: NodeParameterValue) => value1 >= value2,
			smaller: (value1: NodeParameterValue, value2: NodeParameterValue) => value1 < value2,
			smallerEqual: (value1: NodeParameterValue, value2: NodeParameterValue) => value1 <= value2,
			regex: (value1: NodeParameterValue, value2: NodeParameterValue) => {
				const regexMatch = value2.toString().match(new RegExp('^/(.*?)/([gimy]*)$'));

				let regex: RegExp;
				if (!regexMatch) {
					regex = new RegExp(value2.toString());
				} else if (regexMatch.length === 1) {
					regex = new RegExp(regexMatch[1]);
				} else {
					regex = new RegExp(regexMatch[1], regexMatch[2]);
				}

				return !!value1.toString().match(regex);
			},
		};

		function checkIndexRange(index: number) {
			if (index < 0 || index >= returnData.length) {
				throw new Error(`The ouput ${index} is not allowed. It has to be between 0 and ${returnData.length - 1}!`);
			}
		}

		// Itterate over all items to check to which output they should be routed to
		itemLoop:
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			item = items[itemIndex];
			mode = this.getNodeParameter('mode', itemIndex) as string;

			if (mode === 'expression') {
				// One expression decides how to route item

				outputIndex = this.getNodeParameter('output', itemIndex) as number;
				checkIndexRange(outputIndex);

				returnData[outputIndex].push(item);
			} else if (mode === 'rules') {
				// Rules decide how to route item

				value1 = this.getNodeParameter('value1', itemIndex) as NodeParameterValue;

				for (ruleData of this.getNodeParameter('rules.rules', itemIndex, []) as INodeParameters[]) {
					// Check if the values passes
					compareOperationResult = compareOperationFunctions[ruleData.operation as string](value1, ruleData.value2 as NodeParameterValue);

					if (compareOperationResult === true) {
						// If rule matches add it to the correct output and continue with next item
						checkIndexRange(ruleData.output as number);
						returnData[ruleData.output as number].push(item);
						continue itemLoop;
					}
				}

				// Check if a fallback output got defined and route accordingly
				outputIndex = this.getNodeParameter('fallbackOutput', itemIndex) as number;
				if (outputIndex !== -1) {
					checkIndexRange(outputIndex);
					returnData[outputIndex].push(item);
				}
			}
		}

		return returnData;
	}
}
