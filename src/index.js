import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import dayjs from 'dayjs';

class AddStates extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			statesList: props.statesList,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		var index = event.target.attributes.index.value;
		var name = event.target.name;
		var value = event.target.value;

		this.props.onChangeState(index, name, value);
	}

	render() {
		let rows = [];
		let rowColoring = "";
		let stateToBeHighlighted = this.props.currentState;

		this.state.statesList.forEach((arrayItem, index, fullArray) => {
			if (arrayItem.stateName === stateToBeHighlighted) {
				rowColoring = "blueRow";
			} else {
				rowColoring = "whiteRow"
			}

			rows.push(
				<tr key={index} className={rowColoring}>
					<td>
						<input className="w-100" name="stateName" index={index} value={arrayItem.stateName} onChange={this.handleChange} type="text" />
					</td>
					<td>
						<input className="w-100" name="stateDescription" index={index} value={arrayItem.stateDescription} onChange={this.handleChange} type="text" />
					</td>
					<td>
						<button className="btn btn-link" onClick={() => this.props.onRemoveRow(index)}>Remove</button>
						<button className="btn btn-link" onClick={() => this.props.onSetState(arrayItem.stateName)}>Set</button>
					</td>
				</tr>
			);
		});

		return (
			<div>
				<table className="m-auto table table-bordered w-100 text-center">
					<thead>
						<tr>
							<th style={{ width: "42%" }}>State name</th>
							<th style={{ width: "41%" }}>State description</th>
							<th style={{ width: "17%" }}>Action</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
}

class CommandsList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			commandsList: props.commandsList,
			statesList: props.statesList,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		var value = event.target.value;
		var nameAndIndex = event.target.name.split(" ");
		var name = nameAndIndex[0];
		var index = nameAndIndex[1];

		this.props.onChangeCommand(index, name, value)
	}

	render() {
		let rows = [];
		let statesListOptions = [];
		let rowColoring = "";
		let commandToBeHighlighted = this.props.currentCommand;
		this.state.statesList.forEach((arrayItem, index, fullArray) => {
			statesListOptions.push(
				<option key={index} value={arrayItem.stateName}>{arrayItem.stateName}</option>
			);
		});


		this.state.commandsList.forEach((arrayItem, index, fullArray) => {
			if (index === commandToBeHighlighted) {
				rowColoring = "blueRow";
			} else {
				rowColoring = "whiteRow"
			}
			rows.push(
				<tr key={index} className={rowColoring}>
					<td>
						<select className="form-select w-100" name={"initialState " + index} value={arrayItem.initialState} onChange={this.handleChange}>
							{statesListOptions}
						</select>
					</td>
					<td>
						<input className="w-100" name={"input " + index} value={arrayItem.input} onChange={this.handleChange} type="text" />
					</td>
					<td>
						<input className="w-100" name={"output " + index} value={arrayItem.output} onChange={this.handleChange} type="text" />
					</td>
					<td>
						<select className="form-select w-100" name={"move " + index} value={arrayItem.move} onChange={this.handleChange}>
							<option value="right">right</option>
							<option value="left">left</option>
							<option value="stay">stay</option>
						</select>
					</td>
					<td>
						<select className="form-select w-100" name={"nextState " + index} value={arrayItem.nextState} onChange={this.handleChange}>
							{statesListOptions}
						</select>
					</td>
					<td>
						<input className="w-100" name={"description " + index} value={arrayItem.description} onChange={this.handleChange} type="text" />
					</td>
					<td>
						<button className="btn btn-link" onClick={() => this.props.onRemoveRow(index)}>Remove</button>
						<button className="btn btn-link">Execute</button>
					</td>
				</tr>
			);
		});

		return (
			<div>
				<div className="table-responsive">
					<table className="m-auto table table-bordered w-100 text-center">
						<thead>
							<tr>
								<th>Initial state</th>
								<th>Input</th>
								<th>Output</th>
								<th>Move</th>
								<th>Next state</th>
								<th>Description</th>
								<th>...</th>
							</tr>
						</thead>
						<tbody>
							{rows}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

class Tape extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tapeText: props.tapeText,
			tmpText: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.setTextToTape = this.setTextToTape.bind(this);
		this.getTextFromTape = this.getTextFromTape.bind(this);
	}

	handleChange(event) {
		this.setState({
			tmpText: event.target.value,
		});
	}

	setTextToTape() {
		let tempText = this.state.tmpText;

		this.setState({
			tapeText: tempText,
			tmpText: "",
		});

		this.props.setTextToTape(tempText);
	}

	getTextFromTape(digits) {
		let text = "";

		digits.forEach((arrayItem) => {
			text += arrayItem.props.val;
		});

		this.setState({
			tmpText: text,
		});

		this.props.getTextFromTape(text)
	}

	render() {
		let tmp = this.props.tapeText.split('');
		let digits = [];
		tmp.forEach((arrayItem, index, fullArray) => {
			digits.push(
				<div key={index} val={arrayItem} className="p-2 border">
					{arrayItem}
				</div>
			);
		});

		return (
			<div>
				<h3>Tape</h3>
				<button onClick={() => this.props.fetchNumber()} className="btn btn-danger my-2 mr-2">Fetch</button>
				<div className="d-flex mb-3 w-100 border">
					{digits}
				</div>
				<input name="tape" value={this.state.tmpText} onChange={this.handleChange} type="text" />
				<button onClick={() => this.getTextFromTape(digits)} className="btn btn-primary m-2">Get text from tape</button>
				<button onClick={() => this.setTextToTape()} className="btn btn-secondary mr-2">Set text to tape</button>
			</div>
		);
	}
}

class ImportMachine extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			value: event.target.value,
		});
		console.log(this.state);
	}

	render() {
		return (
			<div>
				<h3>Import/Export machine</h3>
				<button className="btn btn-primary my-2 mr-2" onClick={() => this.props.exportMachine}>Export machine</button>
				<button className="btn btn-secondary my-2 mr-2" onClick={() => this.props.importMachine}>Import machine</button>
				<br />
				<textarea className="w-100" value={this.state.value} onChange={this.handleChange} />
			</div>
		);
	}
}

class Turing extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			statesList: [
				{
					stateName: "S0",
					stateDescription: "S0 description",
				},
				{
					stateName: "S1",
					stateDescription: "S1 description",
				},
				{
					stateName: "S2",
					stateDescription: "S2 description",
				},
				{
					stateName: "SF",
					stateDescription: "SF description",
				},
			],
			commandsList: [
				{
					initialState: "S0",
					input: "9",
					output: "8",
					move: "stay",
					nextState: "S0",
					description: "Command description",
				},
				{
					initialState: "S0",
					input: "8",
					output: "7",
					move: "stay",
					nextState: "S0",
					description: "Command description",
				},
				{
					initialState: "S0",
					input: "7",
					output: "6",
					move: "stay",
					nextState: "S0",
					description: "Command description",
				},
				{
					initialState: "S0",
					input: "6",
					output: "5",
					move: "stay",
					nextState: "S0",
					description: "Command description",
				},
				{
					initialState: "S0",
					input: "5",
					output: "4",
					move: "stay",
					nextState: "S0",
					description: "Command description",
				},
				{
					initialState: "S0",
					input: "4",
					output: "3",
					move: "stay",
					nextState: "S0",
					description: "Command description",
				},
				{
					initialState: "S0",
					input: "3",
					output: "2",
					move: "stay",
					nextState: "S0",
					description: "Command description",
				},
				{
					initialState: "S0",
					input: "2",
					output: "1",
					move: "stay",
					nextState: "S0",
					description: "Command description",
				},
				{
					initialState: "S0",
					input: "1",
					output: "0",
					move: "left",
					nextState: "S1",
					description: "Command description",
				},
				{
					initialState: "S0",
					input: "0",
					output: "0",
					move: "left",
					nextState: "S1",
					description: "Command description",
				},
				{
					initialState: "S1",
					input: "9",
					output: "8",
					move: "left",
					nextState: "S2",
					description: "Command description",
				},
				{
					initialState: "S1",
					input: "8",
					output: "7",
					move: "right",
					nextState: "S2",
					description: "Command description",
				},
				{
					initialState: "S1",
					input: "7",
					output: "6",
					move: "right",
					nextState: "S2",
					description: "Command description",
				},
				{
					initialState: "S1",
					input: "6",
					output: "5",
					move: "right",
					nextState: "S2",
					description: "Command description",
				},
				{
					initialState: "S1",
					input: "5",
					output: "4",
					move: "right",
					nextState: "S2",
					description: "Command description",
				},
				{
					initialState: "S1",
					input: "4",
					output: "3",
					move: "right",
					nextState: "S2",
					description: "Command description",
				},
				{
					initialState: "S1",
					input: "3",
					output: "2",
					move: "right",
					nextState: "S2",
					description: "Command description",
				},
				{
					initialState: "S1",
					input: "2",
					output: "1",
					move: "right",
					nextState: "S2",
					description: "Command description",
				},
				{
					initialState: "S1",
					input: "1",
					output: "0",
					move: "right",
					nextState: "S2",
					description: "Command description",
				},
				{
					initialState: "S1",
					input: "0",
					output: "0",
					move: "stay",
					nextState: "SF",
					description: "Command description",
				},
				{
					initialState: "S2",
					input: "0",
					output: "9",
					move: "stay",
					nextState: "S0",
					description: "Command description",
				},
			],
			tapeText: "",
			currentState: "",
			currentPosition: -1,
			currentCommand: -1,
		};


		this.debug = this.debug.bind(this);
		this.removeState = this.removeState.bind(this);
		this.removeCommand = this.removeCommand.bind(this);
		this.addState = this.addState.bind(this);
		this.addCommand = this.addCommand.bind(this);
		this.onChangeState = this.onChangeState.bind(this);
		this.onChangeCommand = this.onChangeCommand.bind(this);
		this.setTextToTape = this.setTextToTape.bind(this);
		this.getTextFromTape = this.getTextFromTape.bind(this);
		this.fetchNumber = this.fetchNumber.bind(this);
		this.setCurrentState = this.setCurrentState.bind(this);
		this.importMachine = this.importMachine.bind(this);
		this.exportMachine = this.exportMachine.bind(this);
	}

	addCommand() {
		const commandsList = this.state.commandsList;
		commandsList.push(
			{
				initialState: "",
				input: "",
				output: "",
				move: "",
				nextState: "",
				description: "",
			}
		);

		this.setState({
			commandsList: commandsList,
		});
	}

	removeCommand(index) {
		const commandsList = this.state.commandsList;
		commandsList.splice(index, 1);
		this.setState({
			commandsList: commandsList,
		});
	}

	removeState(index) {
		const statesList = this.state.statesList;
		statesList.splice(index, 1);
		this.setState({
			statesList: statesList,
		});
	}

	addState() {
		const statesList = this.state.statesList;
		statesList.push(
			{
				stateName: "",
				stateDescription: "",
			}
		);

		this.setState({
			statesList: statesList,
		});
	}

	onChangeState(index, name, value) {
		let tmp = this.state.statesList;

		if (name === "stateName") {
			tmp[index].stateName = value;
		} else if (name === "stateDescription") {
			tmp[index].stateDescription = value;
		} else {
			console.log("big error");
		}

		this.setState({
			statesList: tmp,
		});
	}

	onChangeCommand(index, name, value) {
		let tmp = this.state.commandsList;

		// orribile, vedere se si può fare in un altro modo
		if (name === "input") {
			tmp[index].input = value;
		}
		else if (name === "output") {
			tmp[index].output = value;
		}
		else if (name === "description") {
			tmp[index].description = value;
		}
		else if (name === "initialState") {
			tmp[index].initialState = value;
		}
		else if (name === "nextState") {
			tmp[index].nextState = value;
		}
		else if (name === "move") {
			tmp[index].move = value;
		}
		else {
			console.log("big error");
		}

		this.setState({
			commandsList: tmp,
		});


	}

	// cancellare questo e anche il bottone debug
	debug() {
		console.log(this.state);
	}

	fetchNumber() {
		/* in questo momento ho:
		-> il testo sul nastro
		-> la lista dei comandi
		-> la lista degli stati

		devo:
		ok 1) prendere il valore sulla posizione corrente
		ok 2) cercare nell'array dei comandi quello che ha stato uguale a quello corrente e input uguale al valore corrente
		ok 3) cambiare il valore in quello dell'output
		ok 4) cambiare lo stato corrente in quello del next state
		ok 5) cambiare la posizione corrente in base al move
		6) fare l'update di stato dei 3 valori (posizione, current state, digits)

		mi servono quindi due valori di stato: posizione corrente e stato corrente 
		*/

		if (this.state.tapeText === "") {
			alert("Empty tape");
			return;
		}
		if (this.state.currentState === "") {
			alert("No initial state selected yet");
			return;
		}

		let allValues = this.state.tapeText.split("");
		let indexOfTheCurrentPosition = this.state.currentPosition;
		let valueToBeModified = allValues[indexOfTheCurrentPosition];
		let tempState = this.state.currentState;
		let tempCommand = this.state.currentCommand;
		let acceptableCommandFound = false;

		this.state.commandsList.forEach((arrayItem, index, fullArray) => {
			if (arrayItem.initialState === this.state.currentState &&
				arrayItem.input === valueToBeModified) {

				allValues[indexOfTheCurrentPosition] = arrayItem.output;
				tempState = arrayItem.nextState;
				tempCommand = index;
				if (arrayItem.move === "left") {
					indexOfTheCurrentPosition--;
				} else if (arrayItem.move === "right") {
					indexOfTheCurrentPosition++;
				}
				acceptableCommandFound = true;

			}
		});

		if (!acceptableCommandFound) {
			alert("No acceptable command was given in input");
			return;
		}


		let tmpTapeText = "";

		allValues.forEach((arrayItem) => {
			tmpTapeText += arrayItem;
		});

		this.setState({
			tapeText: tmpTapeText,
			currentState: tempState,
			currentPosition: indexOfTheCurrentPosition,
			currentCommand: tempCommand,
		});
	}


	getTextFromTape(text) {
		this.setTextToTape(text);
	}


	setTextToTape(text) {
		this.setState({
			tapeText: text,
			currentPosition: text.length - 1,
		});
	}

	setCurrentState(stateName) {
		this.setState({
			currentState: stateName,
		});
	}

	exportMachine() {
		console.log(this.state);
	}

	importMachine(text) {

		console.log("called");
	}

	render() {

		return (
			<div>
				<p>{dayjs().format()}</p>
				<div className="pr-2 py-2">
					<h1 className="mr-2 my-2">Turing2 machine</h1>
					<h3 className="mr-2 my-2">States</h3>
					<button onClick={this.addState} className="btn btn-primary my-2 mr-2">Add another state</button>
					<button onClick={() => this.debug()} className="btn btn-dark my-2">Debug</button>
				</div>
				<AddStates statesList={this.state.statesList} onChangeState={this.onChangeState} onRemoveRow={this.removeState} onSetState={this.setCurrentState} currentState={this.state.currentState} />

				<div>
					<h3>Program</h3>
					<button className="btn btn-primary my-2 mr-2" onClick={this.addCommand}>Add another command</button>
					<button className="btn btn-danger my-2" onClick={() => this.fetchNumber()}>Fetch next command</button>
				</div>
				<CommandsList commandsList={this.state.commandsList} statesList={this.state.statesList} onChangeCommand={this.onChangeCommand} onRemoveRow={this.removeCommand} currentCommand={this.state.currentCommand} />

				<Tape tapeText={this.state.tapeText} fetchNumber={this.fetchNumber} getTextFromTape={this.getTextFromTape} setTextToTape={this.setTextToTape} />

				<ImportMachine importMachine={this.importMachine} exportMachine={this.importMachine} />

			</div>
		);
	}

}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Turing />);