import * as druid from 'druid.druid';
import * as druid_style from 'druid.styles.default.style';
import * as utf8 from '../utils/utf8';
import { letters_of6_words } from '../utils/words_6_letters';
import { letters_of5_words } from '../utils/words_5_letters';
import { letters_of4_words } from '../utils/words_4_letters';
import { check_6letters } from '../utils/check_6letters';
import { check_5letters } from '../utils/check_5letters';
import { check_4letters } from '../utils/check_4letters';

interface props {
    druid: DruidClass;
}
const node_char = {};
const game_field_nodes: node[] = [];
const game_field_text = {};
const game_word: string[] = [];
let input_word: string[] = [];
let x = 0;
let counter = 0;
let vocabular: any[] = [];
const additional_alpha: node[] = [];
const additional_blue: node[] = [];
let additional_highlight: node[] = [];
const lvl: number = +Level.get_level();
const level: string = tostring(lvl);
const lvlnum: number | undefined = tonumber(lvl);
const field_char_node = {};
const texture_array: node[] = [];
const additional_clue: node[] = [];
const blocker_arr: node[] = [];
const additional_words = ['слово', 'слова', 'слов'];
function toggle_snd() {
    Sound.set_active(!Sound.is_active());
}
function on_delete() {
    //Уменьшаем индексы кнопок игрового поля, отключаем кнопки, удаляем текст 
    decrement();
    gui.set_enabled(texture_array[x], false);
    gui.set_text(game_field_text[game_field_nodes[x]], "");
    //удаляем букву из проверочного массива
    input_word.pop();
}
function on_clue() {
    for (let i = 0; i < game_word.length; i++) {
        if (!additional_clue.includes(game_word[i])) {
            const node = Object.keys(node_char).find(key => node_char[key] === game_word[i]);
            gui.play_flipbook(node, 'B3');
            additional_clue.push(game_word[i]);
            return;
        }

    }
}
function on_clck(_this: props) {
    gui.set_enabled(texture_array[x], true);
    gui.set_text(game_field_text[game_field_nodes[x]], node_char[_this]);
    field_char_node[node_char[_this]] = texture_array[x];
    input_word.push(node_char[_this]);
    incriment();

}
function get_word_form(value) {
    const num = value % 10;
    if (value > 10 && value < 20) return additional_words[2];
    if (num > 1 && num < 5) return additional_words[1];
    if (num == 1) return additional_words[0];
    return additional_words[2];
}
function set_initial_word(): void {

    math.randomseed(os.clock() * 100000000000);
    let lvl: number = Level.get_level();
    let string_game_word: string;

    if (lvl == 6) {
        string_game_word = letters_of6_words[math.floor(math.random(0, letters_of6_words.length))];
    }
    if (lvl == 5) {
        string_game_word = letters_of5_words[math.floor(math.random(0, letters_of5_words.length))];
    }
    if (lvl == 4) {
        string_game_word = letters_of4_words[math.floor(math.random(0, letters_of4_words.length))];
    }

    for (let i = 1; i < (+lvl + 1); i++) {
        const l = utf8.sub(string_game_word, i, i);
        game_word.push(l);
    }


}
function win(): void {
    count = count + 1;
    for (let i = 0; i < game_word.length; i++) {
        const node: node = Object.keys(node_char).find(key => node_char[key] === game_word[i]);
        const texture_node: node = field_char_node[game_word[i]];
        gui.play_flipbook(node, 'B1');
        gui.play_flipbook(texture_node, 'B1');
    }
    GameStorage.set(level, count);
    input_word = [];
    timer.delay(0.5, false, () => {
        for (let i = 0; i < blocker_arr.length; i++) {
            blocker_arr[i].set_enabled(true);
        }
        let win = gui.get_node('win_popup');
        gui.set_enabled(win, true);
        Scene.set_bg('#98806C');
    });
}
function loose(): void {
    input_word = [];
    timer.delay(0.5, false, () => {
        let loose = gui.get_node('fail_popup');
        gui.set_enabled(loose, true);
        for (let i = 0; i < blocker_arr.length; i++) {
            blocker_arr[i].set_enabled(true);
        }
        Scene.set_bg('#98806C');
    });
}
function incriment() {
    x++;
    if (x % lvlnum == 0) {
        check();
    }
}
function decrement() {
    const wrong_word = gui.get_node('wrong_word_popup');
    if (x % lvlnum == 0 && !gui.is_enabled(wrong_word)) {
        return;
    }
    else if (gui.is_enabled(wrong_word)) {
        x--;
    }
    else {
        x--;
    }
}
function check(): void {
    const compared_game: string = game_word.join("");
    const compared: string = input_word.join("");
    switch (lvlnum) {
        case 4:
            if (check_4letters.includes(compared) == false) {
                input_word.pop();
                const wrong_word: any = gui.get_node('wrong_word_popup');
                gui.set_enabled(wrong_word, true);
                for (let i = 0; i < blocker_arr.length; i++) {
                    blocker_arr[i].set_enabled(true);
                }
                Scene.set_bg('#98806C');
                return;
            }
            break;
        case 5:
            if (check_5letters.includes(compared) == false) {
                input_word.pop();
                const wrong_word = gui.get_node('wrong_word_popup');
                gui.set_enabled(wrong_word, true);
                for (let i = 0; i < blocker_arr.length; i++) {
                    blocker_arr[i].set_enabled(true);
                }
                Scene.set_bg('#98806C');
                return;
            }
            break;
        case 6:
            if (check_6letters.includes(compared) == false) {
                input_word.pop();
                const wrong_word = gui.get_node('wrong_word_popup');
                gui.set_enabled(wrong_word, true);
                for (let i = 0; i < blocker_arr.length; i++) {
                    blocker_arr[i].set_enabled(true);
                }
                Scene.set_bg('#98806C');
                return;
            }
            break;
    }

    if (compared_game == compared) {
        win();
        return;
    }

    else {
        counter++;
        if (counter == 6) {
            loose();
        }
        for (let i = 0; i < game_word.length; i++) {
            if (!vocabular[game_word[i]]) {
                vocabular[game_word[i]] = 0;
            }
            vocabular[game_word[i]] += 1;
        }
        // измененение цвета кнопок алфавита 
        for (let i = 0; i < input_word.length; i++) {
            const node: node = Object.keys(node_char).find(key => node_char[key] === input_word[i]);
            if (input_word[i] == game_word[i] && (additional_alpha.includes(node) == false || additional_blue.includes(node))) {
                gui.play_flipbook(node, 'B1');
                additional_alpha.push(node);
                additional_blue.push(node);
                additional_clue.push(input_word[i]);
            }
            else if (game_word.includes(input_word[i]) && (additional_alpha.includes(node) == false)) {
                gui.play_flipbook(node, 'B3');
                additional_blue.push(node);
                additional_clue.push(input_word[i]);
            }
            else if (additional_alpha.includes(node) == false) {
                gui.play_flipbook(node, 'B4');
            }
        }
        // изменение цвета кнопок поля 
        for (let i = 0; i < input_word.length; i++) {
            let node: node = field_char_node[input_word[i]];
            if (input_word[i] == game_word[i] && (additional_highlight.includes(input_word[i]) == false)) {
                gui.play_flipbook(node, 'B1');
                if ((vocabular[input_word[i]]) == 1) {
                    additional_highlight.push(input_word[i]);
                    (vocabular[input_word[i]]) -= 1;
                }
            }
            else if (game_word.includes(input_word[i]) && (additional_highlight.includes(input_word[i]) == false)) {
                if ((vocabular[input_word[i]]) == 0) {
                    gui.play_flipbook(node, 'B4');
                }
                if ((vocabular[input_word[i]]) == 1) {
                    if (input_word.includes(input_word[i], i + 1)) {
                        gui.play_flipbook(node, 'B4');
                    }
                    else {
                        (vocabular[input_word[i]]) -= 1;
                        gui.play_flipbook(node, 'B3');
                    }
                }
                else {
                    (vocabular[input_word[i]]) -= 1;
                    gui.play_flipbook(node, 'B3');
                }
            }
            else {
                gui.play_flipbook(node, 'B4');
            }
        }
        vocabular = [];
        additional_highlight = [];
    }
    input_word = [];
}
export function init(this: props): void {
    Manager.init_gui();
    const sound_on: node = gui.get_node('sound_on');
    const sound_off: node = gui.get_node('sound_off');
    this.druid = druid.new(this);
    druid_style.button.LONGTAP_TIME = 0.01;
    druid.set_default_style(druid_style);
    set_initial_word();
    if (Sound.is_active()) {
        gui.set_enabled(sound_off, false);
        gui.set_enabled(sound_on, true);
    }
    else {
        gui.set_enabled(sound_on, false);
        gui.set_enabled(sound_off, true);
    }
    this.druid.new_button('B2_02', () => {
        const sound_on: node = gui.get_node('sound_on');
        const sound_off: node = gui.get_node('sound_off');
        if (gui.is_enabled(sound_on)) {
            gui.set_enabled(sound_on, false);
            gui.set_enabled(sound_off, true);
            toggle_snd();
        }
    });
    this.druid.new_button('B2_01', () => {
        let sound_on = gui.get_node('sound_on');
        let sound_off = gui.get_node('sound_off');
        if (gui.is_enabled(sound_off)) {
            gui.set_enabled(sound_off, false);
            gui.set_enabled(sound_on, true);
            toggle_snd();
        }
    });
    const lvl = Level.get_level();
    const guessed_rate: node = gui.get_node('guessed_words_rate');
    count = GameStorage.get(level, count);
    gui.set_text(guessed_rate, `Угадано ${count} ${get_word_form(count)}`);
    this.druid.new_button('home_menu', () => Scene.load('level_menu'));
    this.druid.new_blocker('win_popup');
    this.druid.new_button('OK', () => {
        Scene.restart();
        for (let i = 0; i < blocker_arr.length; i++) {
            blocker_arr[i].set_enabled(true);
        }
        Scene.set_bg('#C8BDB0');
    });
    this.druid.new_button('OK3', () => {
        for (let i = 0; i < blocker_arr.length; i++) {
            blocker_arr[i].set_enabled(false);
        }
        Scene.set_bg('#C8BDB0');
        Scene.restart()
    });
    this.druid.new_button('OK2', () => {
        for (let i = 0; i < tonumber(lvl); i++) {
            on_delete();
        }
        for (let i = 0; i < blocker_arr.length; i++) {
            blocker_arr[i].set_enabled(false);
        }
        Scene.set_bg('#C8BDB0');
        let wrong_word = gui.get_node('wrong_word_popup');
        gui.set_enabled(wrong_word, false);
    });
    this.druid.new_blocker('fail_popup');
    this.druid.new_blocker('wrong_word_popup');
    let btn = this.druid.new_button(`delete`);
    btn.on_click.subscribe(on_delete);
    gui.set_enabled(gui.get_node('win_popup'), false);
    gui.set_enabled(gui.get_node('fail_popup'), false);
    gui.set_enabled(gui.get_node('wrong_word_popup'), false);
    const chars = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    for (let i = 1; i < 33; i++) {
        const ch = utf8.sub(chars, i, i);
        const params = ch;
        let btn = this.druid.new_button(`${i}`);
        let block = this.druid.new_blocker(`${i}`);
        blocker_arr.push(block);
        node_char[btn.node] = params;
        btn.on_click.subscribe(on_clck, btn.node);
    }
    const template = gui.get_node('template_cell');
    const parent = gui.get_node('game_field');
    let delta;
    let variable;
    switch (tonumber(lvl)) {
        case 4:
            delta = 60 + 10;
            variable = 4
            break;
        case 5:
            delta = 60 + 6;
            variable = 2.9
            break;
        case 6:
            delta = 60 + 3;
            variable = 2.4
            break;
    }

    for (let y = 0; y < 6; y++) {
        for (let x = 0; x < tonumber(lvl); x++) {
            const n = gui.clone_tree(template);
            const np = n['template_cell'];
            const text = n['text'];
            const texture = n['letter'];
            gui.set_enabled(np, true);
            gui.set_parent(np, parent, false);
            gui.set_position(np, vmath.vector3(-375 / variable + x * delta, 375 / 2 - y * delta, 0));
            game_field_nodes.push(np);
            game_field_text[np] = text;
            texture_array.push(texture);
        }
    }
    const btn_clue = this.druid.new_button(`clue`);
    btn_clue.on_click.subscribe(on_clue);
    const block_snb = this.druid.new_blocker('B2_02');
    const block_home = this.druid.new_blocker('home_menu');
    const block_clue = this.druid.new_blocker('clue');
    block_clue.set_enabled(false);
    const block_delete = this.druid.new_blocker('delete');
    blocker_arr.push(block_clue);
    blocker_arr.push(block_delete);
    blocker_arr.push(block_home);
    blocker_arr.push(block_snb);
    for (let i = 0; i < blocker_arr.length; i++) {
        blocker_arr[i].set_enabled(false);
    }
}
export function on_input(this: props, action_id: string | hash, action: any): void {
    if (action_id == ID_MESSAGES.MSG_TOUCH)
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


