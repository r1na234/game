/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as druid from 'druid.druid';
import * as druid_layout from 'druid.extended.layout';
import * as druid_style from 'druid.styles.default.style';
import { random_level } from '../utils/utils';



interface props {
    druid: DruidClass;
}


export function init(this: props): void {
    Manager.init_gui();
    druid.register('layout', druid_layout);
    this.druid = druid.new(this);
    this.druid.new_button('btn4', () => {
        Scene.load('game');
        Level.set_level(4);

    });
    this.druid.new_button('btn5', () => {
        Scene.load('game');
        Level.set_level(5);
        
    });
    this.druid.new_button('btn6', () => {
        Scene.load('game');
        Level.set_level(6);
    });
    this.druid.new_button('btn_random', () => {
        Scene.load('game')
        let currentLevel = random_level();
        Level.set_level(currentLevel)
    });
    
    this.druid.new_button('level_home', () => {
        Scene.load('menu')
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
