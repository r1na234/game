import * as druid from 'druid.druid';
import * as druid_style from 'druid.styles.default.style';
import { screen_to_world } from '../utils/camera';

const additional_words = ['слово', 'слова', 'слов'];
function get_word_form(value){
    var num = value % 10;
    if(value > 10 && value < 20) return additional_words[2]; 
	if(num > 1 && num < 5) return additional_words[1];
	if(num == 1) return additional_words[0]; 
	return additional_words[2];
}

export function init(this: any): void {
    Manager.init_gui();
    this.druid = druid.new(this);
    druid_style.button.LONGTAP_TIME = 0.01;
    druid.set_default_style(druid_style);
    msg.post(".", "acquire_input_focus");
    count4 = GameStorage.get('4', count);
    count5 = GameStorage.get('5', count);
    count6 = GameStorage.get('6', count);
    let rate4 = gui.get_node(`4`);
    let rate5 = gui.get_node(`5`);
    let rate6 = gui.get_node(`6`);
    gui.set_text(rate4, `${count4} ${get_word_form(count4)}`);
    gui.set_text(rate5, `${count5} ${get_word_form(count5)}`);
    gui.set_text(rate6, `${count6} ${get_word_form(count6)}`);   
    this.druid.new_button('clear_stat', () => {
        for (let i = 4; i < 7 ; i++){
            GameStorage.set('4', 0);
            GameStorage.set('5', 0);
            GameStorage.set('6', 0);
            count4 = GameStorage.get('4', count);
            count5 = GameStorage.get('5', count);
            count6 = GameStorage.get('6', count);
            let rate4 = gui.get_node(`4`);
            let rate5 = gui.get_node(`5`);
            let rate6 = gui.get_node(`6`);
            gui.set_text(rate4, `${count4} ${get_word_form(count4)}`);
            gui.set_text(rate5, `${count5} ${get_word_form(count5)}`);
            gui.set_text(rate6, `${count6} ${get_word_form(count6)}`);   
        };
    });
    this.druid.new_button('stat_home', () => Scene.load('menu'));
}

export function on_input(this: props, action_id: string | hash, action: any): void {
    if (action_id == ID_MESSAGES.MSG_TOUCH  && action.released) {
      
    }
    this.druid.on_input(action_id, action);
}

export function update(this: props, dt: number): void {
    this.druid.update(dt);
}

export function on_message(this: props, message_id: string | hash, message: any, sender: string | hash | url): void {
    Manager.on_message_gui(this, message_id, message, sender);
    this.druid.on_message(message_id, message, sender);
}

export function final(this: props): void {
    Manager.final();
    this.druid.final();
}