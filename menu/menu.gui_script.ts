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
    this.druid.new_button('btnPlay', () => {
        Scene.load('level_menu');
    });
    this.druid.new_button('btnInstruction', () => {
        Scene.load('education');
    });
    this.druid.new_button('btnStat', () => {
        Scene.load('stat');
    });
    druid_style.button.LONGTAP_TIME = 0.01;
    druid.set_default_style(druid_style);
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
