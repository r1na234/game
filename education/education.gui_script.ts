import * as druid from 'druid.druid';
import * as druid_layout from 'druid.extended.layout';
import * as druid_style from 'druid.styles.default.style';

interface props {
    druid: DruidClass;
}


export function init(this: props): void {
    Manager.init_gui();
    druid.register('layout', druid_layout);
    this.druid = druid.new(this);
    Scene.set_bg('#98806C');
    this.druid.new_blocker('start_popup');
    this.druid.new_blocker('real_word_popup');
    this.druid.new_blocker('color_popup');
    this.druid.new_blocker('final_popup');
    gui.set_enabled(gui.get_node('start_popup'), true);
    this.druid.new_button(`OK_start`, () => {
        gui.set_enabled(gui.get_node('start_popup'), false);
        gui.set_enabled(gui.get_node('real_word_popup'), true);
    });
    this.druid.new_button(`OK_real_world`, () => {
        gui.set_enabled(gui.get_node('real_word_popup'), false);
        gui.set_enabled(gui.get_node('color_popup'), true);
    });
    this.druid.new_button(`OK_color`, () => {
        gui.set_enabled(gui.get_node('color_popup'), false);
        gui.set_enabled(gui.get_node('final_popup'), true);
    });
    this.druid.new_button(`OK_final`, () => {
        gui.set_enabled(gui.get_node('final_popup'), false);
        Scene.load('level_menu');
        Scene.set_bg('#C8BDB0');
    });
    }


export function on_input(this: props, action_id: string | hash, action: unknown): void {
    return this.druid.on_input(action_id, action);
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
