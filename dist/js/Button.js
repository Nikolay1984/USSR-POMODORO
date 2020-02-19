



export default class Button{
	constructor(configButton){
		this.state = false;
		this.configHandlerEvent = null;
		this.type = configButton.type;
		this.targetButton = configButton.targetButton;
	}
	toggle(){

		this.state = this.state === true ? false :true;
	}
	addEventListenerToButton(configHandlerEvent){}
}

